import dotenv from "dotenv";
dotenv.config();

function checkConfiguration(key, env) {
  if (!process.env[key]) {
    const envMessage = env ? `for "${env}" ebay environment` : "";
    throw new Error(`ERROR: missing required env variable "${key}" ${envMessage}`);
  }
}

const ebayConf = { environment: process.env["EBAY_ENVIRONMENT"] || "sandbox" };

checkConfiguration("WEB_SERVER_PORT");
checkConfiguration("WEB_SERVER_ACCESS_TOKEN");
const webConf = {
  /** @type {string} */
  port: Number(process.env["WEB_SERVER_PORT"]),
  /** @type {string} */
  accessToken: process.env["WEB_SERVER_ACCESS_TOKEN"],
};

checkConfiguration("DB_PATH");
const dbConf = {
  /** @type {string} */
  path: process.env["DB_PATH"],
};

if (ebayConf.environment === "sandbox") {
  for (const key of ["EBAY_SANDBOX_CLIENT_ID", "EBAY_SANDBOX_CLIENT_SECRET", "EBAY_SANDBOX_RU_NAME"]) {
    checkConfiguration(key, "sandbox");
  }
  ebayConf.sandbox = {
    clientId: process.env["EBAY_SANDBOX_CLIENT_ID"],
    clientSecret: process.env["EBAY_SANDBOX_CLIENT_SECRET"],
    ruName: process.env["EBAY_SANDBOX_RU_NAME"],
  };
} else if (ebayConf.environment === "production") {
  for (const key of ["EBAY_PRODUCTION_CLIENT_ID", "EBAY_PRODUCTION_CLIENT_SECRET", "EBAY_PRODUCTION_RU_NAME"]) {
    checkConfiguration(key, "production");
  }
  ebayConf.production = {
    clientId: process.env["EBAY_PRODUCTION_CLIENT_ID"],
    clientSecret: process.env["EBAY_PRODUCTION_CLIENT_SECRET"],
    ruName: process.env["EBAY_PRODUCTION_RU_NAME"],
  };
} else {
  throw new Error("ERROR: invalid EBAY_ENVIRONMENT " + environment + '. Choose between "sandbox" and "production"');
}

const config = {
  web: webConf,
  db: dbConf,
  ebay: {
    ...ebayConf,
    sandbox: ebayConf.environment === "sandbox",
    production: ebayConf.environment === "production",
    /** @type {string} */
    clientId: ebayConf[ebayConf.environment]["clientId"],
    /** @type {string} */
    clientSecret: ebayConf[ebayConf.environment]["clientSecret"],
    /** @type {string} */
    ruName: ebayConf[ebayConf.environment]["ruName"],
  },
};

export default config;
