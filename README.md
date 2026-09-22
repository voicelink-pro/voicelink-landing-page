# VoiceLink

Minimalny fundament publicznej strony marketingowej VoiceLink zbudowany na Next.js App Router.

## Wymagania i uruchomienie

- Node.js `>=20.9.0`
- pnpm `10.33.4` (wersja zapisana w `package.json`)

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Strona będzie dostępna pod `http://localhost:3000`.

## Weryfikacja

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
```

Wszystkie kontrole można uruchomić poleceniem `pnpm check`.

## Najczęściej edytowane miejsca

- Treść strony głównej: `src/app/(marketing)/_content/home.ts`
- Kompozycja i kolejność sekcji: `src/app/(marketing)/page.tsx`
- Sekcje strony głównej: `src/app/(marketing)/_components/`
- Kolory, promienie, szerokość kontenera i odstępy sekcji: `src/app/globals.css`
- Tło strony: `public/background.png`
- Logo w nawigacji: `public/logo-nowe.png`
- Nagłówek i stopka: `src/components/layout/site-header.tsx` oraz `site-footer.tsx`
- Nazwa i opis marki: `src/config/site.ts`
- Wspólna nawigacja: `src/config/navigation.ts`

Szczegóły architektury opisuje `docs/architecture.md`, a procedury rozbudowy `docs/adding-pages.md`.

## SEO przed publikacją

Ustaw `NEXT_PUBLIC_SITE_URL` na prawdziwy origin produkcyjny oraz `NEXT_PUBLIC_ALLOW_INDEXING=true` wyłącznie w gotowej produkcji. Bez adresu canonical pozostaje celowo nieustawiony, sitemap jest pusta, a roboty otrzymują zakaz indeksowania. `robots.txt` nie zabezpiecza środowiska — podgląd wymagający ochrony należy ograniczyć mechanizmem hostingu lub uwierzytelnieniem.
