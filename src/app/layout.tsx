import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PT KWD PURIFIED COLOR BOARD",
  description: "Sandwich Panel & Clean Room Indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
