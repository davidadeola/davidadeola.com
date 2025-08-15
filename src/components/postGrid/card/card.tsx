"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";

interface CardProps {
  thumbnail?: string;
  alt?: string;
  category: string;
  title: string;
  desc: string;
  date: string;
}

const Card: React.FC<CardProps> = ({
  thumbnail,
  alt,
  category,
  title,
  desc,
  date,
}) => {
  return (
    <article className="relative flex flex-col overflow-hidden h-full rounded-border-radius-base bg-color-card transform translate-z-0">
      <div className="relative w-full h-48 overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={alt || title}
            width={400}
            height={200}
            className="w-full h-full object-cover transition-opacity duration-1000 ease-out transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
            }}
          />
        ) : (
          <div className="w-full h-full bg-color-gray-2 flex items-center justify-center text-color-text-3">
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
      <div className="flex flex-col flex-1 justify-between p-sizing-md">
        <div>
          <span className="block text-sm font-font-weight-semi-bold text-color-text-3">
            {category}
          </span>
          <h3 className="mt-sizing-xs text-text-lg font-font-weight-bold leading-tight text-color-text md:text-xl sm:text-text-md">
            {title}
          </h3>
          <p className="leading-relaxed mt-2 pb-sizing-sm text-color-text-2 line-clamp-2 break-words overflow-hidden">
            {desc}
          </p>
        </div>
        <time
          dateTime={date}
          className="mt-3 text-sm font-font-weight-regular text-color-text-3"
        >
          {format(new Date(date), "MMM dd, yyyy")}
        </time>
      </div>
    </article>
  );
};

export default Card;
