"use client";

import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <section className="about section" id="about">
      <div>
        <p className="section-tag">{t("tag")}</p>
        <h2>{t("title")}</h2>
      </div>
      <div className="about-copy">
        <p>{t("copy")}</p>
        <div className="about-points">
          <span>
            <i>01</i>
            {t("point1")}
          </span>
          <span>
            <i>02</i>
            {t("point2")}
          </span>
          <span>
            <i>03</i>
            {t("point3")}
          </span>
        </div>
      </div>
    </section>
  );
}
