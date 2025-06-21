import dynamic from "next/dynamic";
import type { BlogPost, BlogCategory } from "@/lib/blogTypes";

const BlogClient = dynamic(() => import("./BlogClient"), {
  ssr: true, // Enable SSR for better performance
});

interface BlogWrapperProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export function BlogWrapper({ initialPosts, categories }: BlogWrapperProps) {
  return <BlogClient initialPosts={initialPosts} categories={categories} />;
}
