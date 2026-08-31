"use server";

import { createClient } from "@/lib/supabase/server";
import { translateFields } from "@/lib/translate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name_id = String(formData.get("name_id") || "");
  const description_id = String(formData.get("description_id") || "");
  const specification_id = String(formData.get("specification_id") || "");
  const category_id = String(formData.get("category_id") || "") || null;
  const is_new = formData.get("is_new") === "on";
  const published = formData.get("published") === "on";
  // Comma or newline separated image URLs (uploaded via Supabase Storage first)
  const imagesRaw = String(formData.get("images") || "");
  const imageUrls = imagesRaw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const slug = slugify(name_id);

  const { en, zh, status } = await translateFields({
    name: name_id,
    description: description_id,
    specification: specification_id,
  });

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      slug,
      category_id,
      name_id,
      name_en: en.name,
      name_zh: zh.name,
      description_id,
      description_en: en.description,
      description_zh: zh.description,
      specification_id,
      specification_en: en.specification,
      specification_zh: zh.specification,
      is_new,
      published,
      translation_status: status,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  if (imageUrls.length > 0 && product) {
    await supabase.from("product_images").insert(
      imageUrls.map((url, i) => ({
        product_id: product.id,
        image_url: url,
        sort_order: i,
      }))
    );
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const name_id = String(formData.get("name_id") || "");
  const description_id = String(formData.get("description_id") || "");
  const specification_id = String(formData.get("specification_id") || "");
  const category_id = String(formData.get("category_id") || "") || null;
  const is_new = formData.get("is_new") === "on";
  const published = formData.get("published") === "on";
  const retranslate = formData.get("retranslate") === "on";
  const imagesRaw = String(formData.get("images") || "");
  const imageUrls = imagesRaw
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const updates: Record<string, unknown> = {
    name_id,
    description_id,
    specification_id,
    category_id,
    is_new,
    published,
  };

  if (retranslate) {
    const { en, zh, status } = await translateFields({
      name: name_id,
      description: description_id,
      specification: specification_id,
    });
    updates.name_en = en.name;
    updates.name_zh = zh.name;
    updates.description_en = en.description;
    updates.description_zh = zh.description;
    updates.specification_en = en.specification;
    updates.specification_zh = zh.specification;
    updates.translation_status = status;
  }

  const { error } = await supabase.from("products").update(updates).eq("id", id);
  if (error) throw new Error(error.message);

  // Replace image set (simplest reliable approach for a small admin panel)
  await supabase.from("product_images").delete().eq("product_id", id);
  if (imageUrls.length > 0) {
    await supabase.from("product_images").insert(
      imageUrls.map((url, i) => ({
        product_id: id,
        image_url: url,
        sort_order: i,
      }))
    );
  }

  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/products");
}
