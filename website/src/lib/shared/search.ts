// should all be integers
export const allowedParams = ["brandId", "modelId", "categoryId", "typeId"];

export function encodeQueryParam(val: string) {
  return encodeURIComponent(val.split(" ").join("-"));
}

export function decodeQueryParam(val: string) {
  return decodeURIComponent(val).split("-").join(" ");
}
