export const calculatorAssumptions = {
  callAutomationRate: 0.9,
  receptionHourValuePln: 40,
  targetNoShowRate: 0.05,
  voiceLinkMinutePricePln: 0.5,
  workdayHours: 8,
} as const;

export type NumericFieldKey =
  | "dailyCalls"
  | "avgCallDurationMinutes"
  | "workdaysPerMonth"
  | "registrationStaffCount"
  | "monthlyTeamEmployerCostPln"
  | "monthlyScheduledVisits"
  | "avgVisitValuePln"
  | "currentNoShowPercent";

export type CalculatorInputs = {
  dailyCalls: number;
  avgCallDurationMinutes: number;
  workdaysPerMonth: number;
  registrationStaffCount: number;
  monthlyTeamEmployerCostPln: number;
  monthlyScheduledVisits: number;
  avgVisitValuePln: number;
  confirmsVisitsCurrently: boolean;
  currentNoShowPercent: number;
};

export type SliderFieldConfig = {
  key: NumericFieldKey;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  decimals: number;
  helperText?: string;
};

export const calculatorFields: Record<NumericFieldKey, SliderFieldConfig> = {
  dailyCalls: {
    key: "dailyCalls",
    label: "Liczba połączeń dziennie",
    unit: "poł.",
    min: 0,
    max: 1000,
    step: 5,
    defaultValue: 100,
    decimals: 0,
  },
  avgCallDurationMinutes: {
    key: "avgCallDurationMinutes",
    label: "Średni czas rozmowy",
    unit: "min",
    min: 0.5,
    max: 15,
    step: 0.5,
    defaultValue: 3,
    decimals: 1,
  },
  workdaysPerMonth: {
    key: "workdaysPerMonth",
    label: "Liczba dni pracy placówki w miesiącu",
    unit: "dni",
    min: 1,
    max: 31,
    step: 1,
    defaultValue: 22,
    decimals: 0,
  },
  registrationStaffCount: {
    key: "registrationStaffCount",
    label: "Liczba osób pracujących w rejestracji",
    unit: "os.",
    min: 1,
    max: 30,
    step: 1,
    defaultValue: 2,
    decimals: 0,
  },
  monthlyTeamEmployerCostPln: {
    key: "monthlyTeamEmployerCostPln",
    label: "Łączny miesięczny koszt pracodawcy za cały zespół rejestracji",
    unit: "zł",
    min: 0,
    max: 200000,
    step: 500,
    defaultValue: 14000,
    decimals: 0,
    helperText:
      "Suma miesięcznych kosztów pracodawcy dla wszystkich osób w rejestracji łącznie, a nie koszt jednej osoby.",
  },
  monthlyScheduledVisits: {
    key: "monthlyScheduledVisits",
    label: "Liczba zaplanowanych wizyt miesięcznie",
    unit: "wizyt",
    min: 0,
    max: 20000,
    step: 50,
    defaultValue: 1000,
    decimals: 0,
  },
  avgVisitValuePln: {
    key: "avgVisitValuePln",
    label: "Średnia wartość wizyty",
    unit: "zł",
    min: 0,
    max: 2000,
    step: 10,
    defaultValue: 200,
    decimals: 0,
  },
  currentNoShowPercent: {
    key: "currentNoShowPercent",
    label: "Aktualny wskaźnik no-show",
    unit: "%",
    min: 0,
    max: 50,
    step: 0.5,
    defaultValue: 10,
    decimals: 1,
    helperText:
      "Odsetek zaplanowanych wizyt, na które pacjenci nie przychodzą.",
  },
};

export const defaultCalculatorInputs: CalculatorInputs = {
  dailyCalls: calculatorFields.dailyCalls.defaultValue,
  avgCallDurationMinutes: calculatorFields.avgCallDurationMinutes.defaultValue,
  workdaysPerMonth: calculatorFields.workdaysPerMonth.defaultValue,
  registrationStaffCount: calculatorFields.registrationStaffCount.defaultValue,
  monthlyTeamEmployerCostPln:
    calculatorFields.monthlyTeamEmployerCostPln.defaultValue,
  monthlyScheduledVisits: calculatorFields.monthlyScheduledVisits.defaultValue,
  avgVisitValuePln: calculatorFields.avgVisitValuePln.defaultValue,
  confirmsVisitsCurrently: false,
  currentNoShowPercent: calculatorFields.currentNoShowPercent.defaultValue,
};

export type CalculatorResults = {
  monthlyCalls: number;
  monthlyCallMinutes: number;
  voiceLinkMinutes: number;
  reclaimedHours: number;
  reclaimedTimeValuePln: number;
  noShowReduction: number;
  reclaimedVisits: number;
  additionalRevenuePln: number;
  voiceLinkMonthlyCostPln: number;
  teamMonthlyHours: number;
  reclaimedShareOfTeamTimePercent: number | null;
  reclaimedValueToTeamCostPercent: number | null;
  inputNoShowPercent: number;
  inputStaffCount: number;
  inputTeamCostPln: number;
};

