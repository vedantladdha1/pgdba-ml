# PGDBA Website

A static, GitHub Pages-hosted resource about the Post Graduate Diploma in Business Analytics. It brings together programme and curriculum information, institute profiles, admissions guidance, placement and internship statistics, FAQs, student teams, and interview experiences from PGDBA batches.

See [`.plan/README.md`](./.plan/README.md) for the architecture notes and project documentation index.

## Stack

Astro static output, Tailwind CSS, and TypeScript. Interview experience data is stored as validated JSON in `src/data/batches/`; the site does not require a runtime server or database.

## Development and validation

```sh
npm install
npm run dev             # http://localhost:4321
npm run validate-data   # validate batch data
npm run build           # generate static site in dist/
npm run preview         # preview the production build
npm run migrate         # re-run archive HTML -> batch JSON migration
npm run import-2026-28  # regenerate 2026-28.json from its archived raw source
```

## Public pages

| Route | Content |
|---|---|
| `/` | Programme introduction, PGDBA journey, admissions roadmap, programme highlights, and site guide |
| `/academics/` | Combined Programme & Academics page: institute-wise information and semester/course catalogue |
| `/institutes/` | Compatibility redirect to `/academics/#institutes` |
| `/institutes/isi-kolkata/`, `/institutes/iit-kharagpur/`, `/institutes/iim-calcutta/` | Individual institute profiles |
| `/admissions/` | Admission process from application through offer and joining; cycle-specific test and selection details are labeled |
| `/eligibility/` | Eligibility and PI shortlisting criteria |
| `/placements/` | Reported final placement and internship statistics |
| `/experiences/` | Redirect to the latest interview-experience batch |
| `/experiences/[batch]/` | Shareable interview-experience archive for a batch |
| `/clubs/` | PGDBA student teams |
| `/faqs/` | Programme FAQs |
| `/connect/` | Social channels and AINA magazine |
| `/admin/` | Committee tool for importing and publishing experience data |

## Project structure

```
archive/               original WordPress HTML exports and source spreadsheets
scripts/               migration, import, and validation scripts
src/components/        shared navigation, cards, charts, and layout elements
src/data/batches/      interview experiences, one JSON file per batch
src/data/              institute and curriculum catalogues
src/lib/                schemas, batch helpers, URL helpers, and GitHub API integration
src/pages/              Astro routes listed above
src/styles/global.css   shared theme tokens and responsive visual styles
.plan/                  architecture, data, design, CMS, deployment, and roadmap docs
```

The shared visual system supports light and dark themes. Card-like content boxes use a raised shadow and a subtle hover lift; reduced-motion preferences are respected. Course and interview data should be validated after changes with `npm run validate-data`, followed by `npm run build`.

The 2026–28 batch was imported from `archive/2026-28_old_raw.json`. Optional values are omitted where absent, and text/range scores are preserved rather than interpreted as numeric scores. Run `npm run import-2026-28` to regenerate the site data from the archived source.
