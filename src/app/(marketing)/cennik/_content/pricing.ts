const quoteCta = {
  label: "Poproś o wycenę",
  href: "/kontakt",
} as const;

export const pricingContent = {
  metadata: {
    title: "Cennik asystenta głosowego",
    description:
      "Jednorazowa opłata za wdrożenie, potem miesięczny abonament. Wycenę dopasowujemy do systemów, funkcji i skali obsługi Twojej placówki.",
    path: "/cennik",
  },
  hero: {
    eyebrow: "Cennik",
    heading: "Cennik asystenta głosowego VoiceLink",
    description:
      "Jednorazowa opłata za wdrożenie, potem miesięczny abonament. Wycenę dopasowujemy do systemów, funkcji i skali obsługi Twojej placówki.",
    cta: quoteCta,
    costsLink: {
      label: "Zobacz podział kosztów",
      href: "#podzial-kosztow",
    },
  },
  plans: {
    id: "podzial-kosztow",
    eyebrow: "Koszty",
    heading: "Jasny podział kosztów",
    note: "Wszystkie podane ceny są cenami brutto.",
    savingsCta: {
      label: "Oblicz potencjalne oszczędności po wdrożeniu VoiceLink",
    },
    items: [
      {
        title: "Jednorazowe wdrożenie",
        price: {
          kind: "amount",
          prefix: "Od około",
          value: "3000 zł",
          suffix: "brutto",
        },
        description:
          "Przygotowujemy asystenta do pracy w Twojej placówce: analizujemy potrzeby, tworzymy scenariusze rozmów, integrujemy systemy i testujemy działanie. Cena zależy od funkcji i integracji.",
      },
      {
        title: "Miesięczny pilotaż",
        price: {
          kind: "statement",
          value: "Kwota szacunkowa ustalana przed startem",
        },
        description:
          "Sprawdzamy asystenta w rzeczywistych rozmowach. Analizujemy ich liczbę i długość, używane funkcje oraz potrzeby pacjentów, by dopracować działanie i dobrać abonament.",
      },
      {
        title: "Miesięczny abonament",
        price: {
          kind: "statement",
          value: "Dopasowany do wykorzystania asystenta",
        },
        description:
          "Abonament ustalamy na podstawie zużycia minut w pilotażu i potrzeb placówki. Większa liczba rozmów pozwala uzyskać korzystniejsze warunki.",
      },
    ],
  },
  included: {
    id: "wspolpraca",
    eyebrow: "Współpraca",
    heading: "Co otrzymujesz w ramach współpracy?",
    items: [
      {
        title: "Asystent dopasowany do placówki",
        description:
          "Konfigurujemy rozmowy, bazę wiedzy i funkcje - od odpowiedzi na pytania po zarządzanie wizytami. Zakres ustalamy wspólnie przed wdrożeniem.",
      },
      {
        title: "Integracja z Twoimi systemami",
        description:
          "Łączymy asystenta z systemem rezerwacji w ustalonym zakresie. W wycenie uwzględniamy wymagania integracji i ewentualne opłaty dostawcy.",
      },
      {
        title: "Dostęp do VoiceLink Center",
        description:
          "Otrzymujesz dostęp do panelu z podsumowaniami rozmów, wynikami obsługi i statystykami wykorzystania asystenta.",
      },
      {
        title: "Wsparcie techniczne",
        description:
          "Pomagamy przy uruchomieniu i podczas codziennego korzystania z usługi. Po pilotażu zapewniamy dalszą opiekę oraz drobne zmiany w działaniu asystenta.",
      },
      {
        title: "Optymalizacja",
        description:
          "Na podstawie rzeczywistych rozmów dopracowujemy scenariusze i sposób obsługi pacjentów przez pierwsze 6 miesięcy.",
      },
      {
        title: "Zabezpieczenia i kontrola dostępu",
        description:
          "Konfigurujemy dostęp do systemów i zasady obsługi danych. VoiceLink Center zapewnia uprawnienia użytkowników, szyfrowanie i ustalone okresy przechowywania danych.",
        link: {
          label: "Poznaj zabezpieczenia VoiceLink",
          href: "/bezpieczenstwo",
        },
      },
    ],
  },
  factors: {
    id: "od-czego-zalezy-cena",
    eyebrow: "Wycena",
    heading: "Od czego zależy cena VoiceLink?",
    points: [
      "Koszt wdrożenia zależy przede wszystkim od integracji, wybranych funkcji i złożoności procesów w placówce.",
      "Na wysokość abonamentu wpływa natomiast skala wykorzystania asystenta.",
    ],
    closing:
      "Podczas rozmowy ustalimy, czego potrzebuje Twój zespół, i przygotujemy wycenę dla konkretnego zakresu współpracy.",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Cennik i rozliczenia - najczęstsze pytania",
    description:
      "Odpowiedzi o jednorazowej opłacie wdrożeniowej, płatnym pilotażu, doborze abonamentu i czasie przygotowania asystenta.",
    items: [
      {
        id: "oplata-wdrozeniowa",
        question: "Czy opłata wdrożeniowa jest pobierana co miesiąc?",
        answer:
          "Nie. To jednorazowy koszt przygotowania i uruchomienia asystenta w ustalonym zakresie. Miesięczny abonament jest rozliczany osobno.",
      },
      {
        id: "pilotaz",
        question: "Czy pilotaż jest bezpłatny?",
        answer:
          "Pilotaż jest płatny. Przed jego rozpoczęciem wspólnie ustalamy indywidualną kwotę szacunkową za pierwszy miesiąc.",
      },
      {
        id: "abonament",
        question: "Kiedy poznam wysokość docelowego abonamentu?",
        answer:
          "Po miesięcznym pilotażu, gdy poznamy rzeczywiste wykorzystanie asystenta. Dzięki temu możemy dopasować abonament do skali obsługi Twojej placówki.",
      },
      {
        id: "umowa",
        question: "Na jak długo podpisujemy umowę?",
        answer:
          "Pierwsza umowa obejmuje miesięczny pilotaż. Dalszą współpracę prowadzimy na podstawie umowy na czas nieokreślony, z miesięcznym okresem wypowiedzenia.",
      },
      {
        id: "czas-przygotowania",
        question: "Ile trwa przygotowanie asystenta?",
        answer:
          "Od rozpoczęcia prac do uruchomienia pilotażu zazwyczaj mijają 1–4 tygodnie. Termin zależy od zakresu wdrożenia oraz dostępności potrzebnych danych i dostępów.",
      },
    ],
  },
} as const;
