import { encodeQueryParam } from "./search";

const routes = {
  home: () => "/",
  about: () => "/about",
  brand: (name: string) => `/brand/` + encodeQueryParam(name.toLowerCase()),
  category: (name: string) =>
    `/category/${encodeQueryParam(name.toLowerCase())}`,
} as const;

export default routes;
