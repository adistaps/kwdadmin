import { getTranslations } from "next-intl/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function AboutPage() {
  const t = await getTranslations("about_page");

  return (
    <main>
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <p className="eyebrow"><span>{t("title")}</span></p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3">{t("title")}</h1>
        <p className="text-[var(--muted)] mt-3 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-semibold text-[var(--ink)] mb-2">Visi</h2>
            <p className="text-sm text-[var(--muted)]">
              Menjadi mitra terpercaya dalam solusi panel konstruksi berkualitas tinggi di Indonesia.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--line)] bg-white p-6">
            <h2 className="font-semibold text-[var(--ink)] mb-2">Misi</h2>
            <p className="text-sm text-[var(--muted)]">
              Menyediakan produk berkualitas, layanan yang responsif, dan konsistensi pengiriman untuk setiap proyek klien.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