export function sanitizeFieldValue(
  key: NumericFieldKey,
  rawValue: number,
): number {
  const config = calculatorFields[key];
  if (!Number.isFinite(rawValue)) {
    return config.defaultValue;
  }
  const clamped = Math.min(config.max, Math.max(config.min, rawValue));
  const factor = 10 ** config.decimals;
  return Math.round((clamped + Number.EPSILON) * factor) / factor;
}

export function calculateSavings(
  rawInputs: CalculatorInputs,
  assumptions = calculatorAssumptions,
): CalculatorResults {
  const dailyCalls = sanitizeFieldValue("dailyCalls", rawInputs.dailyCalls);
  const avgCallDurationMinutes = sanitizeFieldValue(
    "avgCallDurationMinutes",
    rawInputs.avgCallDurationMinutes,
  );
  const workdaysPerMonth = sanitizeFieldValue(
    "workdaysPerMonth",
    rawInputs.workdaysPerMonth,
  );
  const registrationStaffCount = sanitizeFieldValue(
    "registrationStaffCount",
    rawInputs.registrationStaffCount,
  );
  const monthlyTeamEmployerCostPln = sanitizeFieldValue(
    "monthlyTeamEmployerCostPln",
    rawInputs.monthlyTeamEmployerCostPln,
  );
  const monthlyScheduledVisits = sanitizeFieldValue(
    "monthlyScheduledVisits",
    rawInputs.monthlyScheduledVisits,
  );
  const avgVisitValuePln = sanitizeFieldValue(
    "avgVisitValuePln",
    rawInputs.avgVisitValuePln,
  );
  const currentNoShowPercent = sanitizeFieldValue(
    "currentNoShowPercent",
    rawInputs.currentNoShowPercent,
  );

  // Obliczenia z pełną precyzją
  const monthlyCalls = dailyCalls * workdaysPerMonth;
  const monthlyCallMinutes = monthlyCalls * avgCallDurationMinutes;
  const voiceLinkMinutes = monthlyCallMinutes * assumptions.callAutomationRate;
  const reclaimedHours = voiceLinkMinutes / 60;
  const reclaimedTimeValuePln =
    reclaimedHours * assumptions.receptionHourValuePln;

  const targetNoShowPercent = assumptions.targetNoShowRate * 100;
  const noShowReduction =
    currentNoShowPercent <= targetNoShowPercent
      ? 0
      : Math.max(0, (currentNoShowPercent - targetNoShowPercent) / 100);

  const reclaimedVisits = monthlyScheduledVisits * noShowReduction;
  const additionalRevenuePln = reclaimedVisits * avgVisitValuePln;
  const voiceLinkMonthlyCostPln =
    voiceLinkMinutes * assumptions.voiceLinkMinutePricePln;

  const teamMonthlyHours =
    registrationStaffCount * workdaysPerMonth * assumptions.workdayHours;

  const reclaimedShareOfTeamTimePercent =
    teamMonthlyHours > 0 ? (reclaimedHours / teamMonthlyHours) * 100 : null;

  const reclaimedValueToTeamCostPercent =
    monthlyTeamEmployerCostPln > 0
      ? (reclaimedTimeValuePln / monthlyTeamEmployerCostPln) * 100
      : null;

  return {
    monthlyCalls,
    monthlyCallMinutes,
    voiceLinkMinutes,
    reclaimedHours,
    reclaimedTimeValuePln,
    noShowReduction,
    reclaimedVisits,
    additionalRevenuePln,
    voiceLinkMonthlyCostPln,
    teamMonthlyHours,
    reclaimedShareOfTeamTimePercent,
    reclaimedValueToTeamCostPercent,
    inputNoShowPercent: currentNoShowPercent,
    inputStaffCount: registrationStaffCount,
    inputTeamCostPln: monthlyTeamEmployerCostPln,
  };
}

export function formatPlNumber(
  value: number,
  options?: { minimumFractionDigits?: number; maximumFractionDigits?: number },
): string {
  if (!Number.isFinite(value)) {
    return "0";
  }

  const minFrac = options?.minimumFractionDigits ?? 0;
  const maxFrac = options?.maximumFractionDigits ?? 0;
  const factor = 10 ** maxFrac;
  const rounded = Math.round((value + Number.EPSILON) * factor) / factor;
  const normalized = Object.is(rounded, -0) ? 0 : rounded;

  const [intPartRaw, decPartRaw = ""] = normalized.toFixed(maxFrac).split(".");
  const intPart = intPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  let decPart = decPartRaw;
  if (maxFrac > minFrac) {
    decPart = decPart.replace(/0+$/, "");
    if (decPart.length < minFrac) {
      decPart = decPart.padEnd(minFrac, "0");
    }
  }

  return decPart.length > 0 ? `${intPart},${decPart}` : intPart;
}

