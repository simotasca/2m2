import qs from "qs";

// https://developer.ebay.com/api-docs/static/oauth-ui-tokens.html
const TOKEN = "Bearer kajsdbakjsd";

await getInventory({ limit: 20, offset: 30 }).then(console.log);
await deleteInventory("aslkasd").then(console.log);

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

/**
 * Retrieves all inventory item records defined for the seller's account
 *
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/getInventoryItems#h2-samples
 *
 * @param {object} params
 * @param {string | undefined} params.limit number of results
 * @param {string | undefined} params.offset start index
 */
export async function getInventory(params = {}) {
  const { limit, offset } = params;
  return fetchInventory("/inventory_item" + queryParams({ limit, offset }));
}

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

/**
 * Creates or updates up to 25 inventory item records.
 *
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/bulkCreateOrReplaceInventoryItem#h2-samples
 *
 * @param {InventoryItem[]} items the inventory utems spec
 */
async function bulkCreateOrReplace(items) {
  return fetchInventory("/bulk_create_or_replace_inventory_item", "POST", items);
}

/**
 * Deletes an inventory item record
 *
 * https://developer.ebay.com/api-docs/sell/inventory/resources/inventory_item/methods/deleteInventoryItem#h2-samples
 *
 * @param {string} sku id of the item to delete
 */
export async function deleteInventory(sku) {
  return fetchInventory("/inventory_item/" + sku, "DELETE");
}

/**
 * Inventory APIs
 *
 * https://developer.ebay.com/api-docs/sell/inventory/resources/methods
 *
 * @param {string} path inventory api name with querystring
 * @param {string} method http request method
 * @param {any} body http request body
 */
async function fetchInventory(path, method = "GET", body) {
  return fetchEbay("/sell/inventory/v1" + path, method, body);
}

/**
 * @param {string} path ebay api pathname
 * @param {string} method http request method
 * @param {any} body http request body
 */
async function fetchEbay(path, method = "GET", body) {
  console.log(`Fetching Ebay (${method}): ${path}`);
  return fetch("https://api.ebay.com" + path, {
    headers: {
      Authorization: "Bearer " + TOKEN,
      "Content-Type": "application/jsons",
    },
    method: method,
    body: body && JSON.stringify(body),
  })
    .then((res) => res.json())
    .catch((err) => {
      return { errors: [err] };
    });
}

/** @param {object} obj */
function queryParams(obj) {
  let queryParams = qs.stringify(obj);
  return queryParams && "?" + queryParams;
}
