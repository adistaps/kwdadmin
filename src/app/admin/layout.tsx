import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import AdminSidebar from "./_components/AdminSidebar";
import "../globals.css";

export const metadata: Metadata = {
  title: "KWD Admin",
  description: "Dashboard admin KWD Purified",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // /admin lives outside the [locale] segment, so it never passes through
  // src/app/[locale]/layout.tsx — that's the only place <html>/<body> is
  // rendered elsewhere in this app. This layout provides its own, so the
  // admin dashboard works as an independent (non-multilingual) route tree.
  return (
    <html lang="id">
      <body className="min-h-full antialiased">
        {!user ? (
          children
        ) : (
          <div className="min-h-screen flex bg-[#f6f8fb]">
            <AdminSidebar userEmail={user.email ?? ""} />
            <main className="flex-1 min-w-0 p-6 lg:p-8">{children}</main>
          </div>
        )}
      </body>
    </html>
  );
}
