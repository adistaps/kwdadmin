"use client";

import { useTransition } from "react";
import { updateMessageStatus } from "../actions/misc";

const STATUS_OPTIONS = ["new", "read", "replied", "archived"];

export default function MessageStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(e) => startTransition(() => updateMessageStatus(id, e.target.value))}
      className="text-xs rounded-lg border border-[var(--line)] px-2 py-1.5 capitalize"
    >
      {STATUS_OPTIONS.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
