"use client";

import { useTranslations } from "next-intl";

interface Video {
  title: string;
  description: string;
  duration: string;
  poster: string;
  src: string;
}

export default function Videos({ videos }: { videos: Video[] }) {
  const t = useTranslations("videos");

  return (
    <section className="videos section" id="videos">
      <div className="section-heading video-heading">
        <div>
          <p className="section-tag">{t("tag")}</p>
          <h2>{t("title")}</h2>
        </div>
        <p>{t("subtitle")}</p>
      </div>
      <div className="video-grid">
        {videos.map((video, idx) => (
          <article key={idx} className="video-card">
            <div className="video-player">
              <video controls playsInline preload="metadata" poster={video.poster || undefined} aria-label={video.title}>
                <source src={video.src} type="video/mp4" />
              </video>
            </div>
            <div className="video-copy">
              <div className="video-meta">
                <span>{`${t("tag")} \u00B7 ${t("narration")}`}</span>
                {video.duration && (
                  <time dateTime={`PT${video.duration.replace(":", "M")}S`}>{video.duration}</time>
                )}
              </div>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
              <small>{t("narration")}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
