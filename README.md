# Aashish Portfolio (Next.js + TypeScript)

Production-ready portfolio with:
- Next.js 14 App Router, Tailwind CSS
- SEO: dynamic metadata, Open Graph, Twitter cards
- Discoverability: sitemap.xml, robots.txt, JSON-LD (Person + Project)
- Accessible structure, focus styles, skip-link
- Contact form API route with validation and honeypot
- Content importer script to extract info from your current site

## Quick start
```bash
npm install
npm run import   # pull basic info from https://aashishbhusal.vercel.app/
npm run dev      # http://localhost:3000
```

## Build and run
```bash
npm run build
npm start
```

## Zip for download
```bash
zip -r aashish-portfolio.zip .
```

## Customize
- data/profile.json: name, bio, social links, keywords
- data/projects.json: case studies list (slug, title, summary, tech, links, images)
- public/og-image.svg: update to your branding
- app/api/contact/route.ts: integrate an email service (Resend, SES)

## Social links
- [GitHub](https://github.com/Aashis10)
- [Facebook](https://facebook.com/aashis.bhusal.04)
- [Instagram](https://www.instagram.com/aashishbhusal7?igsh=NDYxejcyOXY5cWN6)
- [LinkedIn](https://www.linkedin.com/authwall?trk=gf&trkInfo=AQGUt15tU0JYowAAAZpw8WqIaXwPZGEDud1JxtQZadHRPaSkiBwC8J3d5lCi1zQ2onmycPhJwCps4a-OpJwP0S18QrAt84C6fLXJhShxNBeWlIGG99n-hIeyBHU515jS8hnhqtw=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Faashish-bhusal%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app)

## Notes
- The importer is heuristic; refine data manually for accuracy.
- Add meaningful project metrics (performance improvements, user counts, etc.) to improve SEO and credibility.