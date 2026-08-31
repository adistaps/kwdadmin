"use client";

import { MultiImageUpload } from "./FileUpload";

type Category = { id: string; name_id: string };
type ProductImage = { image_url: string };
type Product = {
  id?: string;
  name_id?: string;
  description_id?: string;
  specification_id?: string;
  category_id?: string;
  is_new?: boolean;
  published?: boolean;
  translation_status?: string;
  product_images?: ProductImage[];
};

export default function ProductForm({
  product,
  categories,
  action,
  isEdit,
}: {
  product?: Product;
  categories: Category[];
  action: (formData: FormData) => void;
  isEdit?: boolean;
}) {
  const existingImages = product?.product_images?.map((i) => i.image_url) ?? [];

  return (
    <form action={action} className="max-w-2xl flex flex-col gap-5">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">
          Nama Produk (Bahasa Indonesia)
        </label>
        <input
          name="name_id"
          required
          defaultValue={product?.name_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">Kategori</label>
        <select
          name="category_id"
          defaultValue={product?.category_id ?? ""}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        >
          <option value="">— Pilih kategori —</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name_id}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">Deskripsi</label>
        <textarea
          name="description_id"
          rows={4}
          defaultValue={product?.description_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--ink)] mb-1">Spesifikasi</label>
        <textarea
          name="specification_id"
          rows={4}
          defaultValue={product?.specification_id}
          className="w-full rounded-lg border border-[var(--line)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--blue)]"
        />
      </div>

      <MultiImageUpload name="images" label="Foto Produk" defaultUrls={existingImages} />

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="is_new" defaultChecked={product?.is_new} />
          Tandai sebagai produk baru
        </label>
        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="published" defaultChecked={product?.published ?? true} />
          Tampilkan di website
        </label>
      </div>

      {isEdit && (
        <label className="flex items-center gap-2 text-sm text-[var(--ink)]">
          <input type="checkbox" name="retranslate" />
          Terjemahkan ulang ke Inggris &amp; Mandarin
          {product?.translation_status && (
            <span className="text-xs text-[var(--muted)]">
              (status saat ini: {product.translation_status})
            </span>
          )}
        </label>
      )}

      {!isEdit && (
        <p className="text-xs text-[var(--muted)]">
          Nama, deskripsi, dan spesifikasi akan otomatis diterjemahkan saat disimpan.
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
          href="/admin/products"
          className="text-sm font-medium px-5 py-2.5 rounded-lg border border-[var(--line)] text-[var(--muted)] hover:bg-[#f6f8fb] transition-colors"
        >
          Batal
        </a>
      </div>
    </form>
  );
}
