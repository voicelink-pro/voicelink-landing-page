const integrationCta = {
  label: "Sprawdź możliwość integracji",
  href: "/kontakt",
} as const;

export const integrationContent = {
  metadata: {
    title: "Integracje VoiceLink z systemami medycznymi i terminarzami",
    description:
      "VoiceLink łączy asystenta głosowego z terminarzem placówki: sprawdza wolne terminy oraz umawia, zmienia i odwołuje wizyty w używanym systemie.",
    path: "/jak-to-dziala/integracja",
  },
  hero: {
    eyebrow: "Integracje",
    heading: "Integracja VoiceLink z systemami placówek",
    description:
      "Asystent umawia, zmienia i odwołuje wizyty bezpośrednio w terminarzu Twojej placówki. Twój zespół pracuje tak jak dotychczas.",
    primaryCta: integrationCta,
    secondaryCta: {
      label: "Zobacz systemy",
      href: "#systemy",
    },
  },
  calendar: {
    eyebrow: "Terminarz",
    heading: "Twój terminarz i asystent głosowy pracują razem",
    paragraphs: [
      "Podczas rozmowy VoiceLink sprawdza wolne terminy i zarządza wizytami. Wszystkie zmiany zapisuje w terminarzu, z którego korzysta rejestracja.",
      "Wymiana danych odbywa się w tle, przez interfejs integracyjny systemu, nazywany API. Pacjent po prostu rozmawia z asystentem, a personel widzi efekty jego działania w swoim kalendarzu.",
    ],
    securityCta: {
      label: "Przeczytaj o zabezpieczeniach",
      href: "/bezpieczenstwo",
    },
  },
  systems: {
    eyebrow: "Systemy",
    heading: "Systemy i terminarze, z którymi łączymy VoiceLink",
    description:
      "Możliwości podłączenia sprawdzamy dla systemu i konfiguracji używanej w Twojej placówce. Ustalamy wymagane dostępy, dodatkowe moduły oraz warunki uruchomienia.",
    featured: {
      title: "Sysytemy Otwatego Systemy Ochrony Zdrowia",
      systems: ["KS-SOMED", "KS-PPS", "SERUM", "MEDIPORTA"],
    },
    items: [
      { title: "MyDr EDM" },
      { title: "CloudiMed" },
      { title: "ProAssist" },
      { title: "Google Calendar" },
      { title: "Własne systemy" },
    ],
    missing: {
      heading: "Nie widzisz swojego systemu?",
      description:
        "Podaj nam jego nazwę. Skontaktujemy się z dostawcą, sprawdzimy możliwości połączenia i zaproponujemy dalsze kroki.",
      cta: {
        label: "Zapytaj o swój system",
        href: "/kontakt",
      },
    },
  },
  operations: {
    eyebrow: "Wizyty",
    heading: "Jak asystent zarządza wizytami w połączonym systemie?",
    items: [
      {
        title: "Sprawdza wolne terminy lekarzy i usług",
        description:
          "VoiceLink pobiera aktualną dostępność z terminarza placówki. Na tej podstawie proponuje pacjentowi terminy.",
      },
      {
        title: "Rezerwuje wizytę podczas rozmowy",
        description:
          "Po ustaleniu terminu i zebraniu wymaganych danych asystent zapisuje wizytę w systemie.",
      },
      {
        title: "Wyszukuje istniejące rezerwacje",
        description:
          "Asystent może odnaleźć wizytę na podstawie informacji wymaganych w procesie obsługi pacjenta.",
      },
      {
        title: "Przekłada wizyty na inny termin",
        description:
          "Gdy pacjent chce zmienić datę wizyty, VoiceLink sprawdza dostępne możliwości i aktualizuje rezerwację w połączonym systemie.",
      },
      {
        title: "Odwołuje wizyty na prośbę pacjenta",
        description:
          "Asystent wyszukuje odpowiednią rezerwację i odwołuje ją zgodnie z zasadami placówki.",
      },
    ],
  },
  launch: {
    eyebrow: "Uruchomienie",
    heading: "Jak wygląda uruchomienie integracji?",
    steps: [
      {
        title: "Poznajemy system i potrzeby placówki",
        paragraphs: [
          "Na spotkaniu ustalamy, z jakiego programu korzystacie, jak pracuje rejestracja i które czynności ma wykonywać asystent. Sprawdzamy również wymagania dotyczące lekarzy, usług i zasad rezerwacji.",
        ],
      },
      {
        title: "Sprawdzamy gotowe połączenie lub przygotowujemy nowe",
        paragraphs: [
          "Jeśli mamy już integrację z danym systemem, przechodzimy do jej konfiguracji dla Twojej placówki.",
          "Jeżeli system wymaga nowego połączenia, kontaktujemy się z jego dostawcą. Pozyskujemy dokumentację, sprawdzamy możliwości techniczne i na tej podstawie przygotowujemy integrację.",
        ],
      },
      {
        title: "Pomagamy uruchomić wymagane dostępy",
        paragraphs: [
          "Prowadzimy placówkę przez udzielenie odpowiednich uprawnień. Zależnie od systemu może to wymagać autoryzacji połączenia, wygenerowania klucza dostępowego lub aktywacji dodatkowego modułu.",
          "Wyjaśniamy, co trzeba zrobić, i zajmujemy się konfiguracją po stronie VoiceLink.",
        ],
      },
      {
        title: "Testujemy działanie i uruchamiamy obsługę",
        paragraphs: [
          "Sprawdzamy odczyt dostępności, tworzenie rezerwacji, wyszukiwanie, zmianę oraz odwoływanie wizyt. Po weryfikacji ustalonego zakresu uruchamiamy połączenie do obsługi pacjentów.",
        ],
      },
    ],
  },
  familiarSystem: {
    eyebrow: "Rejestracja",
    heading: "Zachowujesz system, który zna Twój zespół",
    paragraphs: [
      "Uruchomienie integracji pozwala rejestracji nadal korzystać z dotychczasowego terminarza. Wizyty obsługiwane przez VoiceLink trafiają do tego samego systemu co rezerwacje wprowadzane przez pracowników.",
      "Nie trzeba ręcznie przenosić wizyt utworzonych przez asystenta do osobnego kalendarza. Zespół może skupić się na obsłudze pacjentów i sprawach wymagających jego udziału.",
    ],
  },
  access: {
    eyebrow: "Dostęp",
    heading: "Kontrolowany dostęp do systemu placówki",
    items: [
      {
        title: "Szyfrowane połączenie",
        description:
          "Dane przesyłane między VoiceLink a połączonym systemem są chronione szyfrowaniem podczas transmisji.",
      },
      {
        title: "Uprawnienia dla wskazanej placówki",
        description:
          "Połączenie korzysta z autoryzowanego dostępu do konkretnej placówki.",
      },
      {
        title: "Możliwość cofnięcia dostępu",
        description:
          "Placówka może wycofać uprawnienia do połączenia zgodnie z mechanizmem stosowanym przez dostawcę systemu.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pytania o integracje VoiceLink",
    description:
      "Odpowiedzi o pozostaniu przy obecnym programie, czasie uruchomienia i widoczności wizyt w rejestracji.",
    items: [
      {
        id: "zmiana-programu",
        question: "Czy musimy zmienić obecny program do rejestracji?",
        answer:
          "Jeśli używany system umożliwia wymagane połączenie, placówka może pozostać przy swoim programie. VoiceLink obsługuje wizyty w połączonym terminarzu, a pracownicy nadal korzystają ze znanego środowiska.",
      },
      {
        id: "brak-systemu",
        question: "Co jeśli naszego systemu nie ma na liście?",
        answer:
          "Skontaktuj się z nami i podaj jego nazwę. Sprawdzimy możliwości integracji oraz skontaktujemy się z dostawcą. Jeśli bezpośrednie połączenie nie jest dostępne, poszukamy alternatywnego rozwiązania dopasowanego do potrzeb placówki.",
      },
      {
        id: "kontakt-z-dostawca",
        question:
          "Czy placówka musi samodzielnie kontaktować się z dostawcą oprogramowania?",
        answer:
          "Kontakt dotyczący dokumentacji i możliwości technicznych prowadzimy po stronie VoiceLink. Udział placówki może być potrzebny do udzielenia zgody, nadania dostępu lub aktywacji odpowiedniej funkcji w jej systemie.",
      },
      {
        id: "dodatkowa-oplata",
        question: "Czy integracja jest dodatkowo płatna?",
        answer:
          "Integracja jest uwzględniona w cenie wdrożenia VoiceLink. Niektórzy dostawcy systemów pobierają opłaty za dostęp integracyjny lub wymagają zakupu dodatkowego modułu. Koszty potrzebne do uzgodnionego zakresu połączenia uwzględniamy w przedstawionej opłacie za VoiceLink i wyjaśniamy przed uruchomieniem.",
      },
      {
        id: "czas-podlaczenia",
        question: "Ile trwa podłączenie systemu?",
        answer:
          "Orientacyjnie około dwóch tygodni. Termin ustalamy indywidualnie, ponieważ zależy od systemu, gotowości integracji oraz udostępnienia dokumentacji i wymaganych dostępów.",
      },
      {
        id: "widocznosc-wizyt",
        question: "Czy rejestracja widzi wizyty umawiane przez asystenta?",
        answer:
          "Tak. Rezerwacje oraz ich zmiany są zapisywane w połączonym systemie placówki. Pracownicy widzą je w terminarzu, z którego korzystają na co dzień.",
      },
    ],
  },
} as const;
