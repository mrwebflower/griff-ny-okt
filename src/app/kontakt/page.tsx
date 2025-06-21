"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
  Star,
  Users,
  Calendar,
  MapPin,
  CreditCard,
  MessageSquare,
  Building,
  Home,
  Plus,
  Car,
  TreePine,
  Shield,
  Droplets,
  Palette,
  Hammer,
  RectangleHorizontal,
  Grid3x3,
  Wrench
} from "lucide-react";
import { allServices, type Service } from "@/lib/servicesData";
// Metadata will be handled by layout or wrapper component

// Form data interface
interface FormData {
  selectedServices: string[];
  intention: string;
  timeline: string;
  budgetRange: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  preferredContact: string;
  projectDescription: string;
  hearAboutUs: string;
}

const initialFormData: FormData = {
  selectedServices: [],
  intention: "",
  timeline: "",
  budgetRange: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  preferredContact: "",
  projectDescription: "",
  hearAboutUs: ""
};

const timelineOptions = [
  { value: "asap", label: "Så snart som mulig", icon: "⚡" },
  { value: "1-3-months", label: "1-3 måneder", icon: "📅" },
  { value: "3-6-months", label: "3-6 måneder", icon: "🗓️" },
  { value: "6-12-months", label: "6-12 måneder", icon: "📆" },
  { value: "planning", label: "Kun planlegging", icon: "💭" }
];

const budgetRanges = [
  { value: "under-100k", label: "Under 100.000 kr" },
  { value: "100k-300k", label: "100.000 - 300.000 kr" },
  { value: "300k-500k", label: "300.000 - 500.000 kr" },
  { value: "500k-1m", label: "500.000 - 1.000.000 kr" },
  { value: "over-1m", label: "Over 1.000.000 kr" },
  { value: "not-sure", label: "Jeg er ikke sikker" }
];

const intentionOptions = [
  { value: "quote", label: "Få pristilbud", icon: CreditCard },
  { value: "consultation", label: "Gratis konsultasjon", icon: MessageCircle },
  { value: "information", label: "Få mer informasjon", icon: MessageSquare },
  { value: "planning", label: "Hjelp med planlegging", icon: Calendar }
];

