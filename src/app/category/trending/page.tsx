import React from "react";
import { getTrendingPostsData } from "Utils/posts";
import TrendingClient from "./TrendingPageClient";

const Trending = () => {
  const posts = getTrendingPostsData();

  return <TrendingClient posts={posts} />;
};

export default Trending;
