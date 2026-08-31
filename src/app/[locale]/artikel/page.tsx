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

export default async function ArticlesListingPage() {
  const t = await getTranslations("articles");
  const locale = (await getLocale()) as Locale;
  const supabase = await createClient();

  const { data: articles } = await supabase
    .from("articles")
    .select("id, slug, title_id, title_en, title_zh, excerpt_id, excerpt_en, excerpt_zh, hero_image, created_at")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <main>
      <Header />

      <section className="max-w-6xl mx-auto px-6 pt-32 pb-16">
        <p className="eyebrow"><span>{t("tag")}</span></p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3">{t("title")}</h1>
        <p className="text-[var(--muted)] mt-3 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles?.map((article) => {
            const title = pick(article, "title", locale);
            const excerpt = pick(article, "excerpt", locale);
            const date = new Date(article.created_at).toLocaleDateString(
              locale === "id" ? "id-ID" : locale === "zh" ? "zh-CN" : "en-US",
              { day: "numeric", month: "long", year: "numeric" }
            );

            return (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="group rounded-2xl border border-[var(--line)] bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {article.hero_image && (
                  <div className="aspect-video bg-[var(--blue-pale)] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.hero_image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-[var(--muted)]">{date}</span>
                    <h2 className="font-semibold text-lg text-[var(--ink)] mt-2 line-clamp-2 group-hover:text-[var(--blue)] transition-colors">
                      {title}
                    </h2>
                    {excerpt && (
                      <p className="text-sm text-[var(--muted)] mt-2 line-clamp-3">
                        {excerpt}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-[var(--blue)] font-medium mt-4 inline-block">
                    {t("readArticle")} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {(!articles || articles.length === 0) && (
          <p className="text-center text-[var(--muted)] py-16">Belum ada artikel tersedia.</p>
        )}
      </section>

      <Footer />
    </main>
  );
}
