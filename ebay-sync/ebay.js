import queryString from "querystring";
import qs from "qs";


/**
 * QUESTIONE DELLE IMMAGINI
 * si può mettere un link a immagini self hosted oppure possono essere caricate con UploadSiteHostedPictures
 */

/**
 * @typedef InventoryItem
 * @property {string} sku item id
 * @property {string} locale language es. en_US
 * @property {object} product the article itself
 * @property {string} product.title article title
 * @property {object} product.aspects see https://developer.ebay.com/api-docs/commerce/taxonomy/resources/category_tree/methods/getItemAspectsForCategory
 * @property {string} brand il brand
 * @property {string[]} imageUrls come fare?
 * altro ?
 */

export const Ebayx = {
  /**
   * Inventory APIs
   */
  inventory: {
    /**
     * Creates or updates up to 25 inventory item records.
     *
     * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem#h2-samples
     *
     * @param {InventoryItem[]} items the inventory utems spec
     */
    bulkCreateOrReplace: async (items) => {
      return Ebay.inventory.fetch("/bulk_create_or_replace_inventory_item", "POST", items);
    },

    /**
     * Deletes an inventory item record
     *
     * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem#h2-samples
     *
     * @param {string} sku id of the item to delete
     */
    delete: async (sku) => {
      return Ebay.inventory.fetch("/inventory_item/" + sku, "DELETE");
    },
  },
};

let exampleInventoryItem = {
  requests: [
    {
      sku: "B********s",
      locale: "en_US",
      product: {
        title: "Boston Terriers Collector Plate &quot;All Ears by Dan Hatala - The Danbury Mint",
        aspects: {
          "Country/Region of Manufacture": ["United States"],
        },
        description:
          "All Ears by Dan Hatala. A limited edition from the collection entitled 'Boston Terriers'. Presented by The Danbury Mint.",
        imageUrls: ["https://i*****g.com/0**********/**********F"],
      },
      condition: "USED_EXCELLENT",
      conditionDescription: "Mint condition. Kept in styrofoam case. Never displayed.",
      availability: {
        shipToLocationAvailability: {
          quantity: 2,
        },
      },
    },
    {
      sku: "J********h",
      locale: "en_US",
      product: {
        title: "JOE PAVELSKI 2015-16 BOBBLEHEAD NHL SAN JOSE SHARKS 25TH ANNIVERSARY",
        aspects: {
          Team: ["San Jose Sharks"],
          Player: ["Joe Pavelski"],
          "Pre & Post Season": ["Regular Season"],
          Product: ["Bobblehead"],
          "Country/Region of Manufacture": ["China"],
          Brand: ["Success Promotions"],
          UPC: ["Does not apply"],
        },
        description:
          "Joe Pavelski bobble head from 2015-16 season, the 25th season of the San Jose Sharks. New in box.",
        imageUrls: ["https://i*****g.com/0**********/**********F"],
      },
      condition: "NEW",
      availability: {
        shipToLocationAvailability: {
          quantity: 1,
        },
      },
    },
  ],
};

export class Ebay {
  /** @type {string} */
  #clientSecret;
  /** @type {string} */
  #clientId;
  /** @type {boolean} */
  #isSandbox;
  /** @type {string} */
  #tokenApiUrl;
  /** @type {string} */
  #tokenApiAuthHeader;
  /** @type {string | null} */
  #token = null;
  /** @type {NodeJS.Timeout | null} */
  #tokenClearTimeout = null;

  /** @param {string} clientId @param {string} clientSecret @param {boolean} isSandbox */
  constructor(clientId, clientSecret, isSandbox = false) {
    this.clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#isSandbox = isSandbox;
    this.#tokenApiUrl = this.#isSandbox
      ? "https://api.sandbox.ebay.com/identity/v1/oauth2/token"
      : "https://api.ebay.com/identity/v1/oauth2/token";
    this.#tokenApiAuthHeader = new Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  }

  inventory = {
    /**
     * https://developer.ebay.com/api-docs/sell/inventory/resources/methods
     *
     * @param {string} path inventory api name with querystring
     * @param {string} method http request method
     * @param {any} body http request body
     */
    fetch: async (path, method = "GET", body) => {
      return await this.fetch("/sell/inventory/v1" + path, method, body);
    },
    /**
     * Retrieves all inventory item records defined for the seller's account
     *
     * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems#h2-samples
     *
     * @param {object} params
     * @param {string | undefined} params.limit number of results
     * @param {string | undefined} params.offset start index
     */
    getInventoryItems: async (params = {}) => {
      const { limit, offset } = params;
      return this.inventory.fetch("/inventory_item" + queryParams({ limit, offset }));
    },
  };

  /** @param {string} path @param {string} method @param {string} body */
  async fetch(path, method = "GET", body) {
    if (!this.#token) await this.#reloadToken();

    console.log(`Fetching Ebay (${method}): ${path}`);
    console.log("with token:", !!this.#token);

    return await fetch("https://api.ebay.com" + path, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
        "Content-Type": "application/jsons",
        "Content-Language": "it-IT"
      },
      method: method,
      body: body,
    })
      .then((res) => res.json())
      .catch((err) => {
        return { errors: [err] };
      });
  }

  close() {
    clearTimeout(this.#tokenClearTimeout);
  }

  async #reloadToken() {
    console.log("Reloading access token");

    const data = await fetch(this.#tokenApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${this.#tokenApiAuthHeader}`,
      },
      body: queryString.stringify({
        grant_type: "client_credentials",
        scope: "https://api.ebay.com/oauth/api_scope",
      }),
    }).then((res) => res.json());

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
}

// entro nel sito
// inserisco userid password per login

// nuovo utente:
// compilo tutti i dati dell'azienda
// email e password

// questo genera generico e un utente
// se vedo il codice cliente allora è stato associato

// accesso web fino a approvazione

// avvisare milka con una mail di una registrazione



// rapporto entropico
/**
 * In che modo questo numero è indiviuabile
 * è una costante? o varia a seconda dei casi?
 * è ottimizzabile?
 */

/**
 * associazione web a utente passato
 * email as id
 */

/** @param {object} obj */
function queryParams(obj) {
  let queryParams = qs.stringify(obj);
  return queryParams && "?" + queryParams;
}
