import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "../_components/DeleteButton";
import { deleteProduct } from "../actions/products";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("id, name_id, published, is_new, translation_status, product_categories(name_id)")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ink)]">Produk</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Kelola katalog produk — foto, deskripsi, dan terjemahan otomatis.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-[var(--blue)] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[var(--blue-deep)] transition-colors"
        >
          + Produk Baru
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-[var(--line)] overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#f6f8fb] text-[var(--muted)] text-xs uppercase">
            <tr>
              <th className="text-left px-5 py-3 font-medium">Nama</th>
              <th className="text-left px-5 py-3 font-medium">Kategori</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-right px-5 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((p) => (
              <tr key={p.id} className="border-t border-[var(--line)]">
                <td className="px-5 py-3 font-medium text-[var(--ink)]">
                  {p.name_id} {p.is_new && <span className="ml-1 text-xs text-[var(--blue)]">BARU</span>}
                </td>
                <td className="px-5 py-3 text-[var(--muted)]">
                  {(p.product_categories as unknown as { name_id: string } | null)?.name_id ?? "—"}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      p.published ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <Link href={`/admin/products/${p.id}`} className="text-[var(--blue)] hover:underline">
                      Edit
                    </Link>
                    <DeleteButton id={p.id} action={deleteProduct} label="produk ini" />
                  </div>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-[var(--muted)]">
                  Belum ada produk.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
