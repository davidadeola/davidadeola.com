import React from "react";
import { getSortedPostsData, getCategories } from "Utils/posts";
import { siteMetadata } from "Utils/siteMetadata";
import HomeClient from "./HomeClient";

const Home = () => {
  const posts = getSortedPostsData();
  const categories = getCategories();
  const postTitle = siteMetadata.postTitle;

  return (
    <HomeClient posts={posts} categories={categories} postTitle={postTitle} />
  );
};

export default Home;
