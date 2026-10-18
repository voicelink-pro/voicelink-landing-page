import { contactHref } from "@/config/navigation";

export type BlogArticleTableRow = {
  label: string;
  value: string;
};

export type BlogArticleSourceLink = {
  label: string;
  href: string;
};

export type BlogArticleSource = {
  id: number;
  text: string;
  linkLabel: string;
  href: string;
  links?: readonly BlogArticleSourceLink[];
};

export type BlogArticleFaqItem = {
  id: string;
  question: string;
  answer: string;
  citation?: number;
};

export type BlogArticleSummary = {
  slug: string;
  seoTitle: string;
  metaDescription: string;
  title: string;
  author: string;
  publishedAt: string;
  publishedDateLabel: string;
  readingTime: string;
  coverImage: string;
  lead: readonly string[];
};

export const blogContent = {
  metadata: {
    title: "Blog — wiedza o rejestracji i obsłudze pacjentów",
    description:
      "Praktyczne analizy, wyliczenia i poradniki dla zarządzających placówkami medycznymi. Sprawdź, jak usprawnić rejestrację telefoniczną i obsługę pacjentów.",
    path: "/blog",
  },
  hero: {
    eyebrow: "Blog VoiceLink",
    heading: "Praktyczna wiedza o nowoczesnej rejestracji i obsłudze pacjentów",
    description:
      "Analizy finansowe, organizacja pracy rejestracji i sprawdzone rozwiązania dla właścicieli oraz menedżerów placówek medycznych.",
    primaryCta: {
      label: "Przejdź do artykułów",
      href: "#artykuly",
    },
    secondaryCta: {
      label: "Umów spotkanie",
      href: contactHref,
    },
  },
  catalog: {
    id: "artykuly",
    eyebrow: "Publikacje",
    heading: "Artykuły",
  },
  articles: [
    {
      slug: "ile-kosztuja-nieodebrane-telefony-w-placowce-medycznej",
      seoTitle: "Ile kosztują nieodebrane telefony w placówce medycznej?",
      metaDescription:
        "Sprawdź, jak oszacować koszt nieodebranych telefonów w przychodni. Poznaj przykład wyliczenia i sposoby na poprawę obsługi pacjentów.",
      title: "Ile kosztują nieodebrane telefony w placówce medycznej?",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "6 min czytania",
      coverImage: "/nieodebrane-polaczenia.webp",
      lead: [
        "Nieodebrane telefony mogą oznaczać dla prywatnej przychodni mniej umówionych wizyt, trudności z odwoływaniem terminów i dodatkową pracę rejestracji. Ich koszt zależy jednak od tego, ilu pacjentów rzeczywiście pozostało bez obsługi i jaka część tych spraw mogła zakończyć się płatną wizytą. Przy cenie 300 zł już 20 niezrealizowanych wizyt to 6000 zł potencjalnego przychodu.",
        "Żeby oszacować tę kwotę dla swojej placówki, trzeba zajrzeć głębiej niż do licznika nieodebranych połączeń. Poniżej pokazujemy, jakie dane zebrać, jak wykonać obliczenie i co zmienić, gdy telefon staje się wąskim gardłem rejestracji.",
      ],
    },
    {
      slug: "jak-odciazyc-rejestracje-medyczna",
      seoTitle: "Jak odciążyć rejestrację medyczną bez nowego etatu?",
      metaDescription:
        "Jak odciążyć rejestrację medyczną? Sprawdź, co zautomatyzować, jak policzyć odzyskany czas i kiedy rozmowę z pacjentem powinien przejąć człowiek.",
      title:
        "Jak odciążyć rejestrację medyczną bez zatrudniania kolejnej osoby?",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "7 min czytania",
      coverImage: "/odciazenie.webp",
      lead: [
        "Odciążenie rejestracji medycznej warto zacząć od zadań, które powtarzają się każdego dnia: umawiania i potwierdzania wizyt, zmian terminów, odpowiedzi na pytania oraz wysyłania informacji o płatności. Część tych czynności można zautomatyzować, a pozostałe lepiej rozdzielić w zespole. Dzięki temu pracownicy odzyskują czas na pacjentów obecnych w placówce i sprawy wymagające ich uwagi.",
        "Dla właściciela prywatnej przychodni oznacza to możliwość obsłużenia większego ruchu przy obecnej obsadzie. Żeby ocenić, czy pozwoli to uniknąć kolejnego etatu, trzeba jednak sprawdzić, ile pracy rzeczywiście znika z rejestracji i w jakich godzinach.",
      ],
    },
    {
      slug: "voicebot-w-placowce-medycznej",
      seoTitle: "Voicebot medyczny: jak działa i co potrafi?",
      metaDescription:
        "Jak działa voicebot w placówce medycznej? Poznaj przebieg rezerwacji, integracje z terminarzem, potwierdzenia wizyt i przekazanie do rejestracji.",
      title: "Voicebot w placówce medycznej: jak działa i co potrafi?",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "8 min czytania",
      coverImage: "/voicebot-jakdziala.webp",
      lead: [
        "Voicebot medyczny to asystent głosowy AI, który rozmawia z pacjentami przez telefon i wykonuje uzgodnione zadania związane z obsługą placówki. Może umawiać, zmieniać i odwoływać wizyty, odpowiadać na pytania oraz kontaktować się z pacjentami w sprawie potwierdzenia terminu. Jego możliwości zależą od konfiguracji i połączenia z systemami przychodni.",
        "Dla pacjenta kontakt może wyglądać bardzo prosto: dzwoni pod znany numer, mówi, czego potrzebuje, wybiera termin i otrzymuje SMS. Po stronie placówki za taką rozmową stoją ustalone zasady rezerwacji, dostęp do terminarza i sposób przekazywania spraw pracownikom.",
      ],
    },
    {
      slug: "jak-ograniczyc-nieobecnosci-pacjentow",
      seoTitle: "Jak ograniczyć nieobecności pacjentów?",
      metaDescription:
        "Sprawdź, jak przypomnienia SMS, potwierdzanie wizyt i proste odwoływanie terminów pomagają ograniczyć nieobecności pacjentów i odciążyć rejestrację.",
      title:
        "Jak ograniczyć liczbę pacjentów, którzy nie przychodzą na wizyty?",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "8 min czytania",
      coverImage: "/ograniczenie.webp",
      lead: [
        "O dziewiątej miał przyjść pacjent. Lekarz jest gotowy, gabinet przygotowany, ale w poczekalni nikogo nie ma. Rejestracja próbuje się dodzwonić i dopiero wtedy dowiaduje się, że wizyta jest już nieaktualna. Na zaproszenie kolejnej osoby często zostaje za mało czasu.",
        "Żeby ograniczyć liczbę nieodwołanych wizyt, warto połączyć przypomnienia, potwierdzanie obecności i prostą możliwość rezygnacji lub zmiany terminu. Pacjent powinien wiedzieć, kiedy ma przyjść, móc łatwo odpowiedzieć i otrzymać pomoc, jeśli dotychczasowy termin przestał mu odpowiadać.",
        "Taki proces pomaga lepiej wykorzystać grafik lekarzy i ograniczyć ręczną pracę rejestracji. Ma znaczenie zarówno dla prywatnych placówek medycznych, jak i poradni przyjmujących na NFZ.",
      ],
    },
    {
      slug: "ile-kosztuje-voicebot-medyczny",
      seoTitle: "Ile kosztuje voicebot medyczny? Cena i opłacalność",
      metaDescription:
        "Wdrożenie VoiceLink kosztuje standardowo 3000 zł brutto. Sprawdź koszty rozmów, SMS i integracji oraz policz, kiedy voicebot się opłaca.",
      title:
        "Ile kosztuje voicebot medyczny i kiedy jego wdrożenie się opłaca?",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "9 min czytania",
      coverImage: "/cena-voicelink.webp",
      lead: [
        "Standardowe wdrożenie VoiceLink kosztuje 3000 zł brutto. Późniejsze rozliczenie zależy od wykorzystania: w podstawowym pakiecie minuta rozmowy kosztuje 0,60 zł brutto, a SMS 0,20 zł brutto. Przy większym wolumenie rozmów stawka minutowa jest ustalana na niższym poziomie.",
        "Do pełnego budżetu trzeba doliczyć koszty zewnętrzne, jeśli są potrzebne w danej placówce. Mogą to być dostęp do API systemu medycznego, telefonia i serwer integracyjny.",
        "O opłacalności decyduje to, czy dodatkowe wizyty oraz rzeczywiście ograniczone wydatki pokrywają cały koszt rozwiązania. Warto też osobno ocenić odzyskany czas rejestracji. Poniżej pokazujemy, jak to policzyć i dlaczego kilkanaście dodatkowych wizyt może wystarczyć do pokrycia miesięcznej obsługi.",
      ],
    },
    {
      slug: "wdrozenie-asystenta-glosowego-w-placowce-medycznej",
      seoTitle: "Wdrożenie asystenta głosowego w placówce",
      metaDescription:
        "Zobacz, jak przebiega wdrożenie asystenta głosowego w placówce medycznej: od analizy i testów po pilotaż, dobór abonamentu i stałe wsparcie.",
      title:
        "Jak wygląda wdrożenie asystenta głosowego w placówce medycznej? Krok po kroku",
      author: "Zespół VoiceLink",
      publishedAt: "2026-10-17",
      publishedDateLabel: "17 października 2026",
      readingTime: "8 min czytania",
      coverImage: "/wdrozenie.webp",
      lead: [
        "Czy asystent będzie wiedział, do którego lekarza zapisać pacjenta? Jak poradzi sobie ze zmianą terminu? Co się stanie, jeśli rozmówca będzie potrzebował pomocy rejestracji? Przed uruchomieniem automatycznej obsługi telefonicznej właściciele placówek mają wiele konkretnych pytań.",
        "Wdrożenie powinno na nie odpowiedzieć jeszcze przed pierwszymi rozmowami z pacjentami.",
        "W VoiceLink wdrożenie asystenta głosowego obejmuje analizę pracy placówki, ustalenie scenariuszy, konfigurację, testy na osobnym numerze i podłączenie do kalendarza. Następnie sprawdzamy działanie na numerze placówki i rozpoczynamy pierwszy miesiąc pilotażowy.",
        "Na podstawie rzeczywistych rozmów dopracowujemy asystenta i dobieramy abonament do zużycia.",
        "Poniżej wyjaśniamy, jak wygląda każdy etap i w których momentach potrzebne jest zaangażowanie zespołu placówki.",
      ],
    },
  ] as const satisfies readonly BlogArticleSummary[],
} as const;

