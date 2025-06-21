import { notFound } from "next/navigation";
import ArticleWrapper from "@/components/blog/ArticleWrapper";
import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

// This will handle both manual articles and imported HTML files
const getArticleContent = async (slug: string) => {
  // Check for imported HTML files first
  const htmlFilePath = path.join(process.cwd(), 'src/content/articles', `${slug}.html`);

  if (fs.existsSync(htmlFilePath)) {
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // Extract metadata from HTML comments or meta tags
    const extractMetadata = (html: string) => {
      const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      const metaTitleMatch = html.match(/<!-- Article Name: ([^>]+) -->/i);
      const metaServicesMatch = html.match(/<!-- Services: ([^>]+) -->/i);
      const metaIdMatch = html.match(/<!-- Article ID: ([^>]+) -->/i);

      // Extract title from h1 or meta comment
      const title = metaTitleMatch?.[1] || titleMatch?.[1] || slug.replace(/-/g, ' ');

      // Extract description from first paragraph
      const descMatch = html.match(/<p[^>]*>([^<]+)<\/p>/i);
      const description = `${descMatch?.[1]?.substring(0, 160)}...` || "Profesjonell veiledning fra Griffentreprenor";

      // Determine category from services or content
      const services = metaServicesMatch?.[1] || "";
      let category = "Byggetips";
      if (services.toLowerCase().includes("bad") || services.toLowerCase().includes("våtrom")) {
        category = "Våtrom";
      } else if (services.toLowerCase().includes("garasje")) {
        category = "Byggetillatelser";
      } else if (services.toLowerCase().includes("renovering") || services.toLowerCase().includes("rehabilitering")) {
        category = "Renovering";
      }

      // Estimate read time based on content length
      const wordCount = html.replace(/<[^>]+>/g, '').split(/\s+/).length;
      const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min`;

      return {
        title,
        description,
        category,
        readTime,
        publishedDate: new Date().toISOString().split('T')[0], // Default to current date
        keywords: `${title}, Trondheim, entreprenør, bygg, ${category.toLowerCase()}`,
        articleId: metaIdMatch?.[1] || slug,
        image: "https://ext.same-assets.com/4166723710/4128430851.jpeg" // Default image
      };
    };

    const metadata = extractMetadata(htmlContent);

    return {
      ...metadata,
      htmlContent,
      isImported: true
    };
  }

  // No manual articles anymore - only imported HTML articles
  return null;
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleContent(slug);

  if (!article) {
    return {
      title: "Artikkel ikke funnet | Griffentreprenor"
    };
  }

  return {
    title: `${article.title} | Griffentreprenor`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedDate,
      authors: ["Griffentreprenor"],
      locale: "nb_NO",
      images: article.image ? [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : undefined,
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleContent(slug);

  if (!article) {
    notFound();
  }

  // For imported HTML articles, use the ArticleWrapper
  if (article.isImported) {
    return (
      <ArticleWrapper
        title={article.title}
        description={article.description}
        publishedDate={article.publishedDate}
        readTime={article.readTime}
        category={article.category}
        htmlContent={article.htmlContent}
        articleId={article.articleId}
        keywords={article.keywords}
        image={article.image}
      />
    );
  }

  notFound();
}

export async function generateStaticParams() {
  const articles: string[] = [];

  // Check for imported HTML articles only
  const articlesDir = path.join(process.cwd(), 'src/content/articles');
  if (fs.existsSync(articlesDir)) {
    const htmlFiles = fs.readdirSync(articlesDir)
      .filter(file => file.endsWith('.html'))
      .map(file => file.replace('.html', ''));
    articles.push(...htmlFiles);
  }

  return articles.map((slug) => ({
    slug,
  }));
}
