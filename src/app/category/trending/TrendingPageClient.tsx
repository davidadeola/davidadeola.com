"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import type Post from "Types/Post";
import SearchFilterPanel from "@/components/SearchFilterPanel";

interface TrendingClientProps {
  posts: Post[];
}

const TrendingClient: React.FC<TrendingClientProps> = ({ posts }) => {
  return (
    <main className="">
      <SearchFilterPanel />

      <PostGrid posts={posts} />
    </main>
  );
};

export default TrendingClient;
