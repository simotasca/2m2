export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export function getCurrentPage(searchParams?: SearchParams) {
  if (!searchParams) return 1;
  let pageQueryParam = searchParams["page"];
  if (pageQueryParam && typeof pageQueryParam !== "string") {
    pageQueryParam = pageQueryParam[0];
  }
  let currentPage = parseInt(pageQueryParam!) || 1;
  if (currentPage < 1) currentPage = 1;
  return currentPage;
}
