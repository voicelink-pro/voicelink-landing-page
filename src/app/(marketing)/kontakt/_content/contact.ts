export const contactContent = {
  metadata: {
    title: "Kontakt",
    description:
      "Wypełnij formularz, a odezwiemy się do Ciebie wkrótce. Umów rozmowę o VoiceLink dla swojej placówki.",
    path: "/kontakt",
  },
  heading: "Rozpocznij",
  description: "Wypełnij formularz, a odezwiemy się do Ciebie wkrótce.",
  form: {
    submit: "Wyślij",
    requiredError: "To pole jest wymagane.",
    emailError: "Podaj poprawny adres e-mail.",
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
