import type { Metadata } from "next";
import projects from "@/data/projects.json";
import site from "@/data/profile.json";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projectJsonLd } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams() {
  return (projects as any[]).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const p = (projects as any[]).find((x) => x.slug === params.slug);
  if (!p) return {};
  const title = `${p.title} — Project`;
  const description = p.summary || p.problem || site.bio;
  const image = p.images?.[0] || "/og-image.svg";
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      type: "article",
      url: `${site.site}/projects/${p.slug}`,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export default function ProjectPage({ params }: { params: Params }) {
  const p = (projects as any[]).find((x) => x.slug === params.slug);
  if (!p) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(params.slug)) }}
      />
      <h1>{p.title}</h1>
      <p className="lead">{p.summary}</p>

      {p.images?.length ? (
        <div className="grid gap-4 md:grid-cols-2 not-prose my-6">
          {p.images.map((src: string, i: number) => (
            <Image
              key={i}
              src={src}
              alt={`${p.title} screenshot ${i + 1}`}
              width={1200}
              height={800}
              className="rounded border border-slate-800"
            />
          ))}
        </div>
      ) : null}

      <h2>Problem</h2>
      <p>{p.problem}</p>

      <h2>Solution</h2>
      <p>{p.solution}</p>

      {p.impact ? (
        <>
          <h2>Impact</h2>
          <p>{p.impact}</p>
        </>
      ) : null}

      {p.tech?.length ? (
        <>
          <h3>Tech stack</h3>
          <ul>
            {p.tech.map((t: string) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </>
      ) : null}

      {p.links?.demo || p.links?.repo ? (
        <>
          <h3>Links</h3>
          <ul>
            {p.links.demo ? (
              <li>
                <Link href={p.links.demo} target="_blank">
                  Live Demo
                </Link>
              </li>
            ) : null}
            {p.links.repo ? (
              <li>
                <Link href={p.links.repo} target="_blank">
                  GitHub Repo
                </Link>
              </li>
            ) : null}
          </ul>
        </>
      ) : null}
    </article>
  );
}