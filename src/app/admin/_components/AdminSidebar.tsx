"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/articles", label: "Artikel" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/media", label: "Foto & Video" },
  { href: "/admin/messages", label: "Pesan Masuk" },
  { href: "/admin/settings", label: "Contact Us" },
];

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[var(--line)] flex flex-col">
      <div className="px-6 py-5 border-b border-[var(--line)]">
        <p className="font-bold text-[var(--ink)]">KWD Admin</p>
        <p className="text-xs text-[var(--muted)] truncate mt-0.5">{userEmail}</p>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-[var(--blue-soft)] text-[var(--blue-deep)]"
                  : "text-[var(--muted)] hover:bg-[#f0f4f9]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-[var(--line)]">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          Keluar
        </button>
      </div>
    </aside>
  );
}
