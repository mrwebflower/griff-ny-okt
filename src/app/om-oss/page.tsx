import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  Users,
  Award,
  Wrench,
  Shield,
  Star,
  MapPin,
  Building,
  Target,
  Heart,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Om Oss - Griff Entreprenør | Din lokale entreprenør i Trondheim",
  description: "Lær mer om Griff Entreprenør - din pålitelige entreprenør i Trondheim med over 15 års erfaring. Vi bygger kvalitet og skaper fremtiden sammen.",
  keywords: "om griffentreprenor, entreprenør trondheim, byggefirma historie, erfaring, team, kvalitet",
};

export default function OmOss() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 container text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Vår{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Historie
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
                Fra små prosjekter til store drømmer - vi har bygget tillit og kvalitet i Trondheim i over 15 år
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                🏗️ Etablert 2008
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                👥 Lokalt eid og drevet
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                ⭐ 500+ fornøyde kunder
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-griffen-text mb-6">
                  Historien bak Griff Entreprenør
                </h2>
                <div className="space-y-4 text-griffen-text-light text-lg leading-relaxed">
                  <p>
                    Griff Entreprenør ble grunnlagt i 2008 med en klar visjon: å være Trondheims mest pålitelige
                    og kvalitetsfokuserte entreprenør. Det startet som en drøm om å skape noe varig og meningsfullt
                    i byggebransjen.
                  </p>
                  <p>
                    Gjennom årene har vi vokst fra å være en liten bedrift til å bli en anerkjent aktør i regionen.
                    Vår suksess bygger på enkle, men kraftige prinsipper: kvalitet i alt vi gjør, ærlighet i all
                    kommunikasjon, og en genuin omsorg for våre kunders ønsker og behov.
                  </p>
                  <p>
                    I dag er vi stolte av å ha levert over 500 prosjekter og ha bygget langsiktige relasjoner
                    med både private og kommersielle kunder i Trondheim og omegn.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="/images/optimized/Nybygg/nybygg-griff-entreprenor-02.webp"
                  alt="Nybyggprosjekt i Trondheim"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-lg object-cover h-64"
                  quality={75}
                />
                <Image
                  src="/images/optimized/Tilbygg/tilbygg-griff-entreprenor-02.webp"
                  alt="Tilbyggprosjekt i Trondheim"
                  width={300}
                  height={400}
                  className="rounded-lg shadow-lg object-cover h-64 mt-8"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-24 bg-griffen-bg-light">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-griffen-text mb-4">
              Våre Verdier og Visjon
            </h2>
            <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
              Det som driver oss fremover hver dag
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="group bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6 group-hover:bg-slate-200 transition-colors">
                  <Heart className="w-8 h-8" style={{ color: '#2c3e50' }} />
                </div>
                <h3 className="text-2xl font-bold text-griffen-text mb-4">
                  Kundefokus
                </h3>
                <p className="text-griffen-text-light leading-relaxed">
                  Våre kunders ønsker og behov står alltid i sentrum. Vi lytter, forstår og leverer løsninger
                  som overgår forventningene.
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6 group-hover:bg-slate-200 transition-colors">
                  <Shield className="w-8 h-8" style={{ color: '#2c3e50' }} />
                </div>
                <h3 className="text-2xl font-bold text-griffen-text mb-4">
                  Kvalitet og Sikkerhet
                </h3>
                <p className="text-griffen-text-light leading-relaxed">
                  Vi setter aldri kvalitet på spill. Hver detalj er nøye planlagt og utført med høyeste
                  standard for sikkerhet og holdbarhet.
                </p>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6 group-hover:bg-slate-200 transition-colors">
                  <TrendingUp className="w-8 h-8" style={{ color: '#2c3e50' }} />
                </div>
                <h3 className="text-2xl font-bold text-griffen-text mb-4">
                  Kontinuerlig Utvikling
                </h3>
                <p className="text-griffen-text-light leading-relaxed">
                  Vi holder oss oppdaterte på nye teknologier, metoder og materialer for å tilby
                  de beste løsningene til våre kunder.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-12 text-white text-center">
            <Target className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
            <h3 className="text-3xl font-bold mb-6">Vår Visjon</h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              "Å være Trondheims foretrukne entreprenør ved å levere eksepsjonell kvalitet,
              bygge varige relasjoner og skape verdier som holder i generasjoner. Vi skal være
              partneren våre kunder stoler på for å realisere sine drømmer og visjoner."
            </p>
          </div>
        </div>
      </section>

      {/* Experience & Expertise Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-griffen-text mb-4">
              Erfaring og Ekspertise
            </h2>
            <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
              Over 15 år med byggeerfaring i Trondheim og omegn
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">15+</div>
              <div className="text-griffen-text-light">År med erfaring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">500+</div>
              <div className="text-griffen-text-light">Fullførte prosjekter</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">12</div>
              <div className="text-griffen-text-light">Spesialiserte tjenester</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-800 mb-2">98%</div>
              <div className="text-griffen-text-light">Kundetilfredshet</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-griffen-text mb-6">Våre Spesialområder</h3>
              <div className="space-y-4">
                {[
                  "Rehabilitering og restaurering",
                  "Nybygg og tilbygg",
                  "Bad- og våtromsrenovering",
                  "Isolering og energioppgradering",
                  "Terrasser og utendørsområder",
                  "Snekkerarbeid og innredning"
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-griffen-text-light">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-griffen-text mb-6">Sertifiseringer og Godkjenninger</h3>
              <div className="space-y-4">
                {[
                  "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2",
                  "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
                  "Utførelse av riving og miljøsanering i tiltaksklasse 2",
                  "Medlem av Mestergruppen",
                  "Godkjent av Direktoratet for byggkvalitet"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <span className="text-griffen-text-light text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-griffen-bg-light">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-griffen-text mb-4">
              Vår Reise Gjennom Årene
            </h2>
            <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
              Milepæler som har formet oss til det vi er i dag
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {[
                {
                  year: "2024",
                  title: "Fremtiden er nå",
                  description: "Fortsetter å innovere og levere fremtidens byggeløsninger til våre kunder."
                },
                {
                  year: "2020",
                  title: "Bærekraft i fokus",
                  description: "Spesialiserte oss på energieffektive løsninger og miljøvennlige materialer."
                },
                {
                  year: "2018",
                  title: "Digitalisering og modernisering",
                  description: "Implementerte moderne prosjektstyringsverktøy og digitale løsninger."
                },
                {
                  year: "2015",
                  title: "Sertifisering og anerkjennelse",
                  description: "Oppnådde godkjenning i tiltaksklasse 2 og ble medlem av Mestergruppen."
                },
                {
                  year: "2012",
                  title: "Utvidelse av tjenester",
                  description: "Utvidet til å inkludere rehabilitering og større nybyggprosjekter."
                },
                {
                  year: "2008",
                  title: "Oppstart av Griff Entreprenør",
                  description: "Grunnlagt med en visjon om å levere kvalitetsarbeid i Trondheim-regionen."
                }
              ].map((milestone, index) => (
                <div key={milestone.year} className="flex items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-lg shadow-soft">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-2xl font-bold text-slate-800">{milestone.year}</span>
                        <Clock className="w-5 h-5 text-griffen-text-light" />
                      </div>
                      <h3 className="text-xl font-bold text-griffen-text mb-2">{milestone.title}</h3>
                      <p className="text-griffen-text-light">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-griffen-text mb-4">
              Møt Teamet
            </h2>
            <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
              Fagfolk som brenner for kvalitet og kundetilfredshet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Users className="w-16 h-16 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-griffen-text mb-2">Ledelse og Administrasjon</h3>
              <p className="text-griffen-text-light">
                Erfarne ledere som sikrer kvalitet og fremdrift i alle prosjekter
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Wrench className="w-16 h-16 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-griffen-text mb-2">Sertifiserte Håndverkere</h3>
              <p className="text-griffen-text-light">
                Fagutdannede håndverkere med spesialkompetanse innen sine felt
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Building className="w-16 h-16 text-slate-600" />
              </div>
              <h3 className="text-xl font-bold text-griffen-text mb-2">Prosjektledelse</h3>
              <p className="text-griffen-text-light">
                Dedikerte prosjektledere som sikrer fremdrift og kommunikasjon
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-griffen-text mb-4">Vår Arbeidsfilosofi</h3>
                <p className="text-griffen-text-light leading-relaxed mb-6">
                  Vi tror på at de beste resultatene oppnås når alle jobber sammen mot et felles mål.
                  Vårt team består av dedikerte fagfolk som deler samme verdier og fokus på kvalitet.
                </p>
                <div className="space-y-3">
                  {[
                    "Kontinuerlig faglig utvikling",
                    "Trygg og inkluderende arbeidskultur",
                    "Fokus på sikkerhet og kvalitet",
                    "Samarbeid og teamwork"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Star className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                      <span className="text-griffen-text-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Image
                  src="/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp"
                  alt="Griff Entreprenør prosjekt - Terrasse"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg mx-auto"
                  quality={75}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="container">
          <div className="text-center text-white space-y-8">
            <h2 className="text-4xl font-bold">
              Klar for å Starte Ditt Neste Prosjekt?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              La oss hjelpe deg med å realisere dine byggdrømmer. Kontakt oss i dag for en kostnadsfri konsultasjon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
                <Link href="/kontakt">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Konsultasjon
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4">
                <Link href="tel:+4799999999">
                  <Phone className="w-5 h-5 mr-2" />
                  Ring oss nå
                </Link>
              </Button>
            </div>

            <div className="pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <MapPin className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <h3 className="font-bold mb-2">Lokasjon</h3>
                  <p className="text-gray-300">Trondheim og omegn</p>
                </div>
                <div>
                  <Phone className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <h3 className="font-bold mb-2">Telefon</h3>
                  <p className="text-gray-300">+47 999 99 999</p>
                </div>
                <div>
                  <Mail className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                  <h3 className="font-bold mb-2">E-post</h3>
                  <p className="text-gray-300">post@griffentreprenor.no</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
