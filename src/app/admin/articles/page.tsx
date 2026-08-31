import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "../_components/DeleteButton";
import { deleteArticle } from "../actions/articles";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title_id, slug, published, translation_status, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Artikel</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Isi dalam Bahasa Indonesia — Inggris &amp; Mandarin diterjemahkan otomatis.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="bg-[var(--blue)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--blue-deep)] transition-colors"
        >
          + Artikel Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[var(--line)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f6f8fb] text-[var(--muted)] text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Judul</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Terjemahan</th>
              <th className="text-right px-5 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles?.map((a) => (
              <tr key={a.id} className="border-t border-[var(--line)]">
                <td className="px-5 py-3 font-medium text-[var(--ink)]">{a.title_id}</td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      a.published
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {a.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      a.translation_status === "done"
                        ? "bg-blue-50 text-blue-700"
                        : a.translation_status === "failed"
                        ? "bg-red-50 text-red-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {a.translation_status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/articles/${a.id}`}
                      className="text-[var(--blue)] hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={a.id} action={deleteArticle} label="artikel ini" />
                  </div>
                </td>
              </tr>
            ))}
            {(!articles || articles.length === 0) && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-[var(--muted)]">
                  Belum ada artikel.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
