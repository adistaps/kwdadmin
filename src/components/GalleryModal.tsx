"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

interface Product {
  number: string;
  name: string;
  description: string;
  images: string[];
  detailHref?: string;
}

interface GalleryModalProps {
  product: Product;
  onClose: () => void;
}

export default function GalleryModal({ product, onClose }: GalleryModalProps) {
  const t = useTranslations("gallery");
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % product.images.length);
  }, [product.images.length]);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product.images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div className="gallery-backdrop" onClick={onClose}>
      <div className="gallery-dialog" onClick={(e) => e.stopPropagation()}>
        <header>
          <div>
            <span>{product.number}</span>
            <h3>{product.name}</h3>
          </div>
          <button className="gallery-close" onClick={onClose} aria-label={t("close")}>
            ×
          </button>
        </header>
        <div className="gallery-stage">
          <img src={product.images[current]} alt={product.name} />
          {product.images.length > 1 && (
            <>
              <button className="gallery-nav previous" onClick={goPrev} aria-label="Previous">
                ‹
              </button>
              <button className="gallery-nav next" onClick={goNext} aria-label="Next">
                ›
              </button>
              <div className="gallery-count">
                {current + 1} {t("of")} {product.images.length}
              </div>
            </>
          )}
        </div>
        {product.images.length > 1 && (
          <div className="gallery-thumbnails">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                className={idx === current ? "active" : ""}
                onClick={() => setCurrent(idx)}
                aria-label={`Image ${idx + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
