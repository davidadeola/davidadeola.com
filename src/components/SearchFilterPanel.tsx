import React from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./categoryFilter";

const SearchFilterPanel = () => {
  return (
    <div className="my-8 mx-auto px-[120px] w-full flex items-center gap-4">
      <SearchBar />
      <CategoryFilter />
    </div>
  );
};

export default SearchFilterPanel;
