# Roadmap

This roadmap summarizes the current implementation and practical follow-up work. It replaces
the initial rebuild plan, whose early page-count and launch assumptions no longer describe the
site.

## Implemented

- Astro static site with shared navigation, footer, layout, theme tokens, and responsive styling.
- Homepage with programme overview, journey cards, admissions roadmap, programme highlights,
  resource statistics, and guide links.
- Combined Programme & Academics page at `/academics/`, including institute-wise information,
  contacts/official links, semester curriculum, course search, type filtering, and tabs.
- `/institutes/` compatibility redirect to `/academics/#institutes`, with individual institute
  profile pages retained at `/institutes/[slug]/`.
- `/admissions/` application-to-admission guide and `/eligibility/` criteria page.
- Placement/internship statistics, batch interview archive, student teams, FAQs, and Connect
  pages.
- Interview data migration/import and schema-based validation.
- Committee admin utility for spreadsheet-based batch data management.
- Shared raised card shadows and subtle hover lift, with reduced-motion support.
- GitHub Actions workflow for data validation, build, and GitHub Pages deployment.

## Ongoing quality checks

- Run `npm run validate-data` after batch data changes.
- Run `npm run build` after code, route, or style changes.
- Verify theme contrast and layouts at mobile, tablet, and desktop sizes for significant visual
  changes.
- Recheck internal links and anchors after route or navigation updates.
- Keep cycle-specific admission details labeled and point applicants to official notices.

## Future opportunities

- Keyboard and screen-reader accessibility review across interactive controls and dialogs.
- Broken-link check for external student profile URLs.
- Confirm every admission fact against current official notices before each admission cycle.
- Add student-life/alumni content when permissioned firsthand stories and verified information
  are available.
- Review admin publishing and branch protections against the current GitHub repository settings.
