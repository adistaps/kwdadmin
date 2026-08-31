import { createClient } from "@/lib/supabase/server";
import ProductForm from "../../_components/ProductForm";
import { createProduct } from "../../actions/products";

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("product_categories")
    .select("id, name_id")
    .order("sort_order");

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Produk Baru</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Isi dalam Bahasa Indonesia. Inggris &amp; Mandarin dibuat otomatis saat disimpan.
      </p>
      <ProductForm categories={categories ?? []} action={createProduct} />
    </div>
  );
}
