import dotenv from "dotenv";
dotenv.config();

const clientId = "SimoneTa-demo2m2-SBX-ce5696659-3b93a248";
const clientSecret = "SBX-e5696659eed3-89c6-4977-b22e-b38e";
const ruName = "Simone_Tasca-SimoneTa-demo2m-rigfrvftq";

export class Ebay {
  /** @type {string} */
  #clientSecret;
  /** @type {string} */
  #clientId;
  /** @type {boolean} */
  #isSandbox;
  /** @type {string} */
  #baseApiUrl;
  /** @type {string} */
  #tokenApiFetchRequestInit;
  /** @type {string | null} */
  #token = null;
  /** @type {NodeJS.Timeout | null} */
  #tokenClearTimeout = null;

  /** @param {string} clientId @param {string} clientSecret @param {boolean} isSandbox */
  constructor(clientId, clientSecret, isSandbox = false) {
    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#isSandbox = isSandbox;
    this.#baseApiUrl = this.#isSandbox ? "https://api.sandbox.ebay.com" : "https://api.ebay.com";
    this.#initTokenRequest();
  }

  close() {
    clearTimeout(this.#tokenClearTimeout);
  }

  /** @param {string} path @param {string} method @param {string} body */
  async fetch(path, method = "GET", body) {
    if (!this.#token) await this.#reloadToken();

    console.log(`Fetching Ebay (${method}): ${path}`);
    // console.log("with token:", !!this.#token);

    return await fetch(this.#baseApiUrl + path, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Charset": "utf-8",
        "Accept-Language": "it-IT",
        "Content-Language": "it-IT",
      },
      method: method,
      body: body,
    });
  }

  async #reloadToken() {
    console.log("Reloading access token");

    const data = await fetch(this.#baseApiUrl + "/identity/v1/oauth2/token", this.#tokenApiFetchRequestInit).then(
      (res) => res.json()
    );

    clearTimeout(this.#tokenClearTimeout);
    this.#token = null;

    if (data) {
      if (data.error) {
        throw new Error(`ERROR generating token: ${data.error}: ${data.error_description}`);
      }
      this.#token = data.access_token;
      // reset token 10 minutes before expiry
      this.#tokenClearTimeout = setTimeout(() => {
        this.#token = null;
      }, (data.expires_in - 600) * 1000);
    }
  }

  async #initTokenRequest() {
    console.log(`${this.#clientId}:${this.#clientSecret}`);
    const tokenApiAuthHeader = new Buffer.from(`${this.#clientId}:${this.#clientSecret}`).toString("base64");

    const allScopes = [
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

    const encodedScopes = allScopes.map(encodeURIComponent).join(" ");

    const body = {
      grant_type: "client_credentials",
      scope: encodedScopes,
    };

    const encodedBody = Object.keys(body)
      .map((k) => `${k}=${body[k]}`)
      .join("&");

    this.#tokenApiFetchRequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${tokenApiAuthHeader}`,
      },
      body: encodedBody,
    };
  }
}

// const ebay = new Ebay(clientId, clientSecret, true);
// await ebay
//   .fetch("/buy/browse/v1/item_summary/search?q=engine&limit=5")
//   .then((res) => {
//     console.log("\nResponse:", res.status, res.statusText);
//     return res.json();
//   })
//   .then((res) => res.itemSummaries.map((i) => i.title))
//   .then(console.log);

// ebay.close();

const redirectURI = "Simone_Tasca-SimoneTa-demo2m-rigfrvftq";
const apiScope = Object.freeze({
  base: "https://api.ebay.com/oauth/api_scope",
  "buy.guest.order": "https://api.ebay.com/oauth/api_scope/buy.guest.order",
  "buy.item.feed": "https://api.ebay.com/oauth/api_scope/buy.item.feed",
  "buy.marketing": "https://api.ebay.com/oauth/api_scope/buy.marketing",
  "buy.product.feed": "https://api.ebay.com/oauth/api_scope/buy.product.feed",
  "buy.marketplace.insights": "https://api.ebay.com/oauth/api_scope/buy.marketplace.insights",
  "buy.proxy.guest.order": "https://api.ebay.com/oauth/api_scope/buy.proxy.guest.order",
  "buy.item.bulk": "https://api.ebay.com/oauth/api_scope/buy.item.bulk",
  "buy.deal": "https://api.ebay.com/oauth/api_scope/buy.deal",
  "buy.order.readonly": "https://api.ebay.com/oauth/api_scope/buy.order.readonly",
  "buy.guest.order": "https://api.ebay.com/oauth/api_scope/buy.guest.order",
  "sell.marketing.readonly": "https://api.ebay.com/oauth/api_scope/sell.marketing.readonly",
  "sell.marketing": "https://api.ebay.com/oauth/api_scope/sell.marketing",
  "sell.inventory.readonly": "https://api.ebay.com/oauth/api_scope/sell.inventory.readonly",
  "sell.inventory": "https://api.ebay.com/oauth/api_scope/sell.inventory",
  "sell.account.readonly": "https://api.ebay.com/oauth/api_scope/sell.account.readonly",
  "sell.account": "https://api.ebay.com/oauth/api_scope/sell.account",
  "sell.fulfillment.readonly": "https://api.ebay.com/oauth/api_scope/sell.fulfillment.readonly",
  "sell.fulfillment": "https://api.ebay.com/oauth/api_scope/sell.fulfillment",
  "sell.analytics.readonly": "https://api.ebay.com/oauth/api_scope/sell.analytics.readonly",
  "sell.marketplace.insights.readonly": "https://api.ebay.com/oauth/api_scope/sell.marketplace.insights.readonly",
  "commerce.catalog.readonly": "https://api.ebay.com/oauth/api_scope/commerce.catalog.readonly",
  "buy.shopping.cart": "https://api.ebay.com/oauth/api_scope/buy.shopping.cart",
  "buy.offer.auction": "https://api.ebay.com/oauth/api_scope/buy.offer.auction",
  "commerce.identity.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.readonly",
  "commerce.identity.email.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.email.readonly",
  "commerce.identity.phone.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.phone.readonly",
  "commerce.identity.address.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.address.readonly",
  "commerce.identity.name.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.name.readonly",
  "commerce.identity.status.readonly": "https://api.ebay.com/oauth/api_scope/commerce.identity.status.readonly",
  "sell.finances": "https://api.ebay.com/oauth/api_scope/sell.finances",
  "sell.payment.dispute": "https://api.ebay.com/oauth/api_scope/sell.payment.dispute",
  "sell.item.draft": "https://api.ebay.com/oauth/api_scope/sell.item.draft",
  "sell.item": "https://api.ebay.com/oauth/api_scope/sell.item",
  "sell.reputation": "https://api.ebay.com/oauth/api_scope/sell.reputation",
  "sell.reputation.readonly": "https://api.ebay.com/oauth/api_scope/sell.reputation.readonly",
  "commerce.notification.subscription": "https://api.ebay.com/oauth/api_scope/commerce.notification.subscription",
  "commerce.notification.subscription.readonly":
    "https://api.ebay.com/oauth/api_scope/commerce.notification.subscription.readonly",
  "sell.stores": "https://api.ebay.com/oauth/api_scope/sell.stores",
  "sell.stores.readonly": "https://api.ebay.com/oauth/api_scope/sell.stores.readonly",
});

