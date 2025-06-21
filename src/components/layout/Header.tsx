"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Facebook, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { serviceCategories } from "@/lib/servicesData";

const navigation = [
  { name: "FORSIDEN", href: "/" },
  { name: "OM OSS", href: "/om-oss" },
  { name: "TJENESTER", href: "/tjenester", hasDropdown: true },
  { name: "BLOGG", href: "/blog" },
  { name: "KONTAKT", href: "/kontakt" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Topbar */}
      <div className="bg-griffen-bg-dark text-white py-2">
        <div className="container flex items-center justify-between">
          <Link
            href="https://www.facebook.com/Griff-Entreprenør-109413580775921/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            Se oss på <Facebook className="w-4 h-4" />
          </Link>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <Link
              href="tel:99883080"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="w-4 h-4" />
              99883080
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
          scrolled ? "shadow-lg" : "shadow-soft-sm"
        }`}
      >
        <div className="container">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="https://ext.same-assets.com/4166723710/3732206285.png"
                alt="Griffentreprenor Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.name} className="relative" ref={dropdownRef}>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        onMouseEnter={() => setDropdownOpen(true)}
                        className="text-griffen-text font-semibold hover:text-primary transition-colors duration-300 relative group flex items-center gap-1"
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownOpen && (
                        <div
                          className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-100 py-6 z-50"
                          onMouseLeave={() => setDropdownOpen(false)}
                        >
                          <div className="px-6 mb-4">
                            <Link
                              href="/tjenester"
                              className="text-lg font-bold text-griffen-text hover:text-primary transition-colors block"
                              onClick={() => setDropdownOpen(false)}
                            >
                              Se alle tjenester →
                            </Link>
                          </div>
                          <div className="space-y-4">
                            {Object.entries(serviceCategories).map(([key, category]) => (
                              <div key={key} className="px-6">
                                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                  {category.title}
                                </h4>
                                <div className="space-y-1">
                                  {category.services.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                      <Link
                                        key={service.id}
                                        href={service.href}
                                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors group"
                                        onClick={() => setDropdownOpen(false)}
                                      >
                                        <Icon className="w-4 h-4 text-primary" />
                                        <span className="text-griffen-text group-hover:text-primary transition-colors">
                                          {service.title}
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-griffen-text font-semibold hover:text-primary transition-colors duration-300 relative group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:flex">
              <Button asChild className="btn-primary">
                <Link href="/kontakt">Kontakt oss</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden rounded-md p-2 text-griffen-text hover:bg-gray-100 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="container py-4">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => {
                  if (item.hasDropdown) {
                    return (
                      <div key={item.name} className="border-b border-gray-100 pb-4">
                        <Link
                          href={item.href}
                          className="text-griffen-text font-semibold hover:text-primary transition-colors py-2 block"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        <div className="mt-3 pl-4 space-y-2">
                          {Object.entries(serviceCategories).map(([key, category]) => (
                            <div key={key}>
                              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">
                                {category.title}
                              </h4>
                              {category.services.map((service) => {
                                const Icon = service.icon;
                                return (
                                  <Link
                                    key={service.id}
                                    href={service.href}
                                    className="flex items-center gap-2 py-1 text-sm text-griffen-text-light hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    <Icon className="w-3 h-3 text-primary" />
                                    {service.title}
                                  </Link>
                                );
                              })}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-griffen-text font-semibold hover:text-primary transition-colors py-2 border-b border-gray-100 last:border-0"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4">
                  <Button asChild className="btn-primary w-full">
                    <Link href="/kontakt" onClick={() => setMobileMenuOpen(false)}>
                      Kontakt oss
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center justify-center gap-4 pt-4 text-sm text-griffen-text-light">
                  <Link
                    href="tel:99883080"
                    className="flex items-center gap-2 hover:text-primary transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    99883080
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
