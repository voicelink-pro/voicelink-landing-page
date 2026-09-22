# Rozbudowa strony

## Dodanie sekcji landing page’a

1. Dodaj treści sekcji do `src/app/(marketing)/_content/home.ts`.
2. Utwórz komponent, np. `_components/capabilities-section.tsx`.
3. Użyj `Section`, `Container` i semantycznych tokenów. Nad nagłówkiem sekcji zawsze dodaj `SectionEyebrow` z ikoną fali i krótką etykietą z `_content`.
4. Zaimportuj komponent w `page.tsx` i dodaj go w docelowym miejscu:

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
    </>
  );
}
```

Zmiana kolejności polega wyłącznie na przestawieniu tych elementów w JSX. Nie twórz tablicy konfiguracji ani rendererów JSON.

## Dodanie podstrony

Dla przyszłej strony `/rozwiazania/medycyna` utwórz dopiero w momencie wdrażania:

```text
src/app/(marketing)/rozwiazania/medycyna/
├── _components/
├── _content/
└── page.tsx
```

`page.tsx` eksportuje własne metadata i jawnie składa lokalne sekcje. Dziedziczy marketingowy layout, więc nie dodaje kolejnego `main`. Canonical ustaw względnie dopiero przy dostępnej `metadataBase`. Następnie dodaj istniejący adres do `sitemap.ts`, a do `config/navigation.ts` tylko wtedy, gdy ma być widoczny w menu.

## Wyodrębnienie wspólnej sekcji

Gdy co najmniej dwie istniejące strony używają tego samego układu i zachowania:

1. Przenieś sekcję do `src/components/sections/`.
2. Zastąp treść małym, jawnie typowanym API propsów.
3. Zaktualizuj importy obu stron i usuń zastąpione pliki.
4. Sprawdź wszystkie użycia przed zmianą wspólnego API.

Jeżeli sekcje różnią się istotnie, pozostaw je lokalnie.

## Metadata i nawigacja

Każda strona ustawia opisowy tytuł, opis i własny canonical. Nie dziedziczy canonical strony głównej. Link do sekcji strony głównej zapisuj jako `/#identyfikator`, aby działał również z podstron. Po zmianach uruchom `pnpm check`.
