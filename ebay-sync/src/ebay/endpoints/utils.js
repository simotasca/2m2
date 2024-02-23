import config from "../../config.js";

export function queryString(obj) {
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k]}`)
    .join("&");
}

function resolveUrl(base, path, qs) {
  const domain = config.ebay.sandbox
    ? `https://${base}.sandbox.ebay.com`
    : `https://${base}.ebay.com`;
  const pathOk = path.startsWith("/") ? path : "/" + path;
  const qsOk = qs ? "?" + queryString(qs) : "";
  return domain + pathOk + qsOk;
}

export function apiUrl(path, qs) {
  return resolveUrl("api", path, qs);
}

export function authUrl(path, qs) {
  return resolveUrl("auth", path, qs);
}
