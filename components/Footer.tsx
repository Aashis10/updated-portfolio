import { SocialLinks } from "./SocialLinks";
import site from "@/data/profile.json";

export function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-800 mt-16">
      <div className="container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-slate-400">© {year} {name}. All rights reserved.</p>
        <SocialLinks links={site.social} />
      </div>
    </footer>
  );
}