function articleSummary(slug: (typeof blogContent.articles)[number]["slug"]) {
  const article = blogContent.articles.find((item) => item.slug === slug);

  if (!article) {
    throw new Error(`Brak artykułu o adresie ${slug}.`);
  }

  return article;
}

export const missedCallsArticle = {
  ...articleSummary("ile-kosztuja-nieodebrane-telefony-w-placowce-medycznej"),
  toc: [
    {
      id: "dlaczego-placowka-nie-odbiera-wszystkich-telefonow",
      label: "Dlaczego placówka nie odbiera wszystkich telefonów?",
    },
    {
      id: "co-placowka-traci-gdy-pacjent-sie-nie-dodzwoni",
      label: "Co placówka traci, gdy pacjent się nie dodzwoni?",
    },
    {
      id: "jak-obliczyc-koszt-nieodebranych-telefonow-w-przychodni",
      label: "Jak obliczyć koszt nieodebranych telefonów w przychodni?",
    },
    {
      id: "przyklad-100-polaczen-dziennie-i-wizyta-za-300-zl",
      label: "Przykład: 100 połączeń dziennie i wizyta za 300 zł",
    },
    {
      id: "czy-nieodebrany-telefon-ma-takie-samo-znaczenie-w-placowce-publicznej",
      label:
        "Czy nieodebrany telefon ma takie samo znaczenie w placówce publicznej?",
    },
    {
      id: "jak-ograniczyc-liczbe-nieodebranych-telefonow",
      label: "Jak ograniczyć liczbę nieodebranych telefonów?",
    },
    {
      id: "jak-sprawdzic-skale-problemu-w-swojej-placowce",
      label: "Jak sprawdzić skalę problemu w swojej placówce?",
    },
    {
      id: "najczestsze-pytania-o-nieodebrane-telefony-w-placowce-medycznej",
      label: "Najczęstsze pytania",
    },
    {
      id: "umow-analize-obslugi-telefonicznej-pacjentow",
      label: "Umów analizę obsługi telefonicznej pacjentów",
    },
    {
      id: "zrodla",
      label: "Źródła",
    },
  ] as const,
  exampleTable: {
    caption:
      "Założenia i wyliczenie potencjalnego przychodu dla prywatnej przychodni (100 połączeń dziennie, wizyta za 300 zł)",
    columns: {
      assumption: "Założenie",
      value: "Wartość",
    },
    rows: [
      { label: "Połączenia dziennie", value: "100" },
      { label: "Dni pracy w miesiącu", value: "22" },
      { label: "Połączenia miesięcznie", value: "2200" },
      { label: "Udział połączeń nieodebranych", value: "30%" },
      { label: "Nieodebrane próby połączenia", value: "660" },
      {
        label:
          "Przyjęta liczba odrębnych spraw, które pozostały bez obsługi po wykluczeniu powtórzeń i późniejszego kontaktu",
        value: "300",
      },
      {
        label: "Przyjęty udział spraw dotyczących nowej rezerwacji",
        value: "60%",
      },
      { label: "Sprawy dotyczące nowej rezerwacji", value: "180" },
      {
        label:
          "Przyjęta szansa zakończenia sprawy zrealizowaną, opłaconą wizytą przy skutecznej obsłudze",
        value: "40%",
      },
      { label: "Potencjalne dodatkowe wizyty", value: "72" },
      { label: "Średni przychód z wizyty", value: "300 zł" },
    ] as const satisfies readonly BlogArticleTableRow[],
    resultHighlight:
      "180 × 40% × 300 zł = 21 600 zł potencjalnego przychodu miesięcznie.",
  },
  faq: [
    {
      id: "czy-kazdy-nieodebrany-telefon-oznacza-utrate-pacjenta",
      question: "Czy każdy nieodebrany telefon oznacza utratę pacjenta?",
      answer:
        "Nie. Pacjent może dodzwonić się później lub zapisać inną drogą. Należy policzyć odrębne sprawy, które ostatecznie pozostały bez obsługi, i dopiero wtedy oszacować ich znaczenie.",
    },
    {
      id: "czy-mozna-obliczyc-strate-na-podstawie-samej-ceny-wizyty",
      question: "Czy można obliczyć stratę na podstawie samej ceny wizyty?",
      answer:
        "Cena wizyty jest jednym z elementów obliczenia. Potrzebne są także liczba nieobsłużonych spraw dotyczących rezerwacji, szansa na opłaconą wizytę i dostępność terminów. Wynik opisuje potencjalny przychód. Zysk wymaga uwzględnienia kosztów.",
    },
    {
      id: "czy-automatyczne-przypomnienia-rozwiazuja-problem-nieobecnosci",
      question:
        "Czy automatyczne przypomnienia rozwiązują problem nieobecności?",
      answer:
        "Przypomnienie pomaga pamiętać o terminie, ale pacjent potrzebuje również skutecznego sposobu jego odwołania lub zmiany. Trudności z kontaktem telefonicznym były jedną z przyczyn nieodwołanych nieobecności wskazywanych w polskim badaniu ankietowym.",
      citation: 1,
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [
    {
      id: 1,
      text: "Olearczyk A. i wsp., „Prevalence and Drivers of Missed Healthcare Appointments in Poland: Insights From a 2025 Survey”, Medical Science Monitor, 2026; 32:e951944. Badanie ankietowe przeprowadzone w sierpniu 2025 roku.",
      linkLabel: "Pełna publikacja",
      href: "https://medscimonit.com/abstract/full/idArt/951944",
    },
    {
      id: 2,
      text: "Narodowy Fundusz Zdrowia, „Miliony SMS-ów z przypomnieniem o wizycie”, 1 lutego 2024 roku.",
      linkLabel: "Komunikat NFZ",
      href: "https://www.nfz.gov.pl/aktualnosci/aktualnosci-centrali/miliony-sms-ow-z-przypomnieniem-o-wizycie,8551.html",
    },
    {
      id: 3,
      text: "Rzecznik Praw Pacjenta, „Pacjent ma prawo do różnych form rejestracji w placówce medycznej”, 3 września 2026 roku.",
      linkLabel: "Komunikat RPP",
      href: "https://www.gov.pl/web/rpp/mozliwosc-skorzystania-z-roznych-form-rejestracji-do-placowki-leczniczej-to-prawo-pacjenta",
    },
  ] as const satisfies readonly BlogArticleSource[],
  methodologyNote:
    "Dane o liczbie połączeń, udziale nieodebranych telefonów i powodach kontaktu pochodzą z obserwacji oraz rozmów VoiceLink z placówkami. Nie stanowią reprezentatywnego badania rynku. Wyliczenie finansowe jest przykładem opartym na opisanych założeniach.",
} as const;

export const receptionReliefArticle = {
  ...articleSummary("jak-odciazyc-rejestracje-medyczna"),
  toc: [
    {
      id: "dlaczego-dwie-lub-trzy-osoby-na-rejestracji-wciaz-maja-za-duzo-pracy",
      label: "Dlaczego zespół rejestracji wciąż ma za dużo pracy?",
    },
    {
      id: "ktore-zadania-rejestracji-medycznej-mozna-zautomatyzowac",
      label: "Które zadania rejestracji można zautomatyzować?",
    },
    {
      id: "jak-uporzadkowac-prace-obecnego-zespolu",
      label: "Jak uporządkować pracę obecnego zespołu?",
    },
    {
      id: "ile-czasu-moze-odzyskac-rejestracja",
      label: "Ile czasu może odzyskać rejestracja?",
    },
    {
      id: "co-jesli-pacjent-nie-porozumie-sie-z-asystentem",
      label: "Co, jeśli pacjent nie porozumie się z asystentem?",
    },
    {
      id: "jak-utrzymac-jakosc-obslugi-po-automatyzacji",
      label: "Jak utrzymać jakość obsługi po automatyzacji?",
    },
    {
      id: "najczestsze-pytania-o-odciazenie-rejestracji-medycznej",
      label: "Najczęstsze pytania",
    },
    {
      id: "umow-analize-obslugi-telefonicznej-pacjentow",
      label: "Umów analizę obsługi telefonicznej pacjentów",
    },
    {
      id: "zrodla",
      label: "Źródła",
    },
  ] as const,
  exampleTable: {
    caption:
      "Przykład odzyskanego czasu rejestracji przy 100 rozmowach dziennie i średnim czasie rozmowy 3,5 minuty",
    columns: {
      assumption: "Element przykładu",
      value: "Przyjęta wartość",
    },
    rows: [
      {
        label: "Rozmowy obsługiwane wcześniej przez zespół dziennie",
        value: "100",
      },
      { label: "Średni czas jednej rozmowy", value: "3,5 minuty" },
      { label: "Dotychczasowy czas rozmów dziennie", value: "350 minut" },
      {
        label: "Udział spraw zakończonych bez udziału pracownika",
        value: "60%",
      },
      {
        label: "Czas odzyskany na tych sprawach dziennie",
        value: "210 minut",
      },
      {
        label:
          "Dodatkowy czas na przegląd zgłoszeń, poprawki i bieżącą obsługę systemu",
        value: "25 minut dziennie",
      },
      {
        label: "Odzyskany czas po odjęciu dodatkowej pracy",
        value: "185 minut dziennie",
      },
      { label: "Dni pracy w miesiącu", value: "22" },
      { label: "Odzyskany czas miesięcznie", value: "Około 68 godzin" },
    ] as const satisfies readonly BlogArticleTableRow[],
    resultHighlight:
      "185 minut × 22 dni ÷ 60 = około 68 godzin pracy zespołu miesięcznie.",
  },
  faq: [
    {
      id: "od-czego-najlepiej-zaczac-automatyzacje-rejestracji",
      question: "Od czego najlepiej zacząć automatyzację rejestracji?",
      answer:
        "Od częstego, powtarzalnego zadania o jasnych zasadach. Mogą to być potwierdzenia wizyt, odpowiedzi na podstawowe pytania lub rezerwacje wybranych usług. Wybór powinien wynikać z pomiaru obciążenia i dostępnych integracji.",
    },
    {
      id: "czy-asystent-glosowy-moze-zastapic-caly-zespol-rejestracji",
      question: "Czy asystent głosowy może zastąpić cały zespół rejestracji?",
      answer:
        "Rejestracja wykonuje również zadania na miejscu i rozwiązuje nietypowe problemy. Zakres automatyzacji należy ustalić tak, aby personel mógł przejmować sprawy wymagające jego udziału.",
    },
    {
      id: "jak-sprawdzic-czy-automatyzacja-rzeczywiscie-odciaza-pracownikow",
      question:
        "Jak sprawdzić, czy automatyzacja rzeczywiście odciąża pracowników?",
      answer:
        "Porównaj czas pracy przy podobnej liczbie i rodzaju zgłoszeń przed wdrożeniem i po nim. Uwzględnij rozmowy przekazane do człowieka, poprawki, obsługę zgłoszeń i bieżący nadzór. Sam licznik połączeń odebranych przez system nie pokazuje pełnego wyniku.",
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [
    {
      id: 1,
      text: "Burrows M. i wsp., „A quantitative assessment of the parameters of the role of receptionists in modern primary care using the work design framework”, BMC Family Practice, 2020; 21:138. Badanie 70 pracowników rejestracji w Anglii.",
      linkLabel: "Pełna publikacja",
      href: "https://link.springer.com/article/10.1186/s12875-020-01204-y",
    },
    {
      id: 2,
      text: "Gurol-Urganci I. i wsp., „Mobile phone messaging reminders for attendance at healthcare appointments”, Cochrane Database of Systematic Reviews, 2013; CD007458. Przegląd ośmiu badań z randomizacją obejmujących 6615 uczestników, z wyszukiwaniem badań do sierpnia 2012 roku.",
      linkLabel: "Przegląd Cochrane",
      href: "https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments",
    },
    {
      id: 3,
      text: "NHS England, „How to improve care navigation in general practice”. Wytyczne organizacji pierwszego kontaktu w podstawowej opiece zdrowotnej w Anglii.",
      linkLabel: "Wytyczne NHS England",
      href: "https://www.england.nhs.uk/long-read/how-to-improve-care-navigation-in-general-practice-2/",
    },
    {
      id: 4,
      text: "„Understanding How the Design and Implementation of Online Consultations Affect Primary Care Quality: Systematic Review of Evidence With Recommendations for Designers, Providers, and Researchers”, 2022. Przegląd 63 badań dotyczących konsultacji internetowych.",
      linkLabel: "Rekord publikacji i odnośniki do pełnego tekstu",
      href: "https://pubmed.ncbi.nlm.nih.gov/36279172/",
    },
  ] as const satisfies readonly BlogArticleSource[],
  methodologyNote:
    "Dane o obsadzie rejestracji i długości rozmów oraz obserwacje po wdrożeniach pochodzą z doświadczeń i rozmów VoiceLink z placówkami. Nie stanowią reprezentatywnego badania rynku. Przykład odzyskanego czasu opiera się na jawnie opisanych założeniach i nie jest obietnicą wyniku wdrożenia.",
} as const;

export const voicebotArticle = {
  ...articleSummary("voicebot-w-placowce-medycznej"),
  toc: [
    {
      id: "jak-dziala-asystent-glosowy-ai-w-przychodni",
      label: "Jak działa asystent głosowy AI w przychodni?",
    },
    {
      id: "jak-wyglada-rezerwacja-wizyty-przez-voicelink",
      label: "Jak wygląda rezerwacja wizyty przez VoiceLink?",
    },
    {
      id: "co-potrafi-voicebot-medyczny-poza-umawianiem-wizyt",
      label: "Co potrafi voicebot poza umawianiem wizyt?",
    },
    {
      id: "czy-placowka-musi-zmieniac-numer-telefonu",
      label: "Czy placówka musi zmieniać numer telefonu?",
    },
    {
      id: "z-jakimi-systemami-mozna-polaczyc-voicelink",
      label: "Z jakimi systemami można połączyć VoiceLink?",
    },
    {
      id: "co-sie-dzieje-gdy-asystent-nie-rozumie-pacjenta",
      label: "Co się dzieje, gdy asystent nie rozumie pacjenta?",
    },
    {
      id: "jak-wyglada-wdrozenie-voicebota-w-placowce-medycznej",
      label: "Jak wygląda wdrożenie voicebota?",
    },
    {
      id: "najczestsze-pytania-o-voicebota-medycznego",
      label: "Najczęstsze pytania",
    },
    {
      id: "sprawdz-jak-voicelink-moze-dzialac-w-twojej-placowce",
      label: "Sprawdź VoiceLink w swojej placówce",
    },
    {
      id: "zrodla",
      label: "Źródła",
    },
  ] as const,
  systemsTable: {
    caption:
      "Systemy, z którymi można połączyć VoiceLink, i ustalenia potrzebne przed uruchomieniem",
    columns: {
      system: "System lub środowisko",
      setup: "Co ustalamy przed uruchomieniem",
    },
    rows: [
      {
        label: "Rozwiązania KAMSOFT i ekosystem OSOZ",
        value: "Dostępne usługi integracyjne i zakres operacji na terminarzu",
      },
      {
        label: "Proassist, MyDr EDM, cloudiMed",
        value: "Sposób dostępu do danych i obsługiwane czynności rezerwacyjne",
      },
      {
        label: "Google Calendar",
        value: "Właściwe kalendarze, uprawnienia i reguły tworzenia wydarzeń",
      },
      {
        label: "Własny system placówki",
        value: "Dostępne API lub inny uzgodniony sposób wymiany danych",
      },
    ] as const satisfies readonly BlogArticleTableRow[],
  },
  faq: [
    {
      id: "czy-pacjent-musi-instalowac-aplikacje",
      question: "Czy pacjent musi instalować aplikację?",
      answer:
        "Do rozmowy telefonicznej z VoiceLink nie jest potrzebna aplikacja. Pacjent dzwoni pod numer placówki i rozmawia przez telefon.",
    },
    {
      id: "czy-voicebot-moze-umowic-wizyte-bez-integracji-z-terminarzem",
      question: "Czy voicebot może umówić wizytę bez integracji z terminarzem?",
      answer:
        "Samodzielny zapis w używanym terminarzu wymaga dostępu do niego i odpowiedniej integracji. Zakres obsługi informacyjnej lub innego procesu uzgadnia się osobno.",
    },
    {
      id: "czy-asystent-zastepuje-rejestracje",
      question: "Czy asystent zastępuje rejestrację?",
      answer:
        "Asystent może przejąć wiele zadań telefonicznych. Pracownicy pozostają potrzebni do spraw wymagających ich udziału oraz obsługi pacjentów na miejscu. Podział obowiązków ustalamy przed wdrożeniem.",
    },
    {
      id: "czy-mozna-zagwarantowac-taka-sama-skutecznosc-kazdej-rozmowy",
      question: "Czy można zagwarantować taką samą skuteczność każdej rozmowy?",
      answer:
        "Asystent korzysta z ustalonych zasad, ale przebieg kontaktu zależy również od jakości połączenia, wypowiedzi pacjenta i dostępności systemów. Dlatego potrzebne są testy, analiza wyników oraz możliwość przekazania sprawy człowiekowi.",
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [
    {
      id: 1,
      text: "ElevenLabs, dokumentacja architektury asystenta głosowego oraz sterowania przebiegiem rozmowy.",
      linkLabel: "Architektura",
      href: "https://elevenlabs.io/docs/eleven-agents/overview/",
      links: [
        {
          label: "Architektura",
          href: "https://elevenlabs.io/docs/eleven-agents/overview/",
        },
        {
          label: "przebieg rozmowy",
          href: "https://elevenlabs.io/docs/eleven-agents/customization/conversation-flow",
        },
      ],
    },
    {
      id: 2,
      text: "ElevenLabs, dokumentacja narzędzi umożliwiających wykonywanie czynności w systemach zewnętrznych.",
      linkLabel: "Narzędzia i integracje",
      href: "https://elevenlabs.io/docs/eleven-agents/customization/tools",
    },
    {
      id: 3,
      text: "Komisja Europejska, art. 50 AI Act oraz wyjaśnienia obowiązków dotyczących przejrzystości.",
      linkLabel: "Treść przepisu",
      href: "https://ai-act-service-desk.ec.europa.eu/pl/ai-act/article-50",
      links: [
        {
          label: "Treść przepisu",
          href: "https://ai-act-service-desk.ec.europa.eu/pl/ai-act/article-50",
        },
        {
          label: "wyjaśnienia",
          href: "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act",
        },
      ],
    },
    {
      id: 4,
      text: "Ministerstwo Zdrowia, komunikat z 2 października 2026 roku o wirtualnej asystentce Annie w centralnej e-rejestracji.",
      linkLabel: "Komunikat Ministerstwa Zdrowia",
      href: "https://www.gov.pl/web/zdrowie/centralna-e-rejestracja-wirtualna-asystentka-anna-przypomni-pacjentom-o-wizytach",
    },
  ] as const satisfies readonly BlogArticleSource[],
  methodologyNote:
    "Opis funkcji, oferowanych integracji, limitu równoległych rozmów i typowego czasu wdrożenia pochodzi z informacji przekazanych przez VoiceLink. Dokumentacja technologiczna objaśnia ogólne mechanizmy działania asystentów, a nie potwierdza niezależnie poszczególnych wdrożeń VoiceLink. Nazwy systemów sprawdzono na oficjalnych stronach ich dostawców.",
} as const;

export const noShowArticle = {
  ...articleSummary("jak-ograniczyc-nieobecnosci-pacjentow"),
  toc: [
    {
      id: "dlaczego-pacjenci-nie-przychodza-na-umowione-wizyty",
      label: "Dlaczego pacjenci nie przychodzą na wizyty?",
    },
    {
      id: "potwierdzenie-rezerwacji-przypomnienie-i-potwierdzenie-obecnosci",
      label: "Trzy różne wiadomości do pacjenta",
    },
    {
      id: "jak-powinno-wygladac-skuteczne-przypomnienie-sms-o-wizycie",
      label: "Jak powinno wyglądać przypomnienie SMS?",
    },
    {
      id: "kiedy-wysylac-przypomnienia-o-wizytach",
      label: "Kiedy wysyłać przypomnienia?",
    },
    {
      id: "kiedy-warto-dolaczyc-telefoniczne-potwierdzanie-wizyt",
      label: "Kiedy dołączyć potwierdzanie telefoniczne?",
    },
    {
      id: "proste-odwolywanie-wizyt-pomaga-odzyskiwac-wolne-terminy",
      label: "Proste odwoływanie wizyt",
    },
    {
      id: "jak-ograniczyc-reczne-potwierdzanie-wizyt-przez-rejestracje",
      label: "Jak ograniczyć ręczne potwierdzanie?",
    },
    {
      id: "jak-sprawdzic-czy-liczba-nieobecnosci-rzeczywiscie-spada",
      label: "Jak sprawdzić, czy nieobecności spadają?",
    },
    {
      id: "jak-voicelink-pomaga-ograniczyc-nieodwolane-wizyty",
      label: "Jak VoiceLink pomaga ograniczyć nieobecności?",
    },
    {
      id: "najczestsze-pytania-o-przypomnienia-i-potwierdzanie-wizyt",
      label: "Najczęstsze pytania",
    },
    {
      id: "zrodla",
      label: "Źródła",
    },
  ] as const,
  checklist: [
    "Ile wizyt pacjenci odwołują z wyprzedzeniem.",
    "Ile zwolnionych terminów udaje się ponownie obsadzić.",
    "Ile czasu rejestracja poświęca na potwierdzanie.",
    "Jaki udział pacjentów odpowiada na wiadomości i odbiera połączenia.",
  ] as const,
  faq: [
    {
      id: "czy-przypomnienie-sms-wystarczy-zeby-pacjent-przyszedl",
      question: "Czy przypomnienie SMS wystarczy, żeby pacjent przyszedł?",
      answer:
        "Przypomnienia mogą poprawić frekwencję, ale nie eliminują wszystkich przyczyn nieobecności. Warto połączyć je z możliwością odpowiedzi, prostym odwołaniem i dodatkowym kontaktem tam, gdzie jest potrzebny.",
    },
    {
      id: "czy-pacjent-musi-odpowiedziec-dokladnie-tak",
      question: "Czy pacjent musi odpowiedzieć dokładnie „TAK”?",
      answer:
        "Nie musi, jeśli system obsługuje naturalne odpowiedzi. VoiceLink może rozpoznawać potwierdzenia takie jak „potwierdzam”, „będę” czy „ok”. Niejednoznaczne wiadomości wymagają dalszego wyjaśnienia.",
    },
    {
      id: "czy-niepotwierdzona-wizyta-jest-odwolana",
      question: "Czy niepotwierdzona wizyta jest odwołana?",
      answer:
        "Brak odpowiedzi sam w sobie nie oznacza rezygnacji. Nie należy utożsamiać niepotwierdzonej wizyty z wizytą odwołaną.",
    },
    {
      id: "czy-asystent-glosowy-moze-od-razu-zmienic-termin",
      question: "Czy asystent głosowy może od razu zmienić termin?",
      answer:
        "Tak. W VoiceLink asystent może podczas rozmowy wyszukać inny termin i zarezerwować go po akceptacji pacjenta, zgodnie z zakresem wdrożenia i integracji.",
    },
    {
      id: "czy-taki-proces-ma-sens-w-poradni-przyjmujacej-na-nfz",
      question: "Czy taki proces ma sens w poradni przyjmującej na NFZ?",
      answer:
        "Tak. Wcześniejsze zgłoszenie rezygnacji pozwala udostępnić miejsce innej osobie. Sprawna obsługa odwołań pomaga lepiej wykorzystać dostępne terminy także w placówkach realizujących świadczenia na NFZ.",
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [
    {
      id: 1,
      text: "Narodowy Fundusz Zdrowia, „Miliony SMS-ów z przypomnieniem o wizycie”, 2024.",
      linkLabel: "Komunikat NFZ",
      href: "https://www.nfz.gov.pl/aktualnosci/aktualnosci-centrali/miliony-sms-ow-z-przypomnieniem-o-wizycie,8551.html",
    },
    {
      id: 2,
      text: "Gurol-Urganci I. i wsp., „Mobile phone messaging reminders for attendance at healthcare appointments”, Cochrane Database of Systematic Reviews, 2013.",
      linkLabel: "Przegląd Cochrane",
      href: "https://doi.org/10.1002/14651858.CD007458.pub3",
    },
    {
      id: 3,
      text: "„Optimizing number and timing of appointment reminders: a randomized trial”, 2018.",
      linkLabel: "Publikacja badania",
      href: "https://pubmed.ncbi.nlm.nih.gov/30130032/",
    },
    {
      id: 4,
      text: "NHS England, „Reducing did not attends (DNAs) in outpatient services”.",
      linkLabel: "Wytyczne NHS England",
      href: "https://www.england.nhs.uk/long-read/reducing-did-not-attends-dnas-in-outpatient-services/",
    },
  ] as const satisfies readonly BlogArticleSource[],
  methodologyNote:
    "Informacja o najlepszym wyniku VoiceLink pochodzi z danych własnych przekazanych przez firmę.",
} as const;

export const pricingArticle = {
  ...articleSummary("ile-kosztuje-voicebot-medyczny"),
  toc: [
    {
      id: "z-czego-sklada-sie-cena-voicebota-medycznego",
      label: "Z czego składa się cena voicebota?",
    },
    {
      id: "ile-wynosi-miesieczny-koszt-rozmow-i-sms",
      label: "Ile wynosi miesięczny koszt rozmów i SMS?",
    },
    {
      id: "jakie-dodatkowe-koszty-moze-poniesc-placowka",
      label: "Jakie dodatkowe koszty może ponieść placówka?",
    },
    {
      id: "kiedy-voicebot-medyczny-zaczyna-sie-oplacac",
      label: "Kiedy voicebot zaczyna się opłacać?",
    },
    {
      id: "po-jakim-czasie-zwraca-sie-koszt-wdrozenia",
      label: "Po jakim czasie zwraca się koszt wdrożenia?",
    },
    {
      id: "skad-moga-pochodzic-dodatkowe-wizyty",
      label: "Skąd mogą pochodzić dodatkowe wizyty?",
    },
    {
      id: "jak-uwzglednic-odzyskany-czas-rejestracji",
      label: "Jak uwzględnić odzyskany czas rejestracji?",
    },
    {
      id: "jak-pilotaz-pomaga-sprawdzic-oplacalnosc",
      label: "Jak pilotaż pomaga sprawdzić opłacalność?",
    },
    {
      id: "najczestsze-pytania-o-cene-voicebota-medycznego",
      label: "Najczęstsze pytania",
    },
    {
      id: "policz-oplacalnosc-voicelink-dla-swojej-placowki",
      label: "Policz opłacalność dla swojej placówki",
    },
    {
      id: "zrodla",
      label: "Źródła i podstawa wyliczeń",
    },
  ] as const,
  priceTable: {
    caption:
      "Składniki ceny voicebota medycznego VoiceLink i model rozliczenia",
    columns: ["Składnik", "Model rozliczenia VoiceLink"] as const,
    rows: [
      ["Standardowe wdrożenie", "3000 zł brutto jednorazowo"],
      ["Minuta rozmowy w podstawowym pakiecie", "0,60 zł brutto"],
      ["Większy wolumen rozmów", "Niższa stawka ustalana dla danego wolumenu"],
      ["SMS", "0,20 zł brutto"],
      [
        "Dostęp do API, telefonia, serwer integracyjny",
        "Według potrzeb i warunków konkretnego wdrożenia",
      ],
    ] as const,
  },
  usageTable: {
    caption:
      "Przykładowy miesięczny koszt rozmów i SMS przy stawce podstawowej",
    columns: [
      "Wykorzystanie w miesiącu",
      "Obliczenie",
      "Koszt brutto",
    ] as const,
    rows: [
      ["3000 minut rozmów", "3000 × 0,60 zł", "1800 zł"],
      ["1000 SMS", "1000 × 0,20 zł", "200 zł"],
      ["Łącznie rozmowy i SMS", "1800 zł + 200 zł", "2000 zł"],
    ] as const,
  },
  thresholdTable: {
    caption:
      "Liczba dodatkowych wizyt potrzebna do pokrycia miesięcznego kosztu 2000 zł",
    columns: [
      "Kwota pozostająca z dodatkowej wizyty",
      "Wizyty potrzebne do pokrycia 2000 zł",
    ] as const,
    rows: [
      ["100 zł", "20"],
      ["140 zł", "15"],
      ["150 zł", "14"],
      ["170 zł", "12"],
      ["200 zł", "10"],
    ] as const,
  },
  paybackTable: {
    caption:
      "Prosty okres zwrotu wdrożenia za 3000 zł przy koszcie obsługi 2000 zł i 150 zł pozostających z wizyty",
    columns: [
      "Dodatkowe wizyty miesięcznie",
      "Kwota z wizyt po kosztach ich wykonania",
      "Wynik po odjęciu 2000 zł obsługi",
      "Prosty okres zwrotu wdrożenia za 3000 zł",
    ] as const,
    rows: [
      ["10", "1500 zł", "Ujemny: 500 zł", "Brak zwrotu przy tych założeniach"],
      ["15", "2250 zł", "Dodatni: 250 zł", "12 miesięcy"],
      ["30", "4500 zł", "Dodatni: 2500 zł", "Około 1,2 miesiąca"],
    ] as const,
  },
  faq: [
    {
      id: "czy-2000-zl-miesiecznie-to-abonament-voicelink",
      question: "Czy 2000 zł miesięcznie to abonament VoiceLink?",
      answer:
        "Nie. To przykładowy poziom kosztów użyty w kalkulacji. Rozliczenie VoiceLink zależy od wykorzystania minut i SMS oraz uzgodnionych stawek. Osobno trzeba uwzględnić wymagane opłaty zewnętrzne.",
    },
    {
      id: "czy-cena-060-zl-za-minute-obowiazuje-kazda-placowke",
      question: "Czy cena 0,60 zł za minutę obowiązuje każdą placówkę?",
      answer:
        "To stawka w podstawowym pakiecie. Przy większym wolumenie rozmów stawka jest niższa i ustalana dla danego zakresu wykorzystania.",
    },
    {
      id: "czy-voicebot-moze-zwrocic-sie-w-pierwszym-miesiacu",
      question: "Czy voicebot może zwrócić się w pierwszym miesiącu?",
      answer:
        "Może, jeśli korzyści po kosztach wykonania dodatkowych wizyt i obsługi rozwiązania pokryją także wdrożenie. W przedstawionym przykładzie wymaga to 34 dodatkowych wizyt z kwotą 150 zł pozostającą placówce z każdej.",
    },
    {
      id: "kiedy-wdrozenie-moze-byc-mniej-oplacalne",
      question: "Kiedy wdrożenie może być mniej opłacalne?",
      answer:
        "Gdy placówka ma niewielki ruch, wysoki koszt integracji, mało wolnych terminów lub niewielką marżę z dodatkowej wizyty. W takiej sytuacji warto ocenić węższy zakres automatyzacji i korzyści organizacyjne.",
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [
    {
      id: 1,
      text: "KAMSOFT, publiczny cennik produktów i usług integracyjnych, sprawdzony 17 października 2026 roku.",
      linkLabel: "Cennik KAMSOFT",
      href: "https://cennik.kamsoft.pl/",
    },
    {
      id: 2,
      text: "U.S. Small Business Administration, materiały dotyczące progu rentowności.",
      linkLabel: "Break-even point",
      href: "https://legacy.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point",
    },
    {
      id: 3,
      text: "Gurol-Urganci I. i wsp., „Mobile phone messaging reminders for attendance at healthcare appointments”, Cochrane Database of Systematic Reviews, 2013; CD007458.",
      linkLabel: "Przegląd Cochrane",
      href: "https://www.cochrane.org/evidence/CD007458_mobile-phone-messaging-reminders-attendance-healthcare-appointments",
    },
  ] as const satisfies readonly BlogArticleSource[],
  methodologyNote:
    "Ceny brutto, zakres oferty i zasady współpracy VoiceLink podano na podstawie informacji przekazanych przez firmę 17 października 2026 roku. Wyliczenia finansowe są przykładami opartymi na opisanych założeniach. Nie stanowią pomiaru wyników konkretnej placówki ani gwarancji zwrotu.",
} as const;

export const rolloutArticle = {
  ...articleSummary("wdrozenie-asystenta-glosowego-w-placowce-medycznej"),
  toc: [
    {
      id: "krok-1-analiza-obslugi-telefonicznej-i-potrzeb-placowki",
      label: "Krok 1. Analiza obsługi i potrzeb",
    },
    {
      id: "krok-2-umowa-platnosc-i-spotkanie-projektowe",
      label: "Krok 2. Umowa i spotkanie projektowe",
    },
    {
      id: "krok-3-konfiguracja-asystenta-po-stronie-voicelink",
      label: "Krok 3. Konfiguracja asystenta",
    },
    {
      id: "krok-4-testy-na-osobnym-numerze-telefonu",
      label: "Krok 4. Testy na osobnym numerze",
    },
    {
      id: "krok-5-podlaczenie-prawdziwego-kalendarza",
      label: "Krok 5. Podłączenie kalendarza",
    },
    {
      id: "krok-6-kontrolowane-uruchomienie-na-numerze-placowki",
      label: "Krok 6. Uruchomienie na numerze placówki",
    },
    {
      id: "krok-7-pierwszy-miesiac-pilotazowy-i-optymalizacja",
      label: "Krok 7. Miesiąc pilotażowy",
    },
    {
      id: "krok-8-stale-wsparcie-i-analiza-w-voicelink-center",
      label: "Krok 8. Wsparcie i VoiceLink Center",
    },
    {
      id: "ile-trwa-wdrozenie-asystenta-glosowego",
      label: "Ile trwa wdrożenie?",
    },
    {
      id: "jak-przygotowac-placowke-do-wdrozenia",
      label: "Jak przygotować placówkę?",
    },
    {
      id: "najczestsze-pytania-o-wdrozenie-asystenta-glosowego",
      label: "Najczęstsze pytania",
    },
  ] as const,
  checklist: [
    "Liczba połączeń oraz ich rozkład w ciągu dnia.",
    "Dane o odebranych i nieodebranych telefonach.",
    "Średni czas rozmowy i najczęstsze sprawy pacjentów.",
    "Liczba pracowników rejestracji oraz godziny ich pracy.",
    "Sposób przypominania o wizytach i potwierdzania obecności.",
    "Liczba wizyt oraz skala nieodwołanych nieobecności.",
    "Nazwa operatora telefonicznego i sposób obsługi połączeń.",
    "System używany do prowadzenia terminarza.",
  ] as const,
  faq: [
    {
      id: "czy-mozemy-przetestowac-asystenta-przed-rozmowami-z-pacjentami",
      question:
        "Czy możemy przetestować asystenta przed rozmowami z pacjentami?",
      answer:
        "Tak. Najpierw udostępniamy osobny numer telefonu i system testowy. Po dopracowaniu scenariuszy podłączamy prawdziwy kalendarz i ponownie sprawdzamy działanie na numerze testowym.",
    },
    {
      id: "czy-asystent-od-razu-dziala-na-numerze-placowki",
      question: "Czy asystent od razu działa na numerze placówki?",
      answer:
        "Podłączenie do numeru placówki następuje po wcześniejszych testach i akceptacji. Następnie sprawdzamy pierwsze rzeczywiste rozmowy i przygotowujemy rozwiązanie do pilotażu.",
    },
    {
      id: "czy-mozemy-wybrac-glos-i-sposob-prowadzenia-rozmow",
      question: "Czy możemy wybrać głos i sposób prowadzenia rozmów?",
      answer:
        "Tak. Głos, ton, powitanie i zasady komunikacji ustalamy podczas spotkania projektowego.",
    },
    {
      id: "jak-ustalany-jest-abonament-po-pilotazu",
      question: "Jak ustalany jest abonament po pilotażu?",
      answer:
        "Analizujemy rzeczywiste zużycie minutowe oraz zakres obsługi. Na tej podstawie uzgadniamy abonament i warunki umowy na czas nieokreślony.",
    },
    {
      id: "czy-po-uruchomieniu-mozemy-kontaktowac-sie-z-zespolem-voicelink",
      question:
        "Czy po uruchomieniu możemy kontaktować się z zespołem VoiceLink?",
      answer:
        "Tak. Wsparcie jest częścią dalszej współpracy, a kontakt z zespołem odpowiedzialnym za konfigurację jest dostępny 7 dni w tygodniu.",
    },
  ] as const satisfies readonly BlogArticleFaqItem[],
  sources: [] as const satisfies readonly BlogArticleSource[],
} as const;
