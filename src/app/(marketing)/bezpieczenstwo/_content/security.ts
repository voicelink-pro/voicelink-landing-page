const securityCta = {
  label: "Porozmawiajmy o bezpieczeństwie",
  href: "/kontakt",
} as const;

export const securityContent = {
  metadata: {
    title: "Bezpieczeństwo danych pacjentów",
    description:
      "Zabezpieczenia komunikacji, kontrola dostępu i zasady przechowywania danych pacjentów podczas pracy asystenta głosowego i korzystania z panelu VoiceLink Center.",
    path: "/bezpieczenstwo",
  },
  hero: {
    eyebrow: "Bezpieczeństwo",
    heading: "Bezpieczeństwo danych pacjentów w VoiceLink",
    paragraphs: [
      "Chronimy dane pacjentów poprzez zabezpieczenia komunikacji, kontrolę dostępu i zasady przechowywania danych w asystencie głosowym oraz panelu VoiceLink Center.",
    ],
    cta: securityCta,
    detailsLink: {
      label: "Jak chronimy dane",
      href: "#ochrona-pacjentow",
    },
  },
  handling: {
    id: "ochrona-pacjentow",
    eyebrow: "Obsługa pacjentów",
    heading: "Jak chronimy dane pacjentów?",
    paragraphs: [
      "Dbamy o bezpieczeństwo danych podczas rozmów, wymiany informacji z systemami placówki i pracy w panelu. Wspólnie ustalamy zakres dostępu asystenta, jego zadania i sytuacje wymagające pomocy rejestracji.",
    ],
    items: [
      {
        title: "Tylko niezbędne dane",
        paragraphs: [
          "Asystent korzysta z informacji potrzebnych do wykonania zadania - sprawdzenie terminów nie wymaga pełnej dokumentacji medycznej.",
        ],
      },
      {
        title: "Bezpieczna integracja",
        paragraphs: [
          "Przy integracji uwzględniamy szyfrowanie komunikacji, uwierzytelnianie zapytań i uprawnienia dostępu.",
        ],
      },
      {
        title: "Weryfikacja pacjenta",
        paragraphs: [
          "Ustalamy sposób weryfikacji pacjenta przed wyszukaniem, zmianą lub odwołaniem wizyty.",
        ],
      },
    ],
  },
  access: {
    id: "dostep-do-panelu",
    eyebrow: "VoiceLink Center",
    heading: "VoiceLink Center - dostęp pod kontrolą",
    description:
      "Zarządzaj asystentem i przeglądaj wyniki obsługi w jednym panelu. Dostęp do funkcji i danych zależy od roli użytkownika oraz przypisanej organizacji i placówki.",
    items: [
      {
        title: "Dostęp według roli",
        paragraphs: [
          "Rejestracja widzi podsumowania i wyniki rozmów, bez dostępu do nagrań, pełnych transkrypcji i odsłaniania danych osobowych. Serwer sprawdza uprawnienia przy każdym żądaniu.",
        ],
      },
      {
        title: "Oddzielone dane placówek",
        paragraphs: [
          "Użytkownik ma dostęp wyłącznie do przypisanych organizacji i placówek. Ograniczenia są sprawdzane zarówno w aplikacji, jak i w bazie danych.",
        ],
      },
      {
        title: "Weryfikacja tożsamości",
        paragraphs: [
          "Kierownicy i administratorzy VoiceLink logują się z dodatkowym potwierdzeniem tożsamości. Odsłonięcie pełnych danych osobowych wymaga ponownej weryfikacji, jest ograniczone czasowo i rejestrowane.",
        ],
      },
    ],
  },
  protection: {
    id: "szyfrowanie",
    eyebrow: "Treść rozmów",
    heading: "Szyfrowanie i ograniczony dostęp do treści rozmów",
    items: [
      {
        title: "Szyfrowanie danych w panelu",
        paragraphs: [
          "Komunikacja z VoiceLink Center odbywa się przez szyfrowane połączenie HTTPS. Pełne transkrypcje oraz dane objęte szczególną ochroną są dodatkowo szyfrowane na poziomie aplikacji z wykorzystaniem AES-256-GCM.",
          "Nagrania i raporty znajdują się w prywatnej, szyfrowanej przestrzeni plikowej. Dostęp do kluczy szyfrujących podlega osobnym ograniczeniom.",
        ],
      },
      {
        title: "Maskowanie danych osobowych",
        paragraphs: [
          "W standardowych widokach panel ogranicza zakres wyświetlanych informacji i maskuje rozpoznane dane osobowe, takie jak numery telefonów, adresy e-mail czy numery PESEL.",
          "Odsłonięcie pełnych danych wymaga odpowiednich uprawnień, wskazania powodu i dodatkowego potwierdzenia tożsamości. Operacja pozostawia ślad w dzienniku zdarzeń.",
        ],
      },
      {
        title: "Prywatne nagrania rozmów",
        paragraphs: [
          "Nagrania nie mają stałych publicznych adresów. Po sprawdzeniu uprawnień panel udostępnia krótkotrwały link, ważny maksymalnie przez pięć minut - lub krócej, jeśli wcześniej kończy się okres przechowywania nagrania.",
          "Udostępnienie i odtworzenie nagrania są rejestrowane.",
        ],
      },
    ],
  },
  retention: {
    id: "przechowywanie",
    eyebrow: "Przechowywanie",
    heading: "Jak długo przechowujemy dane w VoiceLink Center?",
    columns: {
      kind: "Rodzaj danych",
      rule: "Zasady przechowywania",
    },
    rows: [
      {
        kind: "Nagrania, pełne transkrypcje i bezpośrednie dane identyfikujące pacjenta",
        rule: "Do 14 dni, z dostępem zależnym od uprawnień. Po tym czasie nagrania i pełne transkrypcje są usuwane, a pozostałe treści podlegają anonimizacji lub usunięciu.",
      },
      {
        kind: "Pozostałe indywidualne rekordy rozmów",
        rule: "Do 90 dni. Po tym okresie mogą pozostać anonimowe statystyki zbiorcze, bez treści i identyfikatorów poszczególnych rozmów.",
      },
      {
        kind: "Wygenerowane pliki raportów",
        rule: "Usuwane po 7 dniach.",
      },
      {
        kind: "Kopie zapasowe",
        rule: "Szyfrowane i przechowywane rotacyjnie przez maksymalnie 35 dni.",
      },
    ],
    paragraphs: [
      "Po upływie terminu przechowywania panel blokuje dostęp do pełnych danych, nawet jeśli techniczny proces ich usuwania jeszcze trwa. Przy odtwarzaniu kopii zapasowej ponownie stosowane są reguły retencji, aby nie przywracać dostępu do danych, których okres przechowywania już minął.",
      "Powyższe terminy dotyczą VoiceLink Center. Zasady przechowywania informacji w pozostałych usługach uczestniczących w obsłudze asystenta wymagają osobnego ustalenia w ramach wdrożenia.",
    ],
  },
  monitoring: {
    id: "monitorowanie",
    eyebrow: "Nadzór",
    heading: "Rejestrowanie ważnych operacji i monitorowanie systemu",
    paragraphs: [
      "VoiceLink Center rejestruje, kto i kiedy zmienia uprawnienia, odsłania dane, korzysta z nagrań lub wykonuje działania administracyjne. Dzienniki nie zawierają treści rozmów, nagrań, haseł ani tokenów.",
      "Monitorujemy również działanie integracji, błędy przetwarzania i przestrzeganie zasad usuwania danych.",
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Bezpieczeństwo VoiceLink - najczęstsze pytania",
    description:
      "Odpowiedzi o dostępie do nagrań, miejscu przechowywania danych, szyfrowaniu połączeń i czasie retencji.",
    items: [
      {
        id: "nagrania",
        question: "Czy każdy pracownik placówki może odsłuchać nagrania?",
        answer:
          "Nie. Dostęp zależy od roli i uprawnień użytkownika. Rola pracownika rejestracji nie obejmuje dostępu do nagrań ani pełnych transkrypcji. Udostępnienie nagrania uprawnionej osobie jest rejestrowane.",
      },
      {
        id: "lokalizacja-danych",
        question: "Gdzie przechowywane są dane VoiceLink Center?",
        answer:
          "Dane panelu są przetwarzane i przechowywane w europejskich regionach infrastruktury. Dotyczy to również jego kopii zapasowych. Lokalizację przetwarzania danych przez pozostałych dostawców uczestniczących w obsłudze asystenta ustala się osobno dla danego wdrożenia.",
      },
      {
        id: "szyfrowanie-rozmowy",
        question:
          "Czy cała rozmowa telefoniczna jest szyfrowana od telefonu pacjenta do placówki?",
        answer:
          "Nie opisujemy całej rozmowy jako szyfrowanej od końca do końca. Szyfrowane połączenia panelu i integracji oraz zabezpieczenia transmisji telefonicznej to odrębne elementy. Ochrona połączenia głosowego zależy także od operatora i konfiguracji telefonii.",
      },
      {
        id: "srodowiska-testowe",
        question:
          "Czy dane pacjentów są wykorzystywane w środowiskach testowych panelu?",
        answer:
          "Dane produkcyjne VoiceLink Center nie są wykorzystywane w środowiskach testowych ani demonstracyjnych. W tych środowiskach stosujemy dane syntetyczne, przygotowane na potrzeby testów.",
      },
      {
        id: "retencja-90-dni",
        question:
          "Czy po 90 dniach znikają wszystkie dane związane z korzystaniem z panelu?",
        answer:
          "Termin 90 dni dotyczy indywidualnych rekordów rozmów. Anonimowe statystyki zbiorcze mogą pozostać dostępne. Kopie zapasowe i dzienniki audytowe podlegają odrębnym zasadom przechowywania.",
      },
    ],
  },
} as const;
