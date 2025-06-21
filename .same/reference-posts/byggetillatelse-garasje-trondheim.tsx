import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Byggetillatelse for garasje i Trondheim - Komplett guide 2024 | Griffentreprenor",
  description: "Alt du trenger å vite om søknadsprosessen for byggetillatelse til garasje i Trondheim kommune. Fra krav til dokumentasjon til ferdigstillelse. Ekspertråd fra erfarne entreprenører.",
  keywords: "byggetillatelse garasje, garasje Trondheim, byggeregler, søknadsprosess, dobbelgarasje, isolert garasje, byggetips",
  openGraph: {
    title: "Byggetillatelse for garasje i Trondheim - Komplett guide 2024",
    description: "Alt du trenger å vite om søknadsprosessen for byggetillatelse til garasje i Trondheim kommune.",
    type: "article",
    publishedTime: "2024-01-15T00:00:00.000Z",
    authors: ["Griffentreprenor"],
    locale: "nb_NO",
    images: [
      {
        url: "https://ext.same-assets.com/4166723710/garasje-byggetillatelse.jpg",
        width: 1200,
        height: 630,
        alt: "Byggetillatelse for garasje i Trondheim - planlegging av tilbygg",
      },
    ],
  },
  alternates: {
    canonical: "/blog/byggetillatelse-garasje-trondheim",
  },
};

const tableOfContents = [
  { id: "generelle-regler", title: "Generelle regler for bygging av garasjer" },
  { id: "under-50-kvm", title: "Garasjer under 50 kvm" },
  { id: "50-70-kvm", title: "Garasjer mellom 50-70 kvm" },
  { id: "over-70-kvm", title: "Garasjer over 70 kvm" },
  { id: "lokale-bestemmelser", title: "Lokale bestemmelser i Trondheim" },
  { id: "lover-forskrifter", title: "Lover og forskrifter" },
  { id: "sammenfatning", title: "Sammenfatning" },
];

export default function Article() {
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
            <span className="text-slate-900">Byggetillatelse for garasje</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Byggetillatelser
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Byggetillatelse for garasje i Trondheim: Dette må du vite
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Drømmer du om å bygge en garasje i Trondheim? Vi forklarer alle regler og krav
              for å gjøre prosessen så smidig som mulig.
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime="2024-01-15">15. januar 2024</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              8 min lesetid
            </div>
            <button className="flex items-center gap-2 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Del artikkel
            </button>
          </div>

          {/* Hero Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-8">
            <img
              src="https://ext.same-assets.com/4166723710/4128430851.jpeg"
              alt="Byggetillatelse for garasje i Trondheim - planlegging av tilbygg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container max-w-4xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Table of Contents - Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-900 mb-4">Innholdsfortegnelse</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-slate-600 hover:text-primary transition-colors py-1"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Facts */}
              <div className="bg-primary text-white rounded-xl p-6">
                <h3 className="font-bold mb-4">Viktige punkter</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Under 50 kvm: Ofte ingen søknadsplikt</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>50-70 kvm: Søknadsplikt påkrevd</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Over 70 kvm: Ansvarlige foretak kreves</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <article className="prose prose-lg prose-slate max-w-none">

              {/* Introduction */}
              <div className="bg-blue-50 border-l-4 border-primary p-6 rounded-r-lg mb-8">
                <p className="text-lg text-slate-700 leading-relaxed mb-0">
                  Drømmer du om å bygge en garasje i Trondheim? Enten du ser for deg en
                  <strong> dobbelgarasje</strong> for å huse to biler, eller kanskje en
                  <strong> isolert garasje</strong> som gir ekstra lagringsplass, er det flere
                  regler og forskrifter du bør kjenne til før du setter spade i jorda.
                </p>
              </div>

              <p>
                Byggetillatelser kan virke som et komplisert og tidkrevende kapittel, men frykt ikke!
                Vi skal bryte ned hva du må vite slik at prosessen blir så smidig som mulig.
              </p>

              <p>
                Når det kommer til <strong>garasje Trondheim</strong>, er reglene for byggetillatelse
                i stor grad avhengig av størrelsen på garasjen. Her er det viktigste å huske på:
              </p>

              <div className="bg-slate-50 rounded-xl p-6 my-8">
                <ul className="space-y-4 mb-0">
                  <li>
                    <strong>Garasjer under 50 kvm:</strong> Du slipper søknadsplikt hvis mønehøyden
                    er under 4 meter, gesimshøyden under 3 meter, og at den plasseres minst 1 meter
                    fra nabogrense. I tillegg må den ikke brukes til beboelse, ha kjeller eller
                    plasseres over vann- og avløpsledninger.
                  </li>
                  <li>
                    <strong>Garasjer mellom 50-70 kvm:</strong> Her er det søknadspliktig, men du kan
                    stå ansvarlig for både søknad og utførelse. Husk å sende inn riktig skjema til
                    kommunen og varsle naboene dine!
                  </li>
                  <li>
                    <strong>Garasjer over 70 kvm:</strong> Dette krever søknad samt ansvarlige foretak
                    – så her gjelder det å være på ballen!
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 my-6">
                <p className="text-amber-800 mb-0">
                  <strong>Viktig:</strong> Selv om mindre garasjer kan unngå søknadsplikt, må du
                  huske å melde fra til kommunen innen <em>fire uker etter ferdigstillelse</em>.
                </p>
              </div>

              <blockquote className="border-l-4 border-primary bg-slate-50 p-6 my-8">
                <p className="text-lg italic mb-0">
                  "Kunnskap er makt! Jo mer du vet om byggetillatelse for garasje i Trondheim,
                  jo mer trygghet får du."
                </p>
              </blockquote>

              {/* Sections continue with same styling pattern... */}
              {/* This is a reference template showing the structure and styling approach */}

            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
