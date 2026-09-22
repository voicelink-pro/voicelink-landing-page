export type NavigationItem = {
  label: string;
  href: `/${string}`;
};

export const mainNavigation = [
  { label: "Rozwiązania", href: "/#rozwiazania" },
  { label: "Jak to działa?", href: "/#jak-to-dziala" },
  { label: "Cennik", href: "/#cennik" },
  { label: "VoiceLinkCenter", href: "/#voicelink-center" },
  { label: "Kontakt", href: "/#kontakt" },
] as const satisfies readonly NavigationItem[];

export const headerActions = {
  login: { label: "Zaloguj się" },
  meeting: { label: "Umów spotkanie" },
} as const;
