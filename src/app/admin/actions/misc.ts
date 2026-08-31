"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// ---------- MEDIA (photos & videos) ----------

export async function createMediaItem(formData: FormData) {
  const supabase = await createClient();

  const type = String(formData.get("type") || "photo");
  const title_id = String(formData.get("title_id") || "");
  const category = String(formData.get("category") || "");
  const media_url = String(formData.get("media_url") || "");
  const thumbnail_url = String(formData.get("thumbnail_url") || "");
  const duration = String(formData.get("duration") || "");
  const published = formData.get("published") === "on";

  const { error } = await supabase.from("media_items").insert({
    type,
    title_id,
    category,
    media_url,
    thumbnail_url,
    duration,
    published,
  });

  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
}

export async function deleteMediaItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("media_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
}

// ---------- CONTACT MESSAGES ----------

export async function updateMessageStatus(id: string, status: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const address = String(formData.get("address") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");
  const operational_hours = String(formData.get("operational_hours") || "");
  const map_embed_url = String(formData.get("map_embed_url") || "");
  const whatsapp_number = String(formData.get("whatsapp_number") || "");

  const { error } = await supabase
    .from("site_settings")
    .update({
      address,
      phone,
      email,
      operational_hours,
      map_embed_url,
      whatsapp_number,
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/settings");
}
