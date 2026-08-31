"use client";

import { useTranslations } from "next-intl";

interface Article {
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
  href: string;
}

export default function Articles({ articles }: { articles: Article[] }) {
  const t = useTranslations("articles");

  return (
    <section className="articles section" id="articles">
      <div className="section-heading article-heading">
        <div>
          <p className="section-tag">{t("tag")}</p>
          <h2>{t("title")}</h2>
        </div>
        <p>{t("subtitle")}</p>
      </div>
      <div className="article-list">
        {articles.map((article, idx) => (
          <a
            key={idx}
            className="featured-article"
            href={article.href}
            aria-label={`${t("readArticle")}: ${article.title}`}
          >
            {article.image ? (
              <div className="featured-article-image">
                <img src={article.image} alt={article.title} />
              </div>
            ) : null}
            <div className="featured-article-copy">
              <div className="article-meta">
                <span>{idx === 2 ? t("buildingKnowledge") : t("articleMeta")}</span>
                <time dateTime={article.date}>{article.date}</time>
              </div>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="article-link">
                <span>{t("readArticle")}</span>
                <small>{article.readTime}</small>
                <b>↗</b>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
