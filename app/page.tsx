import site from "@/data/profile.json";
import projects from "@/data/projects.json";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { ProjectCard } from "@/components/ProjectCard";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-6 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{site.name}</h1>
          <p className="text-xl text-slate-300">{site.tagline}</p>
          <p className="text-slate-300">{site.bio}</p>
          <div className="flex gap-3">
            <Link href="/projects" className="inline-block bg-accent text-white px-4 py-2 rounded">
              View Projects
            </Link>
            <Link href="#contact" className="inline-block border border-accent text-accent px-4 py-2 rounded">
              Contact
            </Link>
          </div>
          <SocialLinks links={site.social} />
        </div>
        <div className="rounded-lg border border-slate-800 p-6 bg-slate-900/40">
          <h2 className="text-lg font-semibold mb-3">Currently</h2>
          <ul className="list-disc ml-6 space-y-2 text-slate-300">
            <li>Improving performance and a11y across projects</li>
            <li>Exploring DX patterns in Next.js App Router</li>
            <li>Open to collaboration and freelance work</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Highlighted Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(projects as any[]).slice(0, 2).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="mt-6">
          <Link href="/projects" className="text-accent">See all projects →</Link>
        </div>
      </section>

      <section id="contact" className="rounded-lg border border-slate-800 p-6 bg-slate-900/40">
        <h2 className="text-2xl font-semibold mb-4">Let’s Collaborate</h2>
        <p className="text-slate-300 mb-4">Send a message and I’ll get back soon.</p>
        <ContactForm />
      </section>
    </div>
  );
}

function ContactForm() {
  return (
    <form method="post" action="/api/contact" className="grid gap-3 max-w-xl">
      <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden={true} />
      <label className="grid gap-1">
        <span>Name</span>
        <input required name="name" className="bg-slate-900 border border-slate-700 rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span>Email</span>
        <input required type="email" name="email" className="bg-slate-900 border border-slate-700 rounded px-3 py-2" />
      </label>
      <label className="grid gap-1">
        <span>Message</span>
        <textarea required name="message" rows={5} className="bg-slate-900 border border-slate-700 rounded px-3 py-2" />
      </label>
      <button className="bg-accent text-white px-4 py-2 rounded w-fit">Send</button>
      <p className="text-sm text-slate-400">Alternatively, email: {site.email}</p>
    </form>
  );
}