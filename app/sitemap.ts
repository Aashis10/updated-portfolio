import type { MetadataRoute } from "next";
import site from "@/data/profile.json";
import projects from "@/data/projects.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.site?.replace(/\/$/, "") || "http://localhost:3000";

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 }
  ];

  const projectRoutes: MetadataRoute.Sitemap = (projects as any[]).map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.7
  }));

  return [...routes, ...projectRoutes];
}