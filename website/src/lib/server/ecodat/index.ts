import { ecodatBodyTemplate, ecodatHeaders, XMLParser } from "./utils";

export * from "./articles";
export * from "./brands";
export * from "./models";
export * from "./categories";
export * from "./typologies";
export * from "./items";
export * from "./photos";

export enum EcodatAction {
  ARTICLE = "Articolo",
  ARTICLES = "ElencoArticoli",
  CATEGORIES = "Categorie",
  TYPOLOGIES = "Tipologie",
  ITEMS = "Items",
  BRANDS = "Marche",
  MODELS = "Modelli",
  PHOTO_LIST = "ListaFoto",
  PHOTO_SMALL = "FotoSmall",
  PHOTO_BIG = "FotoBig",
}

export async function fetchEcodat(action: EcodatAction, xml?: string) {
  const url = process.env.ECODAT_API_URL;
  if (!url) {
    throw new Error(
      "Error posting Ecodat API: missing env variable ECODAT_API_URL"
    );
  }

  return await fetch(url, {
    method: "POST",
    body: ecodatBodyTemplate(action, xml),
    headers: ecodatHeaders(action),
  })
    .then((res) => res.text())
    .catch((err) => {
      throw new Error(`Error calling ecodat api ${action}: ` + err.message);
    })
    .then((data) => XMLParser.parse(data))
    .then((data) => {
      const responseWrapper = data.querySelector(`M_Get${action}Response`);
      const responseData = XMLParser.getVal(
        responseWrapper,
        `M_Get${action}Result`
      );
      const hasError = !responseData || responseData === "false";
      if (hasError) {
        const errorMessage = XMLParser.getVal(responseWrapper, "StrErr");
        if (errorMessage) {
          throw new Error("Internal Error API Ecodat: " + errorMessage);
        }
        // empty result
        return null;
      }
      return responseWrapper;
    });
}
