import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://ext.same-assets.com/4166723710/4128430851.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Velkommen til{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Griffentreprenor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Din lokale entreprenør i Trondheim - Vi bygger fremtiden sammen
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              ✓ 15+ års erfaring
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              ✓ Sertifiserte håndverkere
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              ✓ Lokal tilstedeværelse
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="btn-primary text-lg px-8 py-4">
              <Link href="/kontakt">
                Kontakt oss <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
              <Link href="tel:99883080">
                <Phone className="mr-2 w-5 h-5" />
                Ring oss: 99883080
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-gray-300 text-sm mb-4" style={{ color: 'white' }}>Stolte å ha tjent over 500+ kunder i Trondheim og omegn</p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2" style={{ color: 'white' }}>
                <span className="w-2 h-2 bg-primary rounded-full" />
                Sentral godkjenning
              </div>
              <div className="flex items-center gap-2" style={{ color: 'white' }}>
                <span className="w-2 h-2 bg-primary rounded-full" />
                Våtromssertifikat
              </div>
              <div className="flex items-center gap-2" style={{ color: 'white' }}>
                <span className="w-2 h-2 bg-primary rounded-full" />
                5 års garanti
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
}
