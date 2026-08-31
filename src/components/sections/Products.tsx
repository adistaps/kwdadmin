"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import GalleryModal from "../GalleryModal";

interface Product {
  number: string;
  name: string;
  description: string;
  images: string[];
  detailHref?: string;
}

export default function Products({ products }: { products: Product[] }) {
  const t = useTranslations("products");
  const [galleryProduct, setGalleryProduct] = useState<Product | null>(null);

  return (
    <section className="products section" id="products">
      <div className="section-heading">
        <div>
          <p className="section-tag">{t("tag")}</p>
          <h2>{t("title")}</h2>
        </div>
        <p>{t("subtitle")}</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.number} className={product.images.length > 0 ? "has-gallery" : ""}>
            {product.images.length > 0 && (
              <button
                type="button"
                aria-label={`${t("viewPhotos")}: ${product.name}`}
                onClick={() => setGalleryProduct(product)}
              >
                <img className="product-cover" src={product.images[0]} alt="" />
                <span className="product-number">{product.number}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <span className="arrow">
                  {t("viewPhotos")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </button>
            )}
            {product.detailHref && (
              <a className="product-detail-link" href={product.detailHref}>
                {t("detailLink")}{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            )}
          </article>
        ))}
      </div>
      {galleryProduct && (
        <GalleryModal
          product={galleryProduct}
          onClose={() => setGalleryProduct(null)}
        />
      )}
    </section>
  );
}
