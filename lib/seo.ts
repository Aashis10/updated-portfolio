import site from "@/data/profile.json";

export function siteUrl(path = ""): string {
  const base = site.site?.replace(/\/$/, "") || "http://localhost:3000";
  if (!path) return base;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function absoluteUrl(url: string): string {
  if (!url) return siteUrl();
  if (url.startsWith("http")) return url;
  return siteUrl(url);
}