import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Building, Wrench, TreePine, Droplets, Car, Paintbrush, Shield, Grid3X3, HardHat, Square } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tjenester - Griffentreprenor | Komplett håndverkstjenester i Trondheim",
  description: "Utforsk våre håndverkstjenester: rehabilitering, nybygg, tilbygg, bad og våtrom, terrasser, isolering og mer. Sentralt godkjent i Trondheim.",
  keywords: "håndverkstjenester Trondheim, rehabilitering, nybygg, tilbygg, bad våtrom, terrasse, isolering, garasje, maling, vinduer, flislegging, snekkerarbeid",
  openGraph: {
    title: "Tjenester - Griffentreprenor | Komplett håndverkstjenester i Trondheim",
    description: "Utforsk våre håndverkstjenester: rehabilitering, nybygg, tilbygg, bad og våtrom, terrasser, isolering og mer. Sentralt godkjent i Trondheim.",
    type: "website",
    locale: "nb_NO",
  },
};

const services = [
  {
    id: "rehabilitering",
    icon: Home,
    title: "Rehabilitering",
    shortDescription: "Restaurering og oppgradering av eldre hus",
    description: "Rehabilitering av hus innebærer prosessen med å restaurere, oppgradere og forbedre et eldre eller slitt hus for å gjøre det funksjonelt, estetisk tiltalende og tilpasset moderne behov.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-1-article.jpg",
    targetAudience: ["Boligeiere", "Store utleiefirma", "Eiendomsutviklere", "Investorer og eiendomsselskaper"],
    featured: true,
  },
  {
    id: "nybygg",
    icon: Building,
    title: "Nybygg",
    shortDescription: "Nye bygninger fra grunnen av",
    description: "Nybygg refererer til prosessen med å bygge en helt ny bygning, fra grunnen av, på en tomt som enten er ubebygd eller der en gammel struktur er revet.",
    image: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-1-article.jpg",
    targetAudience: ["Private boligkjøpere", "Investorer og utviklere", "Førstegangshusbyggere", "Boligforeninger og sameier"],
    featured: true,
  },
  {
    id: "tilbygg",
    icon: Shield,
    title: "Tilbygg",
    shortDescription: "Utvidelser og tillegg til eksisterende bygninger",
    description: "Tilbygg refererer til en konstruksjon som legges til en eksisterende bygning for å utvide den eller legge til ekstra plass og funksjonalitet.",
    image: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-2-article.jpg",
    targetAudience: ["Boligeiere"],
    featured: true,
  },
  {
    id: "isolering",
    icon: Shield,
    title: "Isolering",
    shortDescription: "Energieffektivisering og komfortforbedring",
    description: "Isolering er en byggteknikk som benyttes for å redusere varme- eller lydutveksling mellom ulike deler av en bygning eller mellom bygningen og dens omgivelser.",
    image: "/assets/images/processed/article/isolering-energisparing-trondheim-202506-1-article.jpg",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: true,
  },
  {
    id: "terrasse",
    icon: TreePine,
    title: "Terrasse",
    shortDescription: "Stilfulle og funksjonelle uteplasser",
    description: "Terrassearbeid refererer til bygging, renovering eller vedlikehold av terrasser, som er uteområder vanligvis laget av tre, komposittmaterialer eller fliser.",
    image: "/assets/images/processed/article/terrasse-bygging-trondheim-202506-1-article.jpg",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: true,
  },
  {
    id: "garasje",
    icon: Car,
    title: "Garasje",
    shortDescription: "Bygging og renovering av garasjer",
    description: "Garasjearbeid refererer til bygging, renovering, vedlikehold eller tilpasning av en garasje, som er en struktur brukt til parkering av biler eller til oppbevaring.",
    image: "/assets/images/processed/article/tilbygg-bolig-trondheim-202506-3-article.jpg",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: true,
  },
  {
    id: "utvendig-maling",
    icon: Paintbrush,
    title: "Utvendig maling",
    shortDescription: "Beskyttelse og fornyelse av fasader",
    description: "Utvendig maling refererer til prosessen med å male overflater på utsiden av en bygning eller struktur, som fasader, vegger, dører, vindusrammer og tak.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-2-article.jpg",
    targetAudience: ["Boligeiere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: false,
  },
  {
    id: "bad-og-vatrom",
    icon: Droplets,
    title: "Bad og våtrom",
    shortDescription: "Spesialiserte våtromsløsninger",
    description: "Badarbeider og våtromsarbeider refererer til håndverkerarbeid som er relatert til installasjon, rehabilitering og oppussing av bad og våtrom.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-3-article.jpg",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    featured: true,
  },
  {
    id: "malearbeid",
    icon: Paintbrush,
    title: "Malearbeid",
    shortDescription: "Innvendig og utvendig maling",
    description: "Malerarbeid refererer til de forskjellige maleroppgavene som utføres for å male og dekorere både innendørs og utendørs overflater.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-4-article.jpg",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    featured: false,
  },
  {
    id: "vinduer",
    icon: Square,
    title: "Vinduer",
    shortDescription: "Installasjon og utskifting av vinduer",
    description: "Vinduerarbeid refererer til alle typer arbeid som involverer installasjon, utskifting, reparasjon eller vedlikehold av vinduer i bygninger.",
    image: "/assets/images/processed/article/vinduer-utskifting-trondheim-202506-1-article.jpg",
    targetAudience: ["Boligeiere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: false,
  },
  {
    id: "flislegging",
    icon: Grid3X3,
    title: "Flislegging",
    shortDescription: "Profesjonell flislegging for alle overflater",
    description: "Flislegging er prosessen med å feste fliser på en overflate, som gulv, vegger, tak eller utendørs områder, ved hjelp av et klebemiddel eller flislim.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-5-article.jpg",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    featured: false,
  },
  {
    id: "snekkerarbeid",
    icon: HardHat,
    title: "Snekkerarbeid",
    shortDescription: "Kvalitetshåndverk i tre og trebaserte materialer",
    description: "Snekkerarbeid refererer til arbeidet som utføres av en snekker, som innebærer bearbeiding og montering av tre eller trebaserte materialer.",
    image: "/assets/images/processed/article/rehabilitering-trondheim-202506-6-article.jpg",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    featured: false,
  },
];

export default function TjenesterPage() {
  const featuredServices = services.filter(service => service.featured);
  const otherServices = services.filter(service => !service.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              Våre <span className="text-primary">tjenester</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Som sentralt godkjent entreprenør tilbyr vi et bredt spekter av håndverkstjenester
              i Trondheim og omegn. Fra rehabilitering til nybygg - vi har kompetansen du trenger.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Sentralt godkjent
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Våtromssertifikat
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ 15+ års erfaring
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-200">
                ✓ Lokalt i Trondheim
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Våre hovedtjenester
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Disse tjenestene representerer kjernen av det vi gjør best -
              områder hvor vi har dyp ekspertise og lang erfaring.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="aspect-[16/10] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={600}
                      height={375}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        Hovedtjeneste
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {service.targetAudience.slice(0, 2).map((audience) => (
                        <span key={audience} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                          {audience}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/tjenester/${service.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Les mer om {service.title.toLowerCase()}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Andre tjenester
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Vi tilbyr også en rekke spesialiserte tjenester for å dekke alle dine byggbehov.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      quality={70}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-3 left-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                      {service.shortDescription}
                    </p>
                    <Link
                      href={`/tjenester/${service.id}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                    >
                      Les mer
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klar for å starte ditt byggeprosjekt?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Vi gir deg en kostnadsfri vurdering og et uforpliktende tilbud på ditt prosjekt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/kontakt">
                Få gratis tilbud
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
