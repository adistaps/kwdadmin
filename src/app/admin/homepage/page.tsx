import { createClient } from "@/lib/supabase/server";
import HomeToggle from "../_components/HomeToggle";
import SocialLinksForm from "../_components/SocialLinksForm";

export default async function AdminHomepagePage() {
  const supabase = await createClient();

  const [articlesRes, productsRes, videosRes, settingsRes] = await Promise.all([
    supabase
      .from("articles")
      .select("id, title_id, show_on_home")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("products")
      .select("id, name_id, show_on_home")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("media_items")
      .select("id, title_id, show_on_home")
      .eq("type", "video")
      .eq("published", true)
      .order("created_at", { ascending: false }),
    supabase.from("site_settings").select("social_links").eq("id", 1).single(),
  ]);

  const articleCount = articlesRes.data?.filter((a) => a.show_on_home).length ?? 0;
  const productCount = productsRes.data?.filter((p) => p.show_on_home).length ?? 0;
  const videoCount = videosRes.data?.filter((v) => v.show_on_home).length ?? 0;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--ink)] mb-1">Homepage</h1>
      <p className="text-sm text-[var(--muted)] mb-6">
        Pilih artikel, produk, dan video yang tampil di homepage, serta atur link sosial media.
      </p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ARTICLES */}
        <div className="bg-white rounded-xl border border-[var(--line)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[var(--ink)]">Artikel di Homepage</h2>
            <span className="text-xs text-[var(--muted)]">{articleCount} dipilih</span>
          </div>
          <p className="text-xs text-[var(--muted)] mb-4">
            Hanya artikel published yang bisa dipilih. Tidak ada batas jumlah, tapi disarankan maksimal 3–4 agar tampilan homepage tetap rapi.
          </p>
          <div className="flex flex-col gap-2">
            {articlesRes.data?.map((a) => (
              <label key={a.id} className="flex items-center gap-3 text-sm text-[var(--ink)] py-1.5 border-b border-[var(--line)] last:border-0">
                <HomeToggle table="articles" id={a.id} defaultChecked={a.show_on_home} />
                {a.title_id}
              </label>
            ))}
            {(!articlesRes.data || articlesRes.data.length === 0) && (
              <p className="text-sm text-[var(--muted)]">Belum ada artikel published.</p>
            )}
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-xl border border-[var(--line)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[var(--ink)]">Produk di Homepage</h2>
            <span className="text-xs text-[var(--muted)]">{productCount} dipilih</span>
          </div>
          <p className="text-xs text-[var(--muted)] mb-4">
            Hanya produk published yang bisa dipilih. Disarankan maksimal 6 agar grid tetap rapi.
          </p>
          <div className="flex flex-col gap-2">
            {productsRes.data?.map((p) => (
              <label key={p.id} className="flex items-center gap-3 text-sm text-[var(--ink)] py-1.5 border-b border-[var(--line)] last:border-0">
                <HomeToggle table="products" id={p.id} defaultChecked={p.show_on_home} />
                {p.name_id}
              </label>
            ))}
            {(!productsRes.data || productsRes.data.length === 0) && (
              <p className="text-sm text-[var(--muted)]">Belum ada produk published.</p>
            )}
          </div>
        </div>

        {/* VIDEOS */}
        <div className="bg-white rounded-xl border border-[var(--line)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-[var(--ink)]">Video di Homepage</h2>
            <span className="text-xs text-[var(--muted)]">{videoCount} dipilih</span>
          </div>
          <p className="text-xs text-[var(--muted)] mb-4">
            Hanya item bertipe Video (dari menu Foto &amp; Video) yang muncul di sini.
          </p>
          <div className="flex flex-col gap-2">
            {videosRes.data?.map((v) => (
              <label key={v.id} className="flex items-center gap-3 text-sm text-[var(--ink)] py-1.5 border-b border-[var(--line)] last:border-0">
                <HomeToggle table="media_items" id={v.id} defaultChecked={v.show_on_home} />
                {v.title_id || "(tanpa judul)"}
              </label>
            ))}
            {(!videosRes.data || videosRes.data.length === 0) && (
              <p className="text-sm text-[var(--muted)]">Belum ada video published.</p>
            )}
          </div>
        </div>

        {/* SOCIAL LINKS */}
        <div className="bg-white rounded-xl border border-[var(--line)] p-5">
          <h2 className="font-semibold text-[var(--ink)] mb-1">Sosial Media (Follow Us)</h2>
          <p className="text-xs text-[var(--muted)] mb-4">
            Tampil di section &quot;Ikuti kami&quot; pada homepage. Kosongkan handle &amp; link untuk sembunyikan platform tersebut.
          </p>
          <SocialLinksForm initialLinks={settingsRes.data?.social_links ?? []} />
        </div>
      </div>
    </div>
  );
}
