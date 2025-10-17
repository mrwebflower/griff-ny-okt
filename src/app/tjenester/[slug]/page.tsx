import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, Phone, Mail, Calendar, Clock, Users, Award, HelpCircle, Wrench, Shield, Star } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Service data from CSV
const servicesData = {
  "rehabilitering": {
    title: "Rehabilitering",
    description: "Rehabilitering av hus innebærer prosessen med å restaurere, oppgradere og forbedre et eldre eller slitt hus for å gjøre det funksjonelt, estetisk tiltalende og tilpasset moderne behov. Målet med rehabilitering er å bevare bygningens struktur og historiske karakter, samtidig som den gjøres mer effektiv, komfortabel og i stand til å møte dagens krav til komfort, sikkerhet og energi.",
    targetAudience: ["Boligeiere", "Store utleiefirma", "Eiendomsutviklere", "Investorer og eiendomsselskaper", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Rengjøring og beskyttelse av eksisterende materialer",
      "Styrking av strukturen",
      "Isolasjon og energioppgradering",
      "Restaurering av fasader",
      "Rehabilitering av taket",
      "Oppgradering av installasjoner",
      "Bevaring av arkitektoniske detaljer",
      "Fuktsikring og drenering",
      "Bruk av moderne teknologiske løsninger",
      "Tilpasning for moderne bruk"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hva er totale kostnadene for rehabiliteringen?",
        answer: "Det avhenger av omfanget av rehabiliteringen. Vi lager en detaljert plan og budsjett basert på dine spesifikke behov. Kontakt oss for en kostnadsfri vurdering."
      },
      {
        question: "Hvordan kan vi kontrollere budsjettet?",
        answer: "Vi lager en detaljert plan og budsjett, er realistiske med tidsrammer, har en buffer, og følger med på fremdriften løpende."
      },
      {
        question: "Er det nødvendig å få byggetillatelse eller godkjenning?",
        answer: "Ja, det kan være nødvendig med byggetillatelse, avhengig av hva slags arbeid som utføres. Dette inkluderer endringer på bærende konstruksjon, utvidelser, fasadeendringer, eller endring av bruken av rom."
      },
      {
        question: "Hvordan påvirker rehabiliteringen boligens verdi?",
        answer: "Rehabilitering kan øke boligens verdi betydelig hvis du forbedrer viktige områder som kjøkken, bad eller tak. Energieffektivisering og generell oppgradering gjør boligen mer attraktiv på markedet."
      },
      {
        question: "Er det mulig å bo i huset mens rehabiliteringen pågår?",
        answer: "Det avhenger av omfanget av rehabiliteringen. Vi kan planlegge arbeidet i etapper for å minimere forstyrrelser."
      },
      {
        question: "Hvilke materialer er best å bruke?",
        answer: "Vi anbefaler høykvalitetsmaterialer som keramikk, porselen, rustfritt stål for kjøkken/bad, økologisk isolasjon, eikeparkett, og vedlikeholdsfrie fasadematerialer."
      }
    ],
    heroImage: "/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg",
    images: [
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-04.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-05.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-06.webp"
    ]
  },
  "nybygg": {
    title: "Nybygg",
    description: "Nybygg refererer til prosessen med å bygge en helt ny bygning, fra grunnen av, på en tomt som enten er ubebygd eller der en gammel struktur er revet. Dette kan inkludere både boliger, kommersielle bygninger, offentlige bygg, industrihaller, eller andre typer konstruksjoner. Nybygg er en omfattende prosess som involverer flere trinn, fra planlegging og design til ferdigstillelse og innflytting.",
    targetAudience: ["Private boligkjøpere", "Investorer og utviklere", "Førstegangshusbyggere", "Boligforeninger og sameier"],
    methods: [
      "Ferdige element fra fabrikk, pre cut",
      "Modulbygging og prefabrikkering",
      "Passivhus-teknologi",
      "Smart hus-teknologi",
      "Trepanelteknologi og massivtre"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hva er kostnadene og budsjettet?",
        answer: "Det avhenger av omfanget av nybygget. Vi gir deg en detaljert kostnadsanalyse basert på dine ønsker og behov."
      },
      {
        question: "Hva er byggetid og tidsramme?",
        answer: "Det avhenger av omfanget av nybygget. Typisk tar et eneboligprosjekt 6-12 måneder fra byggestart til innflytting."
      },
      {
        question: "Hvilke byggetillatelser trenger vi?",
        answer: "Du trenger byggetillatelse, geoteknisk godkjenning, vann- og avløpstillatelse, og tiltak for universell utforming."
      },
      {
        question: "Hvordan forholder du deg til energieffektivitet og bærekraft?",
        answer: "Vi fokuserer på god isolasjon, fornybare energikilder, energieffektiv ventilasjon, bærekraftige byggematerialer og smart vannforvaltning."
      },
      {
        question: "Er det garanti på arbeidet og materialene?",
        answer: "Ja, vi gir garanti på både byggearbeidet og materialene som brukes, med varighet som kan strekke seg fra ett til flere tiår avhengig av type materiale."
      }
    ],
    heroImage: "/images/optimized/Nybygg/01-header-nybygg-griff-entreprenor.webp",
    images: [
      "/images/optimized/Nybygg/nybygg-griff-entreprenor-02.webp",
      "/images/optimized/Nybygg/nybygg-griff-entreprenor-03.webp"
    ]
  },
  "tilbygg": {
    title: "Tilbygg",
    description: "Tilbygg refererer til en konstruksjon som legges til en eksisterende bygning for å utvide den eller legge til ekstra plass og funksjonalitet. Dette kan inkludere alt fra enkle veranda eller terrasse, til mer komplekse strukturer som nye rom, garasjer, loft eller etasjer.",
    targetAudience: ["Boligeiere"],
    methods: [
      "Planlegging og design tilpasset eksisterende struktur",
      "Arkitektonisk integrasjon med hovedbygget",
      "Strukturell analyse og forsterkning",
      "Fundamentering og grunnarbeid",
      "Ramme- og takkonstruksjon",
      "Isolasjon og energieffektivisering",
      "Fasadekledning og tetting",
      "Vinduer og dører",
      "Elektriske og sanitære installasjoner",
      "Innvendig finish og detaljarbeid"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Trenger jeg byggetillatelse for tilbygg?",
        answer: "Ja, de fleste tilbygg krever byggetillatelse. Vi hjelper deg med å navigere gjennom søknadsprosessen og sørger for at alle krav er oppfylt."
      },
      {
        question: "Hvor mye koster et tilbygg?",
        answer: "Kostnaden varierer avhengig av størrelse, kompleksitet og materialer. Vi gir deg en detaljert kostnadsanalyse basert på dine spesifikke ønsker og behov."
      },
      {
        question: "Hvor lang tid tar det å bygge et tilbygg?",
        answer: "Byggetiden avhenger av prosjektets omfang, men typisk tar et tilbygg 3-8 måneder fra planlegging til ferdigstillelse."
      },
      {
        question: "Kan tilbygget integreres perfekt med eksisterende hus?",
        answer: "Ja, vi spesialiserer oss på å lage tilbygg som ser ut som en naturlig del av det opprinnelige huset, både arkitektonisk og estetisk."
      },
      {
        question: "Hvordan påvirker tilbygg boligens verdi?",
        answer: "Et godt utført tilbygg kan øke boligens verdi betydelig, ofte mer enn investeringskostnaden, spesielt hvis det tilfører ønsket ekstra plass og funksjonalitet."
      }
    ],
    heroImage: "/images/optimized/Tilbygg/01-header-tilbygg-griff-entreprenor.webp",
    images: [
      "/images/optimized/Tilbygg/tilbygg-griff-entreprenor-02.webp",
      "/images/optimized/Tilbygg/tilbygg-griff-entreprenor-03.jpg"
    ]
  },
  "isolering": {
    title: "Isolering",
    description: "Isolering er en byggteknikk som benyttes for å redusere varme- eller lydutveksling mellom ulike deler av en bygning eller mellom bygningen og dens omgivelser. Målet med isolering er å forbedre energieffektiviteten, øke komforten inne i bygningen og redusere energikostnader.",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Thermisk isolasjon for varmeregulering",
      "Akustisk isolasjon for lyddemping",
      "Fuktregulering og tetthetskontroll",
      "Installasjon av dampsperre",
      "Isolering av vegger, tak og gulv",
      "Energieffektive vinduer og dører",
      "Ventilasjonssystemer med varmegjenvinnng",
      "Bruk av miljøvennlige isolasjonsmaterialer",
      "Kvalitetskontroll og termografisk testing",
      "Sertifisert håndverk etter TEK-krav"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilke typer isolasjonsmateriater bruker dere?",
        answer: "Vi bruker høykvalitets isolasjonsmaterialer som mineralull, cellulosefiber, polyuretanskum og andre miljøvennlige alternativer tilpasset ditt prosjekt."
      },
      {
        question: "Hvor mye kan jeg spare på energiregningen?",
        answer: "Moderne isolering kan redusere energiforbruket med 30-50%, noe som gir betydelige besparelser på oppvarmingskostnadene over tid."
      },
      {
        question: "Kan dere isolere uten å rive eksisterende strukturer?",
        answer: "Ja, vi tilbyr flere metoder for etterisølering som ikke krever omfattende riving, inkludert blåseisolering og utvendig isolering."
      },
      {
        question: "Hvor lenge varer isolasjonen?",
        answer: "Kvalitetsisolering kan vare 50-100 år med riktig installasjon og vedlikehold, og gir langvarige energibesparelser."
      },
      {
        question: "Hvordan håndterer dere fukt og kondens?",
        answer: "Vi bruker dampsperre og tetthetskontroll for å forhindre fuktproblemer, og sørger for riktig ventilasjon for å opprettholde et sunt inneklima."
      }
    ],
    heroImage: "/images/optimized/Rehabilitering/01-header-rehabilitering-griff-entreprenor.jpg",
    images: [
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-02.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-03.webp"
    ]
  },
  "terrasse": {
    title: "Terrasse",
    description: "Terrassearbeid refererer til bygging, renovering eller vedlikehold av terrasser, som er uteområder vanligvis laget av tre, komposittmaterialer eller fliser. Terrasser er populære tillegg til hjem fordi de skaper en utvidet uteplass hvor mennesker kan slappe av, underholde gjester og nyte naturen.",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Planlegging og design av uteplass",
      "Grunnarbeid og drenering",
      "Fundamentering og understell",
      "Installasjon av bærekonstruksjon",
      "Legging av terrrassebord eller fliser",
      "Rekkverk og trappekonstruksjon",
      "Overflatebehandling og impregnering",
      "Integrerte sitteplasser og oppbevaring",
      "Belysning og el-installasjoner",
      "Vedlikehold og årlig service"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilke materialer anbefaler dere for terrasser?",
        answer: "Vi anbefaler høykvalitetstreverk som teak, bangkirai eller nordisk furu, samt komposittmaterialer som krever minimal vedlikehold og har lang levetid."
      },
      {
        question: "Hvor ofte trenger terrassen vedlikehold?",
        answer: "Trebaserte terrasser bør behandles årlig eller annenhvert år, mens komposittmaterialer krever minimal vedlikehold utover regelmessig rengjøring."
      },
      {
        question: "Kan dere bygge terrasser i alle værforhold?",
        answer: "Vi planlegger arbeidet etter årstid og værforhold. De fleste terrasseprosjekter utføres best i tørre måneder fra april til oktober."
      },
      {
        question: "Trenger terrassen byggetillatelse?",
        answer: "Små terrasser under 15 kvm krever vanligvis ikke byggetillatelse, men større terrasser eller de med rekkverk over 0,5m kan kreve søknad."
      },
      {
        question: "Hvor mye øker en terrasse boligens verdi?",
        answer: "En velutført terrasse kan øke boligens verdi med 5-10% og gjør hjemmet mer attraktivt for potensielle kjøpere."
      }
    ],
    heroImage: "/images/optimized/Terrasse/01-header-terrasse-griff-entreprenor.webp",
    images: [
      "/images/optimized/Terrasse/terrasse-griff-entreprenor-02.webp",
      "/images/optimized/Terrasse/terrasse-griff-entreprenor-03.webp"
    ]
  },
  "garasje": {
    title: "Garasje",
    description: "Garasjearbeid refererer til bygging, renovering, vedlikehold eller tilpasning av en garasje, som er en struktur brukt til parkering av biler eller til oppbevaring. Garasjer kan være frittståede eller tilknyttet hovedhuset, og kan variere i størrelse fra enkelt- til flercargarasjer.",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Planlegging og design av garasjeareal",
      "Grunnarbeider og fundamentering",
      "Bygging av vegger og takkonstruksjon",
      "Installasjon av garasjeporter",
      "Elektriske installasjoner og belysning",
      "Isolering og ventilasjon",
      "Gulvarbeid med dreneringsløsninger",
      "Oppbevaring og arbeidsområder",
      "Varme- og el-installasjoner",
      "Sikkerhet og adgangskontroll"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilken størrelse garasje trenger jeg?",
        answer: "Standard enkeltgarasje er 3x6 meter, mens dobbeltgarasje er 6x6 meter. Vi tilpasser størrelsen etter dine behov og tilgjengelig plass."
      },
      {
        question: "Kan garasjen brukes til andre formål enn bilparkering?",
        answer: "Ja, vi kan integrere oppbevaringsløsninger, verksteder eller hobbyrom i garasjedesignet for å maksimere funksjonaliteten."
      },
      {
        question: "Trenger garasjen isolering?",
        answer: "Isolering anbefales hvis garasjen er tilknyttet huset eller skal brukes som verksted, da det gir bedre komfort og energieffektivitet."
      },
      {
        question: "Hvilke type garasjeporter finnes?",
        answer: "Vi tilbyr både manuelle og automatiske garasjeporter i ulike materialer og design, tilpasset ditt hjem og budsjett."
      },
      {
        question: "Hvor lang tid tar garasjebygging?",
        answer: "En standard garasje tar vanligvis 2-4 uker å bygge, avhengig av størrelse, kompleksitet og værforhold."
      }
    ],
    heroImage: "/images/optimized/Garasje/01-header-garasje-griff-entreprenor.jpg",
    images: [
      "/images/optimized/Garasje/garasje-griff-entreprenor-02.webp",
      "/images/optimized/Garasje/garasje-griff-entreprenor-03.webp"
    ]
  },
  "utvendig-maling": {
    title: "Utvendig maling",
    description: "Utvendig maling refererer til prosessen med å male overflater på utsiden av en bygning eller struktur, som fasader, vegger, dører, vindusrammer og tak. Dette arbeidet utføres for å beskytte bygningens overflater mot værpåkjenninger og for å forbedre bygningens estetiske utseende.",
    targetAudience: ["Boligeiere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Overflatepreparering og rengjøring",
      "Reparasjon av skader og sprekker",
      "Grunning og spartling av underlag",
      "Riktig materialvalg for utebruk",
      "Spraymaling og penselarbeid",
      "Flerfargssystemer og dekorative teknikker",
      "Beskyttelse mot fukt og UV-stråling",
      "Miljøvennlige maling og priming",
      "Kvalitetskontroll og inspeksjon",
      "Vedlikehold og etterkontroll"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvor ofte bør huset males utvendig?",
        answer: "Typisk hvert 7-12 år avhengig av klimaforhold, materialtype og tidligere malingskvalitet. Vi vurderer tilstanden og gir deg et anbefalt vedlikeholdsintervall."
      },
      {
        question: "Hvilken type maling er best for utvendig bruk?",
        answer: "Vi anbefaler høykvalitets akrylmaling som er UV-bestandig og pustende, tilpasset norske klimaforhold og underlaget som skal males."
      },
      {
        question: "Når på året er det best å male utvendig?",
        answer: "Mai til september er ideelt, med temperaturer mellom 10-25°C og tørre forhold. Vi planlegger arbeidet etter værprognoser for best resultat."
      },
      {
        question: "Kan dere male i alle værforhold?",
        answer: "Nei, maling krever tørre forhold og riktig temperatur. Vi monitorerer været nøye og kan justere tidsplanen for optimal kvalitet."
      },
      {
        question: "Hvor lang garanti gir dere på malerarbeidet?",
        answer: "Vi gir 5-10 års garanti på vårt håndverk, avhengig av materialvalg og underlagets tilstand ved arbeidets start."
      }
    ],
    heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-07.webp",
    images: [
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-08.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-09.webp"
    ]
  },
  "bad-og-vatrom": {
    title: "Bad og våtrom",
    description: "Badarbeider og våtromsarbeider refererer til håndverkerarbeid som er relatert til installasjon, rehabilitering og oppussing av bad og våtrom. Dette inkluderer alle aspekter fra planlegging og design til fullføring av funksjonelle og estetisk tiltalende baderom og våtrom.",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    methods: [
      "Planlegging og design av våtrom",
      "Demolering og forberedelse",
      "Membran og tetting av våtrom",
      "Flislegging og overflater",
      "Rørleggerarbeid og installasjoner",
      "Elektriske installasjoner og belysning",
      "Ventilasjon og avtrekksystem",
      "Sanitære artikler og armatur",
      "Oppvarming og gulvvarme",
      "Kvalitetskontroll og sluttrapport"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvor lang tid tar en badoppussing?",
        answer: "Et standard bad tar 2-4 uker å pusse opp fullstendig, avhengig av omfanget av arbeidet og eventuelle strukturelle endringer."
      },
      {
        question: "Har dere våtromssertifikat?",
        answer: "Ja, vi er sertifiserte våtromsbyggere og følger alle NS 3420-normene for sikker og holdbar våtromsbygging."
      },
      {
        question: "Kan dere jobbe med eksisterende rør og elektriske installasjoner?",
        answer: "Ja, vi kan vurdere og oppgradere eksisterende installasjoner eller installere helt nye systemer etter behov og gjeldende forskrifter."
      },
      {
        question: "Hvilke materialer anbefaler dere for våtrom?",
        answer: "Vi anbefaler porselensfliser, keramikk eller naturstein for gulv og vegger, samt kvalitetsmembraner for tetting og vanntett bygging."
      },
      {
        question: "Gir dere garanti på våtromsarbeid?",
        answer: "Ja, vi gir 10 års garanti på våtromsarbeid og tetting, i henhold til bransjestandarder og vårt kvalitetssystem."
      }
    ],
    heroImage: "/images/optimized/bad-og-vatrom/01-header-bad-vatrom-griff-entreprenor.webp",
    images: [
      "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-02.webp",
      "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-03.webp"
    ]
  },
  "malearbeid": {
    title: "Malearbeid",
    description: "Malerarbeid refererer til de forskjellige maleroppgavene som utføres for å male og dekorere både innendørs og utendørs overflater. Dette inkluderer vegger, tak, dører, vindusrammer, og andre byggkomponenter for å beskytte dem mot skader og forbedre deres utseende.",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    methods: [
      "Overflatepreparering og spartling",
      "Grunning og priming av underlag",
      "Innendørs malerarbeid med pensler og ruller",
      "Spraymaling for store overflater",
      "Dekorative maleteknikker og effekter",
      "Lakkeringsarbeid av treverk",
      "Tapet og veggbelegg",
      "Fargerådgivning og design",
      "Miljøvennlige maling og produkter",
      "Renhold og kvalitetskontroll"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilke malingstyper anbefaler dere for innendørs bruk?",
        answer: "Vi anbefaler høykvalitets lateksmaling for vegger og tak, og alkydmaling for treverk som karm og dører for best holdbarhet og finish."
      },
      {
        question: "Kan dere hjelpe med fargevalg og design?",
        answer: "Ja, vi tilbyr fargerådgivning og kan lage fargeprøver på veggen så du kan se hvordan fargen ser ut i ditt lys før vi starter."
      },
      {
        question: "Hvor lang tid tar et malerprosjekt?",
        answer: "Et gjennomsnittlig rom tar 1-2 dager, mens et helt hus kan ta 1-2 uker avhengig av størrelse og detaljeringsgrad."
      },
      {
        question: "Bruker dere miljøvennlig maling?",
        answer: "Ja, vi prioriterer miljøvennlige og lavemisjonsmaling som er trygg for innendørs bruk og bedre for både helse og miljø."
      },
      {
        question: "Hvor ofte bør man male om innendørs?",
        answer: "Vegger bør males hvert 5-7 år ved normal bruk, mens tak kan holde 10-15 år. Høy trafikkområder kan trenge hyppigere oppfrisking."
      }
    ],
    heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-13.webp",
    images: [
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-14.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-15.webp"
    ]
  },
  "vinduer": {
    title: "Vinduer",
    description: "Vinduerarbeid refererer til alle typer arbeid som involverer installasjon, utskifting, reparasjon eller vedlikehold av vinduer i bygninger. Dette inkluderer både nye installasjoner i nybygg og utskifting av gamle vinduer i eksisterende bygninger.",
    targetAudience: ["Boligeiere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Måling og planlegging av vindusåpninger",
      "Fjerning av gamle vinduer",
      "Justering og tilpasning av åpninger",
      "Installasjon av nye vindusrammer",
      "Isolering og tetting rundt karmer",
      "Installasjon av glass og beslag",
      "Justering av vindusmekanikk",
      "Kvalitetskontroll av tetthet",
      "Finish og malerarbeid av karmer",
      "Vedlikehold og serviceinstruksjoner"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Når bør jeg skifte ut vinduene mine?",
        answer: "Vinduer bør skiftes hvis de er over 20-30 år gamle, trekker, har kondens mellom glasslagerene, eller hvis du ønsker bedre energieffektivitet."
      },
      {
        question: "Hvilke typer vinduer anbefaler dere?",
        answer: "Vi anbefaler energieffektive vinduer med 3-lags glass, god isolering og kvalitetsbeslag. Tre-alu vinduer gir god isolasjon og lang levetid."
      },
      {
        question: "Hvor mye kan jeg spare på energiregningen?",
        answer: "Nye energieffektive vinduer kan redusere varmetapet med 40-60% og gi betydelige besparelser på oppvarmingskostnadene."
      },
      {
        question: "Hvor lang tid tar vindusutskifting?",
        answer: "Utskifting av vinduer i et normalt hus tar vanligvis 1-2 dager per etasje, avhengig av antall vinduer og eventuelle tilpasninger."
      },
      {
        question: "Gir dere garanti på vindusarbeid?",
        answer: "Ja, vi gir garanti på både produkter og installasjon. Vinduene har produsentgaranti, og vi garanterer for vårt installasjonsarbeid."
      }
    ],
    heroImage: "/images/optimized/Vinduer/01-header-vinduer-griff-entreprenor.webp",
    images: [
      "/images/optimized/Vinduer/vinduer-griff-entreprenor-02.webp",
      "/images/optimized/Vinduer/vinduer-griff-entreprenor-03.webp"
    ]
  },
  "flislegging": {
    title: "Flislegging",
    description: "Flislegging er prosessen med å feste fliser på en overflate, som gulv, vegger, tak eller utendørs områder, ved hjelp av et klebemiddel eller flislim. Fliser kan være laget av keramikk, porselen, naturstein, glass eller andre materialer, og flislegging utføres for både estetiske og funksjonelle formål.",
    targetAudience: ["Boligeiere", "Leietakere og brukere"],
    methods: [
      "Overflatepreparering og planering",
      "Måling og planlegging av flisemønster",
      "Påføring av primer og flislim",
      "Legging av fliser med riktig avstand",
      "Justering og nivellering",
      "Fuging med kvalitetsfugemasse",
      "Kantlister og avslutning",
      "Rengjøring og etterbehandling",
      "Tetting og beskyttelse av sømmer",
      "Vedlikehold og rengjøringsinstruksjoner"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilke typer fliser anbefaler dere for ulike rom?",
        answer: "For bad anbefaler vi porselensfliser med lav vannabsorpsjon, for kjøkken keramiske fliser som er lett å rengjøre, og for utendørs bruk frostbestandige fliser."
      },
      {
        question: "Hvor lang tid tar flislegging?",
        answer: "Et standard bad tar 3-5 dager, mens et kjøkken kan ta 2-4 dager avhengig av området og kompleksiteten i mønsteret."
      },
      {
        question: "Kan dere legge fliser over eksisterende fliser?",
        answer: "Ja, i mange tilfeller kan vi legge nye fliser over eksisterende, forutsatt at underlaget er stabilt og i god tilstand."
      },
      {
        question: "Hvordan vedlikeholder jeg flisene etter legging?",
        answer: "Rengjør regelmessig med pH-nøytrale rengjøringsmidler, sjekk fuger årlig og tett ved behov for å opprettholde vanntetthet."
      },
      {
        question: "Hvor lenge holder fugene?",
        answer: "Kvalitetsfuger holder 10-15 år med riktig vedlikehold. Vi bruker soppresistente fuger som tåler fukt og rengjøringsmidler godt."
      }
    ],
    heroImage: "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-04.webp",
    images: [
      "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-05.webp",
      "/images/optimized/bad-og-vatrom/bad-vatrom-griff-entreprenor-06.webp"
    ]
  },
  "snekkerarbeid": {
    title: "Snekkerarbeid",
    description: "Snekkerarbeid refererer til arbeidet som utføres av en snekker, som innebærer bearbeiding og montering av tre eller trebaserte materialer for å skape ulike strukturer, møbler eller byggekomponenter. Snekkerarbeid kan variere fra enkle reparasjoner til komplekse byggeprosjekter.",
    targetAudience: ["Boligeiere", "Eiendomsutviklere", "Leietakere og brukere", "Boligforeninger og sameier"],
    methods: [
      "Måling og planlegging av trearbeider",
      "Kutting og forming av trematerialer",
      "Sammenfesting med skruer, spiker og lim",
      "Høvling og finpussing av overflater",
      "Installasjon av dører og vinduer",
      "Bygging av skreddersydde møbler",
      "Trapper og rekkverk",
      "Utskifting og reparasjon av treverk",
      "Overflatebehandling og impregnering",
      "Kvalitetskontroll og finish"
    ],
    partners: ["Mestergruppen", "Fliskonkurenten AS", "Fallrø Elektro AS", "Terje Meek", "Heat Arkitekter", "Privatmegleren"],
    certifications: [
      "Utførelse av montering av glasskonstruksjoner og fasadekledning i tiltaksklasse 2",
      "Utførelse av riving og miljøsanering i tiltaksklasse 2",
      "Utførelse av tømrerarbeid og montering av trekonstruksjoner i tiltaksklasse 2"
    ],
    faqs: [
      {
        question: "Hvilke typer snekkerarbeid tilbyr dere?",
        answer: "Vi utfører alt fra enkle reparasjoner, installasjon av dører og vinduer, til skreddersydde kjøkkeninnredninger, garderober og møbler."
      },
      {
        question: "Kan dere lage skreddersydde løsninger?",
        answer: "Ja, vi spesialiserer oss på skreddersydde løsninger tilpasset ditt hjem og dine behov, inkludert innebygde skap, hyller og møbler."
      },
      {
        question: "Hvilke trematerialer bruker dere?",
        answer: "Vi bruker høykvalitets furu, gran, eik og andre hardtresorter avhengig av prosjektet. Vi kan også jobbe med laminert tre og MDF."
      },
      {
        question: "Hvor lang tid tar snekkerprosjekter?",
        answer: "Det varierer mye avhengig av kompleksitet. Enkle jobber kan ta noen timer, mens store skreddersydde prosjekter kan ta flere uker."
      },
      {
        question: "Gir dere garanti på snekkerarbeid?",
        answer: "Ja, vi gir garanti på vårt håndverk og materialene vi bruker. Garantiperioden avhenger av type arbeid og materialer."
      }
    ],
    heroImage: "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-19.webp",
    images: [
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-20.webp",
      "/images/optimized/Rehabilitering/rehabilitering-griff-entreprenor-21.webp"
    ]
  }
};