const allScopes = [
  // apiScope["base"],
  // apiScope["buy.guest.order"],
  // apiScope["buy.item.feed"],
  // apiScope["buy.marketing"],
  // apiScope["buy.product.feed"],
  // apiScope["buy.marketplace.insights"],
  // apiScope["buy.proxy.guest.order"],
  // apiScope["buy.item.bulk"],
  // apiScope["buy.deal"],
  // -------------------------------------------------------------------------
  // apiScope["buy.order.readonly"],
  // apiScope["buy.guest.order"],
  // apiScope["sell.marketing.readonly"],
  // apiScope["sell.marketing"],
  apiScope["sell.inventory.readonly"],
  apiScope["sell.inventory"],
  // apiScope["sell.account.readonly"],
  // apiScope["sell.account"],
  // apiScope["sell.fulfillment.readonly"],
  // apiScope["sell.fulfillment"],
  // apiScope["sell.analytics.readonly"],
  // apiScope["sell.marketplace.insights.readonly"],
  // apiScope["commerce.catalog.readonly"],
  // apiScope["buy.shopping.cart"],
  // apiScope["buy.offer.auction"],
  // apiScope["commerce.identity.readonly"],
  // apiScope["commerce.identity.email.readonly"],
  // apiScope["commerce.identity.phone.readonly"],
  // apiScope["commerce.identity.address.readonly"],
  // apiScope["commerce.identity.name.readonly"],
  // apiScope["commerce.identity.status.readonly"],
  // apiScope["sell.finances"],
  // apiScope["sell.payment.dispute"],
  // apiScope["sell.item.draft"],
  // apiScope["sell.item"],
  // apiScope["sell.reputation"],
  // apiScope["sell.reputation.readonly"],
  // apiScope["commerce.notification.subscription"],
  // apiScope["commerce.notification.subscription.readonly"],
  // apiScope["sell.stores"],
  // apiScope["sell.stores.readonly"],
];

async function getUserToken(code) {
  const body = { grant_type: "authorization_code", redirect_uri: ruName, code: encodeURIComponent(code) };
  return fetch("https://api.sandbox.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ` + new Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: Object.keys(body)
      .map((k) => `${k}=${body[k]}`)
      .join("&"),
  }).then((res) => res.json());
}

const encodedScopes = allScopes.map(encodeURIComponent).join(" ");
const qs = `client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code&scope=${encodedScopes}`;

import Express from "express";
import cookieParser from "cookie-parser";

const app = Express();
app.use(cookieParser());
app.get("/", (_, res) => res.contentType("html").send('<a href="/go">go!</a>'));
app.get("/go", (_, res) => {
  res.redirect("https://auth.sandbox.ebay.com/oauth2/authorize?" + qs);
});
app.get("/auth/callback", (req, res) => {
  let url = new URL("http://localhost:3000" + req.url);
  getUserToken(url.searchParams.get("code")).then((data) => {
    console.log("AUTHENTICATION OK =========================");
    console.log(url.searchParams);
    console.log("Cookies", req.cookies);
    console.log("User Token", data);
    console.log("===========================================");
    res.redirect("/");
  });
});
app.get("/test", (req, res) => {
  fetch("https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item?limit=2&offset=0", {
    method: "GET",
    headers: {
      Authorization: `Bearer v^1.1#i^1#I^3#r^0#p^3#f^0#t^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`,
      "Content-Type": "application/json",
      Accept: "application/json",
      "Accept-Charset": "utf-8",
      "Accept-Language": "it-IT",
      "Content-Language": "it-IT",
    },
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      return res.contentType("json").send(JSON.stringify(data));
    });
});
app.listen(3000, () => console.log("http://localhost:3000"));

/**
 * SE IL TOKEN é SCADUTO MANDARE UNA MAIL URGENTE CHE CHIEDE DI RIFARE L'ACCESSO
 */
