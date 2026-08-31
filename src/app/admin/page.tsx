import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminHomePage() {
  const supabase = await createClient();

  const [articles, products, messages, media] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("media_items").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Artikel", count: articles.count ?? 0, href: "/admin/articles" },
    { label: "Produk", count: products.count ?? 0, href: "/admin/products" },
    { label: "Foto & Video", count: media.count ?? 0, href: "/admin/media" },
    { label: "Pesan Baru", count: messages.count ?? 0, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Dashboard</h1>
      <p className="text-sm text-[var(--muted)] mb-6">Ringkasan konten website KWD Purified.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white rounded-xl border border-[var(--line)] p-5 hover:shadow-md transition-shadow"
          >
            <p className="text-3xl font-bold text-[var(--blue-deep)]">{s.count}</p>
            <p className="text-sm text-[var(--muted)] mt-1">{s.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