export const calculatorContent = {
  metadata: {
    title: "Kalkulator oszczędności",
    description:
      "Ustaw dane swojej placówki i sprawdź, ile czasu może odzyskać rejestracja oraz jak ograniczenie nieobecności pacjentów może wpłynąć na miesięczny przychód.",
    path: "/kalkulator-oszczednosci",
  },
  hero: {
    eyebrow: "Kalkulator oszczędności",
    heading: "Oblicz oszczędności z VoiceLink",
    description:
      "Sprawdź, ile czasu może odzyskać rejestracja oraz jak ograniczenie nieobecności pacjentów może wpłynąć na miesięczny przychód.",
  },
  form: {
    groups: {
      phoneTraffic: {
        stepNumber: "01",
        title: "Ruch telefoniczny",
        description:
          "Określ dzienną skalę połączeń oraz czas pracy rejestracji w miesiącu.",
      },
      registrationTeam: {
        stepNumber: "02",
        title: "Zespół rejestracji",
        description:
          "Dane zespołu pomagają odnieść odzyskany czas do skali pracy i budżetu recepcji.",
      },
      visitsAndNoShow: {
        stepNumber: "03",
        title: "Wizyty i nieobecności",
        description:
          "Sprawdź, jak ograniczenie nieodwołanych wizyt wpłynie na miesięczny przychód.",
      },
    },
    confirmationsToggle: {
      label: "Czy placówka obecnie potwierdza wizyty?",
      yesLabel: "Tak",
      noLabel: "Nie",
      yesNote: "Uwzględniamy aktualny no-show mimo stosowanych potwierdzeń.",
    },
    submitLabel: "Oblicz oszczędności",
    calculatingLabel: "Przeliczamy…",
    resetLabel: "Przywróć wartości domyślne",
  },
  results: {
    sectionTitle: "Szacowany efekt miesięczny",
    recalculateLabel: "Oblicz ponownie",
    analysisCta: {
      label: "Umów analizę",
      href: "/kontakt",
    },
    dirtyNotice: "Dane zmienione — przelicz ponownie",
    dirtyActionLabel: "Przelicz teraz",
    waitingState: {
      badge: "Analiza miesięczna",
      title: "Ustaw parametry placówki i kliknij „Oblicz oszczędności”",
      description:
        "Po zatwierdzeniu danych poniżej pojawi się pełna analiza w podziale na odzyskany czas rejestracji, wartość pracy zespołu, odzyskane wizyty, dodatkowy przychód oraz koszt VoiceLink.",
      previewItems: [
        "Odzyskany czas rejestracji i wartość odciążenia zespołu",
        "Szacowana liczba odzyskanych wizyt oraz dodatkowy przychód",
        "Przejrzysty miesięczny koszt minut obsłużonych przez VoiceLink",
      ],
    },
    cards: {
      reclaimedTime: {
        badge: "Odciążenie zespołu",
        title: "Odzyskany czas rejestracji",
        unit: "godzin miesięcznie",
        explanation:
          "Czas rozmów, które może obsłużyć VoiceLink przy automatyzacji 90% połączeń.",
      },
      reclaimedTimeValue: {
        title: "Wartość odzyskanego czasu",
        unit: "miesięcznie",
        explanation:
          "Wartość odciążenia zespołu przy założeniu 40 zł za godzinę.",
      },
      reclaimedVisits: {
        title: "Odzyskane wizyty",
        unit: "wizyt miesięcznie",
        explanationReduced: (currentPercent: string) =>
          `Przy ograniczeniu no-show z ${currentPercent}% do 5%.`,
        explanationAtOrBelowTarget: (currentPercent: string) =>
          `Aktualny no-show (${currentPercent}%) nie przekracza docelowego poziomu 5% — brak dodatkowej redukcji.`,
      },
      additionalRevenue: {
        badge: "Potencjał przychodowy",
        title: "Dodatkowy przychód z wizyt",
        unit: "miesięcznie",
        explanation:
          "Szacowany przychód z odzyskanych wizyt przy podanej średniej wartości wizyty.",
      },
      voiceLinkCost: {
        badge: "Rozliczenie za minuty",
        title: "Szacowany miesięczny koszt VoiceLink",
        unit: "miesięcznie",
        explanation: (minutesFormatted: string, rateFormatted: string) =>
          `${minutesFormatted} minut obsługi × ${rateFormatted} zł/min.`,
      },
    },
    disclaimer:
      "Wyniki są szacunkowe. Przyjmujemy automatyzację 90% rozmów, wartość pracy 40 zł/h i ograniczenie no-show do maksymalnie 5%. Efekty zależą od organizacji pracy i zakresu wdrożenia.",
  },
  cta: {
    heading: "Porozmawiajmy o Twojej placówce",
    description:
      "Wypełnij formularz, a odezwiemy się do Ciebie wkrótce i wspólnie omówimy wdrożenie dopasowane do skali Twojej rejestracji.",
  },
} as const;
