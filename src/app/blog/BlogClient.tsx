"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { useState, useMemo } from "react";
import type { BlogPost, BlogCategory } from "@/lib/blogTypes";

interface BlogClientProps {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogClient({ initialPosts, categories }: BlogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("Alle artikler");

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "Alle artikler") {
      return initialPosts;
    }
    return initialPosts.filter(post => post.category === selectedCategory);
  }, [initialPosts, selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Bygge<span className="text-primary/60">blogg</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Få ekspertråd og innsikt fra våre erfarne håndverkere.
              Vi deler kunnskap om byggeprosjekter, tillatelser og beste praksis.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Ekspertråd fra profesjonelle
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Lokal kunnskap om Trondheim
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Oppdaterte retningslinjer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Sidebar */}
            <aside className="lg:w-1/4">
              <div className="sticky top-8 space-y-8">
                {/* Categories */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h2 className="text-lg font-bold text-slate-900 mb-4">Kategorier</h2>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${
                          selectedCategory === category.name
                            ? "bg-primary text-white"
                            : "hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm opacity-75">({category.count})</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Newsletter */}
                <div className="bg-primary text-white rounded-xl p-6">
                  <h2 className="text-lg font-bold mb-3">Få byggetips på e-post</h2>
                  <p className="text-sm opacity-90 mb-4">
                    Meld deg på vårt nyhetsbrev og få månedlige tips og råd.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full">
                    Meld deg på
                  </Button>
                </div>
              </div>
            </aside>

            {/* Articles Grid */}
            <main className="lg:w-3/4">
              {/* Featured Post */}
              {filteredPosts.length > 0 && (
                <Link href={`/blog/${filteredPosts[0].id}`} className="block group">
                  <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl lg:flex mb-12">
                    <div className="lg:w-1/2">
                      <div className="aspect-[4/3] lg:aspect-square relative overflow-hidden">
                        <img
                          src={filteredPosts[0].image}
                          alt={filteredPosts[0].title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                            Utvalgt artikkel
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <time dateTime={filteredPosts[0].date}>
                            {new Date(filteredPosts[0].date).toLocaleDateString("nb-NO", {
                              year: "numeric",
                              month: "long",
                              day: "numeric"
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {filteredPosts[0].readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Tag className="w-4 h-4" />
                          {filteredPosts[0].category}
                        </div>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors">
                        {filteredPosts[0].title}
                      </h2>
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {filteredPosts[0].excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                        Les hele artikkelen
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className="block group"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:shadow-xl h-full">
                      <div className="aspect-[16/10] relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("nb-NO", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <Tag className="w-4 h-4 text-primary" />
                          <span className="text-sm text-slate-700 font-medium">{post.category}</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-slate-600 mb-4 leading-relaxed line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all mt-auto">
                          Les mer
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {/* Load More Button */}
              <div className="text-center pt-12">
                <Button variant="outline" size="lg" className="px-8">
                  Last inn flere artikler
                </Button>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Trenger du hjelp med ditt byggeprosjekt?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Våre eksperter står klare til å hjelpe deg fra planlegging til ferdigstillelse.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/kontakt">
                Kontakt oss i dag
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
              <Link href="tel:99883080">
                Ring oss: 99883080
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
