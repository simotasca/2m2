"use client";

import { EcodatArticle } from "@/lib/shared/ecodat";
import { useCallback, useMemo, useState } from "react";
import useInterval from "./useInterval";

interface Options {
  timeout?: number;
  rows?: number;
  query?: any;
  active?: boolean;
}

export default function useSearch(
  value: string,
  options?: Options
): [EcodatArticle[], boolean] {
  const rows = options?.rows || 10;
  const timeout = options?.timeout || 500;
  const query = options?.query || {};
  const active = options?.active === undefined ? true : options.active;

  const [lastSearch, setLastSearch] = useState("");
  const [lastQuery, setLastQuery] = useState(query);
  const [searchResult, setSearchResult] = useState<EcodatArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProds = useCallback(
    (filters: any) =>
      fetch("/api/ecodat/products", {
        method: "POST",
        body: JSON.stringify({
          ...filters,
          fetchRow: {
            lastRow: 0,
            nRows: rows,
          },
          ...query,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error("Error fetching products:", err.message);
          return [];
        })
        .then((data) => data as EcodatArticle[]),
    []
  );

  useInterval(() => {
    if (!active) return;

    if (!value) {
      setSearchResult([]);
      setLastQuery({});
      setLastSearch("");
      return;
    }

    if (isLoading) return;
    if (
      lastSearch === value &&
      JSON.stringify(lastQuery) === JSON.stringify(query)
    )
      return;

    setLastSearch(value);
    setLastQuery(query);

    setIsLoading(true);

    (async () => {
      const [byOeCode, byDescription] = await Promise.all([
        fetchProds({ oeCode: value }),
        fetchProds({ description: value }),
      ]);
      const results = byOeCode.concat(byDescription);
      setSearchResult(results);
      setIsLoading(false);
    })();
  }, timeout);

  return [searchResult, isLoading];
}
