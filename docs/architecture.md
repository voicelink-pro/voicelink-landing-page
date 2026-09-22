# Architektura

## Wdrożona struktura

```text
src/
├── app/
│   ├── (marketing)/
│   │   ├── _components/hero-section.tsx
│   │   ├── _components/capabilities-section.tsx
│   │   ├── _components/benefits-section.tsx
│   │   ├── _components/try-assistant-section.tsx
│   │   ├── _components/audience-section.tsx
│   │   ├── _components/integrations-section.tsx
│   │   ├── _components/voice-link-center-section.tsx
│   │   ├── _components/security-section.tsx
│   │   ├── _components/work-process-section.tsx
│   │   ├── _components/work-process-pipeline.tsx
│   │   ├── _components/contact-section.tsx
│   │   ├── _components/contact-form.tsx
│   │   ├── _components/faq-section.tsx
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
│   └── ui/
├── config/
└── lib/
```

Root layout odpowiada za dokument HTML, język, font i domyślne metadata. Layout grupy marketingowej składa wspólny nagłówek, jeden element `main`, skip link i stopkę. Strona główna jawnie składa pełnoekranowe hero oraz sekcje „Rozwiązania”, „Korzyści”, „Dla kogo”, „Integracje”, „VoiceLinkCenter”, „Bezpieczeństwo”, „Jak pracujemy”, „Wypróbuj”, „Kontakt” i „FAQ”.

## Odpowiedzialności

- `_content/home.ts` zawiera teksty, a lokalne `_components` ich prezentację.
- `components/layout` zawiera wspólne elementy konstrukcyjne: kontener, odstępy sekcji, eyebrow nagłówków, nagłówek i stopkę. Nad nagłówkiem każdej sekcji stoi `SectionEyebrow` z `voicewave.png`.
- `components/ui` zawiera źródłowe komponenty shadcn/ui. Nie zawiera treści marketingowych.
- `config` przechowuje publiczne dane marki, origin i model nawigacji; `lib` zawiera wyłącznie współdzielone `cn`.
- Tokeny Tailwind v4 mają jedno źródło w `globals.css`. Tło pierwszej sekcji to zaokrąglony panel `--page-background-image` (`public/background.png`) o wysokości pierwszego ekranu; kolejne sekcje schodzą na globalne tło strony i zostawiają widoczne dolne rogi panelu. Szklany nagłówek jest `sticky` i razem z kafelkami korzysta z `--glass`. Fontem strony jest Figtree. Nie wdrożono trybu ciemnego.

Komponenty współdzielone nie importują z `app`. Prywatne katalogi `_components` i `_content` należą do swojej trasy. Nie istnieje `components/sections`, ponieważ żadna sekcja nie ma jeszcze dwóch rzeczywistych użyć.

## SEO i renderowanie

Komponenty są Server Components, z wyjątkiem menu mobilnego nagłówka (`use client` wyłącznie przy interakcji Sheet), pipeline’u procesu wdrożenia (`use client` dla postępu zależnego od scrolla i hover) oraz formularza kontaktu (`use client` wyłącznie przy obsłudze wysyłki). Canonical i sitemap powstają dopiero po ustawieniu poprawnego `NEXT_PUBLIC_SITE_URL`. Indeksowanie wymaga dodatkowo jawnego `NEXT_PUBLIC_ALLOW_INDEXING=true`; bez tego `robots.ts` blokuje crawlery. Ten mechanizm ogranicza błędną indeksację, ale nie stanowi kontroli dostępu.
