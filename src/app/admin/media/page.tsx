import { createClient } from "@/lib/supabase/server";
import { deleteMediaItem } from "../actions/misc";
import DeleteButton from "../_components/DeleteButton";
import MediaUploadForm from "../_components/MediaUploadForm";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("media_items")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Foto & Video</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Kelola galeri portofolio, banner, dan video yang tampil di website.
      </p>

      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-6">
        <div className="bg-white rounded-xl border border-[var(--line)] p-5 h-fit">
          <h2 className="font-semibold text-[var(--ink)] mb-4">Tambah Media Baru</h2>
          <MediaUploadForm />
        </div>

        <div className="bg-white rounded-xl border border-[var(--line)] overflow-hidden h-fit">
          <table className="w-full text-sm">
            <thead className="bg-[#f6f8fb] text-[var(--muted)] text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Judul</th>
                <th className="text-left px-4 py-3 font-medium">Tipe</th>
                <th className="text-left px-4 py-3 font-medium">Kategori</th>
                <th className="text-right px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item) => (
                <tr key={item.id} className="border-t border-[var(--line)]">
                  <td className="px-4 py-3 text-[var(--ink)]">{item.title_id || "—"}</td>
                  <td className="px-4 py-3 text-[var(--muted)] capitalize">{item.type}</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{item.category || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton id={item.id} action={deleteMediaItem} label="media ini" />
                  </td>
                </tr>
              ))}
              {(!items || items.length === 0) && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[var(--muted)]">
                    Belum ada media.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
