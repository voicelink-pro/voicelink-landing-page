const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const siteUrl =
  configuredSiteUrl && URL.canParse(configuredSiteUrl)
    ? new URL(configuredSiteUrl)
    : undefined;

export const siteConfig = {
  name: "VoiceLink",
  description:
    "VoiceLink to głosowy asystent AI dla placówek medycznych. Odbiera wiele połączeń jednocześnie, umawia, zmienia i odwołuje wizyty oraz odpowiada na pytania pacjentów, również po godzinach pracy recepcji.",
  locale: "pl_PL",
  phone: "+48 603 076 043",
  email: "kontakt@voicelink.pl",
  logo: {
    src: "/logo-nowe.png",
    width: 122,
    height: 32,
  },
  eyebrowIcon: {
    src: "/voicewave.png",
    width: 25,
    height: 16,
  },
} as const;
