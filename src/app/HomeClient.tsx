"use client";

import React from "react";
import PostGrid from "Components/postGrid";
import CategoryFilter from "Components/categoryFilter";
import type Post from "Types/Post";

interface HomeClientProps {
  posts: Post[];
  categories: { name: string; count: number }[];
  postTitle: string;
}

const HomeClient: React.FC<HomeClientProps> = ({
  posts,
  categories,
  postTitle,
}) => {
  return (
    <main className="min-w-min-width min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] bg-color-background">
      <div className="box-content w-[87.5%] max-w-width pt-sizing-lg pb-sizing-lg mx-auto md:pt-grid-gap-lg">
        <CategoryFilter categoryList={categories} />
        <h2 className="text-text-xl font-font-weight-extra-bold mb-sizing-md leading-tight text-color-text md:text-text-lg">
          {postTitle}
        </h2>
        <PostGrid posts={posts} />
      </div>
    </main>
  );
};

export default HomeClient;
