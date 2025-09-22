import { Search } from "lucide-react";
import React from "react";

const SearchBar = () => {
  return (
    <div className="border dark:border-[#353535] h-[48px] px-3 w-[430px] flex items-center gap-3">
      <Search strokeWidth={2} size={20} className="h-[80%]" />

      <input
        type="text"
        className="outline-0 flex-1 h-[80%]"
        placeholder="SEARCH FOR ARTICLES..."
      />
    </div>
  );
};

export default SearchBar;
