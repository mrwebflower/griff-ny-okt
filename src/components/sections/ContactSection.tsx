"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can integrate with a form service or API here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-24 bg-griffen-bg-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-griffen-text mb-4">
            Kontakt oss
          </h2>
          <p className="text-xl text-griffen-text-light max-w-2xl mx-auto">
            Vi er her for å hjelpe deg med ditt byggeprosjekt! Ta kontakt for en uforpliktende samtale.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-griffen-text mb-6">
                Ta kontakt med oss
              </h3>
              <p className="text-griffen-text-light mb-8">
                Vi er alltid klare til å hjelpe deg med spørsmål eller planlegging av ditt neste byggeprosjekt.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-soft-sm">
                <div className="bg-primary/10 rounded-full p-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-griffen-text">Telefon</h4>
                  <Link
                    href="tel:99883080"
                    className="text-griffen-text-light hover:text-primary transition-colors"
                  >
                    99883080
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-soft-sm">
                <div className="bg-primary/10 rounded-full p-3">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-griffen-text">E-post</h4>
                  <Link
                    href="mailto:griffentreprenor@gmail.com"
                    className="text-griffen-text-light hover:text-primary transition-colors"
                  >
                    griffentreprenor@gmail.com
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-soft-sm">
                <div className="bg-primary/10 rounded-full p-3 mt-1">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-griffen-text">Adresse</h4>
                  <div className="text-griffen-text-light">
                    <p>Nedre Møllenberg gate 51</p>
                    <p>7014 TRONDHEIM</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-soft-sm">
                <div className="bg-primary/10 rounded-full p-3 mt-1">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-griffen-text">Åpningstider</h4>
                  <div className="text-griffen-text-light">
                    <p>Mandag - Fredag: 07:00 - 16:00</p>
                    <p>Lørdag - Søndag: Stengt</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-soft">
            <h3 className="text-2xl font-bold text-griffen-text mb-6">
              Send oss en melding
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-griffen-text mb-2">
                  Navn <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-griffen-text mb-2">
                  Telefon
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-griffen-text mb-2">
                  E-post <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-griffen-text mb-2">
                  Melding <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Fortell oss om ditt prosjekt..."
                />
              </div>

              <Button type="submit" className="btn-primary w-full">
                Send melding
              </Button>
            </form>

            <p className="text-sm text-griffen-text-light mt-4">
              <span className="text-red-500">*</span> Påkrevde felt
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
