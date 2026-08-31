"use client";

import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("contact");

  return (
    <section className="contact section" id="contact">
      <div className="contact-title">
        <p className="section-tag">{t("tag")}</p>
        <h2>{t("title")}</h2>
        <p>{t("subtitle")}</p>
      </div>
      <div className="address-card">
        <span>{t("addressLabel")}</span>
        <p>{t("address")}</p>
        <div className="contact-detail">
          <span>{t("phoneLabel")}</span>
          <a href={`tel:${t("phone").replace(/\s/g, "")}`}>{t("phone")}</a>
        </div>
        <div className="contact-detail">
          <span>{t("emailLabel")}</span>
          <a href={`mailto:${t("email")}`}>{t("email")}</a>
        </div>
        <div className="contact-actions">
          <a className="whatsapp" href="https://wa.me/6282114562299" target="_blank" rel="noreferrer">
            {t("whatsappCta")}
            <b>↗</b>
          </a>
          <a href="https://www.google.com/maps/search/?api=1&query=Jln+Industri+Raya+III+Blok+AH+No+7+Pasir+Jaya+Jatake+Tangerang" target="_blank" rel="noreferrer">
            {t("mapCta")}
            <b>↗</b>
          </a>
        </div>
      </div>
    </section>
  );
}
