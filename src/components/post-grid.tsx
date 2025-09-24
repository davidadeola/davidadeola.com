"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type Post from "Types/Post";
import { usePathname } from "next/navigation";
import PostCard from "./post-card";

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const scrollEdgeRef = useRef<HTMLDivElement>(null);
  const [currentList, setCurrentList] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const maxPostNum = 10;

  const pathname = usePathname();

  const isSpecial = pathname === "/" || pathname === "/category/trending";

  useEffect(() => {
    if (!posts.length) return;
    setHasMore(posts.length > maxPostNum);
    setCurrentList([...posts.slice(0, maxPostNum)]);
  }, [posts, maxPostNum]);

  useEffect(() => {
    const loadEdges = () => {
      const currentLength = currentList.length;
      const more = currentLength < posts.length;
      const nextEdges = more
        ? posts.slice(currentLength, currentLength + maxPostNum)
        : [];
      setHasMore(more);
      setCurrentList([...currentList, ...nextEdges]);
    };

    const scrollEdgeElem = scrollEdgeRef.current;
    if (!scrollEdgeElem || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadEdges();
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px",
        threshold: [0],
      }
    );

    observer.observe(scrollEdgeElem);

    return () => observer.disconnect();
  }, [currentList, hasMore, posts, maxPostNum]);

  return (
    <>
      {isSpecial ? (
        <ul role="list" className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {currentList.map((data, idx) => {
            const { id, slug, title, desc, date, category, thumbnail, alt } =
              data;
            const ariaLabel = `${title} - ${category} - Posted on ${date}`;

            let colSpan = "col-span-2";
            if (idx === 0) colSpan = "md:col-span-6";
            if (idx === 1 || idx === 2) colSpan = "md:col-span-3";

            return (
              <li key={id} role="listitem" className={`${colSpan}`}>
                <Link
                  href={slug}
                  aria-label={ariaLabel}
                  className="block h-full group"
                >
                  <PostCard
                    idx={idx}
                    thumbnail={thumbnail}
                    alt={alt}
                    category={category}
                    title={title}
                    desc={desc}
                    date={date}
                  />
                </Link>
              </li>
            );
          })}
          <div ref={scrollEdgeRef} />
        </ul>
      ) : (
        <ul role="list" className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentList.map((data) => {
            const { id, slug, title, desc, date, category, thumbnail, alt } =
              data;
            const ariaLabel = `${title} - ${category} - Posted on ${date}`;

            return (
              <li key={id} role="listitem" className={``}>
                <Link
                  href={slug}
                  aria-label={ariaLabel}
                  className="block h-full group"
                >
                  <PostCard
                    thumbnail={thumbnail}
                    alt={alt}
                    category={category}
                    title={title}
                    desc={desc}
                    date={date}
                  />
                </Link>
              </li>
            );
          })}
          <div ref={scrollEdgeRef} />
        </ul>
      )}
    </>
  );
};

export default PostGrid;
