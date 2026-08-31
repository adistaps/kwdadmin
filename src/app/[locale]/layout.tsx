import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = (await import(`../../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <head>
        <link rel="preload" as="image" href="/kwd-symbol.png" />
        <link rel="preload" as="image" href="/products/eps-01.jpg" />
        <link rel="preload" as="image" href="/products/sandwich-01.jpg" />
        <link rel="preload" as="image" href="/products/single-sheet-01.jpg" />
        <link rel="preload" as="image" href="/products/prefab-01.jpg" />
        <link rel="preload" as="image" href="/products/steel-structure-01.jpg" />
        <link rel="preload" as="image" href="/products/cleanroom-01.jpg" />
        <link rel="preload" as="image" href="/products/sandwich-05.jpg" />
        <link rel="preload" as="image" href="/products/sandwich-02.jpg" />
        <link rel="preload" as="image" href="/kwd-logo.jpg" />
      </head>
      <body className="min-h-full antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