export default function Kontakt() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  // Update form data
  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Handle service selection
  const toggleService = (serviceId: string) => {
    const updatedServices = formData.selectedServices.includes(serviceId)
      ? formData.selectedServices.filter(id => id !== serviceId)
      : [...formData.selectedServices, serviceId];
    updateFormData({ selectedServices: updatedServices });
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    nextStep();
  };

  // Step validation
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.selectedServices.length > 0;
      case 2:
        return formData.intention && formData.timeline;
      case 3:
        return formData.firstName && formData.email && formData.phone;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header with Progress */}
      <div className="bg-white shadow-sm border-b">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="text-slate-600 hover:text-primary transition-colors">
              ← Tilbake til forsiden
            </Link>
            <div className="text-sm text-slate-500">
              Steg {currentStep} av {totalSteps}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <div className="text-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Hva kan vi hjelpe deg med?
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Velg tjenestene du er interessert i. Du kan velge flere.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {allServices.map((service) => {
                const Icon = service.icon;
                const isSelected = formData.selectedServices.includes(service.id);

                return (
                  <button
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      isSelected
                        ? "border-primary bg-primary text-white shadow-lg"
                        : "border-slate-200 bg-white hover:border-primary hover:shadow-md"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${isSelected ? "text-white" : "text-primary"}`} />
                    <div className={`font-medium text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                      {service.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {formData.selectedServices.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">
                    {formData.selectedServices.length} tjeneste{formData.selectedServices.length > 1 ? 'r' : ''} valgt
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Project Details */}
        {currentStep === 2 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Fortell oss om prosjektet
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Dette hjelper oss å gi deg det beste tilbudet og den beste servicen.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Intention */}
              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-4">
                  Hva ønsker du å oppnå?
                </label>
                <div className="space-y-3">
                  {intentionOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.value}
                        onClick={() => updateFormData({ intention: option.value })}
                        className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                          formData.intention === option.value
                            ? "border-primary bg-primary/5"
                            : "border-slate-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="font-medium text-slate-900">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-lg font-semibold text-slate-900 mb-4">
                  Når ønsker du å starte?
                </label>
                <div className="space-y-3">
                  {timelineOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => updateFormData({ timeline: option.value })}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        formData.timeline === option.value
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{option.icon}</span>
                        <span className="font-medium text-slate-900">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-4">
                Hva er ditt budsjett? (valgfritt)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {budgetRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => updateFormData({ budgetRange: range.value })}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      formData.budgetRange === range.value
                        ? "border-primary bg-primary/5 text-primary font-semibold"
                        : "border-slate-200 hover:border-primary/50 text-slate-700"
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-4">
                Beskriv prosjektet ditt (valgfritt)
              </label>
              <Textarea
                placeholder="Fortell oss mer om hva du ønsker å få gjort..."
                value={formData.projectDescription}
                onChange={(e) => updateFormData({ projectDescription: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </div>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Hvordan kan vi kontakte deg?
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Vi kontakter deg innen 24 timer for en gratis konsultasjon.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Fornavn *
                </label>
                <Input
                  type="text"
                  placeholder="Ola"
                  value={formData.firstName}
                  onChange={(e) => updateFormData({ firstName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Etternavn *
                </label>
                <Input
                  type="text"
                  placeholder="Nordmann"
                  value={formData.lastName}
                  onChange={(e) => updateFormData({ lastName: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  E-post *
                </label>
                <Input
                  type="email"
                  placeholder="ola@eksempel.no"
                  value={formData.email}
                  onChange={(e) => updateFormData({ email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Telefon *
                </label>
                <Input
                  type="tel"
                  placeholder="+47 999 99 999"
                  value={formData.phone}
                  onChange={(e) => updateFormData({ phone: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Adresse (valgfritt)
                </label>
                <Input
                  type="text"
                  placeholder="Gate 123, 7000 Trondheim"
                  value={formData.address}
                  onChange={(e) => updateFormData({ address: e.target.value })}
                />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-4">
                Hvordan vil du helst bli kontaktet?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "phone", label: "Telefon", icon: Phone },
                  { value: "email", label: "E-post", icon: Mail },
                  { value: "both", label: "Begge deler", icon: MessageCircle }
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      onClick={() => updateFormData({ preferredContact: option.value })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.preferredContact === option.value
                          ? "border-primary bg-primary/5"
                          : "border-slate-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium text-slate-900">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust signals */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-slate-700">100% trygg og sikker</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-slate-700">Svar innen 24 timer</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-slate-700">500+ fornøyde kunder</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <div className="text-center space-y-8 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Takk for henvendelsen!
              </h1>
              <p className="text-xl text-slate-600">
                Vi har mottatt din forespørsel og kommer til å kontakte deg innen 24 timer.
              </p>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 rounded-xl p-6 text-left">
              <h3 className="font-bold text-slate-900 mb-4">Sammendrag av din forespørsel:</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <div>
                  <strong>Tjenester:</strong> {formData.selectedServices.map(id =>
                    allServices.find(s => s.id === id)?.title
                  ).join(", ")}
                </div>
                <div>
                  <strong>Kontaktperson:</strong> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <strong>Tidslinje:</strong> {timelineOptions.find(t => t.value === formData.timeline)?.label}
                </div>
                {formData.budgetRange && (
                  <div>
                    <strong>Budsjett:</strong> {budgetRanges.find(b => b.value === formData.budgetRange)?.label}
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-primary text-white rounded-xl p-6">
              <h3 className="font-bold mb-4">Hva skjer nå?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Vi gjennomgår din forespørsel og forbereder en skreddersydd tilnærming</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Du får en oppringning eller e-post fra oss innen 24 timer</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>Vi avtaler en gratis konsultasjon og befaring om ønskelig</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/">
                  Tilbake til forsiden
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Les våre artikler
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Forrige
            </Button>

            <div className="hidden md:flex items-center gap-2 text-sm text-slate-500">
              <Phone className="w-4 h-4" />
              Trenger du hjelp? Ring oss på 99883080
            </div>

            {currentStep === 3 ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Sender..." : "Send forespørsel"}
                {!isSubmitting && <CheckCircle className="w-4 h-4" />}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!isStepValid()}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90"
              >
                Neste
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}

        {/* Help Section for early steps */}
        {currentStep < 4 && (
          <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 text-white text-center">
            <h3 className="text-xl font-bold mb-4">Trenger du hjelp med å fylle ut skjemaet?</h3>
            <p className="text-slate-300 mb-6">
              Ring oss direkte så hjelper vi deg med å finne den beste løsningen for ditt prosjekt.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="tel:99883080">
                  <Phone className="w-4 h-4 mr-2" />
                  Ring oss: 99883080
                </Link>
              </Button>
              <Button asChild variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Link href="mailto:post@griffentreprenor.no">
                  <Mail className="w-4 h-4 mr-2" />
                  Send e-post
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
