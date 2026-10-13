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
│   │   ├── bezpieczenstwo/
│   │   │   ├── _components/
│   │   │   ├── _content/security.ts
│   │   │   └── page.tsx
│   │   ├── cennik/
│   │   │   ├── _components/
│   │   │   ├── _content/pricing.ts
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
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   ├── sections/faq-section.tsx
│   └── ui/
├── config/
└── lib/
```

Root layout odpowiada za dokument HTML, język, font i domyślne metadata. Layout grupy marketingowej składa wspólny nagłówek, jeden element `main`, skip link i stopkę. Strona główna jawnie składa pełnoekranowe hero oraz sekcje „Rozwiązania”, „Korzyści”, „Dla kogo”, „Integracje”, „VoiceLinkCenter”, „Bezpieczeństwo”, „Wypróbuj” i „FAQ”.

## Odpowiedzialności

- `_content/home.ts` zawiera teksty, a lokalne `_components` ich prezentację.
- `components/layout` zawiera wspólne elementy konstrukcyjne: kontener, odstępy sekcji, eyebrow nagłówków, nagłówek i stopkę. Nad nagłówkiem każdej sekcji stoi `SectionEyebrow` z `voicewave.webp`.
- `components/ui` zawiera źródłowe komponenty shadcn/ui. Nie zawiera treści marketingowych.
- `config` przechowuje publiczne dane marki, origin i model nawigacji; `lib` zawiera wyłącznie współdzielone `cn`.
- Tokeny Tailwind v4 mają jedno źródło w `globals.css`. Pierwsza sekcja to zaokrąglony panel ze zdjęciem: strona główna używa `--page-background-image` (`public/background.png`), a podstrony własnych tokenów, w tym `--security-hero-background-image` (`public/background-8.png`) i `--pricing-hero-background-image` (`public/background-9.png`) i `--contact-background-image` (`public/contact-background.png`). Strona `/kontakt` rozciąga to tło na całą szerokość i wysokość widoku, bez zaokrąglonego panelu, a u dołu przechodzi w kolor stopki. Sekcja wyceny na `/cennik` używa `--pricing-factors-background-image` (`public/pricing-hero.png`) z przyciemnieniem. Podstrony oznaczają hero atrybutem `data-page-hero="compact"`, co skraca obszar nagłówka do `--page-hero-compact-height`. Kolejne sekcje schodzą na globalne tło strony. Nagłówek jest `sticky`. Nad hero ze zdjęciem jest przezroczysty, z jasną nawigacją i `logo-white.png`; po przewinięciu zmienia się w biały pasek dosunięty do górnej krawędzi, z `logo-navy.png` i zaokrągleniem `--radius-3xl` tylko na dolnych rogach. Fontem strony jest Figtree. Nie wdrożono trybu ciemnego.

Podstrony `/cennik`, `/bezpieczenstwo`, `/voicelink-center`, `/jak-to-dziala/funkcje`, `/jak-to-dziala/integracja` i `/jak-to-dziala/proces-wspolpracy` mają własne metadata, canonical, dane strukturalne `FAQPage` oraz lokalne `_components` i `_content`. Są widoczne w nawigacji i sitemap. `/kontakt` ma własne metadata, canonical i lokalny formularz; jest w sitemap, a prowadzą do niej przyciski rozmowy i wyceny. Hero `/voicelink-center` to granatowy panel z dużym widokiem pulpitu (`public/voicelinkcenter.png`). Podstrona funkcji zawiera dodatkowo mały komponent kliencki odtwarzający plik `public/rozmowa-demonstracyjna.mp3`; cała pozostała treść pozostaje renderowana po stronie serwera.

Białe ikony liniowe są rysowane przez `components/brand-icon.tsx`: na jasnym tle dostają kolor `--primary`, a ich skala jest zrównana ze starszymi ikonami. Komponenty współdzielone nie importują z `app`. Prywatne katalogi `_components` i `_content` należą do swojej trasy. `components/sections/faq-section.tsx` jest używana przez stronę główną, `/cennik`, `/bezpieczenstwo`, `/voicelink-center`, `/jak-to-dziala/funkcje`, `/jak-to-dziala/integracja` i `/jak-to-dziala/proces-wspolpracy`; treść otrzymuje przez propsy. Animacje wejścia (`components/layout/reveal-motion.tsx`) są wspólne dla tych stron. Szablon grupy marketingowej odtwarza krótkie wejście treści (`page-enter`) przy każdym otwarciu podstrony; nagłówek i stopka zostają w miejscu. Sekcje odsłaniają elementy kaskadą, gdy wejdą w widok.

## SEO i renderowanie

Komponenty są Server Components, z wyjątkiem menu mobilnego nagłówka (`use client` wyłącznie przy interakcji Sheet), formularza na `/kontakt`, osi etapów na stronie procesu współpracy (`use client` dla granatowego wypełnienia zależnego od scrolla) oraz płynnego przewijania. `components/layout/smooth-scroll.tsx` montuje jedną instancję `lenis` w root layoucie, wyłącznie po stronie klienta i z własną pętlą `autoRaf`. Dotyk zostaje natywny (`syncTouch` wyłączone). Przy `prefers-reduced-motion: reduce` instancja nie powstaje. Z `globals.css` usunięto `scroll-behavior: smooth`, żeby nie dublować bezwładności i nie animować przywracania pozycji przy zmianie podstrony. Intensywność efektu ustawiają `lerp` i `wheelMultiplier` w tym komponencie. Na stronie nie ma GSAP ScrollTrigger; oś etapów czyta natywny scroll przez Motion, który Lenis aktualizuje razem z pozycją dokumentu. Canonical i sitemap powstają dopiero po ustawieniu poprawnego `NEXT_PUBLIC_SITE_URL`. Indeksowanie wymaga dodatkowo jawnego `NEXT_PUBLIC_ALLOW_INDEXING=true`; bez tego `robots.ts` blokuje crawlery. Ten mechanizm ogranicza błędną indeksację, ale nie stanowi kontroli dostępu.
