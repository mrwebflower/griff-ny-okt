import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Droplets, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bad og våtrom renovering i Trondheim - Ekspertguide 2024 | Griffentreprenor",
  description: "Profesjonelle tips for renovering av bad og våtrom i Trondheim. Vi deler våre beste råd for et vellykket badprosjekt med våtromssertifiserte håndverkere.",
  keywords: "bad renovering, våtrom Trondheim, baderom, våtromssertifikat, totalrenovering, fuktsikring, Trondheim entreprenør",
  openGraph: {
    title: "Bad og våtrom renovering i Trondheim - Ekspertguide 2024",
    description: "Profesjonelle tips for renovering av bad og våtrom i Trondheim. Vi deler våre beste råd for et vellykket badprosjekt.",
    type: "article",
    publishedTime: "2024-01-10T00:00:00.000Z",
    authors: ["Griffentreprenor"],
    locale: "nb_NO",
    images: [
      {
        url: "https://ext.same-assets.com/4166723710/bad-vatrom-renovering.jpg",
        width: 1200,
        height: 630,
        alt: "Bad og våtrom renovering i Trondheim",
      },
    ],
  },
  alternates: {
    canonical: "/blog/bad-vatrom-renovering-trondheim",
  },
};

const tableOfContents = [
  { id: "hvorfor-velge-profesjonelle", title: "Hvorfor velge profesjonelle?" },
  { id: "typiske-tjenester", title: "Typiske tjenester" },
  { id: "materialvalg", title: "Materialvalg" },
  { id: "prosessen", title: "Prosessen steg for steg" },
  { id: "sporsmal-svar", title: "Ofte stilte spørsmål" },
  { id: "kom-i-gang", title: "Kom i gang med prosjektet" },
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
            <span className="text-slate-900">Bad og våtrom renovering</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Droplets className="w-4 h-4" />
              Våtrom
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Bad og våtrom Trondheim: Trygge og moderne løsninger
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Drømmer du om et stilrent, moderne og funksjonelt baderom? Vi deler profesjonelle
              tips for å sikre et vellykket våtromsprosjekt i Trondheim.
            </p>
          </div>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime="2024-01-10">10. januar 2024</time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              6 min lesetid
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
              alt="Moderne bad og våtrom renovering i Trondheim"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Article Content with Table of Contents */}
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
              <div className="bg-blue-600 text-white rounded-xl p-6">
                <h3 className="font-bold mb-4">Viktige faktorer</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Våtromssertifiserte håndverkere</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Fastpris uten skjulte kostnader</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>Garanti på håndverk og membran</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <article className="prose prose-lg prose-slate max-w-none">

              {/* Introduction */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-8">
                <p className="text-lg text-slate-700 leading-relaxed mb-0">
                  <strong>Drømmer du om et stilrent, moderne og funksjonelt baderom som både hever
                  komforten og øker verdien på boligen din?</strong> Griffentreprenør i Trondheim leverer
                  totalrenoveringer og nybygg av bad og våtrom med et sterkt fokus på kvalitet, trygghet
                  og skreddersydde løsninger tilpasset dine behov.
                </p>
              </div>

              {/* Professional features grid */}
              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h4 className="font-bold text-green-900 mb-3">🏆 Sertifiserte håndverkere</h4>
                  <p className="text-green-800 mb-0">
                    Våtromssertifiserte håndverkere som følger bransjens strenge standarder og regelverk.
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="font-bold text-blue-900 mb-3">💰 Fastpris garanti</h4>
                  <p className="text-blue-800 mb-0">
                    Klare og oversiktlige tilbud uten skjulte kostnader. Alt inkludert fra A til Å.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <h4 className="font-bold text-purple-900 mb-3">📱 Digital oppfølging</h4>
                  <p className="text-purple-800 mb-0">
                    Daglige oppdateringer, bilder og informasjon slik at du alltid er oppdatert.
                  </p>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <h4 className="font-bold text-orange-900 mb-3">🌱 Miljøvennlige løsninger</h4>
                  <p className="text-orange-800 mb-0">
                    TEK17-kompatible løsninger som ofte kvalifiserer til ENOVA-støtte.
                  </p>
                </div>
              </div>

              {/* This is a reference template showing the structure and styling approach */}

            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
