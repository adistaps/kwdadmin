"use client";

import { SingleImageUpload } from "./FileUpload";

type Article = {
  id?: string;
  title_id?: string;
  excerpt_id?: string;
  content_id?: string;
  hero_image?: string;
  published?: boolean;
  translation_status?: string;
};

export default function ArticleForm({
  article,
  action,
  isEdit,
}: {
  article?: Article;
  action: (formData: FormData) => void;
  isEdit?: boolean;
}) {
  return (
    <form action={action} className="max-w-2xl flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Judul (Bahasa Indonesia)
        </label>
        <input
          name="title_id"
          required
          defaultValue={article?.title_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Ringkasan Singkat
        </label>
        <textarea
          name="excerpt_id"
          rows={2}
          defaultValue={article?.excerpt_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Isi Artikel
        </label>
        <textarea
          name="content_id"
          required
          rows={10}
          defaultValue={article?.content_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
        <p className="text-xs text-[var(--muted)] mt-1">
          Boleh menggunakan HTML dasar (misal &lt;p&gt;, &lt;img&gt;, &lt;strong&gt;).
        </p>
      </div>

      <SingleImageUpload name="hero_image" label="Gambar Utama" defaultValue={article?.hero_image} />

      <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
        <input type="checkbox" name="published" defaultChecked={article?.published ?? true} />
        Tampilkan di website (published)
      </label>

      {isEdit && (
        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="retranslate" />
          Terjemahkan ulang ke Inggris &amp; Mandarin
          {article?.translation_status && (
            <span className="text-xs text-[var(--muted)]">
              (status saat ini: {article.translation_status})
            </span>
          )}
        </label>
      )}

      {!isEdit && (
        <p className="text-xs text-[var(--muted)]">
          Judul, ringkasan, dan isi akan otomatis diterjemahkan ke Inggris &amp; Mandarin saat disimpan.
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="bg-[var(--blue)] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[var(--blue-deep)] transition-colors"
        >
          {isEdit ? "Simpan Perubahan" : "Simpan & Terjemahkan"}
        </button>
        <a
          href="/admin/articles"
          className="text-sm font-medium px-5 py-2.5 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:bg-[#f6f8fb] transition-colors"
        >
          Batal
        </a>
      </div>
    </form>
  );
}
