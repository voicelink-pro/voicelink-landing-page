export const centerContent = {
  metadata: {
    title: "VoiceLink Center — statystyki i panel asystenta głosowego",
    description:
      "Poznaj VoiceLink Center: statystyki połączeń, zgłoszenia, nagrania, transkrypcje i raporty. Sprawdzaj skuteczność asystenta oraz wykorzystanie minut.",
    path: "/voicelink-center",
  },
  hero: {
    eyebrow: "VoiceLink Center",
    heading: "VoiceLink Center",
    description:
      "Sprawdzaj wyniki obsługi, przeglądaj rozmowy i śledź wykorzystanie asystenta głosowego. Wszystkie najważniejsze informacje o jego pracy znajdziesz w jednym panelu.",
    cta: {
      label: "Poznaj VoiceLink Center",
      href: "#statystyki",
    },
    image: {
      src: "/voicelinkcenter.png",
      alt: "Pulpit VoiceLink Center ze statystykami połączeń, minut, skuteczności i umówionych wizyt.",
      width: 3420,
      height: 1894,
    },
    imageCaption: "Przykładowy widok pulpitu VoiceLink Center.",
  },
  statistics: {
    id: "statystyki",
    eyebrow: "Statystyki",
    heading: "Najważniejsze statystyki w jednym miejscu",
    description:
      "Zobacz, ile połączeń obsłużył asystent, z jakimi sprawami dzwonią pacjenci i jak kończą się rozmowy. Wybierz interesujący Cię okres i przejdź od ogólnego wyniku do szczegółów.",
    items: [
      {
        title: "Liczba połączeń i zużycie minut",
        description:
          "Kontroluj liczbę odebranych połączeń, wykorzystane minuty oraz średni czas rozmowy. Sprawdzaj, jak zmienia się obciążenie asystenta w kolejnych dniach.",
      },
      {
        title: "Skuteczność obsługi",
        description:
          "Śledź skuteczność rozmów, liczbę umówionych wizyt oraz wskaźnik przekazań do rejestracji. Zobacz, które sprawy asystent obsługuje samodzielnie, a które wymagają pomocy zespołu.",
      },
      {
        title: "Jakość działania",
        description:
          "Sprawdzaj liczbę błędów i średni czas odpowiedzi asystenta. Wychwytuj sytuacje, którym warto przyjrzeć się podczas dalszej optymalizacji.",
      },
      {
        title: "Najczęstsze tematy rozmów",
        description:
          "Dowiedz się, z czym najczęściej dzwonią pacjenci. Wykorzystuj te informacje do uzupełniania bazy wiedzy i dopracowywania sposobu obsługi.",
      },
    ],
  },
  tickets: {
    id: "zgloszenia",
    eyebrow: "Zgłoszenia",
    heading: "Każda rozmowa jako uporządkowane zgłoszenie",
    description:
      "Po rozmowie powstaje zgłoszenie z informacją, czego dotyczył kontakt i jak się zakończył. Twój zespół może szybko poznać sprawę i sprawdzić, czy potrzebne są dalsze działania.",
    items: [
      {
        title: "Podsumowanie i wynik",
        description:
          "Najważniejsze informacje są dostępne bez konieczności odsłuchiwania całego połączenia. Widzisz temat rozmowy, jej przebieg w skrócie oraz rezultat obsługi.",
      },
      {
        title: "Nagrania i transkrypcje",
        description:
          "Gdy potrzebujesz szczegółów, możesz wrócić do nagrania lub tekstowego zapisu rozmowy. Dostęp zależy od uprawnień użytkownika i obowiązujących okresów przechowywania danych.",
      },
    ],
  },
  analytics: {
    id: "analityka",
    eyebrow: "Analityka",
    heading: "Analityka, która pokazuje zmiany",
    description:
      "Wykresy dziennych połączeń i skuteczności pomagają zauważyć wzrost ruchu, powtarzające się trudności oraz efekty wprowadzanych zmian. Filtry pozwalają zawęzić widok do danych, które chcesz przeanalizować.",
    items: [
      {
        title: "Wykresy i filtrowanie",
        description:
          "Przeglądaj wyniki dla wybranego okresu i obserwuj zmiany w obsłudze pacjentów. Czytelne zestawienia ułatwiają ocenę codziennej pracy asystenta.",
      },
      {
        title: "Raporty do podsumowania wyników",
        description:
          "Generuj raporty, aby omówić rezultaty z zespołem lub osobami zarządzającymi placówką. Korzystaj z zebranych danych podczas planowania kolejnych usprawnień.",
      },
    ],
  },
  value: {
    id: "korzysci",
    eyebrow: "Korzyści",
    heading: "Zobacz szacowane korzyści dla placówki",
    description:
      "VoiceLink Center pokazuje nie tylko liczbę rozmów, ale również szacowany czas zaoszczędzony przez rejestrację i szacowany przychód. To dodatkowa perspektywa przy ocenie wartości asystenta.",
    items: [
      {
        title: "Czas zaoszczędzony przez rejestrację",
        description:
          "Sprawdzaj szacunkowy czas obsługi przejętej przez asystenta. Łatwiej ocenisz, w jakim zakresie odciąża on Twój zespół.",
      },
      {
        title: "Szacowany przychód",
        description:
          "Korzystaj z orientacyjnego wskaźnika finansowego przy analizie wyników. Szacunki w panelu nie oznaczają potwierdzonego przychodu ani gwarancji jego osiągnięcia.",
      },
    ],
  },
  access: {
    id: "dostep",
    eyebrow: "Dostęp",
    heading: "Dostęp dopasowany do Twojego zespołu",
    paragraphs: [
      "Zarządzaj użytkownikami i przypisuj im role odpowiadające obowiązkom - na przykład menedżera lub pracownika rejestracji. Każda osoba otrzymuje dostęp do funkcji i informacji przewidzianych dla swojej roli.",
      "Dane osobowe, pełne transkrypcje i nagrania podlegają dodatkowym ograniczeniom dostępu.",
    ],
    roles: [
      {
        title: "Menedżer",
        description:
          "Dostęp do funkcji i informacji przewidzianych dla tej roli.",
      },
      {
        title: "Pracownik rejestracji",
        description:
          "Informacje operacyjne, bez pełnych transkrypcji i nagrań.",
      },
    ],
    link: {
      label: "Poznaj zabezpieczenia VoiceLink Center",
      href: "/bezpieczenstwo",
    },
  },
  faq: {
    eyebrow: "FAQ",
    heading: "VoiceLink Center - najczęstsze pytania",
    description:
      "Odpowiedzi o panelu, wyniku rozmowy, minutach i zakresie dostępu zespołu.",
    items: [
      {
        id: "czym-jest",
        question: "Czym jest VoiceLink Center?",
        answer:
          "To panel dla placówki korzystającej z asystenta głosowego VoiceLink. Łączy statystyki, analitykę, zgłoszenia z rozmów, raporty i zarządzanie dostępem użytkowników.",
      },
      {
        id: "wynik-rozmowy",
        question: "Czy mogę sprawdzić, jak zakończyła się konkretna rozmowa?",
        answer:
          "Tak. Zgłoszenie zawiera podsumowanie i wynik obsługi. Użytkownicy z odpowiednimi uprawnieniami mogą również korzystać z dostępnych nagrań i transkrypcji.",
      },
      {
        id: "minuty",
        question: "Czy w panelu widać wykorzystanie minut?",
        answer:
          "Tak. Możesz śledzić zużycie minut i przeglądać statystyki dla wybranego okresu.",
      },
      {
        id: "dostep-zespolu",
        question: "Czy cały zespół ma taki sam dostęp do danych?",
        answer:
          "Nie. Zakres dostępu zależy od przypisanej roli i uprawnień. Pracownik rejestracji może korzystać z informacji operacyjnych bez dostępu do pełnych transkrypcji i nagrań.",
      },
    ],
  },
} as const;
