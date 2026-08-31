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

export async function createArticle(formData: FormData) {
  const supabase = await createClient();

  const title_id = String(formData.get("title_id") || "");
  const excerpt_id = String(formData.get("excerpt_id") || "");
  const content_id = String(formData.get("content_id") || "");
  const hero_image = String(formData.get("hero_image") || "");
  const published = formData.get("published") === "on";

  const slug = slugify(title_id);

  // Translate once now, so the result is stored permanently and the
  // public site never calls the translate API on page load.
  const { en, zh, status } = await translateFields({
    title: title_id,
    excerpt: excerpt_id,
    content: content_id,
  });

  const { error } = await supabase.from("articles").insert({
    slug,
    title_id,
    title_en: en.title,
    title_zh: zh.title,
    excerpt_id,
    excerpt_en: en.excerpt,
    excerpt_zh: zh.excerpt,
    content_id,
    content_en: en.content,
    content_zh: zh.content,
    hero_image,
    published,
    translation_status: status,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  const supabase = await createClient();

  const title_id = String(formData.get("title_id") || "");
  const excerpt_id = String(formData.get("excerpt_id") || "");
  const content_id = String(formData.get("content_id") || "");
  const hero_image = String(formData.get("hero_image") || "");
  const published = formData.get("published") === "on";
  const retranslate = formData.get("retranslate") === "on";

  const updates: Record<string, unknown> = {
    title_id,
    excerpt_id,
    content_id,
    hero_image,
    published,
  };

  if (retranslate) {
    const { en, zh, status } = await translateFields({
      title: title_id,
      excerpt: excerpt_id,
      content: content_id,
    });
    updates.title_en = en.title;
    updates.title_zh = zh.title;
    updates.excerpt_en = en.excerpt;
    updates.excerpt_zh = zh.excerpt;
    updates.content_en = en.content;
    updates.content_zh = zh.content;
    updates.translation_status = status;
  }

  const { error } = await supabase.from("articles").update(updates).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/articles");
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/articles");
}
