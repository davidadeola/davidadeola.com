"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import CategoryFilter from "Components/categoryFilter";
import Post from "Types/Post";

interface CategoryPageClientProps {
  allCategories: Array<{ name: string; count: number }>;
  filteredPosts: Post[];
  postTitle: string;
}

const CategoryPageClient = ({
  allCategories,
  filteredPosts,
  postTitle,
}: CategoryPageClientProps) => {
  return (
    <main className="min-w-min-width min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] bg-color-background">
      <div className="box-content w-[87.5%] max-w-width pt-sizing-lg pb-sizing-lg mx-auto md:pt-grid-gap-lg">
        <CategoryFilter categoryList={allCategories} />
        <h2 className="text-text-xl font-font-weight-extra-bold mb-sizing-md leading-tight text-color-text md:text-2xl">
          {postTitle}
        </h2>
        <PostGrid posts={filteredPosts} />
      </div>
    </main>
  );
};

export default CategoryPageClient;
