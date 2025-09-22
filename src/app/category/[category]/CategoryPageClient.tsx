"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import Post from "Types/Post";
interface CategoryPageClientProps {
  filteredPosts: Post[];
}

const CategoryPageClient = ({ filteredPosts }: CategoryPageClientProps) => {
  return (
    <main className="">
      <PostGrid posts={filteredPosts} />
    </main>
  );
};

export default CategoryPageClient;
