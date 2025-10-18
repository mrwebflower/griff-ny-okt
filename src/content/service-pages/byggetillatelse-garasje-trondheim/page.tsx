import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, BookOpen, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Byggetillatelse for garasje i Trondheim - Komplett guide 2024 | Griff Entreprenør",
  description: "Alt du trenger å vite om søknadsprosessen for byggetillatelse til garasje i Trondheim kommune. Fra krav til dokumentasjon til ferdigstillelse. Ekspertråd fra erfarne entreprenører.",
  keywords: "byggetillatelse garasje, garasje Trondheim, byggeregler, søknadsprosess, dobbelgarasje, isolert garasje, byggetips",
  openGraph: {
    title: "Byggetillatelse for garasje i Trondheim - Komplett guide 2024",
    description: "Alt du trenger å vite om søknadsprosessen for byggetillatelse til garasje i Trondheim kommune.",
    type: "article",
    publishedTime: "2024-01-15T00:00:00.000Z",
    authors: ["Griff Entreprenør"],
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

              <div className="bg-griffen-yellow-50 border border-griffen-yellow-200 rounded-lg p-4 my-6">
                <p className="text-griffen-yellow-800 mb-0">
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

              {/* Section: Generelle regler */}
              <section id="generelle-regler" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Generelle regler for bygging av garasjer
                </h2>

                <p>
                  Når det gjelder bygging av garasjer, er det flere generelle regler du bør være
                  klar over for å unngå unødvendige komplikasjoner. Enten du planlegger en
                  <strong> garasje bygg Trondheim</strong> eller vurderer
                  <strong> garasjer i Trondheim</strong>, er det viktig å sette seg inn i
                  retningslinjene som følger med byggetillatelser.
                </p>

                <h3 id="under-50-kvm" className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                  Garasjer under 50 kvm
                </h3>

                <p>
                  Dersom garasjen din er under 50 kvm, kan du ofte slippe unna med søknadsplikt,
                  så lenge du oppfyller følgende kriterier:
                </p>

                <div className="grid md:grid-cols-2 gap-4 my-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2 mb-0">
                      <li>✓ Mønehøyden er under 4 meter</li>
                      <li>✓ Gesimshøyden holder seg under 3 meter</li>
                      <li>✓ Minst 1 meter fra nabogrensen</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <ul className="space-y-2 mb-0">
                      <li>✓ Ikke brukes til beboelse</li>
                      <li>✓ Ingen kjeller</li>
                      <li>✓ I samsvar med reguleringsplan</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-griffen-yellow-50 border border-griffen-yellow-200 rounded-lg p-4 my-6">
                  <p className="text-griffen-yellow-800 mb-0">
                    <strong>Husk:</strong> Selv om du slipper søknad, må du likevel melde fra til
                    kommunen innen <strong>fire uker etter ferdigstillelse</strong>.
                  </p>
                </div>

                <h3 id="50-70-kvm" className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                  Garasjer mellom 50-70 kvm
                </h3>

                <p>
                  For garasjer mellom 50 og 70 kvm er søknadsplikt et must. Men her kommer det gode nyheter:
                </p>

                <div className="bg-blue-50 rounded-lg p-6 my-6">
                  <ul className="space-y-3 mb-0">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Du kan selv stå ansvarlig for både søknad og utførelse</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Send inn skjema til kommunen og varsle naboene</span>
                    </li>
                  </ul>
                </div>

                <h3 id="over-70-kvm" className="text-2xl font-bold text-slate-900 mt-12 mb-4">
                  Garasjer over 70 kvm
                </h3>

                <p>
                  Dersom drømmegarsjen din overstiger 70 kvm, må du være forberedt på litt mer papirarbeid:
                </p>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6 my-6">
                  <ul className="space-y-3 mb-0">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                      <span>Søknadspliktig med krav om ansvarlige foretak</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                      <span>Fagfolk må på banen - ikke tid for å være solo!</span>
                    </li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-primary bg-slate-50 p-6 my-8">
                  <p className="text-lg italic mb-0">
                    "En god planlegging i dag gir en problemfri byggetime i morgen!"
                  </p>
                </blockquote>
              </section>

              {/* Section: Lokale bestemmelser */}
              <section id="lokale-bestemmelser" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Lokale bestemmelser i Trondheim
                </h2>

                <p>
                  Når det kommer til <strong>byggetillatelser for garasje i Trondheim</strong>,
                  er det viktig å være kjent med de lokale bestemmelsene. Trondheim kommune har
                  spesifikke regler som kan påvirke både planleggingen og gjennomføringen av
                  prosjektet ditt.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-slate-900 mb-4">Trondheim kommunes krav:</h4>
                  <div className="space-y-4">
                    <div>
                      <strong>Under 50 kvm:</strong> Kan slippe søknadsplikt hvis kriteriene oppfylles
                    </div>
                    <div>
                      <strong>50-70 kvm:</strong> Søknadsplikt, men selv ansvarlig for utførelse
                    </div>
                    <div>
                      <strong>Over 70 kvm:</strong> Krever ansvarlige foretak og omfattende dokumentasjon
                    </div>
                  </div>
                </div>
              </section>

              {/* Section: Lover og forskrifter */}
              <section id="lover-forskrifter" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Lover og forskrifter du bør vite om
                </h2>

                <p>
                  Når du skal bygge garasje i Trondheim, er det avgjørende å ha kontroll på lover
                  og forskrifter som regulerer byggetillatelsen.
                </p>

                <div className="bg-slate-50 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-slate-900 mb-4">Relevante lovhenvisninger:</h4>
                  <ul className="space-y-2">
                    <li>• Plan- og bygningsloven §§ 20-3, 20-4, og 20-5</li>
                    <li>• Byggesaksforskriften (SAK10) §§ 3-1 og 4-1</li>
                  </ul>
                </div>
              </section>

              {/* Section: Sammenfatning */}
              <section id="sammenfatning" className="mt-16">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Sammenfatning
                </h2>

                <p>
                  Å bygge en <strong>garasje Trondheim</strong> kan virke som en utfordrende oppgave,
                  men med riktig informasjon er det absolutt overkommelig! De viktigste punktene å
                  huske på er at størrelsen på garasjen din vil avgjøre hva slags tillatelser du trenger.
                </p>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8">
                  <h4 className="font-bold text-green-900 mb-4">Viktige punkter å huske:</h4>
                  <ul className="space-y-2 text-green-800">
                    <li>✓ Under 50 kvm: Ofte ingen søknadsplikt (meld fra innen 4 uker)</li>
                    <li>✓ 50-70 kvm: Søknadsplikt, men du kan ta ansvar selv</li>
                    <li>✓ Over 70 kvm: Krever fagfolk og ansvarlige foretak</li>
                    <li>✓ Sjekk alltid lokale bestemmelser i Trondheim</li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-primary bg-slate-50 p-6 my-8">
                  <p className="text-lg italic mb-0">
                    "En velplanlagt garasje er et steg nærmere drømmehjemmet!"
                  </p>
                </blockquote>

                <div className="bg-primary text-white rounded-xl p-6 my-8 text-center">
                  <h4 className="font-bold mb-2">Trenger du hjelp med garasjeprosjektet?</h4>
                  <p className="mb-4 opacity-90">
                    Vi har lang erfaring med garasjebygging i Trondheim og kan hjelpe deg gjennom hele prosessen.
                  </p>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/kontakt">
                      Kontakt oss for rådgivning
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </section>

              {/* Useful Links */}
              <div className="bg-slate-50 rounded-xl p-6 my-12">
                <h4 className="font-bold text-slate-900 mb-4">Nyttige lenker:</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.trondheim.kommune.no/tema/bygg-kart-og-eiendom/byggesak/"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Trondheim kommunes nettsider for byggesaker
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://dibk.no/bygge-eller-endre/bygg-garasje-uten-a-soke"
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Direktoratet for byggkvalitet - Sjekk om du kan bygge uten å søke
                    </a>
                  </li>
                </ul>
              </div>
            </article>
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
          <Link
            href="/blog/bad-vatrom-renovering-trondheim"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
          >
            Neste artikkel
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
