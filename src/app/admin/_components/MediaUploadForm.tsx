"use client";

import { useTransition } from "react";
import { SingleImageUpload } from "./FileUpload";
import { createMediaItem } from "../actions/misc";

export default function MediaUploadForm() {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => createMediaItem(formData))}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">Tipe</label>
        <select
          name="type"
          defaultValue="photo"
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
        >
          <option value="photo">Foto</option>
          <option value="video">Video</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">Judul</label>
        <input name="title_id" className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">Kategori</label>
        <input
          name="category"
          placeholder="residential / commercial / hospitality"
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
        />
      </div>

      <SingleImageUpload name="media_url" label="File Foto / Video" accept="image/*,video/*" />
      <SingleImageUpload name="thumbnail_url" label="Thumbnail (khusus video, opsional)" />
      <div>
        <label className="block text-xs font-medium text-[var(--muted)] mb-1">
          Durasi (khusus video, opsional)
        </label>
        <input
          name="duration"
          placeholder="3:45"
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
        <input type="checkbox" name="published" defaultChecked />
        Tampilkan di website
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="bg-[var(--blue)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--blue-deep)] transition-colors disabled:opacity-60"
      >
        {isPending ? "Menyimpan..." : "Tambah"}
      </button>
    </form>
  );
}
