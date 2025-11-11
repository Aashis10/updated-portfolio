// Improved best-effort importer: pulls content from existing site homepage
// and writes to data/profile.json and data/projects.json.
// Adjust selectors as needed.

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import cheerio from "cheerio";

const SOURCE_URL = "https://aashishbhusal.vercel.app/";

async function fetchHtml(url) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function toTitleCase(s) {
  return s.replace(/\w\S*/g, (t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());
}

async function run() {
  console.log(`Importing content from: ${SOURCE_URL}`);
  const html = await fetchHtml(SOURCE_URL);
  const $ = cheerio.load(html);

  const metaDesc =
    $('meta[name="description"]').attr("content") ||
    $('meta[property="og:description"]').attr("content") ||
    "Portfolio website";

  const nameGuess = $(
    'h1:contains("Aashish"), h1:contains("Aashis"), h1:contains("Bhusal")'
  )
    .first()
    .text()
    .trim() || "Aashish Bhusal";

  const taglineGuess = $(
    'h2:contains("Developer"), h2:contains("Engineer"), h2:contains("Full Stack")'
  )
    .first()
    .text()
    .trim() || "Full Stack Developer";

  const bioGuess = $(
    'p:contains("build"), p:contains("developer"), p:contains("web"), p:contains("software")'
  )
    .first()
    .text()
    .trim() || metaDesc;

  // Basic project scanning
  const projects = [];
  $("article, section, div").each((_, el) => {
    const title =
      $(el).find("h3, h2").first().text().trim() ||
      $(el).find('meta[property="og:title"]').attr("content");
    const summary = $(el).find("p").first().text().trim();
    const img =
      $(el).find("img").first().attr("src") ||
      $(el).find('meta[property="og:image"]').attr("content");
    if (title && summary && title.length < 120 && summary.length > 30) {
      const slug =
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + "-" + projects.length;
      projects.push({
        slug,
        title: toTitleCase(title),
        summary,
        problem: "",
        solution: "",
        impact: "",
        tech: [],
        links: {},
        images: img ? [img.startsWith("http") ? img : new URL(img, SOURCE_URL).href] : [],
        tags: []
      });
    }
  });

  // De-duplicate by title
  const seen = new Set();
  const deduped = [];
  for (const p of projects) {
    if (seen.has(p.title)) continue;
    seen.add(p.title);
    deduped.push(p);
  }

  // Update profile.json
  const profilePath = path.join(process.cwd(), "data", "profile.json");
  const existingProfile = JSON.parse(await fs.readFile(profilePath, "utf8"));
  const updatedProfile = {
    ...existingProfile,
    name: nameGuess || existingProfile.name,
    tagline: taglineGuess || existingProfile.tagline,
    bio: bioGuess || existingProfile.bio
  };
  await fs.writeFile(profilePath, JSON.stringify(updatedProfile, null, 2));
  console.log(`Updated ${profilePath}`);

  // Merge projects
  const projectsPath = path.join(process.cwd(), "data", "projects.json");
  let existingProjects = [];
  try {
    existingProjects = JSON.parse(await fs.readFile(projectsPath, "utf8"));
  } catch {}
  const merged = [...existingProjects, ...deduped].slice(0, 12);
  await fs.writeFile(projectsPath, JSON.stringify(merged, null, 2));
  console.log(`Updated ${projectsPath}`);

  console.log("Import complete. Review data files and refine manually.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});