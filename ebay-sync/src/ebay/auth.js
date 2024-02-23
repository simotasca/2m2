import config from "../config.js";
import { writeDB } from "../db.js";
import { queryString } from "./endpoints/utils.js";
import { endpoints } from "./index.js";
import { userScopesEncoded } from "./scopes.js";

const basicAuthToken =
  `Basic ` +
  new Buffer.from(
    `${config.ebay.clientId}:${config.ebay.clientSecret}`
  ).toString("base64");

export async function fetchUserToken(authorizationCode) {
  if (!authorizationCode) return { err: true };
  const { data, err } = await fetch(endpoints.api.identity.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthToken,
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
  return { err, data };
}

export async function persistUserToken(data) {
  data.obtain_date = new Date().toString();
  data.expire_date = new Date(Date.now() + data.expires_in * 1000);
  data.refresh_token_expire_date = new Date(
    Date.now() + data.refresh_token_expires_in * 1000
  );
  await writeDB((old) => {
    old.ebay = data;
    return old;
  });
}

export async function refreshAccessToken(refreshToken) {
  const { data, err } = await fetch(endpoints.api.identity.token, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicAuthToken,
    },
    body: queryString({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      scope: userScopesEncoded,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      return { data, err: false };
    })
    .catch((err) => {
      console.error("ERROR: refreshing user token: " + err.message);
      return { err: true };
    });
  return { err, data };
}

export async function persistRefreshedToken(data) {
  data.obtain_date = new Date().toString();
  data.expire_date = new Date(Date.now() + data.expires_in * 1000);

  await writeDB((old) => {
    old.ebay = { ...old.ebay, ...data };
    return old;
  });
}
