import projects from "@/data/projects.json";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies and selected work."
};

export default function ProjectsPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {(projects as any[]).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}