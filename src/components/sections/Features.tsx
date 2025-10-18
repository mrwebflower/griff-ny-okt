import { Users, Award, Wrench } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Fornøyde kunder",
    description: "Vi tror at den beste markedsføring er fornøyde kunder, og kundens ønsker er derfor i fokus uavhengig av størrelse på jobben.",
  },
  {
    icon: Award,
    title: "Solid samarbeidspartner",
    description: "Vi har godt innarbeidede rutiner, og et solid fotfeste i bransjen. Dette sammen med kontinuerlig utvikling gjør oss til en solid samarbeidspartner.",
  },
  {
    icon: Wrench,
    title: "La fagfolk gjøre jobben",
    description: "Våre fagfolk har lang erfaring fra de fleste oppdrag i bransjen, og vi jobber hardt for å alltid opprettholde en god kvalitet i arbeidet vi gjør.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-griffen-bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-griffen-text mb-4">
            Hvorfor velge Griff Entreprenør?
          </h2>
          <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
            Vi bygger på kvalitet, pålitelighet og fagkompetanse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-white p-8 rounded-xl shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6 group-hover:bg-slate-200 transition-colors">
                    <Icon className="w-8 h-8" style={{ color: '#2c3e50' }} />
                  </div>
                  <h3 className="text-2xl font-bold text-griffen-text mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-griffen-text-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional trust indicators */}
        <div className="mt-16 pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold" style={{ color: '#2c3e50' }}>500+</div>
              <div className="text-sm text-griffen-text-light">Fornøyde kunder</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-griffen-text-light">År med erfaring</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-griffen-text-light">Sertifiserte håndverkere</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-griffen-text-light">Års garanti</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