type ServiceKey = keyof typeof servicesData;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as ServiceKey];

  if (!service) {
    return {
      title: "Tjeneste ikke funnet - Griffentreprenor",
    };
  }

  return {
    title: `${service.title} - Griffentreprenor | Profesjonell ${service.title.toLowerCase()} i Trondheim`,
    description: `${service.description.substring(0, 160)}...`,
    keywords: `${service.title.toLowerCase()} Trondheim, ${service.title.toLowerCase()} tjenester, entreprenør Trondheim, byggearbeid`,
    openGraph: {
      title: `${service.title} - Griffentreprenor`,
      description: `${service.description.substring(0, 160)}...`,
      type: "website",
      locale: "nb_NO",
    },
  };
}

export function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug,
  }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData[slug as ServiceKey];

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      {/* Breadcrumb */}
      <div className="bg-slate-50 py-4">
        <div className="container max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="hover:text-primary transition-colors">Hjem</Link>
            <span>→</span>
            <Link href="/tjenester" className="hover:text-primary transition-colors">Tjenester</Link>
            <span>→</span>
            <span className="text-slate-900">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Award className="w-4 h-4" />
                Sentralt godkjent tjeneste
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/kontakt">
                    Få gratis tilbud
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link href="tel:99883080">
                    <Phone className="mr-2 w-4 h-4" />
                    Ring oss: 99883080
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={service.heroImage}
                  alt={service.title}
                  width={600}
                  height={450}
                  className="object-cover w-full h-full"
                  priority
                  quality={75}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">15+ års erfaring</div>
                <div className="font-bold text-slate-900">Sentralt godkjent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Hvem er denne tjenesten for?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Vi tilpasser våre {service.title.toLowerCase()}stjenester til ulike kundegrupper og deres spesifikke behov.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.targetAudience.map((audience) => (
              <div key={audience} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-bold text-slate-900 mb-2">{audience}</h3>
                <p className="text-slate-600 text-sm">
                  Skreddersydde løsninger tilpasset dine spesifikke behov og krav.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods & Techniques */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Våre metoder og teknikker
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Vi bruker de mest moderne og effektive metodene for å sikre høy kvalitet og holdbarhet i alle våre {service.title.toLowerCase()}sprosjekter.
              </p>

              <div className="space-y-3">
                {service.methods.map((method) => (
                  <div key={method} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{method}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {/* Show only first 2 images for better performance */}
              {service.images.slice(0, 2).map((image, index) => (
                <div key={image} className="aspect-[16/10] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Image
                    src={image}
                    alt={`${service.title} ${index + 1}`}
                    width={480}
                    height={300}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    quality={70}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ofte stilte spørsmål
          </h2>
          <p className="text-lg text-slate-600">
            Her finner du svar på de vanligste spørsmålene om våre {service.title.toLowerCase()}stjenester.
          </p>
          <div className="space-y-6">
            {service.faqs.map((faq) => (
              <div key={faq.question} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-slate-900 mb-3">{faq.question}</h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partners */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Sertifiseringer og godkjenninger
              </h2>
              <div className="space-y-4">
                {service.certifications.map((cert) => (
                  <div key={cert} className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Våre samarbeidspartnere
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {service.partners.map((partner) => (
                  <div key={partner} className="bg-slate-50 rounded-lg p-4 text-center">
                    <Wrench className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-sm font-medium text-slate-900">{partner}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Klar for å starte ditt {service.title.toLowerCase()}sprosjekt?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Kontakt oss i dag for en kostnadsfri konsultasjon og et skreddersydd tilbud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:text-white">
              <Link href="/kontakt">
                <Mail className="mr-3 w-5 h-5" />
                Send oss en melding
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-yellow-500 text-gray-900 hover:bg-yellow-400 border-yellow-500 font-semibold">
              <Link href="tel:99883080">
                <Phone className="mr-3 w-5 h-5" />
                Ring oss nå
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/tjenester"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Tilbake til alle tjenester
        </Link>
      </div>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg p-4 z-40 md:hidden">
        <div className="flex gap-3">
          <Button asChild size="lg" className="flex-1 bg-primary hover:bg-primary/90">
            <Link href="/kontakt">
              <Mail className="mr-2 w-4 h-4" />
              Få tilbud
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-white">
            <Link href="tel:99883080">
              <Phone className="mr-2 w-4 h-4" />
              Ring nå
            </Link>
          </Button>
        </div>
      </div>

      {/* Desktop Sticky CTA Widget */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 w-80">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Trenger du hjelp?</h3>
          <div className="space-y-3">
            <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90">
              <Link href="/kontakt">
                <Mail className="mr-2 w-4 h-4" />
                Få gratis tilbud
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-white">
              <Link href="tel:99883080">
                <Phone className="mr-2 w-4 h-4" />
                Ring oss: 99883080
              </Link>
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Svar innen 24 timer
          </p>
        </div>
      </div>
    </div>
  );
}
