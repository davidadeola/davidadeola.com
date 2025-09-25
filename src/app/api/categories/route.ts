import { NextResponse } from "next/server";
import { getCategories } from "@/utils/posts";

export async function GET() {
  const categories = getCategories();
  return NextResponse.json(categories);
}
