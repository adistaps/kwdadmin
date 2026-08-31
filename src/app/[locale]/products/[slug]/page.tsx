import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Locale = "id" | "en" | "zh";

function pick(row: Record<string, unknown>, field: string, locale: Locale) {
  const value = row[`${field}_${locale}`] || row[`${field}_id`];
  return (value as string) ?? "";
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("products_page");
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, product_images(image_url, sort_order)")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!product) notFound();

  const images = (
    (product.product_images as unknown as { image_url: string; sort_order: number }[]) || []
  ).sort((a, b) => a.sort_order - b.sort_order);

  return (
    <main>
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--blue-pale)]">
              {images[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={images[0].image_url} alt={pick(product, "name", locale)} className="w-full h-full object-cover" />
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {images.slice(1).map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img.image_url}
                    alt=""
                    className="aspect-square rounded-lg object-cover bg-[var(--blue-pale)]"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--ink)]">
              {pick(product, "name", locale)}
            </h1>
            <p className="text-[var(--muted)] mt-4 whitespace-pre-wrap">
              {pick(product, "description", locale)}
            </p>

            {pick(product, "specification", locale) && (
              <div className="mt-6">
                <h2 className="font-semibold text-[var(--ink)] mb-2">Spesifikasi</h2>
                <p className="text-sm text-[var(--muted)] whitespace-pre-wrap">
                  {pick(product, "specification", locale)}
                </p>
              </div>
            )}

            <a
              href="/contact"
              className="inline-block mt-8 bg-[var(--blue)] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[var(--blue-deep)] transition-colors"
            >
              {t("view_detail") === "View Detail" ? "Contact Us" : "Hubungi Kami"}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
