import Link from "next/link";
import Image from "next/image";

export function ProjectCard({ project }: { project: any }) {
  return (
    <article className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden flex flex-col">
      {project.images?.[0] ? (
        <Image
          src={project.images[0]}
          alt={`${project.title} cover`}
          width={1200}
          height={630}
          className="w-full h-48 object-cover"
        />
      ) : null}
      <div className="p-4 space-y-2 grow">
        <h3 className="text-xl font-semibold">
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="text-slate-300">{project.summary}</p>
        {project.tags?.length ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tags.map((t: string) => (
              <span key={t} className="text-xs bg-slate-800 text-slate-200 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      <div className="p-4 pt-0 flex gap-3">
        {project.links?.demo ? (
          <Link href={project.links.demo} target="_blank" className="text-accent">
            Demo
          </Link>
        ) : null}
        {project.links?.repo ? (
          <Link href={project.links.repo} target="_blank" className="text-accent">
            Code
          </Link>
        ) : null}
      </div>
    </article>
  );
}