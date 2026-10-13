const meetingCta = {
  label: "Umów rozmowę o wdrożeniu",
  href: "/kontakt",
} as const;

export const processContent = {
  metadata: {
    title: "Wdrożenie asystenta głosowego — proces współpracy",
    description:
      "Poznaj proces wdrożenia VoiceLink: analiza potrzeb, konfiguracja, integracje i testy. Miesięczny pilotaż, dopasowany abonament i stałe wsparcie.",
    path: "/jak-to-dziala/proces-wspolpracy",
  },
  hero: {
    eyebrow: "Proces współpracy",
    heading: "Jak wygląda wdrożenie VoiceLink?",
    description:
      "Przygotowujemy asystenta, łączymy go z systemami i wspólnie testujemy. Podczas miesięcznego pilotażu dopracowujemy obsługę i dobieramy abonament do potrzeb Twojej placówki.",
    cta: meetingCta,
    stepsLink: {
      label: "Zobacz etapy",
      href: "#etapy",
    },
  },
  steps: {
    eyebrow: "Etapy wdrożenia",
    heading: "Od poznania placówki do codziennej obsługi pacjentów",
    items: [
      {
        title: "Analiza potrzeb placówki",
        paragraphs: [
          "Poznajemy potrzeby pacjentów, charakter połączeń i sposób pracy rejestracji. Ustalamy zadania asystenta oraz sytuacje wymagające pomocy personelu.",
        ],
      },
      {
        title: "Ustalenie zakresu i podpisanie umowy",
        paragraphs: [
          "Uzgadniamy funkcje, integracje, harmonogram, koszty oraz informacje i dostępy potrzebne do wdrożenia. Podpisujemy umowę obejmującą miesięczny pilotaż, po którym dobieramy docelowy abonament.",
        ],
      },
      {
        title: "Konfiguracja asystenta",
        paragraphs: [
          "Przygotowujemy sposób prowadzenia rozmów, scenariusze i bazę wiedzy zgodnie z zasadami placówki. Określamy, o co asystent ma pytać, jak realizować zadania i kiedy przekazywać rozmowę do rejestracji.",
        ],
      },
      {
        title: "Integracja z systemami placówki",
        paragraphs: [
          "Po uzyskaniu wymaganych dostępów łączymy VoiceLink z systemami placówki, aby korzystał z aktualnych danych i obsługiwał wizyty w Twoim terminarzu. Zajmujemy się stroną techniczną i pomagamy w niezbędnych formalnościach.",
        ],
        link: {
          label: "Poznaj integracje VoiceLink",
          href: "/jak-to-dziala/integracja",
        },
      },
      {
        title: "Testy z Twoim zespołem",
        paragraphs: [
          "Wspólnie testujemy rozmowy, funkcje i zgodność odpowiedzi z zasadami placówki. Zbieramy uwagi Twojego zespołu i wprowadzamy poprawki przed uruchomieniem.",
        ],
      },
      {
        title: "Start i miesięczny pilotaż",
        paragraphs: [
          "Uruchamiamy VoiceLink do obsługi rzeczywistych połączeń. Przez miesiąc analizujemy rozmowy, skuteczność wykonywania zadań, wykorzystanie funkcji oraz faktyczne zużycie usługi.",
        ],
      },
      {
        title: "Optymalizacja i stała współpraca",
        paragraphs: [
          "Dopracowujemy scenariusze i bazę wiedzy oraz podpisujemy umowę ze stałym abonamentem, na czas nieokreślony, z miesięcznym okresem wypowiedzenia. Zapewniamy wsparcie techniczne, aktualizacje informacji i drobne zmiany w działaniu asystenta.",
        ],
      },
    ],
  },
  duration: {
    eyebrow: "Harmonogram",
    heading: "Ile trwa uruchomienie VoiceLink?",
    stat: {
      value: "2-4",
      unit: "tygodnie",
      caption: "Od rozpoczęcia prac do startu pilotażu",
    },
    emphasis: "od jednego do czterech tygodni",
    paragraphs: [
      "Od rozpoczęcia prac do startu pilotażu zazwyczaj mijają od jednego do czterech tygodni. Ten czas obejmuje konfigurację asystenta, przygotowanie integracji oraz testy z Twoim zespołem.",
      "Dokładny harmonogram zależy od zakresu projektu i dostępności wymaganych informacji oraz uprawnień. Po przygotowaniu rozwiązania rozpoczynamy miesięczny pilotaż w rzeczywistym środowisku placówki.",
    ],
  },
  requirements: {
    eyebrow: "Przygotowanie placówki",
    heading: "Co będzie potrzebne po stronie placówki?",
    items: [
      {
        title: "Informacje o obsłudze pacjentów",
        description:
          "Potrzebujemy aktualnych informacji o usługach, lekarzach, godzinach pracy i zasadach rejestracji. Wspólnie ustalamy odpowiedzi na najczęstsze pytania oraz sposób postępowania w sytuacjach wymagających udziału personelu.",
      },
      {
        title: "Dostępy do wybranych systemów",
        description:
          "Jeśli wdrożenie obejmuje integrację, potrzebne będą odpowiednie zgody i uprawnienia. Wyjaśniamy, jak je uzyskać i czy dostawca systemu wymaga aktywacji dodatkowej funkcji.",
      },
      {
        title: "Osoba do kontaktu i udział w testach",
        description:
          "Warto wyznaczyć osobę, która zna pracę rejestracji i pomoże potwierdzić poprawność informacji. Udział zespołu w testach pozwala wychwycić szczegóły ważne dla codziennej obsługi pacjentów.",
      },
    ],
  },
  pilot: {
    eyebrow: "Pierwszy miesiąc",
    heading: "Pilotaż, który pomaga dopasować usługę i abonament",
    description:
      "Pierwszy miesiąc pokazuje, jak VoiceLink jest wykorzystywany w Twojej placówce. Sprawdzamy przebieg obsługi oraz rzeczywistą liczbę i długość rozmów, aby oprzeć dalszą współpracę na danych.",
    items: [
      {
        title: "Skuteczność obsługi",
        description:
          "Analizujemy, które sprawy asystent realizuje samodzielnie, kiedy potrzebuje pomocy rejestracji i na jakich etapach rozmowy pojawiają się trudności.",
      },
      {
        title: "Jakość rozmów",
        description:
          "Sprawdzamy zrozumiałość odpowiedzi, sposób zadawania pytań oraz zgodność rozmów z zasadami placówki. Na tej podstawie dopracowujemy scenariusze i bazę wiedzy.",
      },
      {
        title: "Abonament dopasowany do wykorzystania",
        description:
          "Mierzymy faktyczne zużycie usługi, aby zaproponować abonament odpowiadający potrzebom placówki. Pomaga to ograniczyć płacenie za niewykorzystany zakres i ryzyko późniejszych dopłat wynikających z niedoszacowania ruchu.",
      },
    ],
  },
  care: {
    eyebrow: "Po wdrożeniu",
    heading: "Stała opieka po wdrożeniu",
    description:
      "Po zakończeniu pilotażu nadal wspieramy Twój zespół. Abonament obejmuje pomoc techniczną, aktualizacje bazy wiedzy oraz drobne zmiany i dalszą optymalizację działania asystenta.",
    items: [
      {
        title: "Wsparcie techniczne",
        description:
          "Pomagamy rozwiązywać problemy związane z działaniem VoiceLink i odpowiadamy na pytania dotyczące jego obsługi.",
      },
      {
        title: "Aktualizacja bazy wiedzy",
        description:
          "Uzupełniamy informacje wykorzystywane podczas rozmów, aby odpowiedzi asystenta uwzględniały zmiany zgłaszane przez placówkę.",
      },
      {
        title: "Dopracowywanie rozmów",
        description:
          "Na podstawie uwag zespołu i obserwacji działania asystenta wprowadzamy drobne zmiany w istniejących scenariuszach oraz sposobie przekazywania informacji pacjentom.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Pytania o proces współpracy",
    description:
      "Odpowiedzi o czasie uruchomienia, testach, pilotażu i zasadach dalszej współpracy.",
    items: [
      {
        id: "czas-do-pilotazu",
        question: "Ile czasu potrzeba, aby rozpocząć pilotaż?",
        answer:
          "Przygotowanie asystenta, integracji i testów zazwyczaj zajmuje od jednego do czterech tygodni od rozpoczęcia prac. Termin zależy od zakresu wdrożenia oraz dostępności potrzebnych informacji i uprawnień.",
      },
      {
        id: "scenariusze-rozmow",
        question: "Czy musimy samodzielnie przygotować scenariusze rozmów?",
        answer:
          "Nie. Scenariusze przygotowujemy na podstawie analizy potrzeb placówki. Twój zespół przekazuje informacje o zasadach obsługi i pomaga zweryfikować, czy asystent działa zgodnie z nimi.",
      },
      {
        id: "testy-przed-startem",
        question: "Czy przetestujemy asystenta przed uruchomieniem?",
        answer:
          "Tak. Przed rozpoczęciem obsługi pacjentów otrzymujecie możliwość przeprowadzenia testowych rozmów i zgłoszenia uwag. Po wspólnej weryfikacji przechodzimy do pilotażu.",
      },
      {
        id: "sens-pilotazu",
        question: "Dlaczego po testach potrzebny jest jeszcze pilotaż?",
        answer:
          "Testy pozwalają sprawdzić zaplanowane scenariusze. Pilotaż pokazuje, jak asystent radzi sobie z rzeczywistym sposobem mówienia pacjentów i sytuacjami pojawiającymi się w codziennej pracy. Pozwala również zmierzyć zużycie usługi i dopasować abonament.",
      },
      {
        id: "po-pierwszym-miesiacu",
        question: "Co dzieje się po pierwszym miesiącu?",
        answer:
          "Podsumowujemy wyniki pilotażu, dopracowujemy działanie asystenta i ustalamy docelowy abonament. Następnie podpisujemy umowę na czas nieokreślony z miesięcznym okresem wypowiedzenia.",
      },
      {
        id: "zmiany-po-wdrozeniu",
        question: "Czy po wdrożeniu możemy zgłaszać zmiany?",
        answer:
          "Tak. Stała współpraca obejmuje wsparcie techniczne, aktualizacje informacji w bazie wiedzy oraz drobne zmiany i optymalizację istniejących scenariuszy rozmów.",
      },
      {
        id: "zobowiazanie",
        question: "Czy współpraca wymaga długoterminowego zobowiązania?",
        answer:
          "Pierwsza umowa obejmuje miesięczny pilotaż. Kolejną podpisujemy na czas nieokreślony, z możliwością zakończenia współpracy z miesięcznym okresem wypowiedzenia.",
      },
    ],
  },
} as const;
