"use client";

import { useTransition } from "react";
import { toggleShowOnHome } from "../actions/homepage";

export default function HomeToggle({
  table,
  id,
  defaultChecked,
}: {
  table: "articles" | "products" | "media_items";
  id: string;
  defaultChecked: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <input
      type="checkbox"
      defaultChecked={defaultChecked}
      disabled={isPending}
      onChange={(e) => startTransition(() => toggleShowOnHome(table, id, e.target.checked))}
      className="w-4 h-4 accent-[var(--blue)]"
    />
  );
}
