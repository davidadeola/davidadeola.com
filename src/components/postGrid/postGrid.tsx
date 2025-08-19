"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import type Post from "Types/Post";
import Card from "./card/card";

interface PostGridProps {
  posts: Post[];
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const scrollEdgeRef = useRef<HTMLDivElement>(null);
  const [currentList, setCurrentList] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const maxPostNum = 10;

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
    <ul role="list" className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {currentList.map((data) => {
        const { id, slug, title, desc, date, category, thumbnail, alt } = data;
        const ariaLabel = `${title} - ${category} - Posted on ${date}`;
        return (
          <li key={id} role="listitem" className="box-border col-span-1 mb-0 ">
            <Link
              href={slug}
              aria-label={ariaLabel}
              className="block h-full group"
            >
              <div className="group-hover:scale-[1.03] transition-transform duration-500 ease-in-out">
                <Card
                  thumbnail={thumbnail}
                  alt={alt}
                  category={category}
                  title={title}
                  desc={desc}
                  date={date}
                />
              </div>
            </Link>
          </li>
        );
      })}
      <div ref={scrollEdgeRef} />
    </ul>
  );
};

export default PostGrid;
