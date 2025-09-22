"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import type Post from "Types/Post";

interface HomeClientProps {
  posts: Post[];
}

const HomeClient: React.FC<HomeClientProps> = ({ posts }) => {
  return (
    <main className="">
      <PostGrid posts={posts} />
    </main>
  );
};

export default HomeClient;
