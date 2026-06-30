import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = getAllPosts();
    // Return posts without the full content to save bandwidth
    const postsWithoutContent = posts.map(({ content, ...rest }) => rest);
    return NextResponse.json(postsWithoutContent);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
