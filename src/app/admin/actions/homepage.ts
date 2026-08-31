"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleShowOnHome(
  table: "articles" | "products" | "media_items",
  id: string,
  value: boolean
) {
  const supabase = await createClient();
  const { error } = await supabase.from(table).update({ show_on_home: value }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/homepage");
  revalidatePath("/[locale]", "page");
}

export async function updateSocialLinks(
  links: { name: string; handle: string; href: string }[]
) {
  const supabase = await createClient();
  const filtered = links.filter((p) => p.handle || p.href);
  const { error } = await supabase
    .from("site_settings")
    .update({ social_links: filtered })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/homepage");
  revalidatePath("/[locale]", "page");
}
