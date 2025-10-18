import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Droplets, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bad og våtrom renovering i Trondheim - Ekspertguide 2024 | Griff Entreprenør",
  description: "Profesjonelle tips for renovering av bad og våtrom i Trondheim. Vi deler våre beste råd for et vellykket badprosjekt med våtromssertifiserte håndverkere.",
  keywords: "bad renovering, våtrom Trondheim, baderom, våtromssertifikat, totalrenovering, fuktsikring, Trondheim entreprenør",
  openGraph: {
    title: "Bad og våtrom renovering i Trondheim - Ekspertguide 2024",
    description: "Profesjonelle tips for renovering av bad og våtrom i Trondheim. Vi deler våre beste råd for et vellykket badprosjekt.",
    type: "article",
    publishedTime: "2024-01-10T00:00:00.000Z",
    authors: ["Griff Entreprenør"],
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

      {/* Article Content */}
      <div className="container max-w-4xl mx-auto px-4 pb-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Table of Contents - Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-8">
              <div className="bg-griffen-bg-dark rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4" style={{ color: 'white !important', fontSize: '1.125rem !important' }}>Innholdsfortegnelse</h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block text-sm text-white hover:text-slate-200 transition-colors py-1 flex items-center gap-2"
                      style={{ color: 'white !important' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      <span className="text-white" style={{ color: 'white !important' }}>{item.title}</span>
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

              {/* Section: Hvorfor velge profesjonelle */}
              <section id="hvorfor-velge-profesjonelle" className="mt-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Hvorfor velge profesjonelle til bad og våtrom?
                </h2>

                <p>
                  Når du skal investere i et nytt bad, er det essensielt med trygghet, oversikt og klare rammer.
                  Profesjonelle entreprenører gir deg en komplett pakke som sikrer god kontroll og høy kvalitet
                  gjennom hele prosessen:
                </p>

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
                  <div className="bg-griffen-yellow-50 border border-griffen-yellow-200 rounded-xl p-6">
                    <h4 className="font-bold text-griffen-yellow-900 mb-3">🌱 Miljøvennlige løsninger</h4>
                    <p className="text-griffen-yellow-800 mb-0">
                      TEK17-kompatible løsninger som ofte kvalifiserer til ENOVA-støtte.
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-slate-900 mb-4">💡 Eksempelprosjekt: Totalrenovering på Byåsen</h4>
                  <p className="text-slate-700 mb-0">
                    8 m² stort bad med fokus på moderne design, funksjonelle løsninger og energieffektivitet.
                    Resultatet var et toppmoderne bad med høy kvalitet og solid garanti, ferdigstilt innen avtalt tidsramme.
                  </p>
                </div>
              </section>

              {/* Section: Typiske tjenester */}
              <section id="typiske-tjenester" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Typiske tjenester innen bad og våtrom
                </h2>

                <p>
                  Profesjonelle entreprenører leverer et bredt spekter av tjenester innen våtromsarbeid:
                </p>

                <div className="space-y-6 my-8">
                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">🔨 Totalrenovering av bad</h4>
                    <p className="text-slate-600 mb-0">
                      Alt fra riving til nyoppbygging, membranarbeid, flislegging og komplett ferdigstilling.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">🪙 Flislegging med korrekt fall</h4>
                    <p className="text-slate-600 mb-0">
                      Fagmessig utført flislegging for optimal drenering og langvarig holdbarhet.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">💧 Våtromsplater og membran</h4>
                    <p className="text-slate-600 mb-0">
                      Montering av kvalitetsprodukter som sikrer optimal fuktsikring og lang levetid.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">🚿 Installasjon av sanitærutstyr</h4>
                    <p className="text-slate-600 mb-0">
                      Montering av baderomsutstyr fra anerkjente produsenter med fokus på kvalitet og stil.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">⚡ Elektrisk arbeid</h4>
                    <p className="text-slate-600 mb-0">
                      Installasjon av varmekabler, belysning, ventilasjon og smarte styringssystemer.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: Materialvalg */}
              <section id="materialvalg" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Materialvalg tilpasset Trøndelags klima
                </h2>

                <p>
                  Det er viktig å velge materialer og løsninger som passer klimaet i Trondheim og sikrer lang levetid:
                </p>

                <div className="grid md:grid-cols-3 gap-6 my-8">
                  <div className="bg-blue-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-blue-900 mb-3">Fuktbeskyttelse</h4>
                    <p className="text-blue-800 text-sm mb-0">
                      Fliser av høy kvalitet, robuste våtromsplater og membranløsninger med lang garanti.
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">⚡</span>
                    </div>
                    <h4 className="font-bold text-green-900 mb-3">Energieffektivitet</h4>
                    <p className="text-green-800 text-sm mb-0">
                      Moderne varme- og vannbårne varmesystemer som gir komfort og reduserer energibruk.
                    </p>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">🌱</span>
                    </div>
                    <h4 className="font-bold text-emerald-900 mb-3">Miljø og bærekraft</h4>
                    <p className="text-emerald-800 text-sm mb-0">
                      Ecolabel-sertifiserte produkter og miljøvennlige løsninger gjennom hele prosjektet.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: Prosessen */}
              <section id="prosessen" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Slik fungerer prosessen steg for steg
                </h2>

                <div className="space-y-6 my-8">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Gratis befaring</h4>
                      <p className="text-slate-600 mb-0">
                        Vi besøker deg for å forstå dine ønsker, behov og budsjett.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Detaljert tilbud</h4>
                      <p className="text-slate-600 mb-0">
                        Vi gir deg et klart og oversiktlig fastpris-tilbud med detaljert spesifikasjon.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Utførelse av arbeidet</h4>
                      <p className="text-slate-600 mb-0">
                        Vår prosjektleder koordinerer hele prosessen, med jevnlige oppdateringer via kundeportalen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">Sluttkontroll og dokumentasjon</h4>
                      <p className="text-slate-600 mb-0">
                        Grundig inspeksjon og du mottar FDV-instrukser, våtromsrapport og garantidokumenter.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: FAQ */}
              <section id="sporsmal-svar" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Ofte stilte spørsmål om bad og våtrom
                </h2>

                <div className="space-y-6 my-8">
                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Hvordan unngår jeg fuktskader på badet?</h4>
                    <p className="text-slate-600 mb-0">
                      Grundig membranarbeid, profesjonell ventilasjon og regelmessig vedlikehold er avgjørende
                      for å forhindre fuktskader.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Hvor lang tid tar en totalrenovering?</h4>
                    <p className="text-slate-600 mb-0">
                      Varigheten avhenger av omfanget og kompleksiteten i prosjektet. Vi gir deg alltid et
                      realistisk tidsestimat i tilbudet.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Hva koster en badrenovering?</h4>
                    <p className="text-slate-600 mb-0">
                      Prisen varierer med valg av materialer og prosjektets kompleksitet. Etter befaring får
                      du et tydelig og bindende pristilbud.
                    </p>
                  </div>

                  <div className="border border-slate-200 rounded-lg p-6">
                    <h4 className="font-bold text-slate-900 mb-2">Kan jeg bo hjemme under renoveringen?</h4>
                    <p className="text-slate-600 mb-0">
                      Vi gjør tiltak for å minimere støv, støy og forstyrrelser slik at du kan bo hjemme
                      under hele renoveringsprosessen.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section: Kom i gang */}
              <section id="kom-i-gang" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Klar for å realisere ditt drømmebad?
                </h2>

                <p>
                  Ta kontakt med oss for en gratis og uforpliktende befaring. Sammen finner vi den beste
                  løsningen for ditt nye bad!
                </p>

                <div className="bg-primary text-white rounded-xl p-8 my-8 text-center">
                  <h4 className="text-2xl font-bold mb-4">Griff Entreprenør AS</h4>
                  <p className="text-lg mb-6 opacity-90">
                    Pålitelig håndverk med lokal kjærlighet
                  </p>
                  <div className="space-y-2 text-sm mb-6">
                    <p>✓ Sentral godkjenning</p>
                    <p>✓ Våtromssertifikat</p>
                    <p>✓ StartBANK</p>
                  </div>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/kontakt">
                      Bestill gratis befaring
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>
            </article>
          </main>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/blog/byggetillatelse-garasje-trondheim"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Forrige artikkel
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          >
            Tilbake til blog
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
