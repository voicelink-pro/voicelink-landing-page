# Duna.com — analiza wyglądu i publicznego frontendu

Data: 9 października 2026. Źródło: https://duna.com/
Zakres: strona główna, publiczna odpowiedź HTML, osadzone arkusze CSS, pomiary w przeglądarce desktopowej i obserwacja przewijania. To nie jest audyt wszystkich podstron ani test wydajności.

## Co jest w paczce

- `duna-original-extracted.css`: bloki `<style>` wyodrębnione z publicznego HTML, zachowana kolejność. Nie zawiera wszystkich stylów inline ani stylów dodawanych później przez JavaScript.
- `duna-style-base.css`: autorska, czytelna baza do odtworzenia języka wizualnego, z nazwami klas `.duna-*`. Nie jest kopią 1:1 ani kompletną działającą stroną.
- `source-inventory.json`: adres źródła, fonty zadeklarowane w CSS, publiczne adresy skryptów i odnośnik do obrazu hero. Zasoby zewnętrzne nie są dołączone.
- `ANALIZA.md`: niniejszy opis i wskazówki wdrożeniowe.

## Technologia i dostępność kodu

HTML zawiera `meta name="generator" content="Framer 7788242"`, klasy `framer-*`, zmienne `--framer-*`, warianty responsywne SSR i moduł `script_main...mjs` z framerusercontent.com. To potwierdza publikację we Framerze. Publiczny HTML i CSS są kodem wynikowym. Nie dają dostępu do edytowalnego projektu Framera, repozytorium autora ani backendu produktu.

Skopiowanie oryginalnego CSS do innej strony nie odtworzy wyglądu: selektory są związane z konkretną strukturą DOM, zmiennymi, stylami inline i stanami komponentów. Do własnego projektu użyj bazy `duna-style-base.css`; oryginalny arkusz służy jako materiał porównawczy.

## Język wizualny

Moja interpretacja: spokojny, redakcyjny minimalizm dla produktu B2B, przełamany malarskimi ilustracjami natury. Wrażenie jakości tworzą przede wszystkim skala, oddech, konsekwencja typografii i ilustracje. Interfejs jest lekki, a duże nagłówki pozostają w wadze 400. W tekstach dominuje ciepła czerń i bardzo ciemny fiolet. Jasne karty mają ciepły, szarobeżowy odcień.

Górna ilustracja przedstawia krajobraz z górami, jeziorem i pastelowym niebem. Sekcja AI wykorzystuje błękitne niebo i chmury. Stopka wraca do górskiego pejzażu, tym razem z drzewami i głębszą zielenią. Nie są to efekty, które sam CSS zastąpi kilkoma gradientami. W kodzie hero znalazłem obraz JPG o deklarowanym rozmiarze 3024 × 1990; w obserwowanym DOM nie było elementów video.

## Zmierzone kolory

| Zastosowanie | Wartość |
|---|---|
| Tło strony | `#FFFFFF` |
| Główny nagłówek | `#222221` |
| Wiele nagłówków sekcji | `#1B0624` |
| Nawigacja / część tekstów | `#292421` |
| Opis w hero | `#898683` |
| Ciemny przycisk | `#160F0C` |
| Jasna powierzchnia | `#F7F7F5` |
| Aktywne pole akordeonu | `#EDECE7` |
| Półprzezroczysta pastylka hero | `rgba(27,6,36,.6)` |
| Nawigacja po przewinięciu | `rgba(255,255,255,.8)` z blur 5 px |

Kolory malarskich ilustracji stanowią osobną, bogatszą paletę. Nie należy traktować pojedynczego koloru z CSS jako pełnej palety ilustracji.

## Typografia — konkretne parametry

Pomiary desktopu wykonano przy obszarze treści szerokości ok. 1348 px. Wartości mobilne poniżej odczytano z CSS, nie z testu na telefonie.

| Element | Font | Rozmiar | Interlinia | Odstęp liter |
|---|---|---:|---:|---:|
| H1 | GT America Regular, 400 | 72 px | 72 px | -0.06 em |
| H2 | GT America Regular, 400 | 44 px | 48.4 px | -0.05 em |
| H3 | GT America Regular, 400 | 40 px | 48 px | -0.03 em |
| Cytat | GT America Regular, 400 | 32 px | 38.4 px | -0.03 em |
| Opis hero | GT America Regular, 400 | 24 px | 33.6 px | -0.03 em |
| Nawigacja / tekst zwykły | GT America Regular, 400 | 16 px | 24 px | -0.01 em |
| Duże wskaźniki | GT America Trial Md, 500 | 80 px | 80 px | normal |
| CTA hero | GT America Regular, 400 | 20 px | 20 px | -0.03 em |

H1: 64 px przy 720–999 px; 44 px, line-height 1.1 i tracking -0.04 em poniżej 720 px. H2: 40 px przy 720–1199 px; 36 px poniżej 720 px. Pozostałe komponenty mają także własne progi, m.in. 810 px; nie istnieje jeden uniwersalny zestaw breakpointów.

