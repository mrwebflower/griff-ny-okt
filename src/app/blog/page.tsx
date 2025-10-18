import type { Metadata } from "next";
import { getAllBlogPosts, getBlogCategories } from "@/lib/blogUtils";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog - Griff Entreprenør | Byggetips og Råd",
  description: "Les våre ekspertartikler om byggeprosjekter, byggetillatelser, våtrom og andre byggetips for Trondheim-området.",
  keywords: "byggeblogg, byggetips, byggetillatelser, våtrom, Trondheim, entreprenør",
  openGraph: {
    title: "Blog - Griff Entreprenør | Byggetips og Råd",
    description: "Les våre ekspertartikler om byggeprosjekter, byggetillatelser, våtrom og andre byggetips for Trondheim-området.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function BlogPage() {
  const allBlogPosts = getAllBlogPosts();
  const categories = getBlogCategories();

  return <BlogClient initialPosts={allBlogPosts} categories={categories} />;
}
