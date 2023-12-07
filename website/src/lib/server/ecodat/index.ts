import { chechEnvVariable } from "@/lib/shared/env";
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
  SEND_ORDER = "InviaOrdine",
}

chechEnvVariable("ECODAT_API_URL");

export async function fetchEcodat(
  action: EcodatAction,
  xml?: string,
  prefix = "Get"
) {
  return await fetch(process.env.ECODAT_API_URL!, {
    method: "POST",
    body: ecodatBodyTemplate(action, xml, prefix),
    headers: ecodatHeaders(action, prefix),
  })
    .then((res) => res.text())
    .catch((err) => {
      throw new Error(`Error calling ecodat api ${action}: ` + err.message);
    })
    .then((data) => XMLParser.parse(data).documentElement)
    .then((data) => {
      const responseWrapper = data.querySelector(
        `M_${prefix}${action}Response`
      );
      const responseData = XMLParser.getVal(
        responseWrapper,
        `M_${prefix}${action}Result`
      );
      const hasError = !responseData || responseData === "false";
      if (hasError) {
        const errorMessage =
          XMLParser.getVal(responseWrapper, "StrErr") ||
          XMLParser.getVal(responseWrapper, "StrErrore");
        if (errorMessage) {
          throw new Error("Internal Error API Ecodat: " + errorMessage);
        }
        // empty result
        return null;
      }
      return responseWrapper;
    });
}
