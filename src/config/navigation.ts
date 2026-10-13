export type NavigationItem = {
  label: string;
  href: `/${string}`;
  items?: readonly NavigationChild[];
};

export type NavigationChild = {
  label: string;
  href?: `/${string}`;
};

export const comingSoonLabel = "Wkrótce";

export const mainNavigation = [
  {
    label: "Rozwiązania",
    href: "/#rozwiazania",
    items: [
      { label: "VoiceLink x Czumin" },
      { label: "Infrastruktura Cyfrowa" },
    ],
  },
  {
    label: "Jak to działa",
    href: "/jak-to-dziala/proces-wspolpracy",
    items: [
      { label: "Funkcje", href: "/jak-to-dziala/funkcje" },
      { label: "Integracje", href: "/jak-to-dziala/integracja" },
      { label: "Proces współpracy", href: "/jak-to-dziala/proces-wspolpracy" },
    ],
  },
  { label: "Bezpieczeństwo", href: "/bezpieczenstwo" },
  { label: "VoiceLinkCenter", href: "/voicelink-center" },
  { label: "Cennik", href: "/cennik" },
] as const satisfies readonly NavigationItem[];

export const contactHref = "/kontakt" as const;

export const headerActions = {
  login: { label: "Zaloguj się" },
  meeting: { label: "Umów spotkanie", href: contactHref },
} as const;
