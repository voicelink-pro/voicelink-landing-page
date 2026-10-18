export type NavigationItem = {
  label: string;
  href?: `/${string}`;
  items?: readonly NavigationChild[];
};

export type NavigationChild = {
  label: string;
  href?: `/${string}`;
};

export const comingSoonLabel = "Wkrótce";

export const mainNavigation = [
  {
    label: "Asystent AI",
    href: "/#asystent-ai",
    items: [
      { label: "Funkcje", href: "/jak-to-dziala/funkcje" },
      { label: "VoiceLink Center", href: "/voicelink-center" },
      { label: "Integracje", href: "/jak-to-dziala/integracja" },
    ],
  },
  {
    label: "Wdrożenie",
    href: "/#wdrozenie",
    items: [
      {
        label: "Proces współpracy",
        href: "/jak-to-dziala/proces-wspolpracy",
      },
      { label: "Bezpieczeństwo", href: "/bezpieczenstwo" },
    ],
  },
  { label: "Cennik", href: "/cennik" },
  { label: "Kalkulator oszczędności", href: "/kalkulator-oszczednosci" },
  { label: "Blog", href: "/blog" },
] as const satisfies readonly NavigationItem[];

export const contactHref = "/kontakt" as const;

export const headerActions = {
  login: {
    label: "Zaloguj się",
    href: "https://www.voicelinkcenter.pl",
  },
  meeting: { label: "Umów spotkanie", href: contactHref },
} as const;
