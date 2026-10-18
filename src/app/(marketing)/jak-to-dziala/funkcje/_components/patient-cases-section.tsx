import { Container } from "@/components/layout/container";
import { RevealGroup, RevealItem } from "@/components/layout/reveal-motion";
import { Section } from "@/components/layout/section";

import { functionsContent } from "../_content/functions";
import { FunctionShowcase } from "./function-showcase";

const visuals = {
  "Umawianie, przekładanie i odwoływanie wizyt": {
    icon: "/kalendarz.webp",
    image: "/umawianie-wizyty.webp",
  },
  "Automatyczne potwierdzenia i przypomnienia SMS": {
    icon: "/powiadomienia.webp",
    image: "/przypomnienie.webp",
  },
  "Potwierdzanie obecności odpowiedzią na SMS": {
    icon: "/TAK.webp",
    image: "/potwierdzenie-tak.webp",
  },
  "Odpowiedzi na pytania o placówkę, lekarzy i usługi": {
    icon: "/informacja.webp",
    image: "/baza-wiedzy.webp",
  },
  "Wsparcie w wyborze specjalisty": {
    icon: "/triaz.webp",
    image: "/dobor-spec.webp",
  },
  "Przyjmowanie zgłoszeń o receptę": {
    icon: "/recepta.webp",
    image: "/recepta-prosba.webp",
  },
  "Rozmowy w różnych językach": {
    icon: "/jezyki.webp",
    image: "/multilan.webp",
  },
  "Obsługa wielu rozmów jednocześnie": {
    icon: "/telefon.webp",
    image: "/rozmowy-jednoczesnie.webp",
  },
  "Odbieranie połączeń poza godzinami rejestracji": {
    icon: "/zegar.webp",
    image: "/dostepnosc.webp",
  },
  "Wsparcie rejestracji, gdy linia jest zajęta": {
    icon: "/wsparcie.webp",
    image: "/zajeta-linia.webp",
  },
  "Przekierowanie rozmowy do rejestracji": {
    icon: "/przekierowanie.webp",
    image: "/eskalacja.webp",
  },
} as const;

export function PatientCasesSection() {
  return (
    <>
      {functionsContent.functions.groups.map((group, index) => (
        <Section
          key={group.id}
          id={index === 0 ? "funkcje" : group.id}
          aria-labelledby={`${group.id}-heading`}
          className="scroll-mt-[var(--site-header-height)] bg-background"
        >
          <Container className="flex flex-col gap-8 sm:gap-10 lg:gap-12">
            <RevealGroup className="flex max-w-3xl flex-col gap-4">
              <RevealItem>
                <h2 id={`${group.id}-heading`} className="section-title">
                  {group.heading}
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="section-lede">{group.description}</p>
              </RevealItem>
            </RevealGroup>
            <FunctionShowcase
              items={group.items.map((item) => ({
                ...item,
                ...visuals[item.title],
              }))}
            />
          </Container>
        </Section>
      ))}
    </>
  );
}
