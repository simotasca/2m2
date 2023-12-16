// https://www.istat.it/it/archivio/6789

import fs from "node:fs/promises";
import { resolve } from "node:path";
import { cwd } from "process";
import { createClient } from "@supabase/supabase-js";

const COL_NOME_REGIONE = 10;
const COL_NOME_PROVINCIA = 11;
const COL_ISTAT_PROVINCIA = 2;
const COL_COD_PROVINCIA = 14;
const COL_NOME_COMUNE = 6;
const COL_ISTAT_COMUNE = 3;

const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q";
const SUPABASE_URL = "http://localhost:8000";

export default async function run() {
  let csv = await fs
    .readFile(
      resolve(cwd(), "data/Codici-statistici-e-denominazioni-al-18_11_2023.csv")
    )
    .then((v) => v.toString());

  const rows = csv.split("\n").map((r) => r.split(","));
  const headers = rows.shift();

  console.log(`=== POPULATING ITALY DATABASE ===`);
  console.log(`rows: ${rows.length}, cols: ${headers.length}\n`);

  console.log("headers:");
  console.log(
    headers.map((h, i) => `(${i}) ${h}`),
    "\n"
  );

  /** @type{Map<string, Map<string, {codice:string, nome:string, comuni:Map<string,string>}>>} */
  const grouped = rows.reduce((prev, curre) => {
    const regione = val(curre, COL_NOME_REGIONE);

    if (!regione) return prev;

    const istatProvincia = val(curre, COL_ISTAT_PROVINCIA);
    const comune = [val(curre, COL_ISTAT_COMUNE), val(curre, COL_NOME_COMUNE)];

    if (prev.get(regione)?.has(istatProvincia)) {
      prev
        .get(regione)
        .get(istatProvincia)
        .comuni.set(...comune);
      return prev;
    }

    const provincia = [
      istatProvincia,
      {
        codice: val(curre, COL_COD_PROVINCIA),
        nome: val(curre, COL_NOME_PROVINCIA),
        comuni: new Map([comune]),
      },
    ];

    if (!prev.has(regione)) {
      prev.set(regione, new Map([provincia]));
      return prev;
    }

    prev.get(regione).set(...provincia);

    return prev;
  }, new Map());

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  console.log("🗑️  Deleting all regions, provinces and municipalities...");
  const { error: deleteError } = await supabase
    .from("region")
    .delete()
    .gte("id", 0);
  if (deleteError) {
    throw new Error("ERROR: Could not delete regions: " + deleteError.message);
  }
  console.log("✨ Delete complete!\n");

  let i = 1;
  for (const [nomeRegione, provinceMap] of grouped) {
    const { data: dbRegion, error: instertRegionError } = await supabase
      .from("region")
      .insert({
        name: nomeRegione,
      })
      .select()
      .single();
    if (instertRegionError) {
      throw new Error(
        `ERROR: could not insert region ${nomeRegione}: ` +
          instertRegionError.message
      );
    }
    console.log(`${i++}/${grouped.size} Created region:`, dbRegion.name);

    let y = 1;
    for (const [istatProvincia, provincia] of provinceMap) {
      const { data: dbProvince, error: insertProvinceError } = await supabase
        .from("province")
        .insert({
          istat: istatProvincia,
          name: provincia.nome,
          code: provincia.codice,
          id_region: Number(dbRegion.id),
        })
        .select()
        .single();

      if (insertProvinceError) {
        throw new Error(
          `ERROR: could not insert province ${provincia.codice}: ` +
            insertProvinceError.message
        );
      }

      console.log(
        ` - ${y++}/${provinceMap.size} Created province:`,
        dbProvince.name
      );

      for (const [istat, comune] of provincia.comuni) {
        const { error: insertMunicipalityError } = await supabase
          .from("municipality")
          .insert({
            name: comune,
            istat: istatProvincia + istat,
            id_province: Number(dbProvince.id),
          });

        if (insertMunicipalityError) {
          throw new Error(
            `ERROR: could not insert municipality ${comune.name}: ` +
              insertMunicipalityError.message
          );
        }
      }
    }
  }

  console.log("✨ Database population complete");
}

function val(arr, col) {
  if (!arr[col]) return undefined;
  return String(arr[col]).split("/")[0].split("-").join(" ").trim();
}
