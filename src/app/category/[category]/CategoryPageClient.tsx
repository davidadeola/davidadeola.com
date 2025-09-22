"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import Post from "Types/Post";
import SearchFilterPanel from "@/components/SearchFilterPanel";

interface CategoryPageClientProps {
  filteredPosts: Post[];
}

const CategoryPageClient = ({ filteredPosts }: CategoryPageClientProps) => {
  return (
    <main className="">
      <SearchFilterPanel />

      <PostGrid posts={filteredPosts} />
    </main>
  );
};

export default CategoryPageClient;
