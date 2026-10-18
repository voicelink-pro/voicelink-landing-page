# Architektura

## Wdrożona struktura

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── kontakt/
│   │   │   ├── _components/
│   │   │   ├── _content/contact.ts
│   │   │   └── page.tsx
│   │   ├── przetestuj/
│   │   │   ├── _components/
│   │   │   ├── _content/test-assistant.ts
│   │   │   └── page.tsx
│   │   ├── bezpieczenstwo/
│   │   │   ├── _components/
│   │   │   ├── _content/security.ts
│   │   │   └── page.tsx
│   │   ├── cennik/
│   │   │   ├── _components/
│   │   │   ├── _content/pricing.ts
│   │   │   └── page.tsx
│   │   ├── kalkulator-oszczednosci/
│   │   │   ├── _components/
│   │   │   ├── _content/calculator.ts
│   │   │   └── page.tsx
│   │   ├── kalkulator/
│   │   │   └── page.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── _components/
│   │   │   ├── _content/blog.ts
│   │   │   └── page.tsx
│   │   ├── voicelink-center/
│   │   │   ├── _components/
│   │   │   ├── _content/center.ts
│   │   │   └── page.tsx
│   │   ├── jak-to-dziala/
│   │   │   ├── funkcje/
│   │   │   │   ├── _components/
│   │   │   │   ├── _content/functions.ts
│   │   │   │   └── page.tsx
│   │   │   ├── integracja/
│   │   │   │   ├── _components/
│   │   │   │   ├── _content/integration.ts
│   │   │   │   └── page.tsx
│   │   │   └── proces-wspolpracy/
│   │   │       ├── _components/
│   │   │       ├── _content/process.ts
│   │   │       └── page.tsx
│   │   ├── _components/hero-section.tsx
│   │   ├── _components/capabilities-section.tsx
│   │   ├── _components/benefits-section.tsx
│   │   ├── _components/try-assistant-section.tsx
│   │   ├── _components/audience-section.tsx
│   │   ├── _components/integrations-section.tsx
│   │   ├── _components/voice-link-center-section.tsx
│   │   ├── _components/security-section.tsx
│   │   ├── _content/home.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   ├── assistant-call/
│   │   │   └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── sections/
│   │   └── faq-section.tsx
│   └── ui/
├── config/
└── lib/
    ├── polish-phone.ts
    ├── contact-phone.ts
    ├── elevenlabs-outbound.ts
    ├── resend-contact.ts
    ├── supervoip-sms.ts
    └── utils.ts
