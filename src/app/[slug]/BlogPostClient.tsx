"use client";

import React, { useState, useEffect } from "react";
import type Post from "Types/Post";
import Comment from "Components/comment";
import Mdx from "@/lib/mdx";

interface BlogPostClientProps {
  post: Post;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-w-80 min-h-screen bg-color-background">
      <div className="">
        <div className="max-w-3xl mx-auto pb-12 px-4 md:w-[87.5%]">
          <article className="animate-fade-in-up">
            <header className="mb-16">
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full border border-blue-200">
                  {post.category}
                </span>
                <time
                  dateTime={post.date}
                  className="block mt-4 text-color-text-3 text-sm font-medium"
                >
                  {post.date}
                </time>
              </div>
              <h1 className="font-extrabold leading-tight text-3xl text-color-text-2 lg:text-4xl lg:leading-tight md:text-2xl md:leading-tight mb-4">
                {post.title}
              </h1>
              <p className="leading-relaxed text-lg text-color-text-2 md:leading-relaxed md:text-lg max-w-3xl">
                {post.desc}
              </p>
            </header>

            <div className="w-full h-px bg-linear-to-r from-transparent via-gray-300 to-transparent my-8" />

            <Mdx
              content={post.content || ""}
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800"
            />
          </article>

          {/* Only render comments after component is mounted */}
          {mounted && (
            <div className="mt-16 pt-12 border-t border-gray-300">
              <h2 className="text-2xl font-semibold text-color-text mb-6">
                Comments
              </h2>
              <Comment />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BlogPostClient;
