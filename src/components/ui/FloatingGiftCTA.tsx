"use client";

import { useState } from "react";
import { Gift, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FloatingGiftCTA() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Send to backend/email service
    console.log("Form submitted:", { name, phone });

    setSubmitted(true);
    setTimeout(() => {
      setOpen(false);
      setSubmitted(false);
      setName("");
      setPhone("");
    }, 2000);
  };

  return (
    <>
      {/* Floating Gift Button - Mobile Only */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 animate-pulse"
        aria-label="Få gratis tilbud"
      >
        <Gift className="w-6 h-6" />
      </button>

      {/* Modal/Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Få gratis tilbud!</DialogTitle>
            <DialogDescription>
              Legg igjen nummeret ditt, så ringer vi deg innen 24 timer.
            </DialogDescription>
          </DialogHeader>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Navn (valgfritt)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Ditt navn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefonnummer *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="999 88 080"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  pattern="[0-9]{8}"
                  title="Vennligst skriv inn 8 siffer"
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Phone className="mr-2 w-4 h-4" />
                Ring meg opp!
              </Button>

              <p className="text-xs text-slate-500 text-center">
                Vi behandler dine personopplysninger i henhold til GDPR
              </p>
            </form>
          ) : (
            <div className="py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Takk!</h3>
              <p className="text-slate-600">Vi ringer deg snart!</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
