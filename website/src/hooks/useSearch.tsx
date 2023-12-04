"use client";

import { EcodatArticle } from "@/lib/shared/ecodat";
import { useState } from "react";
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
  const timeout = options?.timeout || 500;
  const rows = options?.rows || 10;
  const query = options?.query || {};
  const active = options?.active === undefined ? true : options.active;

  const [lastSearch, setLastSearch] = useState("");
  const [lastQuery, setLastQuery] = useState(query);
  const [searchResult, setSearchResult] = useState<EcodatArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

    console.log("SEARCHIN", value, query);

    setLastSearch(value);
    setLastQuery(query);

    setIsLoading(true);

    fetch("/api/ecodat/products", {
      method: "POST",
      body: JSON.stringify({
        description: value,
        fetchRow: {
          lastRow: 0,
          nRows: rows,
        },
        ...query,
      }),
    })
      .then((res) => res.json())
      .then((data: EcodatArticle[]) => {
        setSearchResult(data);
        setIsLoading(false);
      });
  }, timeout);

  return [searchResult, isLoading];
}
