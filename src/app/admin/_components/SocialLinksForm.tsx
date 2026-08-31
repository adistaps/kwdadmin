"use client";

import { useState, useTransition } from "react";
import { updateSocialLinks } from "../actions/homepage";

type Link = { name: string; handle: string; href: string };

const PLATFORM_NAMES = ["TikTok", "Instagram", "Facebook", "Threads", "YouTube"];

export default function SocialLinksForm({ initialLinks }: { initialLinks: Link[] }) {
  const [links, setLinks] = useState<Link[]>(
    PLATFORM_NAMES.map((name) => {
      const existing = initialLinks.find((l) => l.name === name);
      return { name, handle: existing?.handle ?? "", href: existing?.href ?? "" };
    })
  );
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function updateField(name: string, field: "handle" | "href", value: string) {
    setLinks((prev) => prev.map((l) => (l.name === name ? { ...l, [field]: value } : l)));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      await updateSocialLinks(links);
      setSaved(true);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <div key={link.name} className="grid grid-cols-3 gap-3 items-center">
          <span className="text-sm font-medium text-[var(--ink)]">{link.name}</span>
          <input
            value={link.handle}
            onChange={(e) => updateField(link.name, "handle", e.target.value)}
            placeholder="@handle"
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
          <input
            value={link.href}
            onChange={(e) => updateField(link.name, "href", e.target.value)}
            placeholder="https://..."
            className="rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
          />
        </div>
      ))}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="w-fit bg-[var(--blue)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--blue-deep)] transition-colors disabled:opacity-60"
        >
          {isPending ? "Menyimpan..." : "Simpan Sosial Media"}
        </button>
        {saved && !isPending && <span className="text-xs text-green-600">Tersimpan.</span>}
      </div>
    </div>
  );
}
