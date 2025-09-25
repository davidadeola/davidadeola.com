import { NextResponse } from "next/server";
import { searchPosts } from "@/utils/posts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  const results = searchPosts(query);
  return NextResponse.json(results);
}
