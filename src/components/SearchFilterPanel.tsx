import React from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./categoryFilter";

const SearchFilterPanel = () => {
  return (
    <div className="mx-auto my-0 md:my-8 px-4 md:px-[120px] w-full flex flex-col md:flex-row items-center gap-4">
      <SearchBar />

      <div className="flex-1">
        <CategoryFilter />
      </div>
    </div>
  );
};

export default SearchFilterPanel;
