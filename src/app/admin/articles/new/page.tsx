import ArticleForm from "../../_components/ArticleForm";
import { createArticle } from "../../actions/articles";

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Artikel Baru</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Isi dalam Bahasa Indonesia. Inggris &amp; Mandarin dibuat otomatis saat disimpan.
      </p>
      <ArticleForm action={createArticle} />
    </div>
  );
}
