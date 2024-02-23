import { endpoints } from "./endpoints/index.js";
import * as auth from "./auth.js";
import { readDB } from "../db.js";

export { endpoints, auth };

export const api = {
  /** retrurns a valid token, refreshing it if necessary */
  async _getToken() {
    const db = await readDB();
    let token = db.ebay.access_token;
    if (new Date(db.ebay.expire_date).getTime() <= Date.now() - 1000 * 60 * 2) {
      // TODO: check refresh token expiry

      // refresh the token
      const { data, err } = await auth.refreshAccessToken(
        db.ebay.refresh_token
      );
      if (err || !data) {
        /** maybe retry, then notify the error */
      }
      await auth.persistRefreshedToken(data);
      token = data.access_token;
    }
    return token;
  },

  async test() {
    return fetch(
      "https://api.sandbox.ebay.com/sell/inventory/v1/inventory_item?limit=2&offset=0",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${await this._getToken()}`,
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Charset": "utf-8",
          "Accept-Language": "it-IT",
          "Content-Language": "it-IT",
        },
      }
    ).then((data) => data.json());
  },
};
