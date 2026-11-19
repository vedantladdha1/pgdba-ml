# PGDBA Website - Project Documentation

This folder documents the website architecture, data model, page design, admin workflow, deployment, and roadmap. The live project has grown beyond the initial two-page concept; use this index and the repository [README](../README.md) for the current site map.

## Current site

The website is a static Astro site hosted on GitHub Pages. It includes:

- Programme overview and applicant-oriented homepage.
- A combined Programme & Academics page at `/academics/`, with an institute-wise overview and curriculum catalogue.
- Individual institute profiles at `/institutes/isi-kolkata/`, `/institutes/iit-kharagpur/`, and `/institutes/iim-calcutta/`. The old `/institutes/` overview route redirects to `/academics/#institutes`.
- Admissions and eligibility guides, plus placement/internship information.
- Batch-based interview experiences, student teams, FAQs, and social/contact links.
- A committee-only `/admin/` tool for preparing and publishing interview-experience data.

## Key implementation decisions

| Area | Current approach |
|---|---|
| Hosting | GitHub Pages static deployment |
| Framework | Astro with static output and Tailwind CSS |
| Public data | Validated JSON under `src/data/batches/` |
| Institute and curriculum details | Shared TypeScript catalogues under `src/data/`, rendered together on `/academics/` |
| Navigation | One Programme & Academics entry; individual institute profile routes remain available |
| Legacy institute overview URL | `/institutes/` redirects to the institute section of `/academics/` |
| Themes and cards | Shared light/dark theme tokens; card-like surfaces use raised shadows and hover lift with reduced-motion support |
| Admissions information | Cycle-specific details are labeled and official admission notices take precedence |

## Documentation index

1. [`01-architecture.md`](./01-architecture.md) - framework, route structure, and data flow.
2. [`02-data-model-and-migration.md`](./02-data-model-and-migration.md) - interview schema, source formats, migration, and validation.
3. [`03-pages-and-design.md`](./03-pages-and-design.md) - current sitemap, navigation, visual system, and shared components.
4. [`04-admin-cms.md`](./04-admin-cms.md) - upload, mapping, validation, preview, publish flow, and security considerations.
5. [`05-deployment-and-ops.md`](./05-deployment-and-ops.md) - GitHub Pages workflow and operational notes.
6. [`06-roadmap.md`](./06-roadmap.md) - implemented features and remaining quality/maintenance work.

## Development

```sh
npm run dev
npm run validate-data
npm run build
npm run preview
```

The admission guide and other applicant-facing information are informational resources, not official institutional notices. Always verify current dates, requirements, and selection criteria through the relevant official admission authority.
