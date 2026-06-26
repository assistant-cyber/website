"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/constants";
import Button from "./Button";
import InquiryTypeCard from "./InquiryTypeCard";

type FormData = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  neighborhood: string;
  description: string;
  referral: string;
};

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  inquiryType: "",
  neighborhood: "",
  description: "",
  referral: "",
};

function validate(data: FormData): Record<string, string> {
  const errs: Record<string, string> = {};
  if (!data.name.trim()) errs.name = "Please enter your name.";
  if (!data.email.trim()) {
    errs.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errs.email = "Please enter a valid email address.";
  }
  if (!data.inquiryType) errs.inquiryType = "Please select how we can help.";
  if (!data.description.trim())
    errs.description = "Please tell us a little about your project.";
  return errs;
}

export default function ContactForm() {
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const errorRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({});

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    // Clear field error as user edits
    if (errors[key as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErrorField = Object.keys(errs)[0];
      const el = errorRefs.current[firstErrorField];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.focus({ preventScroll: true });
      }
      return;
    }

    setSubmitting(true);
    /*
     * TODO: Wire form submission to backend.
     * Recommended options:
     *  1. Next.js API route at /api/contact — sends email via Resend (resend.com)
     *  2. Formspree (formspree.io) — simple POST endpoint, no backend needed
     *  3. Netlify Forms — if hosting moves to Netlify
     * Shane to confirm preferred email address for inquiries before wiring.
     */
    // Simulate async submit
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  const form = CONTACT.form;

  if (submitted) {
    return (
      <div className="success-fade text-center" style={{ padding: "32px 0" }}>
        <p
          className="font-display"
          style={{
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 28,
            color: "var(--color-ink)",
            lineHeight: 1.4,
          }}
        >
          &ldquo;{form.successHeadline}&rdquo;
        </p>
        <p
          className="mx-auto"
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--color-ash)",
            maxWidth: 380,
            marginTop: 16,
          }}
        >
          {form.successBody}
        </p>
        <div className="mt-6 inline-block">
          <Link
            href="/"
            className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#1a1a1a] hover:text-[#b8965a] transition-colors duration-300"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const errorAttr = (key: string) => (errors[key] ? { "data-error": "true" } : {});

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Header */}
      <h2
        className="font-display"
        style={{
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.2,
          letterSpacing: "-0.015em",
          color: "var(--color-ink)",
        }}
      >
        {form.headlineTop}{" "}
        <em className="italic font-normal">{form.headlineEm}</em>
      </h2>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--color-slate)",
          marginTop: 8,
        }}
      >
        {form.subhead}
      </p>

      <div
        aria-hidden="true"
        style={{
          width: "100%",
          height: 1,
          background: "var(--color-sand)",
          margin: "28px 0",
        }}
      />

      {/* Name */}
      <div className="mb-5">
        <label className="field-label" htmlFor="name">
          Your Name
        </label>
        <input
          ref={(el) => {
            errorRefs.current.name = el;
          }}
          id="name"
          name="name"
          type="text"
          className="field-input"
          placeholder="First and last name"
          autoComplete="name"
          value={data.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...errorAttr("name")}
        />
        {errors.name && (
          <span id="name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="field-label" htmlFor="email">
          Email Address
        </label>
        <input
          ref={(el) => {
            errorRefs.current.email = el;
          }}
          id="email"
          name="email"
          type="email"
          className="field-input"
          placeholder="your@email.com"
          autoComplete="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...errorAttr("email")}
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Phone */}
      <div className="mb-5">
        <label className="field-label" htmlFor="phone">
          Phone Number{" "}
          <span
            style={{
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
              color: "var(--color-slate)",
            }}
          >
            (optional)
          </span>
        </label>
        <input
          ref={(el) => {
            errorRefs.current.phone = el;
          }}
          id="phone"
          name="phone"
          type="tel"
          className="field-input"
          placeholder="(303) 000-0000"
          autoComplete="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>

      {/* Inquiry Type */}
      <div className="mb-5" data-error={Boolean(errors.inquiryType) || undefined}>
        <span className="field-label">How Can We Help?</span>
        <div
          role="radiogroup"
          aria-label="How can we help"
          aria-required="true"
          aria-invalid={Boolean(errors.inquiryType)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2"
        >
          {form.inquiryTypes.map((t) => (
            <InquiryTypeCard
              key={t.value}
              value={t.value}
              label={t.label}
              description={t.description}
              selected={data.inquiryType === t.value}
              name="inquiryType"
              onSelect={(v) => update("inquiryType", v)}
            />
          ))}
        </div>
        {errors.inquiryType && (
          <span className="field-error" role="alert">
            {errors.inquiryType}
          </span>
        )}
      </div>

      {/* Neighborhood */}
      <div className="mb-5">
        <label className="field-label" htmlFor="neighborhood">
          Project Neighborhood or Location{" "}
          <span
            style={{
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
              color: "var(--color-slate)",
            }}
          >
            (optional)
          </span>
        </label>
        <input
          id="neighborhood"
          name="neighborhood"
          type="text"
          className="field-input"
          placeholder="e.g. Cherry Creek, Washington Park, Highlands..."
          value={data.neighborhood}
          onChange={(e) => update("neighborhood", e.target.value)}
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="field-label" htmlFor="description">
          Tell Us About Your Project
        </label>
        <textarea
          ref={(el) => {
            errorRefs.current.description = el;
          }}
          id="description"
          name="description"
          className="field-textarea"
          rows={5}
          placeholder="Share as much or as little as you'd like — project type, timeline, budget range, what matters most to you, or simply that you'd like to have a conversation."
          value={data.description}
          onChange={(e) => update("description", e.target.value)}
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
          {...errorAttr("description")}
        />
        {errors.description && (
          <span id="description-error" className="field-error" role="alert">
            {errors.description}
          </span>
        )}
      </div>

      {/* Referral */}
      <div className="mb-5">
        <label className="field-label" htmlFor="referral">
          How Did You Hear About Us?{" "}
          <span
            style={{
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
              color: "var(--color-slate)",
            }}
          >
            (optional)
          </span>
        </label>
        <input
          id="referral"
          name="referral"
          type="text"
          className="field-input"
          placeholder="Referral, Google, Houzz, drove by a project..."
          value={data.referral}
          onChange={(e) => update("referral", e.target.value)}
        />
      </div>

      {/* Submit */}
      <div className="mt-8">
        <Button
          type="submit"
          variant="primary"
          bronze
          fullWidth
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Your Inquiry"}
        </Button>
        <p
          className="text-center"
          style={{
            fontSize: 12,
            color: "var(--color-slate)",
            marginTop: 16,
            lineHeight: 1.6,
          }}
        >
          We typically respond within one business day.
          <br />
          All inquiries are kept confidential.
        </p>
      </div>
    </form>
  );
}
