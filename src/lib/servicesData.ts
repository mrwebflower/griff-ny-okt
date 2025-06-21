import {
  Home,
  Building,
  Plus,
  Shield,
  TreePine,
  Droplets,
  Car,
  Palette,
  Hammer,
  RectangleHorizontal,
  Grid3x3,
  Wrench,
  type LucideIcon
} from "lucide-react";

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: "construction" | "renovation" | "specialized";
}

export const allServices: Service[] = [
  // Construction
  {
    id: "nybygg",
    title: "Nybygg",
    description: "Drømmer du om et nytt hjem? Vi hjelper deg med hele prosessen fra planlegging til nøkkelferdig bolig.",
    icon: Building,
    href: "/tjenester/nybygg",
    category: "construction"
  },
  {
    id: "tilbygg",
    title: "Tilbygg",
    description: "Utvid ditt hjem med våre skreddersydde tilbygg som føles som en naturlig del av huset.",
    icon: Plus,
    href: "/tjenester/tilbygg",
    category: "construction"
  },
  {
    id: "garasje",
    title: "Garasje",
    description: "Bygg en funksjonell og stilren garasje tilpasset dine behov og eiendommens stil.",
    icon: Car,
    href: "/tjenester/garasje",
    category: "construction"
  },
  {
    id: "terrasse",
    title: "Terrasse",
    description: "Få den perfekte uteplassen med en skreddersydd terrasse som varer i mange år.",
    icon: TreePine,
    href: "/tjenester/terrasse",
    category: "construction"
  },

  // Renovation
  {
    id: "rehabilitering",
    title: "Rehabilitering",
    description: "Oppgrader hjemmet ditt med vår omfattende rehabiliteringstjeneste for fullstendig renovering.",
    icon: Home,
    href: "/tjenester/rehabilitering",
    category: "renovation"
  },
  {
    id: "bad-og-vatrom",
    title: "Bad og våtrom",
    description: "Spesialister på bad og våtrom med alt fra utskifting til totalrenovering.",
    icon: Droplets,
    href: "/tjenester/bad-og-vatrom",
    category: "renovation"
  },
  {
    id: "vinduer",
    title: "Vinduer",
    description: "Utskifting og installering av energieffektive vinduer for bedre komfort og energisparing.",
    icon: RectangleHorizontal,
    href: "/tjenester/vinduer",
    category: "renovation"
  },
  {
    id: "isolering",
    title: "Isolering",
    description: "Energieffektivisering og komfortforbedring. Reduser energikostnadene betydelig.",
    icon: Shield,
    href: "/tjenester/isolering",
    category: "specialized"
  },

  // Specialized
  {
    id: "utvendig-maling",
    title: "Utvendig maling",
    description: "Beskyttelse og fornyelse av husets fasade med profesjonell utvendig maling.",
    icon: Palette,
    href: "/tjenester/utvendig-maling",
    category: "specialized"
  },
  {
    id: "malearbeid",
    title: "Malearbeid",
    description: "Kvalitetsmalerarbeid for innendørs og utendørs overflater med miljøvennlige produkter.",
    icon: Palette,
    href: "/tjenester/malearbeid",
    category: "specialized"
  },
  {
    id: "flislegging",
    title: "Flislegging",
    description: "Profesjonell flislegging for bad, kjøkken og andre rom med perfekt finish.",
    icon: Grid3x3,
    href: "/tjenester/flislegging",
    category: "specialized"
  },
  {
    id: "snekkerarbeid",
    title: "Snekkerarbeid",
    description: "Skreddersydde snekkerløsninger og treverk for alle dine behov.",
    icon: Hammer,
    href: "/tjenester/snekkerarbeid",
    category: "specialized"
  }
];

export const serviceCategories = {
  construction: {
    title: "Bygging & Konstruksjon",
    services: allServices.filter(s => s.category === "construction")
  },
  renovation: {
    title: "Renovering & Oppgradering",
    services: allServices.filter(s => s.category === "renovation")
  },
  specialized: {
    title: "Spesialtjenester",
    services: allServices.filter(s => s.category === "specialized")
  }
};

export const featuredServices = allServices.slice(0, 6);
