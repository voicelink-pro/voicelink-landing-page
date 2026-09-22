# VoiceLink — instrukcje dla agentów

## Stack i komendy

- Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS 4, shadcn/ui (Base UI), pnpm.
- `pnpm dev` — środowisko lokalne.
- `pnpm lint`, `pnpm typecheck`, `pnpm format:check`, `pnpm build` — wymagane kontrole.
- `pnpm check` — wszystkie kontrole w ustalonej kolejności.

Przed pracą przeczytaj ten plik, sprawdź `git status` i właściwe pliki. Zachowuj zmiany użytkownika. Nie wykonuj niezwiązanych migracji, aktualizacji głównych wersji ani refaktorów.

## Odpowiedzialności katalogów

- `src/app/` — routing, layouty, metadata i elementy lokalne dla tras.
- `src/app/(marketing)/_components/` i `_content/` — sekcje oraz treści wyłącznie strony głównej.
- Prywatne `_components/` i `_content/` przyszłej podstrony umieszczaj przy jej trasie.
- `src/components/ui/` — bazowe komponenty shadcn bez treści VoiceLink.
- `src/components/layout/` — wspólna konstrukcja strony.
- `src/components/sections/` — dopiero dla sekcji faktycznie używanej przez co najmniej dwie strony.
- `src/config/` — publiczna konfiguracja marki i nawigacji.
- `src/lib/` — małe współdzielone funkcje bez logiki stron.

## Granice i konwencje

- Strony mogą importować elementy lokalne i współdzielone; kod współdzielony nie importuje z `src/app/`.
- Jedna trasa nie importuje prywatnych elementów innej trasy. `config` i `lib` nie importują stron ani sekcji.
- Nie twórz równoległych `pages`, `views`, `screens`, rejestru sekcji ani uniwersalnych sekcji sterowanych wieloma flagami.
- Strona jawnie składa sekcje w JSX i ustala ich kolejność. Marketingowy layout jest właścicielem `main`.
- Stosuj kebab-case dla plików, PascalCase dla komponentów, named exports dla własnych komponentów i alias `@/`.

## Server Components i UI

- Domyślnie używaj Server Components. `use client` dodawaj możliwie blisko interakcji wymagającej stanu lub API przeglądarki.
- Statycznych treści nie pobieraj przez `useEffect`. Nie dodawaj providerów, store ani bibliotek bez rzeczywistej potrzeby.
- Nowy element interaktywny najpierw sprawdź w shadcn/ui. Instaluj wyłącznie potrzebne komponenty przez pnpm i sprawdzaj wygenerowany kod.
- Używaj tokenów z `src/app/globals.css`; nie rozrzucaj kolorów po komponentach. Zmiana tokenu lub wspólnego komponentu jest zmianą globalną — przed edycją znajdź i sprawdź wszystkie użycia.
- Treść sekcji przechowuj w lokalnym `_content`, a markup w `_components`.

## Rozbudowa i zakończenie pracy

- Nową sekcję strony głównej dodaj lokalnie i jawnie w `page.tsx`. Kolejność zmieniaj wyłącznie w kompozycji strony.
- Nowa podstrona ma własne `page.tsx`, metadata, canonical oraz lokalne `_components` i `_content`. Dodawaj ją do nawigacji i sitemap tylko, gdy istnieje i ma być publiczna.
- Wspólną sekcję wyodrębnij dopiero po drugim rzeczywistym użyciu; różnice przekazuj przez małe API propsów.
- Usuwaj zastąpiony martwy kod. Aktualizuj dokumentację, gdy zmienia się architektura.
- Przed zakończeniem uruchom co najmniej lint, typecheck, format check i build. Nie wyłączaj kontroli, aby uzyskać zielony wynik.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
