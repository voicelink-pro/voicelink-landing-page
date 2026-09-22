import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import type { ReactNode } from "react";

import { siteConfig, siteUrl } from "@/config/site";

import "./globals.css";

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl" className={figtree.variable}>
      <body className={figtree.className}>{children}</body>
    </html>
  );
}