CSS deklaruje również m.in. Fragment Mono, Forum, Geist i Delight Mother. Sama obecność deklaracji nie znaczy, że font jest głównym krojem strony. Pomiar widocznych nagłówków i akapitów wskazuje GT America. W dołączonej bazie nie umieszczam plików fontów; ustaw własny plik GT America, jeśli masz odpowiednią licencję, albo świadomie zaakceptuj różnicę przy kroju zastępczym.

## Siatka i odstępy

- Większość głównych sekcji: maksymalna szerokość 1200 px, po 40 px paddingu wewnętrznego; daje to 1120 px faktycznej treści.
- Hero: wysokość 95 vh i minimum 760 px na desktopie, padding boczny 80 px. Tekst jest w dolnej części ilustracji, nie przy samej górze ekranu.
- H1: maksymalnie 800 px, wyśrodkowany. Przerwa do opisu: 32 px. Główne grupy hero dzieli odstęp 40 px.
- Przykładowa sekcja korzyści: padding pionowy 128 px, gap 48 px; CSS zmniejsza padding do 96 px na tablecie i 60 px na telefonie.
- Prezentacja produktu: dwie kolumny. Zmierzony przykład ma po 496 px i 128 px odstępu w szerokości treści 1120 px. Kolejne bloki zmieniają stronę grafiki.
- Ilustracje produktu: kwadratowe pola, radius 24 px. Akordeony: radius 16 px i padding 16 px; odstęp między pozycjami 4 px.
- Przycisk główny: radius 999 px, padding 12 × 24 px, wysokość 44 px. W nawigacji: wysokość 36 px i mniejsze odstępy.
- Nawigacja po przewinięciu zajmuje 76 px wysokości. Pozostaje u góry i rozmywa zawartość w tle.

## Kolejność i rola sekcji

1. Hero z ilustracją, małą pastylką, obietnicą produktu i jednym wyraźnym CTA.
2. Logotypy klientów jako potwierdzenie wiarygodności.
3. Trzy duże wskaźniki i opisy korzyści.
4. Referencje: logotypy, duży cytat i portret. Obserwowano automatyczne zmiany referencji.
5. Pełnoszeroka sekcja AI na tle chmur; biały tekst i jasny przycisk.
6. Cztery prezentacje obszarów produktu: nagłówek, opis, odnośnik i układ ilustracja–lista funkcji. Aktywna funkcja ma rozwinięty opis i wyróżnione tło.
7. Bezpieczeństwo jako oddzielna sekcja budująca zaufanie.
8. Trzy karty materiałów klientów.
9. Rozbudowana stopka z sześcioma kolumnami i pejzażem.

To opis architektury i kompozycji, bez kopiowania tekstów marketingowych.

## Ruch i zachowania

Potwierdzone w oglądanej stronie: zmieniające się referencje i aktywne pozycje prezentacji funkcji; nawigacja z rozmyciem podczas scrollowania. W publicznym HTML występują konfiguracje animacji wejścia typu spring oraz m.in. duration 0.6/0.8 i opóźnienia 0.3/0.5 sekundy. To wartości wybranych konfiguracji, nie uniwersalny timing całej strony. Widoczne były też przejścia tekstu przez rozmycie.

Nie potwierdzono WebGL, Three.js ani mechanizmu parallax. Nie ma podstaw, by wymagać tych technologii do odtworzenia stylu. CSS wystarczy do układu, kart, przycisków i blur; automatyczna zmiana slajdów, synchronizacja ilustracji z listą i animacje wejścia potrzebują logiki JS lub komponentów Framera.

## Jak wdrożyć własną wersję

1. Zbuduj własny HTML/React z kontenerem, hero, statystykami, referencjami i sekcjami produktu.
2. Podłącz `duna-style-base.css`. Przykładowe nazwy: `.duna-container`, `.duna-hero`, `.duna-hero__heading`, `.duna-product-grid`, `.duna-button`.
3. Dodaj font oraz własne ilustracje. Te dwie rzeczy mocno wpływają na końcowe podobieństwo.
4. Dla akordeonu można wykorzystać natywne `<details class="duna-accordion"><summary>...</summary><p>...</p></details>`. Synchronizację grafiki dopisz w JS.
5. Przełączaj klasę `.is-scrolled` na nawigacji po przewinięciu. Karuzelę referencji i reveal dopisz osobno.
6. Przetestuj długie polskie nagłówki: silnie ujemny tracking i wąski kontener zmieniają łamanie tekstu.

Baza upraszcza niektóre zachowania. Gradient hero, hover przycisków, organizacja klas, siatka mobilna i mobilne minimum wysokości są propozycją implementacji. Nie są przedstawiane jako wiernie wyciągnięty kod oryginału. Nie zawiera gotowego menu mobilnego ani kompletnego JavaScriptu.

Jeżeli celem będzie VoiceLink: można zachować rytm, typografię, dużo bieli i sposób prezentacji funkcji, a kolor przycisków oraz akcentów zmienić na #0f3784. To propozycja adaptacji; oryginalna Duna nie używa tego granatu jako głównego CTA.
