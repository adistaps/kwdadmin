import { getTranslations, getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { Link } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Locale = "id" | "en" | "zh";

function pick(row: Record<string, unknown>, field: string, locale: Locale) {
  const value = row[`${field}_${locale}`] || row[`${field}_id`];
  return (value as string) ?? "";
}

export default async function ProductsPage() {
  const t = await getTranslations("products_page");
  const locale = (await getLocale()) as Locale;
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("id, slug, name_id, name_en, name_zh, description_id, description_en, description_zh, is_new, product_images(image_url)")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <p className="eyebrow"><span>{t("title")}</span></p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3">{t("title")}</h1>
        <p className="text-[var(--muted)] mt-3 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((p) => {
            const image = (p.product_images as unknown as { image_url: string }[])?.[0]?.image_url;
            return (
              <Link
                key={p.id}
                href={`/products/${p.slug}`}
                className="group rounded-2xl border border-[var(--line)] bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-[4/3] bg-[var(--blue-pale)] overflow-hidden">
                  {image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image}
                      alt={pick(p, "name", locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-[var(--ink)]">{pick(p, "name", locale)}</h2>
                    {p.is_new && (
                      <span className="text-[10px] bg-[var(--blue)] text-white px-2 py-0.5 rounded-full">BARU</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-1 line-clamp-2">
                    {pick(p, "description", locale)}
                  </p>
                  <span className="text-xs text-[var(--blue)] font-medium mt-3 inline-block">
                    {t("view_detail")} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {(!products || products.length === 0) && (
          <p className="text-center text-[var(--muted)] py-16">{t("empty")}</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
