"use client";

import { useTransition } from "react";

export default function DeleteButton({
  id,
  action,
  label,
}: {
  id: string;
  action: (id: string) => Promise<void>;
  label: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm(`Hapus ${label}? Tindakan ini tidak bisa dibatalkan.`)) {
          startTransition(() => action(id));
        }
      }}
      disabled={isPending}
      className="text-red-600 hover:underline disabled:opacity-50"
    >
      {isPending ? "Menghapus..." : "Hapus"}
    </button>
  );
}
