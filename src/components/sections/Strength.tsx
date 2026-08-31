"use client";

import { useTranslations } from "next-intl";

export default function Strength() {
  const t = useTranslations("strength");

  return (
    <section className="strength section" id="strength">
      <div className="strength-intro">
        <p className="section-tag light">{t("tag")}</p>
        <h2>{t("title")}</h2>
      </div>
      <div className="strength-numbers">
        <div>
          <strong>{t("metric1Value")}</strong>
          <sup>{t("metric1Unit")}</sup>
          <span>{t("metric1Label")}</span>
        </div>
        <div>
          <strong>{t("metric2Value")}</strong>
          <sup>{t("metric2Unit")}</sup>
          <span>{t("metric2Label")}</span>
        </div>
        <div>
          <strong>{t("metric3Value")}</strong>
          <sup>{t("metric3Unit")}</sup>
          <span>{t("metric3Label")}</span>
        </div>
      </div>
      <blockquote>"{t("quote")}"</blockquote>
    </section>
  );
}
