# Architecture

## Stack

- **Astro static output** pre-renders the site as HTML, CSS, and browser JavaScript for GitHub Pages.
- **Tailwind CSS** and shared design tokens provide responsive layouts and light/dark theme styling.
- **TypeScript** is used for application code, schemas, shared data, and site helpers.
- **JSON batch data** under `src/data/batches/` is validated during data checks and the site build.
- Small client-side scripts support features such as course filtering, curriculum tabs, theme selection, and the admin tool.
- The admin page uses SheetJS in the browser to parse Excel uploads and the GitHub REST API to publish updates.

## Route structure

| Route | Responsibility |
|---|---|
| `/` | Programme overview, curriculum journey preview, admissions roadmap, and guide to site content |
| `/academics/` | Combined Programme & Academics page, including institute overview and course catalogue |
| `/institutes/` | Compatibility redirect to `/academics/#institutes` |
| `/institutes/[slug]/` | Static profile for each of the three participating institutes |
| `/admissions/` | Application, test, interview, selection, and offer process guide |
| `/eligibility/` | Eligibility and PI shortlisting reference |
| `/placements/` | Placement and internship trend information |
| `/experiences/` | Redirect to the latest interview batch |
| `/experiences/[batch]/` | Batch-specific interview experience archive |
| `/clubs/`, `/faqs/`, `/connect/` | Student teams, programme FAQs, and social/contact links |
| `/admin/` | Unlinked committee utility for preparing batch data |

Primary navigation presents the programme and curriculum as a single **Programme & Academics** destination. The individual institute pages remain directly accessible from the combined page.

## Data flow

```text
archive sources ── migration/import scripts ──> src/data/batches/*.json
                                                  │
                                        schema/data validation
                                                  │
                                             Astro build
                                                  │
                                             static dist/
                                                  │
                                       GitHub Pages deployment
```

Batch JSON is the source rendered by interview pages. Institute and curriculum information are maintained in shared TypeScript catalogues under `src/data/` and used by the combined Programme & Academics page.

## Admin publishing flow

The admin route is a static page whose browser code:

1. Parses the uploaded spreadsheet locally.
2. Maps its columns to the shared interview schema.
3. Validates records and previews the resulting batch.
4. Uses a user-provided GitHub token to publish the JSON update through the GitHub API.

The admin workflow and token-handling details are documented in [`04-admin-cms.md`](./04-admin-cms.md). Never commit or log personal access tokens.

## Repository layout

```text
.
├── .github/workflows/deploy.yml     # data validation, static build, Pages deployment
├── .plan/                           # project documentation
├── archive/                         # historical HTML and source files
├── public/images/                   # site images and logos
├── scripts/                          # batch migration/import/validation
└── src/
    ├── components/                   # shared Astro components
    ├── data/
    │   ├── batches/                  # interview batch JSON
    │   ├── curriculum.ts             # semester and course catalogue
    │   └── institutes.ts             # participating institute information
    ├── layouts/BaseLayout.astro      # shared head, navigation, footer, theme setup
    ├── lib/                          # schemas and application helpers
    ├── pages/                        # static routes and dynamic batch/profile pages
    └── styles/global.css             # shared theme palette and card styling
```

## Shared design behavior

The global stylesheet defines light and dark token palettes. Card-like content boxes have a raised shadow and a subtle hover lift; the motion is disabled for users who request reduced motion. Page-specific treatments such as solid course cards, team cards, modal dialogs, and dark hero panels remain scoped to their components.
