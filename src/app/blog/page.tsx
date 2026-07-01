import { getAllPosts } from "@/lib/blog";
import BlogListClient from "./blog-list-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog, Dharshan's DevSpace",
  description:
    "Thoughts on software engineering, design patterns, building products, and the developer mindset by Dharshan S Kotian.",
  openGraph: {
    title: "Blog, Dharshan's DevSpace",
    description:
      "Thoughts on software engineering, design patterns, building products, and the developer mindset.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return <BlogListClient posts={posts} />;
}
