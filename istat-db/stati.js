import { createClient } from "@supabase/supabase-js";
import fs from "node:fs/promises";

const COL_NOME = 0;
const COL_CODE = 1;

const SUPABASE_SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJzZXJ2aWNlX3JvbGUiLAogICAgImlzcyI6ICJzdXBhYmFzZS1kZW1vIiwKICAgICJpYXQiOiAxNjQxNzY5MjAwLAogICAgImV4cCI6IDE3OTk1MzU2MDAKfQ.DaYlNEoUrrEn2Ig7tqibS-PHK5vgusbcbo7X36XVt4Q";
const SUPABASE_URL = "http://localhost:8000";

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

  console.log(`=== POPULATING NATIONS DATABASE ===`);
  console.log(`rows: ${rows.length} cols: ${headers.length}`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  console.log("🗑️  Deleting all nations...");
  const { error: deleteError } = await supabase
    .from("nation")
    .delete()
    .gte("id", 0);
  if (deleteError) {
    throw new Error("ERROR: Could not delete nations: " + deleteError.message);
  }
  console.log("✨ Delete complete!\n");

  let i = 1;
  for (const { name, code } of rows) {
    console.log(` - ${i++}/${rows.length} Creating nation (${code}):`, name);
    const { insertError } = await supabase.from("nation").insert({
      name,
      code,
    });
    if (insertError) {
      throw new Error(
        `ERROR: Could not insert nation ${name}: ` + deleteError.message
      );
    }
  }

  console.log("✨ Database population complete");
}
