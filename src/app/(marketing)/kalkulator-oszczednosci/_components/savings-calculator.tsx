"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import Link from "next/link";
import {
  CalculatorIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  RotateCcwIcon,
} from "lucide-react";
import { BrandIcon } from "@/components/brand-icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import {
  calculateSavings,
  calculatorAssumptions,
  calculatorContent,
  calculatorFields,
  defaultCalculatorInputs,
  formatPlNumber,
  sanitizeFieldValue,
  type CalculatorInputs,
  type CalculatorResults,
  type NumericFieldKey,
  type SliderFieldConfig,
} from "../_content/calculator";

const CALCULATION_DELAY_MS = 750;

function parsePolishNumberInput(raw: string): number | null {
  const cleaned = raw.replace(/\s+/g, "").replace(",", ".");
  if (cleaned === "" || cleaned === "-" || cleaned === ".") {
    return null;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

type SliderFieldProps = {
  config: SliderFieldConfig;
  value: number;
  onChange: (key: NumericFieldKey, nextValue: number) => void;
  className?: string;
};

function CalculatorSliderField({
  config,
  value,
  onChange,
  className,
}: SliderFieldProps) {
  const baseId = useId();
  const inputId = `${baseId}-${config.key}-input`;
  const labelId = `${baseId}-${config.key}-label`;
  const helperId = `${baseId}-${config.key}-helper`;

  const formattedValue = formatPlNumber(value, {
    maximumFractionDigits: config.decimals,
  });

  const [draftText, setDraftText] = useState<string | null>(null);
  const displayedInputText = draftText ?? formattedValue;

  function commitDraft(text: string) {
    const parsed = parsePolishNumberInput(text);
    if (parsed === null) {
      setDraftText(null);
      return;
    }
    const clamped = sanitizeFieldValue(config.key, Math.max(0, parsed));
    onChange(config.key, clamped);
    setDraftText(null);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    if (!/^[0-9\s.,]*$/.test(raw)) {
      return;
    }
    setDraftText(raw);

    const parsed = parsePolishNumberInput(raw);
    if (parsed !== null && parsed >= config.min && parsed <= config.max) {
      const sanitized = sanitizeFieldValue(config.key, parsed);
      onChange(config.key, sanitized);
    }
  }

  function handleInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      commitDraft(displayedInputText);
      event.currentTarget.blur();
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setDraftText(null);
      event.currentTarget.blur();
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      const direction = event.key === "ArrowUp" ? 1 : -1;
      const multiplier = event.shiftKey ? 10 : 1;
      const next = sanitizeFieldValue(
        config.key,
        value + direction * config.step * multiplier,
      );
      setDraftText(null);
      onChange(config.key, next);
    }
  }

  const minLabel = `${formatPlNumber(config.min, { maximumFractionDigits: config.decimals })} ${config.unit}`;
  const maxLabel = `${formatPlNumber(config.max, { maximumFractionDigits: config.decimals })} ${config.unit}`;

  function stepByDirection(direction: -1 | 1) {
    const next = sanitizeFieldValue(
      config.key,
      value + direction * config.step,
    );
    setDraftText(null);
    onChange(config.key, next);
  }

  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2 rounded-2xl border border-border/80 bg-muted/35 px-4 py-3 transition-colors duration-150 hover:border-border",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label
            className="text-sm leading-snug font-medium text-foreground sm:text-[0.9375rem]"
            htmlFor={inputId}
            id={labelId}
          >
            {config.label}
          </label>
          {config.helperText ? (
            <p
              className="text-xs leading-4.5 text-pretty text-muted-foreground"
              id={helperId}
            >
              {config.helperText}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center self-start rounded-xl border border-input bg-white px-3 py-1.5 shadow-2xs transition-[border-color,box-shadow] duration-150 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/25">
          <input
            aria-describedby={config.helperText ? helperId : undefined}
            className="w-20 bg-transparent text-right text-base font-medium tracking-[-0.02em] text-foreground tabular-nums outline-none sm:w-24"
            id={inputId}
            inputMode={config.decimals > 0 ? "decimal" : "numeric"}
            onBlur={() => commitDraft(displayedInputText)}
            onChange={handleInputChange}
            onFocus={(event) => {
              setDraftText(formattedValue);
              event.currentTarget.select();
            }}
            onKeyDown={handleInputKeyDown}
            type="text"
            value={displayedInputText}
          />
          <span className="ml-1.5 text-xs font-medium text-muted-foreground select-none">
            {config.unit}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1 pt-0.5">
        <div className="flex items-center gap-2">
          <button
            aria-label={`Zmniejsz: ${config.label}`}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-foreground shadow-2xs transition-[background-color,border-color,color,transform] duration-150 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 disabled:pointer-events-none disabled:opacity-35"
            disabled={value <= config.min}
            onClick={() => stepByDirection(-1)}
            type="button"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-4" />
          </button>

          <div className="min-w-0 flex-1">
            <Slider
              ariaLabel={config.label}
              ariaLabelledBy={labelId}
              ariaValueText={`${formattedValue} ${config.unit}`}
              max={config.max}
              min={config.min}
              onValueChange={(nextVal) => {
                setDraftText(null);
                onChange(config.key, sanitizeFieldValue(config.key, nextVal));
              }}
              step={config.step}
              value={value}
            />
          </div>

          <button
            aria-label={`Zwiększ: ${config.label}`}
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-foreground shadow-2xs transition-[background-color,border-color,color,transform] duration-150 hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-95 disabled:pointer-events-none disabled:opacity-35"
            disabled={value >= config.max}
            onClick={() => stepByDirection(1)}
            type="button"
          >
            <ChevronRightIcon aria-hidden="true" className="size-4" />
          </button>
        </div>

        <div
          aria-hidden="true"
          className="flex items-center justify-between px-9 text-[0.75rem] leading-4 text-muted-foreground tabular-nums"
        >
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

type CalculatorStep = "form" | "calculating" | "results";

export function SavingsCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(
    defaultCalculatorInputs,
  );
  const [step, setStep] = useState<CalculatorStep>("form");
  const [calculatedResults, setCalculatedResults] =
    useState<CalculatorResults | null>(null);
  const [calculationCount, setCalculationCount] = useState(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function updateNumericField(key: NumericFieldKey, nextValue: number) {
    setInputs((prev) => {
      if (prev[key] === nextValue) {
        return prev;
      }
      return { ...prev, [key]: nextValue };
    });
  }

  function updateConfirmationsToggle(nextConfirmed: boolean) {
    setInputs((prev) => {
      if (prev.confirmsVisitsCurrently === nextConfirmed) {
        return prev;
      }
      return { ...prev, confirmsVisitsCurrently: nextConfirmed };
    });
  }

  function scrollBoxIntoViewIfNeeded() {
    if (typeof window === "undefined" || !boxRef.current) {
      return;
    }
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rect = boxRef.current.getBoundingClientRect();
    if (rect.top < 76 || rect.top > window.innerHeight * 0.45) {
      boxRef.current.scrollIntoView({
        behavior: prefersReduced ? "auto" : "smooth",
        block: "start",
      });
    }
  }

  function triggerCalculation() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setStep("calculating");
    const snapshot = { ...inputs };

    requestAnimationFrame(() => {
      scrollBoxIntoViewIfNeeded();
    });

    timerRef.current = setTimeout(() => {
      const nextResults = calculateSavings(snapshot);
      setCalculatedResults(nextResults);
      setCalculationCount((c) => c + 1);
      setStep("results");
    }, CALCULATION_DELAY_MS);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    triggerCalculation();
  }

  function handleBackToForm() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setStep("form");
    requestAnimationFrame(() => {
      scrollBoxIntoViewIfNeeded();
    });
  }

  function handleResetDefaults() {
    setInputs(defaultCalculatorInputs);
  }

  const { groups, confirmationsToggle, submitLabel, calculatingLabel } =
    calculatorContent.form;
  const { sectionTitle, recalculateLabel, analysisCta, cards, disclaimer } =
    calculatorContent.results;

  const rateFormatted = formatPlNumber(
    calculatorAssumptions.voiceLinkMinutePricePln,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  return (
    <div
      aria-live="polite"
      className="scroll-mt-[calc(var(--site-header-height)+1.25rem)]"
      ref={boxRef}
    >
      {/* JEDNO MIEJSCE / GŁÓWNY BOX KALKULATORA Z PŁYNNYM PRZEJŚCIEM WIDOKÓW */}
      <div className="rounded-3xl border border-white/15 bg-white p-5 text-foreground shadow-[0_28px_80px_-36px_rgba(2,11,36,0.72)] sm:p-6 lg:p-8">
        {step === "form" ? (
          <form
            key="calculator-form-step"
            aria-label="Formularz kalkulatora oszczędności"
            className="page-enter flex flex-col gap-5"
            noValidate
            onSubmit={handleFormSubmit}
          >
            {/* GRUPA 1: RUCH TELEFONICZNY */}
            <fieldset className="flex flex-col gap-3.5 border-0 p-0">
              <div className="flex flex-col justify-between gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BrandIcon className="size-6" icon="/telefon.webp" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-eyebrow uppercase tabular-nums">
                    {groups.phoneTraffic.stepNumber}
                  </span>
                  <legend className="subsection-title text-lg text-foreground sm:text-xl">
                    {groups.phoneTraffic.title}
                  </legend>
                </div>
                <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                  {groups.phoneTraffic.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <CalculatorSliderField
                  config={calculatorFields.dailyCalls}
                  onChange={updateNumericField}
                  value={inputs.dailyCalls}
                />
                <CalculatorSliderField
                  config={calculatorFields.avgCallDurationMinutes}
                  onChange={updateNumericField}
                  value={inputs.avgCallDurationMinutes}
                />
                <CalculatorSliderField
                  className="md:col-span-2 lg:col-span-1"
                  config={calculatorFields.workdaysPerMonth}
                  onChange={updateNumericField}
                  value={inputs.workdaysPerMonth}
                />
              </div>
            </fieldset>

            {/* GRUPA 2: ZESPÓŁ REJESTRACJI */}
            <fieldset className="flex flex-col gap-3.5 border-t border-border pt-4">
              <div className="flex flex-col justify-between gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BrandIcon className="size-6" icon="/przekierowanie.webp" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-eyebrow uppercase tabular-nums">
                    {groups.registrationTeam.stepNumber}
                  </span>
                  <legend className="subsection-title text-lg text-foreground sm:text-xl">
                    {groups.registrationTeam.title}
                  </legend>
                </div>
                <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                  {groups.registrationTeam.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CalculatorSliderField
                  config={calculatorFields.registrationStaffCount}
                  onChange={updateNumericField}
                  value={inputs.registrationStaffCount}
                />
                <CalculatorSliderField
                  config={calculatorFields.monthlyTeamEmployerCostPln}
                  onChange={updateNumericField}
                  value={inputs.monthlyTeamEmployerCostPln}
                />
              </div>
            </fieldset>

            {/* GRUPA 3: WIZYTY I NIEOBECNOŚCI */}
            <fieldset className="flex flex-col gap-3.5 border-t border-border pt-4">
              <div className="flex flex-col justify-between gap-1 border-b border-border pb-2.5 sm:flex-row sm:items-baseline sm:gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BrandIcon className="size-6" icon="/kalendarz.webp" />
                  </span>
                  <span className="text-xs font-semibold tracking-[0.14em] text-eyebrow uppercase tabular-nums">
                    {groups.visitsAndNoShow.stepNumber}
                  </span>
                  <legend className="subsection-title text-lg text-foreground sm:text-xl">
                    {groups.visitsAndNoShow.title}
                  </legend>
                </div>
                <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                  {groups.visitsAndNoShow.description}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CalculatorSliderField
                  config={calculatorFields.monthlyScheduledVisits}
                  onChange={updateNumericField}
                  value={inputs.monthlyScheduledVisits}
                />
                <CalculatorSliderField
                  config={calculatorFields.avgVisitValuePln}
                  onChange={updateNumericField}
                  value={inputs.avgVisitValuePln}
                />

                {/* Przełącznik potwierdzania wizyt: Tak / Nie */}
                <div className="flex flex-col justify-between gap-2.5 rounded-2xl border border-border/80 bg-muted/35 px-4 py-3">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <span
                      className="text-sm leading-snug font-medium text-foreground sm:text-[0.9375rem]"
                      id="confirmations-toggle-label"
                    >
                      {confirmationsToggle.label}
                    </span>
                    <div
                      aria-labelledby="confirmations-toggle-label"
                      className="inline-grid shrink-0 grid-cols-2 self-start rounded-xl border border-border bg-white p-1 shadow-2xs sm:self-center"
                      role="radiogroup"
                    >
                      <button
                        aria-checked={!inputs.confirmsVisitsCurrently}
                        className={cn(
                          "rounded-lg px-4 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          !inputs.confirmsVisitsCurrently
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={() => updateConfirmationsToggle(false)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "ArrowRight" ||
                            event.key === "ArrowLeft"
                          ) {
                            event.preventDefault();
                            updateConfirmationsToggle(true);
                          }
                        }}
                        role="radio"
                        type="button"
                      >
                        {confirmationsToggle.noLabel}
                      </button>
                      <button
                        aria-checked={inputs.confirmsVisitsCurrently}
                        className={cn(
                          "rounded-lg px-4 py-1.5 text-sm font-medium transition-[background-color,color,box-shadow] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                          inputs.confirmsVisitsCurrently
                            ? "bg-primary text-primary-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                        onClick={() => updateConfirmationsToggle(true)}
                        onKeyDown={(event) => {
                          if (
                            event.key === "ArrowRight" ||
                            event.key === "ArrowLeft"
                          ) {
                            event.preventDefault();
                            updateConfirmationsToggle(false);
                          }
                        }}
                        role="radio"
                        type="button"
                      >
                        {confirmationsToggle.yesLabel}
                      </button>
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-muted-foreground">
                    {inputs.confirmsVisitsCurrently
                      ? confirmationsToggle.yesNote
                      : "Efekt obliczamy na podstawie podanego wskaźnika no-show i założenia jego ograniczenia do 5%."}
                  </p>
                </div>

                <CalculatorSliderField
                  config={calculatorFields.currentNoShowPercent}
                  onChange={updateNumericField}
                  value={inputs.currentNoShowPercent}
                />
              </div>
            </fieldset>

            {/* DOLNY PASEK FORMULARZA Z PRZYCISKIEM OBLICZ */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-4 sm:flex-row">
              <button
                className="order-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:order-1"
                onClick={handleResetDefaults}
                type="button"
              >
                <RotateCcwIcon aria-hidden="true" className="size-3.5" />
                <span>{calculatorContent.form.resetLabel}</span>
              </button>

              <Button
                className="order-1 h-12 w-full px-8 text-base font-medium shadow-[0_12px_28px_-12px_rgba(15,55,132,0.55)] sm:order-2 sm:h-13 sm:w-auto sm:min-w-72"
                size="lg"
                type="submit"
              >
                <CalculatorIcon aria-hidden="true" className="size-5" />
                <span>{submitLabel}</span>
              </Button>
            </div>
          </form>
        ) : step === "calculating" || calculatedResults === null ? (
          /* PŁYNNY STAN PRZELICZANIA W MIEJSCU BOXA */
          <div
            key="calculator-calculating-step"
            className="page-enter flex min-h-[26rem] flex-col items-center justify-center gap-4 py-12 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Loader2Icon
                aria-hidden="true"
                className="size-7 motion-safe:animate-spin"
              />
            </span>
            <p className="subsection-title text-2xl text-foreground sm:text-3xl">
              {calculatingLabel}
            </p>
          </div>
        ) : (
          /* WIDOK WYNIKÓW W MIEJSCU BOXA FORMULARZA */
          <div
            key={`calculator-results-${calculationCount}`}
            className="page-enter flex flex-col gap-5 sm:gap-6"
          >
            <div className="flex items-center gap-2.5 border-b border-border pb-4">
              <span className="inline-flex size-2.5 rounded-full bg-primary" />
              <h2 className="subsection-title text-xl text-foreground sm:text-2xl">
                {sectionTitle}
              </h2>
            </div>

            {/* GÓRNY RZĄD: 2 GŁÓWNE WYEKSPONOWANE BOXY (ODZYSKANY CZAS + DODATKOWY PRZYCHÓD) */}
            <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
              {/* KARTA 1 (WYEKSPONOWANA): ODZYSKANY CZAS REJESTRACJI */}
              <article className="flex flex-col justify-between rounded-2xl border-2 border-primary/25 bg-primary/[0.03] p-5 text-foreground sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {cards.reclaimedTime.badge}
                      </span>
                      <h3 className="subsection-title mt-1 text-xl text-foreground sm:text-2xl">
                        {cards.reclaimedTime.title}
                      </h3>
                    </div>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <BrandIcon className="size-10" icon="/zegar.webp" />
                    </span>
                  </div>

                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-4xl leading-none font-normal tracking-[-0.05em] text-primary tabular-nums sm:text-5xl">
                      {formatPlNumber(calculatedResults.reclaimedHours, {
                        maximumFractionDigits: 1,
                      })}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground sm:text-base">
                      {cards.reclaimedTime.unit}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                    {cards.reclaimedTime.explanation}
                  </p>
                </div>

                {calculatedResults.reclaimedShareOfTeamTimePercent !== null ? (
                  <div className="mt-4 border-t border-border pt-3.5 text-xs leading-5 text-foreground/80">
                    Odpowiada to{" "}
                    <strong className="font-semibold text-foreground tabular-nums">
                      {formatPlNumber(
                        calculatedResults.reclaimedShareOfTeamTimePercent,
                        { maximumFractionDigits: 1 },
                      )}
                      %
                    </strong>{" "}
                    szacowanego czasu pracy zespołu (
                    <span className="tabular-nums">
                      {formatPlNumber(calculatedResults.teamMonthlyHours)} godz.
                    </span>{" "}
                    miesięcznie przy {calculatedResults.inputStaffCount} os.).
                  </div>
                ) : null}
              </article>

              {/* KARTA 4 (WYEKSPONOWANA): DODATKOWY PRZYCHÓD Z WIZYT */}
              <article className="flex flex-col justify-between rounded-2xl border-2 border-primary/25 bg-primary/[0.03] p-5 text-foreground sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {cards.additionalRevenue.badge}
                      </span>
                      <h3 className="subsection-title mt-1 text-xl text-foreground sm:text-2xl">
                        {cards.additionalRevenue.title}
                      </h3>
                    </div>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                      <BrandIcon className="size-10" icon="/statystyki.webp" />
                    </span>
                  </div>

                  <p className="mt-5 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-4xl leading-none font-normal tracking-[-0.05em] text-primary tabular-nums sm:text-5xl">
                      {formatPlNumber(calculatedResults.additionalRevenuePln)}{" "}
                      zł
                    </span>
                    <span className="text-sm font-medium text-muted-foreground sm:text-base">
                      {cards.additionalRevenue.unit}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                    {cards.additionalRevenue.explanation}
                  </p>
                </div>

                <div className="mt-4 border-t border-border pt-3.5 text-xs leading-5 text-foreground/80">
                  Wyliczono dla ograniczenia wskaźnika nieobecności pacjentów
                  (no-show) do docelowego poziomu 5%.
                </div>
              </article>
            </div>

            {/* DOLNY RZĄD: 3 BOXY SZCZEGÓŁOWE OBOK SIEBIE */}
            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {/* KARTA 2: WARTOŚĆ ODZYSKANEGO CZASU */}
              <article className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-5 text-foreground sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="subsection-title text-lg text-foreground sm:text-xl">
                      {cards.reclaimedTimeValue.title}
                    </h3>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-border">
                      <BrandIcon className="size-10" icon="/banknot.webp" />
                    </span>
                  </div>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl leading-none font-normal tracking-[-0.045em] text-foreground tabular-nums sm:text-4xl">
                      {formatPlNumber(calculatedResults.reclaimedTimeValuePln)}{" "}
                      zł
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      {cards.reclaimedTimeValue.unit}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                    {cards.reclaimedTimeValue.explanation}
                  </p>
                </div>

                {calculatedResults.reclaimedValueToTeamCostPercent !== null ? (
                  <div className="mt-4 border-t border-border pt-3 text-xs leading-5 text-foreground/80">
                    Stanowi to{" "}
                    <strong className="font-semibold text-foreground tabular-nums">
                      {formatPlNumber(
                        calculatedResults.reclaimedValueToTeamCostPercent,
                        { maximumFractionDigits: 1 },
                      )}
                      %
                    </strong>{" "}
                    łącznego miesięcznego kosztu zespołu rejestracji.
                  </div>
                ) : null}
              </article>

              {/* KARTA 3: ODZYSKANE WIZYTY */}
              <article className="flex flex-col justify-between rounded-2xl border border-border bg-muted/40 p-5 text-foreground sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="subsection-title text-lg text-foreground sm:text-xl">
                      {cards.reclaimedVisits.title}
                    </h3>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-border">
                      <BrandIcon className="size-10" icon="/kalendarz.webp" />
                    </span>
                  </div>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl leading-none font-normal tracking-[-0.045em] text-foreground tabular-nums sm:text-4xl">
                      {calculatedResults.reclaimedVisits > 0
                        ? `około ${formatPlNumber(Math.max(1, Math.round(calculatedResults.reclaimedVisits)))}`
                        : "0"}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      {cards.reclaimedVisits.unit}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
                    {calculatedResults.inputNoShowPercent > 5
                      ? cards.reclaimedVisits.explanationReduced(
                          formatPlNumber(calculatedResults.inputNoShowPercent, {
                            maximumFractionDigits: 1,
                          }),
                        )
                      : cards.reclaimedVisits.explanationAtOrBelowTarget(
                          formatPlNumber(calculatedResults.inputNoShowPercent, {
                            maximumFractionDigits: 1,
                          }),
                        )}
                  </p>
                </div>
              </article>

              {/* KARTA 5 (RÓWNIE CZYTELNA): SZACOWANY MIESIĘCZNY KOSZT VOICELINK */}
              <article className="flex flex-col justify-between rounded-2xl border border-border bg-muted p-5 text-foreground sm:p-6">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-white px-2.5 py-0.5 text-xs font-medium text-foreground ring-1 ring-border">
                        {cards.voiceLinkCost.badge}
                      </span>
                      <h3 className="subsection-title mt-1 text-lg text-foreground sm:text-xl">
                        {cards.voiceLinkCost.title}
                      </h3>
                    </div>
                    <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-white ring-1 ring-border">
                      <BrandIcon
                        className="size-10"
                        icon="/voicelinkcenter.webp"
                      />
                    </span>
                  </div>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span className="text-3xl leading-none font-normal tracking-[-0.045em] text-foreground tabular-nums sm:text-4xl">
                      {formatPlNumber(
                        calculatedResults.voiceLinkMonthlyCostPln,
                      )}{" "}
                      zł
                    </span>
                    <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                      {cards.voiceLinkCost.unit}
                    </span>
                  </p>

                  <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground tabular-nums">
                    {cards.voiceLinkCost.explanation(
                      formatPlNumber(calculatedResults.voiceLinkMinutes, {
                        maximumFractionDigits: 1,
                      }),
                      rateFormatted,
                    )}
                  </p>
                </div>
              </article>
            </div>

            {/* INFORMACJA POD WYNIKAMI ORAZ PRZYCISKI */}
            <div className="flex flex-col items-stretch justify-between gap-4 border-t border-border pt-4 lg:flex-row lg:items-center">
              <p className="text-xs leading-5 text-pretty text-muted-foreground sm:text-sm">
                {disclaimer}
              </p>

              <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
                <Button
                  className="h-12 w-full px-6 text-base font-medium sm:h-13 sm:w-auto"
                  onClick={handleBackToForm}
                  size="lg"
                  type="button"
                  variant="outline"
                >
                  <RotateCcwIcon aria-hidden="true" className="size-4" />
                  <span>{recalculateLabel}</span>
                </Button>
                <Link
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 w-full px-8 text-base font-medium shadow-[0_12px_28px_-12px_rgba(15,55,132,0.55)] sm:h-13 sm:w-auto sm:min-w-52",
                  )}
                  href={analysisCta.href}
                >
                  {analysisCta.label}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