```

Root layout odpowiada za dokument HTML, język, font i domyślne metadata. Layout grupy marketingowej składa wspólny nagłówek, jeden element `main`, skip link i stopkę. Strona główna jawnie składa pełnoekranowe hero oraz sekcje „Rozwiązania”, „Korzyści”, „Dla kogo”, „Integracje”, „VoiceLinkCenter”, „Bezpieczeństwo”, „Wypróbuj” i „FAQ”.

## Odpowiedzialności

- `_content/home.ts` zawiera teksty, a lokalne `_components` ich prezentację.
- `components/layout` zawiera wspólne elementy konstrukcyjne: kontener, odstępy sekcji, eyebrow nagłówków, nagłówek i stopkę. Nad nagłówkiem każdej sekcji stoi `SectionEyebrow` z `voicewave.webp`.
- `components/ui` zawiera źródłowe komponenty shadcn/ui. Nie zawiera treści marketingowych.
- `config` przechowuje publiczne dane marki, origin i model nawigacji; `lib` zawiera współdzielone `cn`, normalizację polskiego numeru, walidację numeru z formularza kontaktowego, wywołanie połączenia wychodzącego ElevenLabs, wysyłkę leada przez Resend oraz powiadomienie SMS przez SuperVoIP.
- Tokeny Tailwind v4 mają jedno źródło w `globals.css`. Pierwsza sekcja to zaokrąglony panel ze zdjęciem: strona główna używa `--page-background-image` (`public/background.webp`), a podstrony własnych tokenów, w tym `--security-hero-background-image` (`public/background-8.webp`) i `--pricing-hero-background-image` (`public/background-9.webp`) i `--contact-background-image` (`public/contact-background.webp`). Strona `/kontakt` rozciąga to tło na całą szerokość i wysokość widoku, bez zaokrąglonego panelu, a u dołu przechodzi w kolor stopki. Sekcja wyceny na `/cennik` używa `--pricing-factors-background-image` (`public/pricing-hero.webp`) z przyciemnieniem. Podstrony oznaczają hero atrybutem `data-page-hero="compact"`, co skraca obszar nagłówka do `--page-hero-compact-height`. Kolejne sekcje schodzą na globalne tło strony. Nagłówek jest `sticky`. Nad hero ze zdjęciem jest przezroczysty, z jasną nawigacją i `logo-white.png`; po przewinięciu zmienia się w biały pasek dosunięty do górnej krawędzi, z `logo-navy.png` i zaokrągleniem `--radius-3xl` tylko na dolnych rogach. Fontem strony jest Figtree. Nie wdrożono trybu ciemnego.

Podstrony `/cennik`, `/bezpieczenstwo`, `/voicelink-center`, `/jak-to-dziala/funkcje`, `/jak-to-dziala/integracja` i `/jak-to-dziala/proces-wspolpracy` mają własne metadata, canonical, dane strukturalne `FAQPage` oraz lokalne `_components` i `_content`. Są widoczne w nawigacji i sitemap. Pasek grupuje „Asystent AI” (Funkcje, VoiceLink Center, Integracje) i „Wdrożenie” (Proces współpracy, Bezpieczeństwo), a dalej prowadzi do Cennika, Kalkulatora oszczędności (`/kalkulator-oszczednosci`) oraz Bloga (`/blog`). `/blog` i `/kalkulator-oszczednosci` mają własne metadata, canonical oraz lokalne `_components` i `_content` i są w nawigacji oraz sitemap (adres `/kalkulator` przekierowuje na `/kalkulator-oszczednosci`). Strona `/o-nas` nie jest już w nawigacji, sitemap ani w katalogu tras. `/kontakt` ma własne metadata, canonical oraz lokalne `_components` i `_content`; jest w sitemap, a prowadzą do niej przyciski rozmowy i wyceny. `/przetestuj` ma własne metadata, canonical oraz lokalne `_components` i `_content`, prezentuje wyśrodkowany boks testu połączenia głosowego z licznikiem czasu rozmowy, wykrywaniem odebrania i zakończenia oraz identyfikatorami rozmowy pod konwersje reklamowe. Hero `/voicelink-center` to granatowy panel z dużym widokiem pulpitu (`public/voicelinkcenter.png`). Podstrona funkcji zawiera dodatkowo mały komponent kliencki odtwarzający plik `public/rozmowa-demonstracyjna.mp3`; cała pozostała treść pozostaje renderowana po stronie serwera.

Białe ikony liniowe są rysowane przez `components/brand-icon.tsx`: na jasnym tle dostają kolor `--primary`, a ich skala jest zrównana ze starszymi ikonami. Komponenty współdzielone nie importują z `app`. Prywatne katalogi `_components` i `_content` należą do swojej trasy. `components/sections/faq-section.tsx` jest używana przez stronę główną, `/cennik`, `/bezpieczenstwo`, `/voicelink-center`, `/jak-to-dziala/funkcje`, `/jak-to-dziala/integracja` i `/jak-to-dziala/proces-wspolpracy`; treść otrzymuje przez propsy. Animacje wejścia (`components/layout/reveal-motion.tsx`) są wspólne dla tych stron. Szablon grupy marketingowej odtwarza krótkie wejście treści (`page-enter`) przy każdym otwarciu podstrony; nagłówek i stopka zostają w miejscu. Sekcje odsłaniają elementy kaskadą, gdy wejdą w widok.

## SEO i renderowanie

Komponenty są Server Components, z wyjątkiem menu mobilnego nagłówka (`use client` wyłącznie przy interakcji Sheet), formularza na `/kontakt`, formularza testu asystenta na stronie głównej, osi etapów na stronie procesu współpracy (`use client` dla granatowego wypełnienia zależnego od scrolla) oraz płynnego przewijania. Formularz testu (hero i sekcja „Wypróbuj”) przyjmuje wyłącznie cyfry polskiego numeru. Po kompletnym numerze `POST /api/assistant-call` zamawia połączenie wychodzące ElevenLabs na ten numer. Klucz API, ID agenta i ID numeru zostają w zmiennych serwerowych. Formularz `/kontakt` przyjmuje numer jako 9 cyfr albo z prefiksem (`+`, `00` lub `48`). Po poprawnym wysłaniu `POST /api/contact` przekazuje dane leada przez Resend na skrzynki zespołu, a następnie wysyła SMS bez danych leada, o treści „VoiceLink Nowy lead - formularz.”. Klucze `RESEND_API_KEY` i `SUPERVOIP_API_TOKEN` oraz ID numeru nadawcy zostają w zmiennych serwerowych. Brak konfiguracji SMS nie blokuje zapisu leada mailem. `components/layout/smooth-scroll.tsx` montuje jedną instancję `lenis` w root layoucie, wyłącznie po stronie klienta i z własną pętlą `autoRaf`. Dotyk zostaje natywny (`syncTouch` wyłączone). Przy `prefers-reduced-motion: reduce` instancja nie powstaje. Z `globals.css` usunięto `scroll-behavior: smooth`, żeby nie dublować bezwładności i nie animować przywracania pozycji przy zmianie podstrony. Intensywność efektu ustawiają `lerp` i `wheelMultiplier` w tym komponencie. Na stronie nie ma GSAP ScrollTrigger; oś etapów czyta natywny scroll przez Motion, który Lenis aktualizuje razem z pozycją dokumentu. Canonical i sitemap powstają dopiero po ustawieniu poprawnego `NEXT_PUBLIC_SITE_URL`. Indeksowanie wymaga dodatkowo jawnego `NEXT_PUBLIC_ALLOW_INDEXING=true`; bez tego `robots.ts` blokuje crawlery. Ten mechanizm ogranicza błędną indeksację, ale nie stanowi kontroli dostępu.
