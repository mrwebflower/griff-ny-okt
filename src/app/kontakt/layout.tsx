import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt Oss - Griff Entreprenør | Få gratis tilbud på ditt byggeprosjekt",
  description: "Kontakt Griff Entreprenør for en gratis konsultasjon og tilbud på ditt byggeprosjekt. Vi svarer innen 24 timer og tilbyr alle typer byggtjenester i Trondheim.",
  keywords: "kontakt griffentreprenor, gratis tilbud, byggeprosjekt trondheim, entreprenør kontakt, byggetjenester",
  openGraph: {
    title: "Kontakt Oss - Griff Entreprenør",
    description: "Få gratis tilbud på ditt byggeprosjekt. Vi svarer innen 24 timer.",
    type: "website",
    locale: "nb_NO",
  },
};

export default function KontaktLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
