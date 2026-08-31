import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProductForm from "../../_components/ProductForm";
import { updateProduct } from "../../actions/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, product_images(image_url)")
      .eq("id", id)
      .single(),
    supabase.from("product_categories").select("id, name_id").order("sort_order"),
  ]);

  if (!product) notFound();

  const updateWithId = updateProduct.bind(null, id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Edit Produk</h1>
      <p className="text-sm text-[var(--muted)] mb-6">{product.name_id}</p>
      <ProductForm product={product} categories={categories ?? []} action={updateWithId} isEdit />
    </div>
  );
}
