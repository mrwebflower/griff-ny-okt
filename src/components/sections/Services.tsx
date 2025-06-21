import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { allServices } from "@/lib/servicesData";

export default function Services() {
  return (
    <section className="py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-griffen-text mb-4">
            Våre tjenester
          </h2>
          <p className="text-xl text-griffen-text-light max-w-2xl mx-auto mb-8">
            Vi tilbyr et bredt spekter av tjenester for å møte dine behov. Ta en titt på våre spesialområder.
          </p>
        </div>

        {/* Services Grid - All 12 Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {allServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.id}
                href={service.href}
                className="group bg-white rounded-xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 hover:border-primary/20"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="bg-primary/10 group-hover:bg-primary/20 rounded-full p-4 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-primary group-hover:text-primary/80 transition-colors" />
                    </div>
                    <div className="absolute -inset-2 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-griffen-text group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-griffen-text-light leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm">Les mer</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-griffen-bg-light rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-griffen-text mb-4">
            Klar for å starte ditt prosjekt?
          </h3>
          <p className="text-griffen-text-light leading-relaxed mb-8 max-w-2xl mx-auto">
            Uansett hva ditt byggeprosjekt innebærer, har vi kompetansen og erfaringen til å levere kvalitet.
            Kontakt oss i dag for en kostnadsfri konsultasjon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="btn-primary">
              <Link href="/kontakt">
                Få et tilbud <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/tjenester">
                Se detaljer om alle tjenester
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
