import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Locale = "id" | "en" | "zh";

function pick(row: Record<string, unknown>, field: string, locale: Locale) {
  const value = row[`${field}_${locale}`] || row[`${field}_id`];
  return (value as string) ?? "";
}

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio_page");
  const locale = (await getLocale()) as Locale;
  const supabase = await createClient();

  const { data: items } = await supabase
    .from("media_items")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <main>
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <p className="eyebrow"><span>{t("title")}</span></p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3">{t("title")}</h1>
        <p className="text-[var(--muted)] mt-3 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items?.map((item) => (
            <div
              key={item.id}
              className="mb-5 break-inside-avoid rounded-2xl overflow-hidden border border-[var(--line)] bg-white"
            >
              {item.type === "video" ? (
                <video src={item.media_url} poster={item.thumbnail_url} controls className="w-full" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.media_url} alt={pick(item, "title", locale)} className="w-full object-cover" />
              )}
              {item.title_id && (
                <div className="p-3">
                  <p className="text-sm font-medium text-[var(--ink)]">{pick(item, "title", locale)}</p>
                  {item.category && (
                    <p className="text-xs text-[var(--muted)] capitalize">{item.category}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {(!items || items.length === 0) && (
          <p className="text-center text-[var(--muted)] py-16">{t("empty")}</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
