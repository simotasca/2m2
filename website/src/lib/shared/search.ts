import { GenericSearchParams } from "../server/search";

export const RESULTS_PER_PAGE = 20 as const;

export function encodeQueryParam(val: string) {
  return encodeURIComponent(val.split(" ").join("-"));
}

export function decodeQueryParam(val: string) {
  return decodeURIComponent(val).split("-").join(" ");
}

/** should all be integers */
export const allowedParams = [
  "brandId",
  "modelId",
  "categoryId",
  "typeId",
  "itemId",
] as const;

export type SearchParams = {
  [K in (typeof allowedParams)[number]]?: number;
} & {
  description?: string;
};

export function searchQueryString(filters?: SearchParams): string {
  if (!filters) return "";
  const keys = Object.keys(filters).filter((k) => !!filters[k]);
  if (keys.length === 0) return "";
  return (
    "?" +
    keys.map((k) => `${k}=${encodeQueryParam(String(filters[k]))}`).join("&")
  );
}

export function parseSearchParams(params: GenericSearchParams): SearchParams {
  let filters: SearchParams = {};

  for (const allowed of allowedParams) {
    if (allowed in params && params[allowed] !== undefined) {
      const toInt = parseInt(params[allowed]!);
      if (!Number.isNaN(toInt)) {
        filters[allowed] = toInt;
      }
    }
  }

  if (params.description) {
    filters.description = decodeQueryParam(params.description);
  }

  return filters;
}
