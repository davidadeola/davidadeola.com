"use client";

import React from "react";
import PostGrid from "@/components/post-grid";
import type Post from "Types/Post";
import { useSearch } from "@/hooks/useSearch";
import { useSearchQuery } from "@/hooks/useSearchQuery";
import SearchPostGrid from "@/components/search-post-grid";

interface HomeClientProps {
  posts: Post[];
}

const HomeClient: React.FC<HomeClientProps> = ({ posts }) => {
  const { query } = useSearchQuery();
  const { results, loading } = useSearch(query);

  const noSearchResult = Boolean(query && !results.length);
  const isSearchResult = Boolean(query && results.length);

  return (
    <main className="">
      {isSearchResult && <SearchPostGrid posts={results} />}
      {!query && <PostGrid posts={posts} />}
      {noSearchResult && !loading && (
        <div className="border border-dashed border-[#353535]/30 gap-4 dark:border-[#353535] h-[400px] flex flex-col items-center justify-center">
          <h3 className="text-2xl">Oops!</h3>
          <p>Result not found</p>
        </div>
      )}

      {loading && (
        <div className="border border-dashed border-[#353535]/30 gap-4 dark:border-[#353535] h-[400px] flex flex-col items-center justify-center">
          <h3 className="text-2xl">Loading...</h3>
        </div>
      )}
    </main>
  );
};

export default HomeClient;
