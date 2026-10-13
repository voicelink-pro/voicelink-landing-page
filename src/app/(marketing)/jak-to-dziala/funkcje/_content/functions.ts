const meetingCta = {
  label: "Umów prezentację",
  href: "/kontakt",
} as const;

export const functionsContent = {
  metadata: {
    title: "Jak działa asystent głosowy VoiceLink?",
    description:
      "Poznaj funkcje asystenta głosowego VoiceLink: obsługę wizyt, SMS-ów, zgłoszeń o receptę, pytań pacjentów i połączeń z rejestracją.",
    path: "/jak-to-dziala/funkcje",
  },
  hero: {
    eyebrow: "Jak to działa",
    heading: "Jak działa asystent głosowy VoiceLink?",
    description:
      "VoiceLink umawia wizyty, odpowiada na pytania i przekazuje zgłoszenia do zespołu. Zarządza kalendarzem i działa zgodnie z zasadami Twojej placówki. ",
    primaryCta: meetingCta,
    secondaryCta: {
      label: "Poznaj funkcje",
      href: "#funkcje",
    },
  },
  flow: {
    eyebrow: "Przebieg rozmowy",
    heading: "Od telefonu pacjenta do załatwionej sprawy",
    items: [
      {
        title: "Pacjent mówi, czego potrzebuje",
        description:
          "Pacjent opisuje swoją sprawę podczas rozmowy: chce umówić wizytę, zmienić termin, zgłosić prośbę o receptę lub uzyskać informacje. Asystent dopytuje o szczegóły potrzebne do obsługi zgłoszenia.",
      },
      {
        title: "Asystent sprawdza informacje i wykonuje zadanie",
        description:
          "W zależności od sprawy VoiceLink korzysta z kalendarza placówki lub przygotowanej bazy wiedzy. Sprawdza terminy, wykonuje dostępne operacje i przekazuje pacjentowi odpowiedź.",
      },
      {
        title: "Pacjent otrzymuje potwierdzenie lub dalsze wskazówki",
        description:
          "Po wykonaniu zadania asystent podsumowuje ustalenia. Jeśli w placówce uruchomiono powiadomienia SMS, pacjent może otrzymać również wiadomość z potwierdzeniem wizyty. Sprawy wymagające udziału personelu trafiają do zespołu zgodnie z ustalonym procesem.",
      },
    ],
  },
  functions: {
    groups: [
      {
        id: "zarzadzanie-wizytami",
        heading: "Zarządzanie wizytami",
        description: "Umawianie i potwierdzanie wizyt w jednym miejscu.",
        items: [
          {
            title: "Umawianie, przekładanie i odwoływanie wizyt",
            description:
              "Asystent sprawdza dostępne terminy i pozwala pacjentowi umówić, przełożyć lub odwołać wizytę podczas rozmowy telefonicznej.",
          },
          {
            title: "Automatyczne potwierdzenia i przypomnienia SMS",
            description:
              "Po rezerwacji pacjent otrzymuje SMS ze szczegółami wizyty, a przed jej terminem — przypomnienie wysłane w ustalonym czasie.",
          },
          {
            title: "Potwierdzanie obecności odpowiedzią na SMS",
            description:
              "Pacjent potwierdza obecność krótką odpowiedzią na SMS, a informacja o potwierdzeniu trafia do systemu placówki.",
          },
        ],
      },
      {
        id: "obsluga-pacjenta",
        heading: "Obsługa pacjenta",
        description: "Odpowiedzi i pomoc podczas każdej rozmowy.",
        items: [
          {
            title: "Odpowiedzi na pytania o placówkę, lekarzy i usługi",
            description:
              "Asystent udziela informacji o godzinach otwarcia, dostępnych usługach, lekarzach i zasadach przygotowania do wizyty na podstawie wiedzy przekazanej przez placówkę.",
          },
          {
            title: "Wsparcie w wyborze specjalisty",
            description:
              "Asystent pomaga pacjentowi wybrać odpowiedniego specjalistę, uwzględniając cel wizyty i zakres usług dostępnych w placówce.",
          },
          {
            title: "Przyjmowanie zgłoszeń o receptę",
            description:
              "Asystent zbiera dane i informacje potrzebne do zgłoszenia prośby o receptę, a następnie przekazuje je do obsługi przez zespół placówki.",
          },
          {
            title: "Rozmowy w różnych językach",
            description:
              "Asystent prowadzi rozmowy w obsługiwanych językach, umożliwiając pacjentom uzyskanie informacji i załatwienie spraw w języku, którym się posługują.",
          },
        ],
      },
      {
        id: "wsparcie-rejestracji",
        heading: "Wsparcie rejestracji",
        description: "Więcej odebranych połączeń, mniej obciążenia zespołu.",
        items: [
          {
            title: "Obsługa wielu rozmów jednocześnie",
            description:
              "Asystent prowadzi wiele rozmów równolegle, dzięki czemu może obsługiwać kolejnych pacjentów również w godzinach największego ruchu.",
          },
          {
            title: "Odbieranie połączeń poza godzinami rejestracji",
            description:
              "Asystent odbiera telefony także po zamknięciu rejestracji, umożliwiając pacjentom uzyskanie informacji i zarządzanie wizytami poza godzinami pracy zespołu.",
          },
          {
            title: "Wsparcie rejestracji, gdy linia jest zajęta",
            description:
              "Gdy linia rejestracji jest zajęta, asystent przejmuje kolejne połączenia i pomaga pacjentom załatwić sprawy bez oczekiwania na pracownika.",
          },
          {
            title: "Przekierowanie rozmowy do rejestracji",
            description:
              "Jeśli sprawa wymaga udziału pracownika, asystent przekierowuje rozmowę do rejestracji zgodnie z zasadami ustalonymi przez placówkę.",
          },
        ],
      },
    ],
  },
  configuration: {
    eyebrow: "Konfiguracja",
    heading: "Działanie dopasowane do Twojej placówki",
    items: [
      {
        title: "Połączenie z kalendarzem placówki",
        description:
          "Integracja umożliwia pracę na aktualnych terminach i obsługę wizyt bezpośrednio podczas rozmowy. Przed uruchomieniem ustalamy możliwości połączenia z używanym systemem oraz zakres obsługiwanych czynności.",
      },
      {
        title: "Baza wiedzy o Twojej ofercie",
        description:
          "Przygotowujemy informacje, z których asystent korzysta podczas rozmów. Obejmują one wskazane przez placówkę usługi, lekarzy, zasady rejestracji i odpowiedzi na powtarzające się pytania.",
      },
      {
        title: "Zasady obsługi poszczególnych spraw",
        description:
          "Ustalamy, jakie informacje asystent ma zebrać, kiedy może wykonać zadanie i w jakich sytuacjach powinien przekazać sprawę personelowi. Dzięki temu sposób obsługi odpowiada procesom obowiązującym w placówce.",
      },
    ],
  },
  demo: {
    eyebrow: "Przykładowa rozmowa",
    heading: "Zobacz przykładową rozmowę z VoiceLink",
    description:
      "Posłuchaj, jak pacjent umawia wizytę: od zgłoszenia potrzeby, przez sprawdzenie terminów, po potwierdzenie rezerwacji.",
    boxTitle: "Posłuchaj demonstracyjnej rozmowy VoiceLink z pacjentem",
    audioSrc: "/test-call.mp3",
    playLabel: "Odtwórz rozmowę",
    pauseLabel: "Zatrzymaj",
    unavailableMessage: "Nagranie nie jest jeszcze dostępne.",
    callPrompt: "Jeśli wolisz sam porozmawiać z Asystentem, zadzwoń pod numer",
    phone: "732 098 412",
    phoneHref: "tel:+48732098412",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pytania o działanie asystenta",
    description:
      "Najważniejsze informacje o terminach, zakresie funkcji i przekazywaniu spraw personelowi.",
    items: [
      {
        id: "aktualne-terminy",
        question: "Czy VoiceLink korzysta z aktualnych terminów wizyt?",
        answer:
          "Tak, przy uruchomionej integracji asystent sprawdza dostępność w połączonym kalendarzu placówki w czasie rzeczywistym. Możliwości rezerwacji, zmiany i odwołania wizyt zależą od zakresu integracji.",
      },
      {
        id: "wybor-funkcji",
        question: "Czy można wybrać tylko część funkcji?",
        answer:
          "Zakres wdrożenia ustalamy dla konkretnej placówki. Podczas rozmowy określamy, które sprawy ma obsługiwać asystent i jakie połączenia z systemami będą do tego potrzebne.",
      },
      {
        id: "recepta",
        question: "Czy zgłoszenie prośby o receptę oznacza jej wystawienie?",
        answer:
          "Nie. Asystent przyjmuje zgłoszenie i przekazuje je zgodnie z procesem placówki. O wystawieniu recepty decyduje uprawniona osoba z personelu medycznego.",
      },
      {
        id: "rozmowa-z-czlowiekiem",
        question: "Czy pacjent może porozmawiać z człowiekiem?",
        answer:
          "Asystent może przekierować rozmowę do rejestracji zgodnie z konfiguracją placówki. Możliwość odebrania połączenia zależy od dostępności personelu.",
      },
    ],
  },
} as const;
