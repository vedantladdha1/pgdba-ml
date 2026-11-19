# Pages & Design

## Current sitemap

```text
/                         Programme overview and homepage
/academics/               Combined Programme & Academics page
  #institutes             Institute-wise overview and links
  #curriculum             Semester/course catalogue
/institutes/              Compatibility redirect to /academics/#institutes
/institutes/[slug]/       Individual profile for each participating institute
/admissions/              Application-to-admission process guide
/eligibility/             Eligibility and PI shortlisting criteria
/placements/              Placement and internship statistics
/experiences/              Redirect to the latest interview batch
/experiences/[batch]/      Interview experiences for one batch
/clubs/                    Student teams
/faqs/                     Frequently asked questions
/connect/                  Social links and AINA magazine
/admin/                    Committee upload/publish utility
```

The primary navigation contains one **Programme & Academics** destination instead of separate
Academics and Institutes overview links. Individual institute profiles remain accessible from
the combined page. The old `/institutes/` route redirects to the `#institutes` section so
existing links continue to work.

## Page responsibilities

- **Homepage:** programme introduction, shared institute journey, admissions roadmap, programme
  highlights, resource statistics, and links to key site sections.
- **Programme & Academics:** institute descriptions, each institute's programme contribution,
  contacts and official links, curriculum modules, course search and type filtering.
- **Institute profiles:** institute-specific introduction, programme role, contact information,
  and relevant curriculum modules.
- **Admissions:** process timeline, test and syllabus overview, interview and selection stages,
  and official source links. Cycle-specific facts are explicitly labeled.
- **Eligibility:** detailed academic qualification requirements and PI shortlisting information.
- **Placements:** reported placement and internship statistics by batch.
- **Interview experiences:** searchable and navigable batch records, rendered as structured cards
  or narrative articles according to source format.
- **Teams, FAQs, Connect:** community team descriptions, programme questions, and social/contact
  channels.

## Visual system

- Playfair Display headings and Outfit body text.
- Shared theme tokens in `src/styles/global.css` support light and dark modes.
- Dark blue accents, calm neutral page surfaces, readable contrast, and a consistent card
  treatment are used across the site.
- Card-like content boxes have a raised shadow and lift subtly on hover; reduced-motion
  preferences disable the motion.
- Special cards and controls (course tiles, experience badges, dialogs, hero panels) may retain
  distinct scoped styling.
- Responsive layouts should preserve readable card widths and avoid horizontal overflow.

## Shared components

- `Navbar.astro` - primary navigation, mobile menu, and theme toggle.
- `Footer.astro` - site navigation and attribution.
- `BaseLayout.astro` - shared metadata, theme initialization, navigation, and footer.
- `StudentCard.astro` / `NarrativeArticle.astro` - structured and long-form interview records.
- `BatchSwitcher.astro` - batch navigation.
- `StatStrip.astro` - summary statistics.
- `LineTrendChart.astro` - placement and internship trends.

## Accessibility and content notes

- Keep semantic headings, landmarks, accessible names, and keyboard-operable controls.
- Respect reduced-motion preferences for transitions and hover effects.
- Provide alternative text for informative images and explicit dimensions to avoid layout shift.
- Label admissions details by cycle and defer to official institute notifications for current
  dates, eligibility, exam patterns, and selection criteria.
