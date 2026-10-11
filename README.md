# Mian Hamid ur Rehman Portfolio

Portfolio recreated from the original Vite site with Next.js 16 App Router, React 19, Tailwind CSS 4, TypeScript, and Bun.

## Run

```bash
bun install
bun run dev
```

Open http://localhost:3000.

## Verify and serve

```bash
bun run lint
bun run typecheck
bun run build
bun run start
```

The light-themed home page uses reusable components in `src/components/` and section content from `src/data/`. The same section data supplies metadata, the Open Graph image, and the generated resume. Tailwind CSS 4's palette and font configuration lives in the `@theme` block in `src/app/globals.css`.

`public/profile.jpg` supplies the hover/focus profile card, generated favicon, and Open Graph card. Bricolage Grotesque ExtraBold headings and Inter body text are served locally through `next/font/local` from the downloaded folders in `src/fonts/`, each with its `OFL.txt` license. Labels use the system monospace font.

Navigation scrolls to the Work, About, Experience, and Contact sections. The Download CV button serves a text resume at `/api/resume`. Set `aboutData.resume` to a PDF URL when an actual PDF is available.

The contact form sends to `/api/contact-submission`. Copy `.env.example` to `.env` and configure the SMTP values to enable delivery. Failures keep the visitor's message available for retry; success is shown only after the server confirms delivery. Run the API regression tests with `bun test`.

Set `NEXT_PUBLIC_SITE_URL` to the deployed site's origin (for example, `https://your-domain.com`) to generate absolute Open Graph URLs. The local default is `http://localhost:3000`.

## Browser accessibility checks

Run against the production server for the JavaScript-disabled CSS checks:

```bash
npm install --prefix /tmp/portfolio-a11y --no-audit --no-fund playwright axe-core
NODE_PATH=/tmp/portfolio-a11y/node_modules node scripts/accessibility-check.cjs
```

Set `A11Y_URL` for another URL or `CHROME_PATH` for another Chrome executable. The checks cover axe rules and overflow at seven viewport sizes, keyboard navigation, mobile menus, reduced motion, text spacing, JavaScript-disabled navigation, image metadata routes, downloads, and browser runtime errors. Screenshots are saved to `/tmp/portfolio-desktop.png` and `/tmp/portfolio-mobile.png`.
