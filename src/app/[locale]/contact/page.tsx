import { getTranslations } from "next-intl/server";
import { createClient } from "@/lib/supabase/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export default async function ContactPage() {
  const t = await getTranslations("contact_page");
  const supabase = await createClient();
  const { data: settings } = await supabase.from("site_settings").select("*").eq("id", 1).single();

  return (
    <main>
      <Header />

      <section className="max-w-5xl mx-auto px-6 pt-32 pb-16">
        <p className="eyebrow"><span>{t("title")}</span></p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mt-3">{t("title")}</h1>
        <p className="text-[var(--muted)] mt-3 max-w-2xl">{t("subtitle")}</p>

        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <div>
            <ContactForm />
          </div>

          <div className="flex flex-col gap-5">
            {settings?.address && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--muted)] uppercase mb-1">
                  {t("address_label")}
                </h2>
                <p className="text-sm text-[var(--ink)] whitespace-pre-wrap">{settings.address}</p>
              </div>
            )}
            {settings?.phone && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--muted)] uppercase mb-1">
                  {t("phone_label")}
                </h2>
                <p className="text-sm text-[var(--ink)]">{settings.phone}</p>
              </div>
            )}
            {settings?.email && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--muted)] uppercase mb-1">
                  {t("email_label")}
                </h2>
                <p className="text-sm text-[var(--ink)]">{settings.email}</p>
              </div>
            )}
            {settings?.operational_hours && (
              <div>
                <h2 className="text-xs font-semibold text-[var(--muted)] uppercase mb-1">
                  {t("hours_label")}
                </h2>
                <p className="text-sm text-[var(--ink)]">{settings.operational_hours}</p>
              </div>
            )}

            {settings?.map_embed_url && (
              <iframe
                src={settings.map_embed_url}
                className="w-full h-64 rounded-2xl border border-[var(--line)] mt-2"
                loading="lazy"
              />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
