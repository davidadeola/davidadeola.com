/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import type Post from "Types/Post";
import Mdx from "@/lib/mdx";
import { format } from "date-fns";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { heart_filled, user_icon } from "@/assets/icons";
import Recommendations from "@/components/recommendations";
import Newsletter from "@/components/newsletters";
import CommentSection from "@/components/comment-section";
import { useLikes } from "@/hooks/useLikes";
interface BlogPostClientProps {
  post: Post;
}

const BlogPostClient: React.FC<BlogPostClientProps> = ({ post }) => {
  const [mounted, setMounted] = useState(false);

  const { likes, isLiked, toggleLike } = useLikes(post.id);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log(post, "post");

  return (
    <main className="min-h-screen">
      <div className="mx-auto flex flex-col gap-12 nmd:gap-30 pb-12">
        <article className="animate-fade-in-up">
          <header className="flex flex-col gap-4 lg:gap-6">
            <div className="text-[12px] lg:text-base uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1 lg:py-1.5">
              {post.category}
            </div>

            <h1 className="font-bold text-2xl lg:text-3xl mb-4">
              {post.title}
            </h1>

            <div className="flex gap-3 items-center">
              <Image
                src={"/images/Dave.jpg"}
                alt=""
                height={56}
                width={56}
                className="object-cover rounded-full border-2 dark:border-white/50 border-white h-[66px] w-[66px]"
              />

              <div className="flex flex-col gap-1 lg:gap-2 justify-between">
                <p className="text-base font-semibold dark:text-white text-[#2A2A2A]">
                  David Adeola
                </p>

                <div className="flex items-center gap-2">
                  <time
                    dateTime={post.date}
                    className="text-sm text-[#979797] font-normal"
                  >
                    {format(new Date(post.date), "MMM dd, yyyy")}
                  </time>
                  <span className="bg-[#979797] rounded-full w-1 h-1"></span>{" "}
                  <p className="text-sm text-[#979797] font-normal">
                    4 min read
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div>
            {post.thumbnail && (
              <div className="h-[195px] lg:h-[675px] mt-10 relative w-full">
                <Image
                  src={post.thumbnail}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="flex justify-end my-4">
              <button
                onClick={toggleLike}
                className="text-sm lg:text-base flex items-center gap-2 uppercase border cursor-pointer hover:bg-[#974BFA] hover:text-white transition-colors ease-in-out border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1.5 lg:py-3.5"
              >
                {isLiked ? (
                  <Image
                    src={heart_filled}
                    width={20}
                    height={20}
                    alt="liked"
                  />
                ) : (
                  <Heart size={20} strokeWidth={1.5} />
                )}
                {likes} likes
              </button>

              <Link
                href={"#comment"}
                className="text-sm lg:text-base flex items-center gap-2 border-l-0 cursor-pointer hover:bg-[#974BFA] hover:text-white  transition-colors ease-in-out uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1.5 lg:py-3.5"
              >
                <MessageCircle size={20} strokeWidth={1.5} />
                Comment
              </Link>
            </div>
          </div>

          <div className="relative">
            <Mdx
              content={post.content || ""}
              className="prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 hover:prose-a:text-blue-800"
            />

            <div className="absolute hidden lg:block top-[280px] right-0 z-40">
              <Link
                href="#subscribe"
                className="inline-flex items-center gap-2 uppercase bg-[#974BFA] text-white px-4 py-3.5 shadow-2xl"
              >
                <Image
                  src={user_icon}
                  width={24}
                  height={24}
                  alt="subscribe link"
                />
                Subscribe
              </Link>
            </div>
          </div>
        </article>

        {/* Only render comments after component is mounted */}
        {mounted && (
          <div id="comment" className="flex flex-col gap-8">
            <h2 className="text-2xl lg:text-3xl text-center font-bold">
              Add Comment
            </h2>

            <CommentSection postId={post.id} />
          </div>
        )}

        {/* other recommendations */}
        <Recommendations />

        {/* subscribe to ewsletter */}
        <Newsletter />
      </div>
    </main>
  );
};

export default BlogPostClient;
