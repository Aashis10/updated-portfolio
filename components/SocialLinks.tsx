import Link from "next/link";

export function SocialLinks({ links }: { links: Record<string, string> }) {
  if (!links) return null;
  return (
    <div className="flex flex-wrap gap-3 text-sm">
      {links.github && (
        <Link href={links.github} target="_blank" className="underline underline-offset-4">
          GitHub
        </Link>
      )}
      {links.linkedin && (
        <Link href={links.linkedin} target="_blank" className="underline underline-offset-4">
          LinkedIn
        </Link>
      )}
      {links.facebook && (
        <Link href={links.facebook} target="_blank" className="underline underline-offset-4">
          Facebook
        </Link>
      )}
      {links.instagram && (
        <Link href={links.instagram} target="_blank" className="underline underline-offset-4">
          Instagram
        </Link>
      )}
    </div>
  );
}