# Deployment & Operations

## Static hosting setup

The site is configured for GitHub Pages:

- `astro.config.mjs` sets the canonical site URL to `https://pgdba.ml`.
- `.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch.
- The workflow installs dependencies, runs `npm run validate-data`, builds the Astro site, then publishes `dist/` using GitHub Pages actions.

The configuration confirms the intended deployment setup; check the GitHub Pages settings and DNS separately when troubleshooting the live site.

## Local release checks

Before publishing content or code changes:

```sh
npm run validate-data
npm run build
```

Use `npm run preview` to inspect the generated static site locally. Check important routes and links after navigation or redirect changes, especially `/academics/`, `/institutes/`, `/admissions/`, and `/experiences/`.

## Data provenance and backups

- Historical HTML/Excel sources and imported raw data remain under `archive/` for provenance.
- Batch JSON under `src/data/batches/` is the content rendered by the site.
- Git history records changes to the site and data; use reviewed commits/PRs for publishing.

## GitHub Pages considerations

- Ensure the Pages source is configured to use the GitHub Actions workflow.
- Keep the required Actions permissions in the workflow: read contents, write Pages, and request an OIDC token.
- The site uses `withBase()` for route and asset URLs so links can be adapted if the hosting base changes.
- Keep Node compatible with the project's `package.json` engine and the workflow's Node setup.

## Custom domain

The Astro configuration currently uses `https://pgdba.ml`. If the custom domain or DNS changes,
update the site configuration and GitHub Pages domain/DNS settings together, then verify HTTPS
and canonical links after deployment.

## Admin publishing safety

The `/admin/` tool is not in the primary navigation. Follow [`04-admin-cms.md`](./04-admin-cms.md)
for token handling, data validation, preview, and publishing details. Never commit personal
access tokens or other credentials.
