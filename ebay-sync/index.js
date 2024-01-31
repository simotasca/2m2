import { Ebay } from "./ebay.js";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.SANDBOX_CLIENT_ID;
const clientSecret = process.env.SANDBOX_CLIENT_SECRET;

console.log(clientId, clientSecret)
const ebay = new Ebay(clientId, clientSecret, true);

// await ebay.inventory.getInventoryItems().then(console.log);
await ebay.inventory.getInventoryItems().then(console.log);
ebay.close();

// import dotenv from "dotenv";
// import queryString from "querystring";
// dotenv.config();

// getToken(clientId, clientSecret, true).then((r) => console.log(r.expires_in));

// // const TOKEN = "Bearer kajsdbakjsd";
// const token = await ebayAuthToken.getApplicationToken('PRODUCTION');
// console.log(token)
