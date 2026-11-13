# PGDBA Website

A free, GitHub-Pages-hosted site for the PGDBA program: an About page, a browsable archive of
student interview experiences across batches 2015-17 through 2026-28, and a committee-only
admin tool for publishing new batches without any paid backend.

See [`.plan/README.md`](./.plan/README.md) for the full project plan, architecture, and
roadmap — read that first before making structural changes.

## Stack

Astro (static output) + Tailwind CSS. No server, no database — interview data lives as
validated JSON in `src/data/batches/`.

## Development

```sh
npm install
npm run dev            # http://localhost:4321
npm run build           # -> dist/
npm run migrate         # re-run archive/*.html -> src/data/batches/*.json
npm run validate-data    # validate all batch JSON against the schema
npm run import-2026-28   # regenerate 2026-28.json from its archived raw source
```

## Project structure

```
archive/            original WordPress HTML exports + the sample Excel form (source of truth)
scripts/             migration + validation scripts
src/data/batches/    the site's actual content, one JSON file per batch
src/lib/             shared schema + header-alias map (used by migration, build, and admin CMS)
src/components/       Navbar, Footer, StudentCard, NarrativeArticle, BatchSwitcher, StatStrip
src/pages/            index (About), experiences/, admin/
.plan/                 project plan — read before making structural changes
```

The 2026-28 batch was imported from `archive/2026-28_old_raw.json`. Its question lists are
rendered as readable text, absent optional values are omitted, and text/range scores are
preserved verbatim rather than interpreted as numeric scores. Run `npm run import-2026-28`
to regenerate its site data from the archived source.
