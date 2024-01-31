import dotenv from "dotenv";
dotenv.config();

const clientId = "SimoneTa-demo2m2-SBX-ce5696659-3b93a248";
const clientSecret = "SBX-e5696659eed3-89c6-4977-b22e-b38e";

const scopes = [
  "https://api.ebay.com/oauth/api_scope",
  "https://api.ebay.com/oauth/api_scope/buy.guest.order",
  "https://api.ebay.com/oauth/api_scope/buy.item.feed",
  "https://api.ebay.com/oauth/api_scope/buy.marketing",
  "https://api.ebay.com/oauth/api_scope/buy.product.feed",
  "https://api.ebay.com/oauth/api_scope/buy.marketplace.insights",
  "https://api.ebay.com/oauth/api_scope/buy.proxy.guest.order",
  "https://api.ebay.com/oauth/api_scope/buy.item.bulk",
  "https://api.ebay.com/oauth/api_scope/buy.deal",
  // "https://api.ebay.com/oauth/api_scope/buy.order.readonly",
  // "https://api.ebay.com/oauth/api_scope/buy.guest.order",
  // "https://api.ebay.com/oauth/api_scope/sell.marketing.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.marketing",
  // "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.inventory",
  // "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.account",
  // "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
  // "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly",
  // "https://api.ebay.com/oauth/api_scope/buy.shopping.cart",
  // "https://api.ebay.com/oauth/api_scope/buy.offer.auction",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.finances",
  // "https://api.ebay.com/oauth/api_scope/sell.payment.dispute",
  // "https://api.ebay.com/oauth/api_scope/sell.item.draft",
  // "https://api.ebay.com/oauth/api_scope/sell.item",
  // "https://api.ebay.com/oauth/api_scope/sell.reputation",
  // "https://api.ebay.com/oauth/api_scope/sell.reputation.readonly",
  // "https://api.ebay.com/oauth/api_scope/commerce.notification.subscription",
  // "https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly",
  // "https://api.ebay.com/oauth/api_scope/sell.stores",
  // "https://api.ebay.com/oauth/api_scope/sell.stores.readonly",
];
const encodedScopes = scopes.map(encodeURIComponent).join(" ");

const body = {
  grant_type: "client_credentials",
  scope: encodedScopes,
};

const encodedBody = Object.keys(body).map((k) => `${k}=${body[k]}`).join("&");

// console.log("- client id:", clientId, "\n- client secret:", clientSecret);
// console.log("- scope:", encodedScopes);
// console.log("- body:", encodedBody);

const tokenData = await fetch("https://api.sandbox.ebay.com/identity/v1/oauth2/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
  },
  body: encodedBody,
}).then((res) => res.json());

if (tokenData.error) {
  throw new Error(`ERROR generating token: ${tokenData.error}: ${tokenData.error_description}`);
}

let applicationToken = tokenData.access_token;
// console.log("Token ok?", !!applicationToken);
// console.log(tokenData);

const query = {
  searchDrones: "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=drone&limit=3",
};

await fetch(query.searchDrones, {
  headers: {
    Authorization: `Bearer ${applicationToken}`,
    Accept: "application/json",
    "Accept-Charset": "utf-8",
    "Accept-Language": "it-IT",
    "Content-Type": "application/json",
    "Content-Language": "it-IT",
  },
  method: "GET",
})
  .then((res) => {
    console.log("\nResponse:", res.status, res.statusText);
    return res.json();
  })
  .then(console.log);
