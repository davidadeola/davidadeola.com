"use client";

import React from "react";
import PostGrid from "./postGrid";
import { usePosts } from "@/hooks/usePosts";

const Recommendations = () => {
  const { posts } = usePosts();

  function getRandomPosts<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  const recommendations = getRandomPosts(posts, 3);

  return (
    <div className="">
      <PostGrid posts={recommendations} />
    </div>
  );
};

export default Recommendations;
