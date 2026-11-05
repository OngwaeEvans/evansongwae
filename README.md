# Evans Ongwae Cave

The personal digital headquarters of **Evans Ongwae Onchoke**, Founder & Chief Architect of Hevloys Group. It introduces Evans, his philosophy, the four Hevloys divisions, every project (with honest status labels), the Hevloys Media video archive, the long-term vision and direct contact channels.

## Stack
React 19 · TypeScript · Vite 6 · Tailwind CSS 3.4 · Framer Motion 12 · Lucide icons. No backend. Fonts: Kanit, Space Grotesk, JetBrains Mono and Plus Jakarta Sans, loaded from Google Fonts.

## Commands
```bash
npm install
npm run dev        # local dev server
npm run typecheck  # TypeScript only
npm test           # data integrity tests
npm run build      # production build to dist/
```

## Structure
```
src/
  data/        ← edit content here (no component changes needed)
    identity.ts   name, portrait, phone, Linktree, WhatsApp messages
    projects.ts   project registry
    videos.ts     Hevloys Media archive
    divisions.ts  the four Hevloys divisions
    content.ts    intro, principles, manifesto, horizons, milestones, console profile
  components/  UI sections (layout, Hero, Identity, Divisions, Projects, Media, Closing, ConsoleDrawer, shared)
  lib/         hooks, theme and language preferences
public/        portrait, favicon, robots.txt, sitemap.xml
```

## Common edits
- **Add a project:** append an object to `src/data/projects.ts`. Set `statusSource` to `founder`, `inspected` or `unverified`, and `lastVerified` to the date you checked it. Add `videoIds` to attach YouTube briefings. It appears in the registry, filters, search and division panels automatically.
- **Add a video:** append `{ id, title, date, category, summary }` to `src/data/videos.ts`. The `id` is the part after `youtu.be/`. Thumbnails and the embedded player are generated from it.
- **Personal info and contact:** `src/data/identity.ts`. WhatsApp links are URL-encoded automatically.
- **Imagery:** put files in `public/images/` and reference them as `/images/name.jpg`. Projects without images get a generated fallback panel.
- **Translations:** navigation and controls are bilingual via `ui` in `src/lib/prefs.tsx` and the `label` fields in `content.ts`.

## Production domain
Set `VITE_SITE_URL` in Netlify environment variables. Then update the canonical, Open Graph and JSON-LD URLs in `index.html` and the URLs in `public/robots.txt` and `public/sitemap.xml`. Today these point to `https://evansongwae.netlify.app`.

## Deploy
Netlify builds with `npm run build` and publishes `dist/` (see `netlify.toml`). The previous static pages (`portfolio/`, `Evans index.html`) are kept in the repo but no longer published.

## Content integrity
- Statuses show their source.
- Unverified figures shown on external sites are not repeated.
- Undated milestones say "Date unconfirmed".
- Two supplied YouTube clips (`gxuqu-z-JBM`, `brtxIYaEdyI`) are deliberately held back. Their YouTube descriptions make sensational claims about Evans.
