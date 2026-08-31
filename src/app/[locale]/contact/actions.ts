"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactMessage(formData: FormData) {
  const supabase = await createClient();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !message) {
    return { success: false };
  }

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    phone,
    subject,
    message,
    status: "new",
  });

  return { success: !error };
}
