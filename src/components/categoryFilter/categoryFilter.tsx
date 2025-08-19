"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import kebabCase from "lodash/kebabCase";

import useScrollCenter from "./useScrollCenter";

interface Category {
  name: string;
  count: number;
}

interface CategoryFilterProps {
  categoryList: Category[];
}

const ALL_CATEGORY_NAME = "All";
const ACTIVE = "active";

const createCategorySlug = (categoryName: string): string => {
  if (categoryName === "Web3") {
    return "Web3";
  }

  return kebabCase(categoryName);
};

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryList }) => {
  const categoryRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  // Update current path when pathname changes
  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useScrollCenter({ ref: categoryRef, targetId: ACTIVE });

  const sortedCategoryList = useMemo(
    () => [...categoryList].sort((a, b) => b.count - a.count),
    [categoryList]
  );

  const isCurrentPath = (path: string) => {
    // Normalize paths for comparison
    const normalizedPathname = pathname.endsWith("/")
      ? pathname
      : pathname + "/";
    const normalizedPath = path.endsWith("/") ? path : path + "/";

    if (path === "/") {
      return pathname === "/" || pathname === "";
    }

    // For category paths, check if current path starts with the category path
    return normalizedPathname === normalizedPath || currentPath === path;
  };

  return (
    <nav
      aria-label="Category Filter"
      className="flex items-center bg-color-card mb-12 px-sizing-md py-3 rounded-border-radius-base"
    >
      <div className="flex-shrink-0 text-text-base font-font-weight-semi-bold mr-sizing-lg hidden sm:block">
        Category
      </div>

      {/* All Category Link with Active State */}
      <Link
        href="/"
        className={`cursor-pointer block py-2 px-5 rounded-border-radius-base text-sm font-font-weight-semi-bold focus:outline-none transition-colors duration-200 ${
          isCurrentPath("/")
            ? "text-color-white bg-color-blue hover:bg-blue-700"
            : "bg-color-category-button hover:text-color-white hover:bg-[#3b82f6] focus:text-color-white focus:bg-color-blue"
        }`}
        {...(isCurrentPath("/") && { id: ACTIVE, tabIndex: -1 })}
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
          const categoryPath = `/category/${createCategorySlug(name)}/`;
          const isActive = isCurrentPath(categoryPath);

          return (
            <li key={name} className="ml-1.5 first:ml-0">
              <Link
                href={categoryPath}
                className={`cursor-pointer block py-2 px-5 rounded-border-radius-base text-sm font-font-weight-semi-bold focus:outline-none transition-colors duration-200 whitespace-nowrap ${
                  isActive
                    ? "text-color-white bg-color-blue hover:bg-blue-700"
                    : "bg-color-category-button hover:text-color-white hover:bg-color-blue focus:text-color-white focus:bg-color-blue"
                }`}
                {...(isActive && { id: ACTIVE, tabIndex: -1 })}
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
