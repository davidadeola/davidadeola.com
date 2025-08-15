import React from "react";
import { getSortedPostsData, getCategories } from "Utils/posts";
import { siteMetadata } from "Utils/siteMetadata";
import CategoryPageClient from "./CategoryPageClient";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const { category } = await params;
    const allCategories = getCategories();

    // Convert kebab-case back to original category name
    const categoryMap: Record<string, string> = allCategories.reduce(
      (acc, cat) => {
        acc[kebabCase(cat.name)] = cat.name;
        return acc;
      },
      {} as Record<string, string>
    );

    const originalCategoryName = categoryMap[category];

    return {
      title: `${originalCategoryName || category} | ${siteMetadata.title}`,
      description: `Posts in the ${originalCategoryName || category} category`,
      openGraph: {
        title: `${originalCategoryName || category} | ${siteMetadata.title}`,
        description: `Posts in the ${originalCategoryName || category} category`,
        type: "website",
        url: `${siteMetadata.siteUrl}/category/${category}`,
      },
      twitter: {
        card: "summary",
        title: `${originalCategoryName || category} | ${siteMetadata.title}`,
        description: `Posts in the ${originalCategoryName || category} category`,
      },
    };
  } catch (error) {
    return {
      title: siteMetadata.title,
      description: siteMetadata.description,
    };
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;
  const allPosts = getSortedPostsData();
  const allCategories = getCategories();

  // Convert kebab-case back to original category name
  const categoryMap: Record<string, string> = allCategories.reduce(
    (acc, cat) => {
      acc[kebabCase(cat.name)] = cat.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const originalCategoryName = categoryMap[category];

  const filteredPosts = originalCategoryName
    ? allPosts.filter((post) => post.category === originalCategoryName)
    : [];

  const postTitle = originalCategoryName || "Category";

  return (
    <CategoryPageClient
      allCategories={allCategories}
      filteredPosts={filteredPosts}
      postTitle={postTitle}
    />
  );
};

// Helper function to convert kebab-case to original case
function kebabCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default CategoryPage;
