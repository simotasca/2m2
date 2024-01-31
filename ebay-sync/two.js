import EBay from "ebay-api";
import dotenv from "dotenv";
dotenv.config();

const clientId = process.env.SANDBOX_CLIENT_ID;
const clientSecret = process.env.SANDBOX_CLIENT_SECRET;

const eBay = new EBay({
  appId: clientId,
  certId: clientSecret,
  ruName: "Simone_Tasca-SimoneTa-demo2m-rigfrvftq",
  sandbox: true,
  scope: [
    "https://api.ebay.com/oauth/api_scope",
    "https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly",
  ]
});

await eBay.commerce.catalog.search({q: "drone", limit: 3}).then(res => {
  console.log("res")
}).catch(err => console.error(err))