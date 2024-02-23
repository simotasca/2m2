import { authUrl, apiUrl } from "./utils.js";
import { userScopesEncoded } from "../scopes.js";
import config from "../../config.js";

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
