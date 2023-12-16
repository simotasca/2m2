import { createClient } from "@supabase/supabase-js";
import { existsSync } from "node:fs";
import fs from "node:fs/promises";

const COL_NOME = 0;
const COL_CODE = 1;

const OUTPUT = "out/nations.json";

export default async function run() {
  const csv = await fs.readFile("data/countries.csv").then((f) => f.toString());
  /** @type {{name:string, cell:string}[]} */
  const rows = csv.split("\n").reduce((prev, row) => {
    const cells = row.split(",").map((c) => c.trim());
    const name = cells[COL_NOME];
    const code = cells[COL_CODE];
    if (!name || !code) return prev;
    return [...prev, { name, code }];
  }, []);

  const headers = rows.shift();

  console.log(`=== GENERATING NATIONS JSON ===`);
  console.log(`rows: ${rows.length} cols: ${headers.length}`);

  if (existsSync(OUTPUT)) {
    console.log("🗑️  Deleting old file...");
    await fs.rm(OUTPUT);
    console.log("✨ Delete complete!\n");
  }

  await fs.writeFile(OUTPUT, JSON.stringify(rows));
  console.log("✨ JSON generation complete");
}
