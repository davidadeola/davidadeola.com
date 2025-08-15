"use client";

import React from "react";
import type Post from "Types/Post";
import Comment from "Components/comment";

interface BlogPostClientProps {
  post: Post;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  return (
    <main className="min-w-min-width min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] bg-color-background">
      <div className="mt-sizing-xl md:mt-sizing-lg">
        <div className="w-post-width mx-auto pb-sizing-lg md:w-[87.5%]">
          <article className="animate-fade-in">
            <header className="mb-sizing-xl">
              <div className="mb-sizing-md">
                <span className="inline-flex items-center px-3 py-1 text-sm font-font-weight-semi-bold text-color-blue bg-color-blue/10 rounded-full border border-color-blue/20">
                  {post.category}
                </span>
                <time
                  dateTime={post.date}
                  className="block mt-sizing-sm text-color-text-3 text-text-sm font-medium"
                >
                  {post.date}
                </time>
              </div>
              <h1 className="font-font-weight-extra-bold leading-tight text-text-3xl text-color-text lg:text-4xl lg:leading-tight md:text-2xl md:leading-tight mb-sizing-md">
                {post.title}
              </h1>
              <p className="leading-relaxed text-text-lg text-color-text-2 md:leading-relaxed md:text-lg max-w-3xl">
                {post.desc}
              </p>
            </header>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-color-gray-3 to-transparent my-sizing-xl" />
            <div className="prose prose-lg max-w-none">
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </div>
          </article>
          <div className="mt-sizing-xl pt-sizing-lg border-t border-color-gray-3">
            <Comment />
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPostClient;
