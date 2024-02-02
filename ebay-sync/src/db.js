import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import config from "./config.js";

const dbFileName = "db.json";
const dbPath = resolve(config.db.path, dbFileName);

function stringVersion() {
  return JSON.stringify({
    env: config.ebay.environment,
    clientId: config.ebay.clientId,
    clientSecret: config.ebay.clientSecret,
    ruName: config.ebay.ruName,
  });
}

let changed = true;
let cached = null;

export async function writeDB(content) {
  let contentOk = content;
  if (typeof content === "function") {
    contentOk = content(await readDB());
  }
  const db = {
    ...contentOk,
    _updated_at: new Date().toString(),
    _version: stringVersion(),
  };
  await writeFile(dbPath, JSON.stringify(db, null, 2));
  changed = true;
}

export async function readDB() {
  if (changed) {
    const contentBuf = await readFile(dbPath);
    cached = JSON.parse(contentBuf.toString());
  }
  return cached;
}

/** @returns {Promise<boolean>} true for same version */
export async function checkVersion() {
  return (await readDB())._version === stringVersion();
}

const dbFileExists = await open(dbPath)
  .then((handle) => {
    handle.close();
    return true;
  })
  .catch(() => false);

if (!dbFileExists) {
  await mkdir(config.db.path, { recursive: true }).catch();
  await writeDB({ _created_at: new Date().toString() });
  console.log("Database initialized");
}
