"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" }
];

export function NavBar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <nav className="container flex items-center justify-between py-3">
        <Link href="/" className="font-semibold">
          Aashish
        </Link>
        <ul className="flex gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx("px-2 py-1 rounded", pathname === l.href && "bg-slate-800")}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}