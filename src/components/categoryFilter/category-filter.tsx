"use client";

import React, { useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import kebabCase from "lodash/kebabCase";

import useScrollCenter from "./useScrollCenter";
import { useCategories } from "@/hooks/useCategories";

const ACTIVE = "active";

const createCategorySlug = (categoryName: string): string => {
  if (categoryName === "Web3") {
    return "Web3";
  }

  return kebabCase(categoryName);
};

const CategoryFilter: React.FC = () => {
  const categoryRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  // Allowed routes
  const shouldRender = pathname === "/" || pathname.startsWith("/category");

  const { categories, loading } = useCategories();
  // console.log(loading); // TODO: do something with this or about this...

  useScrollCenter({ ref: categoryRef, targetId: ACTIVE });

  const sortedCategoryList = useMemo(
    () => [...categories].sort((a, b) => b.count - a.count),
    [categories]
  );

  if (!shouldRender) return null;

  return (
    <nav
      aria-label="Category Filter"
      className="flex mb-8 md:mb-0 w-full h-[32px] md:h-[48px]"
    >
      <ul className="flex items-center gap-3 list-none overflow-x-auto invisible-scrollbar">
        {/* All Articles and Trending Articles*/}
        <FilterCTA label="ALL ARTICLES" path="/" pathname={pathname} />
        <FilterCTA
          label="TRENDING"
          path="/category/trending"
          pathname={pathname}
        />

        {/* Categories */}
        {sortedCategoryList.map((category) => {
          const { name } = category;
          const categoryPath = `/category/${createCategorySlug(name)}/`;

          return (
            <FilterCTA
              key={name}
              label={name}
              path={categoryPath}
              pathname={pathname}
            />
          );
        })}
      </ul>
    </nav>
  );
};

const FilterCTA = ({
  label,
  path,
  pathname,
}: {
  label: string;
  path: string;
  pathname: string;
}) => {
  // Normalize paths (handle trailing slashes)
  const normalizedPath = path.endsWith("/") ? path : path + "/";
  const normalizedCurrent = pathname.endsWith("/") ? pathname : pathname + "/";

  const isActive =
    normalizedCurrent === normalizedPath ||
    (path === "/" && (pathname === "/" || pathname === ""));

  return (
    <Link
      href={path}
      className={`cursor-pointer text-nowrap px-4 h-full flex items-center border border-[#353535]/30 dark:border-[#353535] text-base font-normal transition-colors duration-200 
        ${
          isActive
            ? "bg-[#974BFA] text-white"
            : "dark:text-white text-[#3D3D3D] hover:bg-[#974BFA] hover:text-white"
        }`}
      {...(isActive && { id: ACTIVE, tabIndex: -1 })}
    >
      {label.toUpperCase()}
    </Link>
  );
};

export default CategoryFilter;
