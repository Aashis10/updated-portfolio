import "./globals.css";
import type { Metadata } from "next";
import { baseMetadata } from "@/lib/seo";
import { personJsonLd } from "@/lib/schema";
import site from "@/data/profile.json";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";

export const metadata: Metadata = baseMetadata();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:m-4 focus:p-2 focus:bg-slate-800">
          Skip to content
        </a>
        <NavBar />
        <main id="main" className="container py-10">{children}</main>
        <Footer name={site.name} />
      </body>
    </html>
  );
}