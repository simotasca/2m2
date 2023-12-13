import runItaly from "./italia.js";
import runNations from "./stati.js";
import runNationsJson from "./stati-json.js";

const mode = process.argv[2];

function printHelp() {
  console.log("");
  console.log("Please use one of the following arguments:");
  console.log("");
  console.log(
    "  - (i) italy: populates the regions, provinces, and municipalities tables for italy (it also deletes the existing ones)"
  );
  console.log("");
  console.log(
    "  - (n) nations: populates the nations table with names and codes (it also deletes the existing ones)"
  );
  console.log("");
  console.log(
    "  - (j) nations-json: generates a nations.json file with names and codes (it also deletes the existing one)"
  );
  console.log("");
}

if (!mode) {
  printHelp();
  process.exit(1);
}

if (mode === "nations" || mode === "n") {
  await runNations();
} else if (mode === "nations-json" || mode === "j") {
  await runNationsJson();
} else if (mode === "italy" || mode === "i") {
  await runItaly();
} else {
  printHelp();
  process.exit(1);
}
