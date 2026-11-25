const DEFAULT_SITE_URL = "https://voicelink.pl";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const siteUrl = URL.canParse(configuredSiteUrl)
  ? new URL(configuredSiteUrl)
  : new URL(DEFAULT_SITE_URL);

export const siteConfig = {
  name: "VoiceLink",
  description:
    "VoiceLink to asystent głosowy AI dla placówek medycznych. Odbiera wiele połączeń naraz, umawia wizyty i wspiera rejestrację także po godzinach pracy.",
  locale: "pl_PL",
  phone: "+48 603 076 043",
  email: "kontakt@voicelink.pl",
  logo: {
    navy: {
      src: "/logo-navy.png",
      width: 600,
      height: 101,
    },
    white: {
      src: "/logo-white.png",
      width: 600,
      height: 103,
    },
  },
  eyebrowIcon: {
    src: "/voicewave.webp",
    width: 25,
    height: 16,
  },
  ogImage: {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: "VoiceLink — wirtualny asystent głosowy AI dla placówek medycznych",
  },
} as const;
