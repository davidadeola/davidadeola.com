import React from "react";
import { notFound } from "next/navigation";
import { getPostData, getAllPostIds } from "Utils/posts";
import { siteMetadata } from "Utils/siteMetadata";
import BlogPostClient from "./BlogPostClient";
import type { Metadata } from "next";

interface BlogPostProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const paths = getAllPostIds();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostData(slug);

    return {
      title: `${post.title} | ${siteMetadata.title}`,
      description: post.desc,
      openGraph: {
        title: post.title,
        description: post.desc,
        type: "article",
        url: `${siteMetadata.siteUrl}${post.slug}`,
        images: post.thumbnail
          ? [`${siteMetadata.siteUrl}${post.thumbnail}`]
          : [],
      },
      twitter: {
        card: "summary",
        title: post.title,
        description: post.desc,
        images: post.thumbnail
          ? [`${siteMetadata.siteUrl}${post.thumbnail}`]
          : [],
      },
    };
  } catch (error) {
    return {
      title: siteMetadata.title,
      description: siteMetadata.description,
    };
  }
}

const BlogPost = async ({ params }: BlogPostProps) => {
  try {
    const { slug } = await params;

    if (!slug) {
      notFound();
    }
    const post = await getPostData(slug);

    if (!post) {
      notFound();
    }

    return <BlogPostClient post={post} />;
  } catch (error) {
    notFound();
  }
};

export default BlogPost;
