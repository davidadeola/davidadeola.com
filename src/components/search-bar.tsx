"use client";

import { useSearchQuery } from "@/hooks/useSearchQuery";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

const SearchBar = () => {
  const { query, setQuery } = useSearchQuery();
  const pathname = usePathname();

  // Allowed routes
  const shouldRender = pathname === "/" || pathname.startsWith("/category");

  if (!shouldRender) return null;

  return (
    <div className="mt-8 lg:mt-0 border border-[#353535]/30 dark:border-[#353535] h-[48px] px-3 w-full max-w-[430px] flex items-center gap-3">
      <Search strokeWidth={2} size={20} className="h-[80%]" />

      <input
        type="text"
        className="outline-0 flex-1 h-[80%]"
        placeholder="SEARCH FOR ARTICLES..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
