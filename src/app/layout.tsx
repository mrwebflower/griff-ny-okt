import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Griffentreprenor - Entreprenør i Trondheim",
  description: "Griffentreprenor - Din lokale entreprenør i Trondheim. Vi tilbyr tjenester innen nybygg, rehabilitering, tilbygg og totalentreprise.",
  keywords: "entreprenør trondheim, bygg trondheim, rehabilitering, nybygg, tilbygg, garasje, bad, våtrom, terrasse, isolering",
  authors: [{ name: "Griffentreprenor AS" }],
  openGraph: {
    title: "Griffentreprenor - Entreprenør i Trondheim",
    description: "Din lokale entreprenør i Trondheim. Vi tilbyr tjenester innen nybygg, rehabilitering, tilbygg og totalentreprise.",
    type: "website",
    locale: "no_NO",
    siteName: "Griffentreprenor",
  },
  alternates: {
    canonical: "https://griffentreprenor.no",
  },
  other: {
    "geo.region": "NO-50",
    "geo.placename": "Trondheim",
    "geo.position": "63.430515;10.395053",
    "ICBM": "63.430515, 10.395053",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" className={raleway.variable}>
      <body suppressHydrationWarning className="antialiased font-raleway">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
