"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import type Post from "Types/Post";
import { useSearch } from "@/hooks/useSearch";
import { useSearchQuery } from "@/hooks/useSearchQuery";

interface HomeClientProps {
  posts: Post[];
}

const HomeClient: React.FC<HomeClientProps> = ({ posts }) => {
  const { query } = useSearchQuery();
  const { results, loading } = useSearch(query);

  return (
    <main className="">
      <PostGrid posts={results.length ? results : posts} />
    </main>
  );
};

export default HomeClient;
