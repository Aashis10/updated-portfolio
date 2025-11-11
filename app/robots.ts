import type { MetadataRoute } from "next";
import site from "@/data/profile.json";

export default function robots(): MetadataRoute.Robots {
  const base = site.site?.replace(/\/$/, "") || "http://localhost:3000";
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${base}/sitemap.xml`,
    host: base
  };
}