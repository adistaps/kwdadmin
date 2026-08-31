"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { submitContactMessage } from "./actions";

export default function ContactForm() {
  const t = useTranslations("contact_page");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<"success" | "error" | null>(null);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await submitContactMessage(formData);
      setResult(res.success ? "success" : "error");
    });
  }

  if (result === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-sm text-green-800">
        {t("form_success")}
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">{t("form_name")}</label>
        <input
          name="name"
          required
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1">{t("form_email")}</label>
          <input
            name="email"
            type="email"
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--muted)] mb-1">{t("form_phone")}</label>
          <input
            name="phone"
            className="w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">{t("form_subject")}</label>
        <input
          name="subject"
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">{t("form_message")}</label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      {result === "error" && <p className="text-sm text-red-600">{t("form_error")}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-fit bg-[var(--blue)] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[var(--blue-deep)] transition-colors disabled:opacity-60"
      >
        {isPending ? "..." : t("form_submit")}
      </button>
    </form>
  );
}
