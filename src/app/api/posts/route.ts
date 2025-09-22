import { NextResponse } from "next/server";
import { getSortedPostsData } from "@/utils/posts";

export async function GET() {
  const posts = getSortedPostsData();
  return NextResponse.json(posts);
}
