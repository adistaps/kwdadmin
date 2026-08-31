import { getLocale } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import { pick, type Locale } from "@/lib/pick";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Strength from "@/components/sections/Strength";
import Articles from "@/components/sections/Articles";
import Videos from "@/components/sections/Videos";
import Social from "@/components/sections/Social";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

const LOCALE_TAG: Record<Locale, string> = { id: "id-ID", en: "en-US", zh: "zh-CN" };
const MIN_READ_LABEL: Record<Locale, string> = { id: "menit baca", en: "min read", zh: "分钟阅读" };

function estimateReadTime(text: string, locale: Locale) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} ${MIN_READ_LABEL[locale]}`;
}

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const supabase = await createClient();

  const [articlesRes, productsRes, videosRes, settingsRes] = await Promise.all([
    supabase
      .from("articles")
      .select("slug, title_id, title_en, title_zh, excerpt_id, excerpt_en, excerpt_zh, hero_image, created_at")
      .eq("published", true)
      .eq("show_on_home", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("slug, name_id, name_en, name_zh, description_id, description_en, description_zh, product_images(image_url, sort_order)")
      .eq("published", true)
      .eq("show_on_home", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("media_items")
      .select("title_id, title_en, title_zh, media_url, thumbnail_url, duration")
      .eq("type", "video")
      .eq("published", true)
      .eq("show_on_home", true)
      .order("created_at", { ascending: false }),
    supabase.from("site_settings").select("social_links").eq("id", 1).single(),
  ]);

  const articles = (articlesRes.data ?? []).map((a) => ({
    title: pick(a, "title", locale),
    description: pick(a, "excerpt", locale),
    date: new Date(a.created_at).toLocaleDateString(LOCALE_TAG[locale], {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    readTime: estimateReadTime(pick(a, "excerpt", locale) || pick(a, "title", locale), locale),
    image: a.hero_image || "",
    href: `/artikel/${a.slug}`,
  }));

  const products = (productsRes.data ?? []).map((p, idx) => {
    const images = (
      (p.product_images as unknown as { image_url: string; sort_order: number }[]) || []
    )
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => i.image_url);
    return {
      number: String(idx + 1).padStart(2, "0"),
      name: pick(p, "name", locale),
      description: pick(p, "description", locale),
      images,
      detailHref: `/products/${p.slug}`,
    };
  });

  const videos = (videosRes.data ?? []).map((v) => ({
    title: pick(v, "title", locale),
    description: "",
    duration: v.duration || "",
    poster: v.thumbnail_url || "",
    src: v.media_url,
  }));

  const platforms =
    (settingsRes.data?.social_links as { name: string; handle: string; href: string }[]) ?? [];

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Products products={products} />
      <Strength />
      {articles.length > 0 && <Articles articles={articles} />}
      {videos.length > 0 && <Videos videos={videos} />}
      {platforms.length > 0 && <Social platforms={platforms} />}
      <Contact />
      <Footer />
    </main>
  );
}
