import React, { useRef, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import kebabCase from "lodash/kebabCase"

import useScrollCenter from "./useScrollCenter"

const ACTIVE = "active"
const ALL_CATEGORY_NAME = "All"

interface CategoryFilterProps {
  categoryList: readonly {
    fieldValue: string
    totalCount: number
  }[]
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categoryList }) => {
  const categoryRef = useRef<HTMLUListElement>(null)
  const router = useRouter()

  useScrollCenter({ ref: categoryRef, targetId: ACTIVE })

  const sortedCategoryList = useMemo(
    () => [...categoryList].sort((a, b) => b.totalCount - a.totalCount),
    [categoryList]
  )

  const isCurrentPath = (path: string) => router.asPath === path

  return (
    <nav 
      className="flex items-center bg-white dark:bg-gray-800 mb-12 p-3 md:px-6 rounded-lg shadow-sm"
      aria-label="Category Filter"
    >
      {/* Category Title */}
      <em className="static w-auto h-auto clip-auto whitespace-normal flex-shrink-0 text-base font-semibold not-italic mr-8 sm:absolute sm:w-px sm:h-px sm:overflow-hidden sm:clip-[rect(1px,1px,1px,1px)] sm:whitespace-nowrap">
        Category
      </em>

      {/* All Categories Button */}
      <Link href="/" passHref>
        <a
          className={`cursor-pointer block px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none ${
            isCurrentPath("/")
              ? "text-white bg-blue-600"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-blue-600 focus-visible:text-white focus-visible:bg-blue-600"
          }`}
          {...(isCurrentPath("/") && { id: ACTIVE, tabIndex: -1 })}
        >
          {ALL_CATEGORY_NAME}
        </a>
      </Link>

      {/* Divider */}
      <div className="w-px h-8 mx-2 -translate-x-1/2 bg-gray-300 dark:bg-gray-600" />

      {/* Category List */}
      <ul
        ref={categoryRef}
        className="flex list-none overflow-x-auto scrollbar-hide space-x-1.5"
      >
        {sortedCategoryList.map(category => {
          const { fieldValue } = category
          const categoryPath = `/category/${kebabCase(fieldValue!)}/`
          
          return (
            <li key={fieldValue}>
              <Link href={categoryPath} passHref>
                <a
                  className={`cursor-pointer block px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none whitespace-nowrap ${
                    isCurrentPath(categoryPath)
                      ? "text-white bg-blue-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-white hover:bg-blue-600 focus-visible:text-white focus-visible:bg-blue-600"
                  }`}
                  {...(isCurrentPath(categoryPath) && { id: ACTIVE, tabIndex: -1 })}
                >
                  {fieldValue}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default CategoryFilter