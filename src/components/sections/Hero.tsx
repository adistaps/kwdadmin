"use client";

import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <p className="eyebrow">
          <span />
          {t("eyebrow")}
        </p>
        <h1 className="!font-normal">
          <span className="block">{t("title.0")}</span>
          <span className="block">{t("title.1")}</span>
        </h1>
        <p className="hero-intro">{t("intro")}</p>
        <div className="hero-actions">
          <a className="button primary" href="#products">
            {t("ctaPrimary")}
            <span>↗</span>
          </a>
          <a className="button ghost" href="#contact">
            {t("ctaSecondary")}
          </a>
        </div>
      </div>
      <div className="panel-art" aria-hidden="true">
        <div className="panel top" />
        <div className="foam" />
        <div className="panel bottom" />
        <p>
          SANDWICH
          <br />
          PANEL <b>／01</b>
        </p>
      </div>
      <div className="hero-metrics">
        <div>
          <strong>
            {t("metric1Value")}
            <sup>{t("metric1Unit")}</sup>
          </strong>
          <span>{t("metric1Label")}</span>
        </div>
        <div>
          <strong>
            {t("metric2Value")}
            <sup>{t("metric2Unit")}</sup>
          </strong>
          <span>{t("metric2Label")}</span>
        </div>
        <div>
          <strong>
            {t("metric3Value")}
            <sup>{t("metric3Unit")}</sup>
          </strong>
          <span>{t("metric3Label")}</span>
        </div>
      </div>
    </section>
  );
}
