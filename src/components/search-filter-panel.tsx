import React from "react";
import SearchBar from "./search-bar";
import CategoryFilter from "./categoryFilter";

const SearchFilterPanel = () => {
  return (
    <div className="mx-auto max-w-[1500px] my-0 lg:my-8 px-4 lg:px-[120px] w-full flex flex-col lg:flex-row gap-4">
      <SearchBar />

      <CategoryFilter />
    </div>
  );
};

export default SearchFilterPanel;
