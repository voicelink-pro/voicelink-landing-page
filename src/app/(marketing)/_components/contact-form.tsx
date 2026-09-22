"use client";

import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { homeContent } from "../_content/home";

const { fields, submitLabel } = homeContent.contact;

const inputClassName =
  "h-10 rounded-md border-foreground/12 bg-white px-3 text-sm md:text-sm";

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup className="gap-4">
        <FieldGroup className="gap-4 sm:flex-row">
          <Field className="min-w-0 flex-1 gap-1.5">
            <FieldLabel
              className="text-xs font-medium text-muted-foreground"
              htmlFor="contact-name"
            >
              {fields.name.label}
            </FieldLabel>
            <Input
              autoComplete="name"
              className={inputClassName}
              id="contact-name"
              name="name"
              placeholder={fields.name.placeholder}
              required
              type="text"
            />
          </Field>
          <Field className="min-w-0 flex-1 gap-1.5">
            <FieldLabel
              className="text-xs font-medium text-muted-foreground"
              htmlFor="contact-phone"
            >
              {fields.phone.label}
            </FieldLabel>
            <Input
              autoComplete="tel"
              className={inputClassName}
              id="contact-phone"
              inputMode="tel"
              name="phone"
              placeholder={fields.phone.placeholder}
              required
              type="tel"
            />
          </Field>
        </FieldGroup>
        <FieldGroup className="gap-4 sm:flex-row">
          <Field className="min-w-0 flex-1 gap-1.5">
            <FieldLabel
              className="text-xs font-medium text-muted-foreground"
              htmlFor="contact-facility"
            >
              {fields.facility.label}
            </FieldLabel>
            <Input
              autoComplete="organization"
              className={inputClassName}
              id="contact-facility"
              name="facility"
              placeholder={fields.facility.placeholder}
              required
              type="text"
            />
          </Field>
          <Field className="min-w-0 flex-1 gap-1.5">
            <FieldLabel
              className="text-xs font-medium text-muted-foreground"
              htmlFor="contact-email"
            >
              {fields.email.label}
            </FieldLabel>
            <Input
              autoComplete="email"
              className={inputClassName}
              id="contact-email"
              name="email"
              placeholder={fields.email.placeholder}
              required
              type="email"
            />
          </Field>
        </FieldGroup>
        <Field className="gap-1.5">
          <FieldLabel
            className="text-xs font-medium text-muted-foreground"
            htmlFor="contact-message"
          >
            {fields.message.label} ({fields.message.optional})
          </FieldLabel>
          <Textarea
            className="min-h-24 rounded-md border-foreground/12 bg-white px-3 py-2 text-sm md:text-sm"
            id="contact-message"
            name="message"
            placeholder={fields.message.placeholder}
            rows={4}
          />
        </Field>
        <Button
          className="h-10 px-5 motion-safe:hover:-translate-y-1"
          type="submit"
        >
          {submitLabel}
        </Button>
      </FieldGroup>
    </form>
  );
}
