## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Project map

- The site uses Astro static output; page routes live in `src/pages/`.
- `/academics/` is the combined Programme & Academics page, including the institute overview and curriculum.
- `/institutes/` redirects to `/academics/#institutes`; `/institutes/[slug]/` contains the individual institute profiles.
- `/admissions/` contains the cycle-labeled admissions guide; official admission notices take precedence.
- Shared theme and card styling live in `src/styles/global.css`. Card-like boxes have a subtle hover lift, with reduced-motion support.
- Validate batch JSON with `npm run validate-data` and run `npm run build` after code changes.

## Documentation

Full documentation: https://docs.astro.build

Project documentation: [README.md](./README.md) and [`.plan/README.md`](./.plan/README.md).

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
