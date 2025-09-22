import React from "react";
import { getSortedPostsData } from "Utils/posts";
import HomeClient from "./HomeClient";

const Home = () => {
  const posts = getSortedPostsData();

  console.log(posts, "posts");

  return <HomeClient posts={posts} />;
};

export default Home;
