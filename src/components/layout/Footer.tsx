import Link from "next/link";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { allServices } from "@/lib/servicesData";

export default function Footer() {
  return (
    <footer className="bg-griffen-bg-dark text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Griffentreprenor</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <p>Nedre Møllenberg gate 51</p>
                  <p>7014 TRONDHEIM</p>
                  <p className="text-sm mt-1">Org. 923 172 548</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Kontakt</h3>
            <div className="space-y-3 text-gray-300">
              <Link
                href="tel:99883080"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span>99883080</span>
              </Link>
              <Link
                href="mailto:griffentreprenor@gmail.com"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span>griffentreprenor@gmail.com</span>
              </Link>
            </div>
          </div>

          {/* All Services */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6 text-white">Alle våre tjenester</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Bygging & Konstruksjon</h4>
                <ul className="space-y-2 text-gray-300">
                  {allServices.filter(s => s.category === "construction").map((service) => (
                    <li key={service.id}>
                      <Link href={service.href} className="hover:text-primary transition-colors text-sm">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">Renovering & Spesial</h4>
                <ul className="space-y-2 text-gray-300">
                  {allServices.filter(s => s.category === "renovation" || s.category === "specialized").map((service) => (
                    <li key={service.id}>
                      <Link href={service.href} className="hover:text-primary transition-colors text-sm">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social Media & Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Følg oss</h3>
            <div className="space-y-4 text-gray-300">
              <Link
                href="https://www.facebook.com/Griff-Entreprenør-109413580775921/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5 text-primary" />
                <span>Facebook</span>
              </Link>

              <div className="pt-4">
                <h4 className="font-semibold mb-2 text-white">Sider</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/om-oss" className="hover:text-primary transition-colors">
                      Om oss
                    </Link>
                  </li>
                  <li>
                    <Link href="/blogg" className="hover:text-primary transition-colors">
                      Blogg
                    </Link>
                  </li>
                  <li>
                    <Link href="/kontakt" className="hover:text-primary transition-colors">
                      Kontakt
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 text-white">Åpningstider</h4>
              <div className="text-gray-300 space-y-1">
                <p>Mandag - Fredag: 07:00 - 16:00</p>
                <p>Lørdag - Søndag: Stengt</p>
                <p className="text-sm mt-2">Ring oss for hastesaker utenom åpningstid</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-white">Dekningsområde</h4>
              <div className="text-gray-300 space-y-1">
                <p>Trondheim og omegn</p>
                <p>Malvik, Klæbu, Melhus</p>
                <p>Stjørdal, Frosta</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © 2024 Griffentreprenor AS. Alle rettigheter forbeholdt.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm text-gray-400">
              <Link href="/personvern" className="hover:text-primary transition-colors">
                Personvern
              </Link>
              <Link href="/vilkar" className="hover:text-primary transition-colors">
                Vilkår
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
