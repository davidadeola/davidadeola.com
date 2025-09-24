"use client";

import React from "react";
import PostGrid from "@/components/post-grid";
import type Post from "Types/Post";
interface TrendingClientProps {
  posts: Post[];
}

const TrendingClient: React.FC<TrendingClientProps> = ({ posts }) => {
  return (
    <main className="">
      <PostGrid posts={posts} />
    </main>
  );
};

export default TrendingClient;
