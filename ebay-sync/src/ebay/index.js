import config from "../config.js";
import { writeDB } from "../db.js";

function queryString(obj) {
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k]}`)
    .join("&");
}

function resolveUrl(base, path, qs) {
  const domain = config.ebay.sandbox ? `https://${base}.sandbox.ebay.com` : `https://${base}.ebay.com`;
  const pathOk = path.startsWith("/") ? path : "/" + path;
  const qsOk = qs ? "?" + queryString(qs) : "";
  return domain + pathOk + qsOk;
}

function apiUrl(path, qs) {
  return resolveUrl("api", path, qs);
}

function authUrl(path, qs) {
  return resolveUrl("auth", path, qs);
}

const scopes = Object.freeze({
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

const userScopesEnabled = [scopes["sell.inventory"], scopes["sell.inventory.readonly"]];
const userScopesEncoded = userScopesEnabled.map(encodeURIComponent).join(" ");

export const endpoints = {
  auth: {
    userGrantAccessPage: authUrl("/oauth2/authorize", {
      client_id: config.ebay.clientId,
      redirect_uri: config.ebay.ruName,
      response_type: "code",
      scope: userScopesEncoded,
    }),
  },
  api: {
    identity: {
      token: apiUrl("/identity/v1/oauth2/token"),
    },
  },
};

export async function persistUserToken(authorizationCode) {
  const { data, err } = await fetch(endpoints.api.identity.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        `Basic ` + new Buffer.from(`${config.ebay.clientId}:${config.ebay.clientSecret}`).toString("base64"),
    },
    body: queryString({
      grant_type: "authorization_code",
      redirect_uri: config.ebay.ruName,
      code: encodeURIComponent(authorizationCode),
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return { data, err: false };
    })
    .catch((err) => {
      console.error("ERROR: fetching user token: " + err.message);
      return { err: true };
    });

  console.log(data, err);

  if (!err && !!data) {
    data.obtain_date = new Date().toString();
    data.expire_date = new Date(Date.now() + data.expires_in);
    data.refresh_token_expire_date = new Date(Date.now() + data.refresh_token_expires_in);
    writeDB((old) => {
      old.ebay = data;
      return old;
    });
  }

  return !err;
}

export function start() {}
