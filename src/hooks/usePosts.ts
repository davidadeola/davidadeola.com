"use client";

import { useEffect, useState } from "react";
import type Post from "Types/Post";

export function usePosts(category?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = category ? `/api/categories/${category}` : `/api/posts`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, [category]);

  return { posts, loading };
}
