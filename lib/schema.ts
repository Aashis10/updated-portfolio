import type { Metadata } from "next";
import site from "@/data/profile.json";
import projects from "@/data/projects.json";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": site.name,
    "url": site.site,
    "jobTitle": site.tagline,
    "knowsAbout": site.keywords,
    "address": { "@type": "PostalAddress", "addressCountry": site.location || "" },
    "sameAs": Object.values(site.social || {})
  };
}

export function projectJsonLd(slug: string) {
  const project = (projects as any[]).find((p) => p.slug === slug);
  if (!project) return null;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.summary,
    "url": `${site.site}/projects/${project.slug}`,
    "image": project.images?.map((i: string) => i.startsWith("http") ? i : `${site.site}${i}`),
    "keywords": project.tags,
    "creator": {
      "@type": "Person",
      "name": site.name,
      "url": site.site
    }
  };
}

export function baseMetadata(): Metadata {
  const title = `${site.name} — ${site.tagline}`;
  const description = site.bio;
  const ogImage = "/og-image.svg";

  return {
    metadataBase: new URL(site.site || "http://localhost:3000"),
    title: {
      default: title,
      template: `%s — ${site.name}`
    },
    description,
    keywords: site.keywords,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      type: "website",
      url: site.site,
      title,
      description,
      siteName: site.name,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} Open Graph` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    icons: {
      icon: "/favicon.svg"
    },
    applicationName: site.name,
    category: "technology",
    viewport: { width: "device-width", initialScale: 1 }
  };
}