import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen, CheckCircle, List } from "lucide-react";
import type { Metadata } from "next";

interface ArticleWrapperProps {
  title: string;
  description: string;
  publishedDate: string;
  readTime: string;
  category: string;
  htmlContent: string;
  articleId: string;
  keywords?: string;
  image?: string;
}

export default function ArticleWrapper({
  title,
  description,
  publishedDate,
  readTime,
  category,
  htmlContent,
  articleId,
  keywords,
  image
}: ArticleWrapperProps) {
  // Generate table of contents from HTML content with better extraction
  const generateTableOfContents = (html: string) => {
    const matches: { id: string; title: string; level: number }[] = [];

    // Look for h1, h2 and h3 tags, with or without id attributes
    const headerRegex = /<h([1-3])[^>]*(?:id="([^"]*)")?[^>]*>([^<]+)<\/h[1-3]>/gi;
    let match: RegExpExecArray | null;
    const idCounter = 0;

    match = headerRegex.exec(html);
    while (match !== null) {
      const level = Number.parseInt(match[1]);
      let id = match[2];
      const title = match[3].trim().replace(/<[^>]+>/g, ''); // Remove any nested tags

      // Generate ID if not present
      if (!id) {
        id = `heading-${title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}`;
      }

      // Include h1, h2, and h3 in TOC
      if (level >= 1 && level <= 3) {
        matches.push({
          id,
          title,
          level
        });
      }

      match = headerRegex.exec(html);
    }

    return matches;
  };

  // Remove first h1 before generating TOC and styling content
  const contentWithoutFirstH1 = htmlContent.replace(/<h1[^>]*>.*?<\/h1>/i, '');

  const tableOfContents = generateTableOfContents(contentWithoutFirstH1);

  // Auto-style the HTML content with better list handling and heading IDs
  const styledHtmlContent = contentWithoutFirstH1
    // First, add IDs to headings that don't have them
    .replace(/<h([1-3])([^>]*?)>([^<]+)<\/h[1-3]>/gi, (match, level, attrs, title) => {
      if (attrs.includes('id=')) {
        return match; // Already has ID
      }
      const id = `heading-${title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}`;
      return `<h${level}${attrs} id="${id}">${title}</h${level}>`;
    })
    // Replace basic styling with our design system classes
    .replace(/<h1([^>]*)>/g, '<h1$1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight scroll-mt-24">')
    .replace(/<h2([^>]*)>/g, '<h2$1 class="text-2xl md:text-3xl font-bold text-slate-900 mb-6 mt-12 scroll-mt-24">')
    .replace(/<h3([^>]*)>/g, '<h3$1 class="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4 scroll-mt-24">')
    .replace(/<h4([^>]*)>/g, '<h4$1 class="text-lg font-bold text-slate-900 mb-3 scroll-mt-24">')
    .replace(/<p>/g, '<p class="text-slate-700 mb-4 leading-relaxed">')
    // Better list styling
    .replace(/<ul>/g, '<ul class="space-y-3 mb-6 text-slate-700 pl-6">')
    .replace(/<ol>/g, '<ol class="space-y-3 mb-6 text-slate-700 list-decimal pl-6">')
    .replace(/<li>/g, '<li class="leading-relaxed flex items-start">')
    .replace(/<li class="leading-relaxed flex items-start">/g, '<li class="leading-relaxed flex items-start"><span class="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span><span>')
    .replace(/<\/li>/g, '</span></li>')
    // Other elements - fix quotes to be dark
    .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-primary bg-slate-50 p-6 my-8 italic text-slate-800">')
    .replace(/<strong>/g, '<strong class="text-slate-900 font-semibold">')
    .replace(/<em>/g, '<em class="text-slate-800 italic">')
    .replace(/<a([^>]*href[^>]*)>/g, '<a$1 class="text-primary hover:underline transition-colors font-medium">')
    // Style special boxes and callouts
    .replace(/class="intro"/g, 'class="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8 text-slate-800"')
    // Add responsive images
    .replace(/<img([^>]*class="[^"]*article-image[^"]*"[^>]*)>/g, '<img$1 class="w-full rounded-xl my-8 shadow-lg">')
    .replace(/<img(?![^>]*class=)([^>]*)>/g, '<img$1 class="w-full rounded-xl my-8 shadow-lg">');

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="container max-w-4xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-primary transition-colors">Hjem</Link>
            <span>→</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>→</span>
            <span className="text-slate-900">{title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              {category}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-700 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={publishedDate}>
                {new Date(publishedDate).toLocaleDateString("nb-NO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {readTime}
            </div>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Del artikkel
            </button>
          </div>

          {/* Hero Image */}
          {image && (
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </header>

      {/* Article Content */}
      <div className="container max-w-6xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Table of Contents - Sidebar for Desktop */}
          {tableOfContents.length > 0 && (
            <aside className="lg:w-80 lg:flex-shrink-0 order-2 lg:order-1">
              <div className="sticky top-8">
                <div className="bg-slate-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-slate-900">Innholdsfortegnelse</h2>
                  </div>
                  <nav className="space-y-2">
                    {tableOfContents.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        style={{ color: item.level === 1 ? '#1e293b !important' : item.level === 2 ? '#475569 !important' : '#64748b !important' }}
                        className={`block text-sm hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-white ${
                          item.level === 1 ? 'font-semibold' :
                          item.level === 2 ? 'font-medium' :
                          'ml-4 text-xs'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.level === 1 ? 'bg-primary' :
                            item.level === 2 ? 'bg-primary' :
                            'bg-slate-400'
                          }`} />
                          <span style={{ color: 'inherit !important' }}>{item.title}</span>
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Contact CTA */}
                <div className="bg-primary text-white rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">Trenger du hjelp?</h3>
                  <p className="text-sm opacity-90 mb-4">
                    Våre eksperter står klare til å hjelpe deg med ditt byggeprosjekt.
                  </p>
                  <Button asChild variant="secondary" size="sm" className="w-full">
                    <Link href="/kontakt">
                      Kontakt oss
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className={`${tableOfContents.length > 0 ? "lg:flex-1" : "w-full"} order-1 lg:order-2`}>
            <article
              className="prose prose-lg prose-slate max-w-none"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: HTML content is from controlled source and properly sanitized
              dangerouslySetInnerHTML={{ __html: styledHtmlContent }}
            />

            {/* Contact CTA Section */}
            <div className="bg-primary text-white rounded-xl p-8 my-12 text-center">
              <h2 className="text-2xl font-bold mb-4" style={{ color: '#2c3e50' }}>Griff Entreprenør AS</h2>
              <p className="text-lg mb-6 opacity-90">
                Pålitelig håndverk med lokal kjærlighet
              </p>
              <div className="space-y-2 text-sm mb-6">
                <p>✓ Sentral godkjenning</p>
                <p>✓ Våtromssertifikat</p>
                <p>✓ 15+ års erfaring</p>
              </div>
              <Button asChild variant="secondary" size="lg">
                <Link href="/kontakt">
                  Få et tilbud i dag
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </main>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til blog
          </Link>
          <div className="text-slate-500 text-sm">
            Artikkel: {articleId}
          </div>
        </div>
      </div>
    </div>
  );
}
