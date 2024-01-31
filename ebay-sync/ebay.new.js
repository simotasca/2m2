import dotenv from "dotenv";
dotenv.config();

const clientId = "SimoneTa-demo2m2-SBX-ce5696659-3b93a248";
const clientSecret = "SBX-e5696659eed3-89c6-4977-b22e-b38e";

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
        Accept: "application/json",
        "Accept-Charset": "utf-8",
        "Accept-Language": "it-IT",
        "Content-Type": "application/json",
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

const ebay = new Ebay(clientId, clientSecret, true);
await ebay.fetch("/buy/browse/v1/item_summary/search?q=drone&limit=3").then((res) => {
  console.log("\nResponse:", res.status, res.statusText);
  return res.json();
}).then(console.log);

ebay.close();