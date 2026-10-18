"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";
import {
  parseContactPhone,
  sanitizeContactPhoneInput,
} from "@/lib/contact-phone";
import { cn } from "@/lib/utils";

import { contactContent } from "../_content/contact";

const { form } = contactContent;

const fieldClassName =
  "h-11 rounded-lg border-input bg-white px-3.5 text-base md:text-base";

type FieldName =
  "firstName" | "lastName" | "facility" | "phone" | "email" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

type SubmitStatus = "idle" | "sending" | "sent";

const requiredFields = [
  "firstName",
  "lastName",
  "facility",
  "phone",
] as const satisfies readonly FieldName[];

function readValue(data: FormData, name: FieldName) {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validate(data: FormData) {
  const errors: FieldErrors = {};

  for (const name of requiredFields) {
    if (!readValue(data, name)) {
      errors[name] = form.requiredError;
    }
  }

  const phone = readValue(data, "phone");
  if (phone && !parseContactPhone(phone)) {
    errors.phone = form.phoneError;
  }

  const email = readValue(data, "email");
  if (email && !isEmail(email)) {
    errors.email = form.emailError;
  }

  return errors;
}

function isResponseField(value: unknown): value is "phone" | "email" {
  return value === "phone" || value === "email";
}

function RequiredMark() {
  return (
    <abbr className="text-primary no-underline" title="pole wymagane">
      *
    </abbr>
  );
}

function ContactField({
  children,
  error,
  id,
  label,
  required = false,
  className,
}: {
  children: ReactNode;
  error?: string;
  id: string;
  label: string;
  required?: boolean;
  className?: string;
}) {
  const errorId = `${id}-error`;

  return (
    <Field className={className} data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? <RequiredMark /> : null}
      </FieldLabel>
      {children}
      {error ? (
        <p className="text-sm text-destructive" id={errorId}>
          {error}
        </p>
      ) : null}
    </Field>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") {
      return;
    }

    const data = new FormData(event.currentTarget);
    const nextErrors = validate(data);
    setErrors(nextErrors);
    setSubmitError("");

    const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find(
      (name) => nextErrors[name],
    );

    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: readValue(data, "firstName"),
          lastName: readValue(data, "lastName"),
          facility: readValue(data, "facility"),
          phone: readValue(data, "phone"),
          email: readValue(data, "email"),
          message: readValue(data, "message"),
        }),
      });
      const payload: unknown = await response.json().catch(() => null);
      const field =
        payload && typeof payload === "object" && "field" in payload
          ? payload.field
          : undefined;
      const code =
        payload && typeof payload === "object" && "code" in payload
          ? payload.code
          : undefined;

      if (response.ok) {
        setStatus("sent");
        return;
      }

      if (isResponseField(field)) {
        setErrors({
          [field]: field === "phone" ? form.phoneError : form.emailError,
        });
        document.getElementById(`contact-${field}`)?.focus();
      } else if (code === "limited") {
        setSubmitError(form.limitedError);
      } else {
        setSubmitError(form.submitError);
      }
    } catch {
      setSubmitError(form.submitError);
    }

    setStatus("idle");
  }

  return (
    <form
      aria-labelledby="contact-heading"
      className="w-full rounded-[1.35rem] bg-white px-5 py-6 text-left shadow-[0_28px_80px_-36px_rgba(2,11,36,0.72)] sm:px-8 sm:py-8"
      noValidate
      onSubmit={onSubmit}
    >
      <Image
        src={siteConfig.logo.navy.src}
        alt={siteConfig.name}
        width={siteConfig.logo.navy.width}
        height={siteConfig.logo.navy.height}
        className="mx-auto mb-6 h-8 w-auto sm:mb-8 sm:h-9"
        sizes="220px"
        unoptimized
      />
      {status === "sent" ? (
        <div className="px-2 py-10 text-center" role="status">
          <p className="text-xl font-medium tracking-[-0.02em] text-foreground">
            {form.successTitle}
          </p>
          <p className="mt-2 text-base text-muted-foreground">
            {form.successDescription}
          </p>
        </div>
      ) : (
        <fieldset
          className="m-0 min-w-0 border-0 p-0"
          disabled={status === "sending"}
        >
          <FieldGroup className="gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactField
                error={errors.firstName}
                id="contact-firstName"
                label={form.fields.firstName.label}
                required
              >
                <Input
                  aria-describedby={
                    errors.firstName ? "contact-firstName-error" : undefined
                  }
                  aria-invalid={errors.firstName ? true : undefined}
                  autoComplete={form.fields.firstName.autoComplete}
                  className={fieldClassName}
                  id="contact-firstName"
                  maxLength={80}
                  name="firstName"
                  required
                  type="text"
                />
              </ContactField>
              <ContactField
                error={errors.lastName}
                id="contact-lastName"
                label={form.fields.lastName.label}
                required
              >
                <Input
                  aria-describedby={
                    errors.lastName ? "contact-lastName-error" : undefined
                  }
                  aria-invalid={errors.lastName ? true : undefined}
                  autoComplete={form.fields.lastName.autoComplete}
                  className={fieldClassName}
                  id="contact-lastName"
                  maxLength={80}
                  name="lastName"
                  required
                  type="text"
                />
              </ContactField>
              <ContactField
                className="sm:col-span-2"
                error={errors.facility}
                id="contact-facility"
                label={form.fields.facility.label}
                required
              >
                <Input
                  aria-describedby={
                    errors.facility ? "contact-facility-error" : undefined
                  }
                  aria-invalid={errors.facility ? true : undefined}
                  autoComplete={form.fields.facility.autoComplete}
                  className={fieldClassName}
                  id="contact-facility"
                  maxLength={120}
                  name="facility"
                  required
                  type="text"
                />
              </ContactField>
              <ContactField
                error={errors.phone}
                id="contact-phone"
                label={form.fields.phone.label}
                required
              >
                <Input
                  aria-describedby={
                    errors.phone ? "contact-phone-error" : "contact-phone-hint"
                  }
                  aria-invalid={errors.phone ? true : undefined}
                  autoComplete={form.fields.phone.autoComplete}
                  className={fieldClassName}
                  id="contact-phone"
                  inputMode="tel"
                  maxLength={32}
                  name="phone"
                  onChange={(event) => {
                    setPhone(sanitizeContactPhoneInput(event.target.value));
                  }}
                  required
                  type="tel"
                  value={phone}
                />
                {errors.phone ? null : (
                  <p
                    className="text-sm text-muted-foreground"
                    id="contact-phone-hint"
                  >
                    {form.phoneHint}
                  </p>
                )}
              </ContactField>
              <ContactField
                error={errors.email}
                id="contact-email"
                label={form.fields.email.label}
              >
                <Input
                  aria-describedby={
                    errors.email ? "contact-email-error" : undefined
                  }
                  aria-invalid={errors.email ? true : undefined}
                  autoComplete={form.fields.email.autoComplete}
                  className={fieldClassName}
                  id="contact-email"
                  inputMode="email"
                  maxLength={120}
                  name="email"
                  type="email"
                />
              </ContactField>
              <ContactField
                className="sm:col-span-2"
                error={errors.message}
                id="contact-message"
                label={form.fields.message.label}
              >
                <Textarea
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  aria-invalid={errors.message ? true : undefined}
                  className={cn(
                    fieldClassName,
                    "field-sizing-fixed min-h-32 py-3",
                  )}
                  id="contact-message"
                  maxLength={1500}
                  name="message"
                />
              </ContactField>
            </div>
            {submitError ? (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            ) : null}
            <Button
              className="mt-1 h-12 w-full text-base"
              size="lg"
              type="submit"
            >
              {status === "sending" ? form.sending : form.submit}
            </Button>
          </FieldGroup>
        </fieldset>
      )}
    </form>
  );
}
