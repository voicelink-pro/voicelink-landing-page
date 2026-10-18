export const testAssistantContent = {
  metadata: {
    title: "Porozmawiaj z Asystentem VoiceLink",
    description:
      "Wpisz swój numer telefonu, odbierz połączenie od Asystenta VoiceLink i przetestuj rozmowę na żywo.",
    path: "/przetestuj",
  },
  eyebrow: "Test na żywo",
  heading: "Porozmawiaj z Asystentem VoiceLink",
  description:
    "Wpisz swój numer telefonu, a Asystent VoiceLink automatycznie zadzwoni do Ciebie, abyś mógł sprawdzić rozmowę na żywo.",
  form: {
    phoneLabel: "Numer telefonu",
    phonePlaceholder: "500 100 200",
    submitLabel: "Zadzwoń teraz",
    pendingLabel: "Łączenie…",
    inCallLabel: "Trwa rozmowa",
    retryLabel: "Zadzwoń ponownie",
    note: "Wpisz 9 cyfr polskiego numeru. Po wpisaniu numeru połączenie zostanie wywołane automatycznie.",
  },
  states: {
    calling: "Inicjujemy połączenie z Asystentem…",
    ringingTitle: "Dzwonimy na Twój numer",
    ringingHint:
      "Odbierz połączenie w telefonie — licznik włączy się automatycznie w chwili odebrania.",
    liveTitle: "Rozmowa z Asystentem trwa",
    liveHint:
      "Porozmawiaj o wolnych terminach, lekarzach lub usługach placówki.",
    endedTitle: "Rozmowa zakończona",
    endedHint:
      "Zapisaliśmy identyfikator rozmowy oraz czas trwania sesji testowej.",
    unansweredTitle: "Połączenie nie zostało odebrane",
    unansweredHint: "Możesz wywołać połączenie ponownie jednym kliknięciem.",
    invalid: "Wpisz 9 cyfr numeru telefonu.",
    failed: "Nie udało się rozpocząć połączenia. Spróbuj ponownie.",
    unavailable: "Test połączenia jest chwilowo niedostępny.",
    limited: "Odczekaj chwilę przed kolejną próbą.",
  },
  metrics: {
    timerLabel: "Czas rozmowy",
    conversationIdLabel: "ID rozmowy",
    callSidLabel: "ID połączenia",
    durationLabel: "Czas trwania",
    copyLabel: "Kopiuj",
    copiedLabel: "Skopiowano",
  },
  promptsHeading: "O co możesz zapytać podczas testu:",
  prompts: [
    "Umówienie, przełożenie lub odwołanie wizyty u wybranego lekarza.",
    "Godziny pracy rejestracji, adres placówki i przygotowanie do wizyty.",
    "Dostępni specjaliści, wykonywane usługi oraz orientacyjne terminy.",
  ],
} as const;
