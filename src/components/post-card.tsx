"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface CardProps {
  idx?: number;
  thumbnail?: string;
  alt?: string;
  category: string;
  title: string;
  desc: string;
  date: string;
}

interface PostData {
  thumbnail?: string;
  alt?: string;
  category: string;
  title: string;
  desc: string;
  date: string;
}

const renderPost = (
  { thumbnail, alt, category, title, desc, date }: PostData,
  idx: number
) => {
  switch (idx) {
    case 0:
      return (
        <article className="relative p-2 hover:border-[#353535]/30  border hover:dark:border-[#353535] lg:border-transparent flex flex-col lg:flex-row gap-8 overflow-hidden h-full rounded-border-radius-base bg-color-card transform translate-z-0">
          <div className="relative w-full h-48 lg:h-[430px] overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={alt || title}
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[12px] md:text-base uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1">
              {category}
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xl md:text-2xl font-bold text-[#2A2A2A] dark:text-white">
                {title}
              </h3>
              <p className="text-sm md:text-base font-normal text-[#2A2A2A] dark:text-white">
                {desc}
              </p>

              <div className="flex items-center gap-2">
                <time
                  dateTime={date}
                  className="text-sm text-[#979797] font-normal"
                >
                  {format(new Date(date), "MMM dd, yyyy")}
                </time>
                <span className="bg-[#979797] rounded-full w-1 h-1"></span>{" "}
                <p className="text-sm text-[#979797] font-normal">4 min read</p>
              </div>
            </div>
          </div>
        </article>
      );
    case 1 || 2:
      return (
        <article className="relative p-2 hover:border-[#353535]/30  border hover:dark:border-[#353535] lg:border-transparent flex flex-col gap-5 overflow-hidden h-full rounded-border-radius-base bg-color-card transform translate-z-0">
          <div className="relative w-full h-48 md:h-[320px] overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={alt || title}
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-color-gray-3 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[12px] md:text-base uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1.5">
            {category}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-[#2A2A2A] dark:text-white">
              {title}
            </h3>
            <p className="text-base font-normal text-[#2A2A2A] dark:text-white">
              {desc}
            </p>

            <div className="flex items-center gap-2">
              <time
                dateTime={date}
                className="text-sm text-[#979797] font-normal"
              >
                {format(new Date(date), "MMM dd, yyyy")}
              </time>
              <span className="bg-[#979797] rounded-full w-1 h-1"></span>{" "}
              <p className="text-sm text-[#979797] font-normal">4 min read</p>
            </div>
          </div>
        </article>
      );
    default:
      return (
        <article className="relative p-2 hover:border-[#353535]/30  border hover:dark:border-[#353535] lg:border-transparent flex flex-col gap-5 overflow-hidden h-full rounded-border-radius-base bg-color-card transform translate-z-0">
          <div className="relative w-full h-48 overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={alt || title}
                width={400}
                height={200}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-color-gray-3 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">No Image</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[12px] md:text-base  uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1.5">
            {category}
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-[#2A2A2A] dark:text-white">
              {title}
            </h3>
            <p className="text-base font-normal text-[#2A2A2A] dark:text-white">
              {desc}
            </p>

            <div className="flex items-center gap-2">
              <time
                dateTime={date}
                className="text-sm text-[#979797] font-normal"
              >
                {format(new Date(date), "MMM dd, yyyy")}
              </time>
              <span className="bg-[#979797] rounded-full w-1 h-1"></span>{" "}
              <p className="text-sm text-[#979797] font-normal">4 min read</p>
            </div>
          </div>
        </article>
      );
  }
};

const PostCard: React.FC<CardProps> = ({
  idx,
  thumbnail,
  alt,
  category,
  title,
  desc,
  date,
}) => {
  if (typeof idx === "number") {
    return renderPost({ thumbnail, alt, category, title, desc, date }, idx);
  } else {
    return (
      <article className="relative p-2 hover:border-[#353535]/30  border hover:dark:border-[#353535] lg:border-transparent flex flex-col gap-5 overflow-hidden h-full rounded-border-radius-base bg-color-card transform translate-z-0">
        <div className="relative w-full h-48 overflow-hidden">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={alt || title}
              width={400}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 mx-auto mb-2 bg-color-gray-3 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">No Image</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-[12px] md:text-base uppercase border border-[#353535]/30 dark:border-[#353535] text-[#3D3D3D] dark:text-white w-max px-4 py-1.5">
          {category}
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-bold text-[#2A2A2A] dark:text-white">
            {title}
          </h3>
          <p className="text-base font-normal text-[#2A2A2A] dark:text-white">
            {desc}
          </p>

          <div className="flex items-center gap-2">
            <time
              dateTime={date}
              className="text-sm text-[#979797] font-normal"
            >
              {format(new Date(date), "MMM dd, yyyy")}
            </time>
            <span className="bg-[#979797] rounded-full w-1 h-1"></span>{" "}
            <p className="text-sm text-[#979797] font-normal">4 min read</p>
          </div>
        </div>
      </article>
    );
  }
};

export default PostCard;
