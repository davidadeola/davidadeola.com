"use client";

import React, { useRef, useMemo } from "react";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";

interface Category {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categoryList: Category[];
}

const ALL_CATEGORY_NAME = "All";

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryList }) => {
  const categoryRef = useRef<HTMLUListElement>(null);

  const sortedCategoryList = useMemo(
    () => [...categoryList].sort((a, b) => b.count - a.count),
    [categoryList]
  );

  return (
    <nav
      aria-label="Category Filter"
      className="flex items-center bg-color-card mb-12 px-sizing-md py-3 rounded-border-radius-base"
    >
      <em className="flex-shrink-0 text-text-base font-font-weight-semi-bold mr-sizing-lg md:visually-hidden">
        Category
      </em>
      <Link
        href="/"
        className="cursor-pointer block bg-color-category-button px-sizing-sm py-sizing-sm rounded-border-radius-base text-sm font-font-weight-semi-bold hover:text-color-white hover:bg-[#3b82f6] focus:text-color-white focus:bg-color-blue focus:outline-none"
      >
        {ALL_CATEGORY_NAME}
      </Link>
      <div className="w-px h-8 mx-sizing-sm bg-color-divider transform -translate-x-1/2" />
      <ul
        ref={categoryRef}
        className="flex list-none overflow-x-auto invisible-scrollbar"
      >
        {sortedCategoryList.map((category) => {
          const { name } = category;
          const href = `/category/${kebabCase(name)}/`;
          return (
            <li key={name} className="ml-1.5 first:ml-0">
              <Link
                href={href}
                className="cursor-pointer block bg-color-category-button px-sizing-sm py-sizing-sm rounded-border-radius-base text-sm font-font-weight-semi-bold hover:text-color-white hover:bg-color-blue focus:text-color-white focus:bg-color-blue focus:outline-none"
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default CategoryFilter;
