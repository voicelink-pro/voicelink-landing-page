export const contactContent = {
  metadata: {
    title: "Kontakt i bezpłatna konsultacja wdrożenia",
    description:
      "Skontaktuj się z zespołem VoiceLink i umów krótką rozmowę o wdrożeniu asystenta głosowego AI w Twojej placówce medycznej. Odpowiadamy szybko i konkretnie.",
    path: "/kontakt",
  },
  heading: "Rozpocznij",
  description: "Wypełnij formularz, a odezwiemy się do Ciebie wkrótce.",
  form: {
    submit: "Wyślij",
    sending: "Wysyłanie…",
    requiredError: "To pole jest wymagane.",
    emailError: "Podaj poprawny adres e-mail.",
    phoneError: "Podaj 9 cyfr albo numer z prefiksem, np. +48 600 100 200.",
    submitError: "Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.",
    limitedError: "Za dużo prób. Spróbuj ponownie za kilka minut.",
    successTitle: "Dziękujemy",
    successDescription: "Wiadomość została wysłana. Odezwiemy się wkrótce.",
    fields: {
      firstName: { label: "Imię", autoComplete: "given-name" },
      lastName: { label: "Nazwisko", autoComplete: "family-name" },
      facility: { label: "Nazwa placówki", autoComplete: "organization" },
      phone: { label: "Numer telefonu", autoComplete: "tel" },
      email: { label: "E-mail", autoComplete: "email" },
      message: { label: "Wiadomość" },
    },
  },
} as const;
