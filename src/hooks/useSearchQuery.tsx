// hooks/useSearchQuery.ts
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  query: string;
  setQuery: (val: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");

  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchQuery() {
  const ctx = useContext(SearchContext);
  if (!ctx) {
    throw new Error("useSearchQuery must be used inside <SearchProvider>");
  }
  return ctx;
}
