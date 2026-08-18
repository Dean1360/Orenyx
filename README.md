# Motus AI Engine — website

Marketing site for **Motus AI Engine**, a product of Motus Labs LLC (Wyoming).
Built by Rishfotech Solutions Pvt. Ltd.

Stack: Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · TypeScript · deployed on Vercel.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
node scripts-check-placeholders.mjs   # launch gate
```

---

## The content rule

Every user-facing string comes **verbatim** from *Full Production Website Builder
Packet v1.0 (22 July 2026)*. Nothing is paraphrased, tightened, or invented.

Anything the packet does not supply is wrapped in `<Placeholder>`, which renders
in magenta so it is impossible to miss in review. `scripts-check-placeholders.mjs`
greps for them — **zero placeholders is the gate for going live.**

---

## Brand tokens

Dark system, read off the client Figma. Defined once in `app/globals.css` under
`@theme`. Never hard-code a hex.

| Role | Token | Hex |
|---|---|---|
| Page background | `bg` | `#0F1628` |
| Card surface | `bg-2` | `#131C33` |
| Inset / footer panel | `bg-inset` | `#0B1120` |
| Violet fill | `violet` | `#6D4FE3` |
| Violet accent text | `violet-bright` | `#8B7CFF` |
| Violet soft | `violet-soft` | `#A99BFF` |
| Light band / cards | `lavender` | `#E7E4FB` |
| Body text | `fg-soft` | `#B8BFD4` |
| Silver headings | `fg-silver` | `#C6CAD6` |
| Violet hairline | `line-violet` | `#4A3D8F` |
| Unresolved content | `placeholder` | `#FF00A8` |

One accent family only. Large section headings use `.heading-silver`, a brushed
top-to-bottom gradient, matching the comp.

**Typeface is a placeholder.** Plus Jakarta Sans is the closest freely
licensable match to the Figma letterforms. Confirm the real face from the Figma
text layer and swap it in `app/layout.tsx` only.

---

## Fonts

Headings **Space Grotesk**, body **Arial**, utility **JetBrains Mono**.

Space Grotesk and JetBrains Mono load through `next/font/google` in
`app/layout.tsx`. That self-hosts the files at build time and preloads them, so
there is **no request to Google at runtime** — do not also add a
`@import url('https://fonts.googleapis.com/...')`, it would re-download a font
that is already local and block rendering while it does.

### A note on Arial

Arial is **not** self-hosted here, deliberately. It is a Monotype-licensed
typeface; redistributing `.woff` copies of it from the server is a licensing
risk on a commercial site, and the packaged set was 3.6 MB.

`--font-arial` is a system stack instead:

```css
--font-arial: Arial, 'Liberation Sans', Helvetica, sans-serif;
```

Windows and macOS both ship Arial, so those visitors see the real thing with
zero download. Linux resolves to Liberation Sans, which is metric-identical.
Rendering is effectively unchanged and the page is 3.6 MB lighter.

If a genuinely self-hosted body face is wanted, **Arimo** (Google Fonts, open
licence, metric-compatible with Arial) is the drop-in — add it to the
`next/font` call in `layout.tsx` and point `--font-arial` at its variable.

## Brand assets

The lockup is **raster on purpose** — the chrome orbital badge cannot be
reproduced faithfully in vector.

```
public/brand/motus-ai-engine.png   lockup, 480×216, transparent   ← REPLACE
public/brand/mark-512.png          square mark, 512×512           ← REPLACE
app/icon.png                       favicon (copy of mark-512)
app/apple-icon.png                 iOS home screen (copy of mark-512)
```

Both current files are magenta-marked placeholders. To swap:

1. Export the lockup from Figma as **PNG with transparency at 3x** the largest
   rendered size — 480×216. Overwrite `public/brand/motus-ai-engine.png`.
2. Export the badge alone as a 512×512 PNG. Overwrite `mark-512.png`, then copy
   it over `app/icon.png` and `app/apple-icon.png`.
3. If the export's aspect ratio differs from 480×216, update `RATIO` in
   `components/logo.tsx`. That is the only code change needed.

**Export PNG, not WebP.** `next/image` negotiates AVIF/WebP per request from the
single PNG source. Handing it a pre-compressed WebP just costs quality.

Rendered sizes are set by the `variant` prop (`header` 44px, `marquee` 40px,
`footer` 64px). The header instance carries `priority` since it is the only one
in the initial viewport.

## Section backgrounds

`Section` layers, bottom to top: tone colour → optional image → CSS motif →
content.

```tsx
<Section pattern="dots">                                  // CSS only, no asset
<Section pattern="glow" bg={{ src: '/bg/x.png' }}>        // asset + motif
<Section tone="violet">                                   // flat
```

Motifs are pure CSS and ship zero bytes: `dots`, `grid`, `rings`, `glow`.
Reach for `bg` only when the art is specific enough that CSS can't express it.
Rules for those assets are in `public/bg/README.md` — short version: export PNG
at 2560px, keep opacity at or below ~0.35, decorative only.

Currently applied: home Solution `dots`, Ecosystem `rings`, Testimonials
`glow`; Features Core Modules `grid`, Comparison `glow`; Pricing Plans `grid`;
About Company Story `dots`.

## Structure

```
app/            18 routes — see app/sitemap.ts for the canonical list
components/     shared UI; client components marked 'use client'
content/        all copy and data, separated from markup
lib/seo.ts      one metadata builder so titles and OG tags never drift
```

Content lives in `content/` on purpose: a wording change is a one-file edit, and
if a CMS is ever added it swaps the data source without a rebuild.

### Scroll animation

The home page problem list uses **GSAP + ScrollTrigger** (`components/problem-list.tsx`).

The list is server-rendered fully visible; GSAP applies the dimmed resting state
on mount. If the script fails or is blocked, the visitor still reads four
problem statements instead of an empty violet panel. Do not move that resting
state into CSS.

`scrub: 0.6` ties progress to scroll position rather than firing once on entry,
so the reveal tracks the scroll and reverses on the way back up. Reduced-motion
users get the finished state with no movement, via `gsap.matchMedia`.

**Cost:** GSAP + ScrollTrigger adds roughly 45 kB gzipped to the home route
(first load went 111 kB → 158 kB). It is code-split, so no other page pays for
it. The existing `Reveal` component does IntersectionObserver reveals for free —
prefer that for anything that does not need scrubbing.

### Client components
Each for a real reason:
- `site-header.tsx` — mobile drawer state
- `pricing-estimator.tsx` — slider state
- `faq-accordion.tsx` — disclosure state
- `request-access-form.tsx` — form submission
- `code-rain.tsx` — canvas animation, `requestAnimationFrame` with cleanup
- `reveal.tsx` — IntersectionObserver
- `logo.tsx` — see the comment in the file; a bundler workaround, not a choice

The hero `engine-diagram.tsx` is **not** a client component. It is SVG plus CSS
keyframes, so it renders in the initial HTML, the product names are real
selectable text, and there is nothing to tear down on unmount.

All motion respects `prefers-reduced-motion`.

---

## Deployment

Vercel, **Pro plan**, in Motus Labs' own account.
The Hobby tier prohibits commercial use — this site does not qualify.

Environment variables (`.env.example`):
- `NEXT_PUBLIC_SITE_URL`
- `REQUEST_ACCESS_TO_EMAIL`
- `RESEND_API_KEY`

Without the last two the form validates and logs but delivers nothing. Set them
before launch or the leads go nowhere.

### Going fully static
If the Request Access form moves to Formspree / Web3Forms, delete
`app/api/request-access/route.ts`, repoint the `fetch` in the form component, and
uncomment `output: 'export'` in `next.config.mjs`.

---

## Open items — blocking launch

| # | Item | Where it bites |
|---|---|---|
| 1 | Domain confirmation for motusaiengine.com | `NEXT_PUBLIC_SITE_URL`, canonicals, sitemap |
| 2 | Request Access destination inbox | `app/api/request-access/route.ts` |
| 3 | ~~Lockup PNG~~ — supplied. Square mark 512×512 still a placeholder | favicon, apple-icon |
| 4 | §7 vs §11 — gated access or self-serve signup | `/login` exists or gets deleted |
| 5 | Login redirect destination / does the dashboard exist | `app/login/page.tsx` |
| 6 | Status page URL | `app/status/page.tsx` |
| 7 | Legal copy from counsel (4 pages) | `app/legal/*` |
| 8 | Testimonials, or approval to drop the section | home page |
| 9 | Registered address, security contact | footer, security page |
| 10 | Open Graph share image | `lib/seo.ts` |
| 11 | Analytics tool choice | not yet installed |

### Figma discrepancies to raise with the client

These are reproduced as drawn, not silently corrected:

1. **"Get Startedd"** — the primary header button is misspelled on every page.
2. **"Availableto everyone else."** — missing space in the ecosystem heading.
   Corrected in code; confirm.
3. **Eyebrow "Solution" appears three times** on the home page, including above
   a list that is entirely *problems*, not solutions. One of the two is wrong.
4. **"One engine. Every decision."** is used as the heading of two consecutive
   home-page sections.
5. **Comparison Callout** has row labels but every cell is empty.
6. **Add-Ons** lists "Dedicated environment" twice; the third card describes
   bespoke connectors, so it is probably meant to read "Custom integrations".
7. **Ecosystem logo row** shows two marks repeated for four products.
8. **Testimonials** are lorem with a stock headshot. Need real quotes or
   approval to drop the section.
9. **About** — Company Story, the stats heading, and all four stat labels are
   lorem. The figures (20+, 90%, 80%, 100+) also need confirming as real.
10. **Case Study** is entirely lorem, and is reachable only via a breadcrumb —
    it appears in no navigation. Confirm where it should be linked from.
11. **Nav has eight items plus a CTA.** It fits at 1280px and above; below that
    it switches to the drawer at the `xl` breakpoint. No Figma tablet comp
    exists, so that boundary is a decision, not a spec.

### The pricing maths does not work

The Figma numbers make this worse, not better.

Dispatch events: Starter is `$299` + `$2.00/1k` beyond 10,000. Growth is
`$1,499` + `$1.50/1k` beyond 100,000. Break-even sits at roughly **2,140,000
dispatch events per month**. At 100,000 events Starter costs about `$479`
against Growth's `$1,499`.

So the page presents an upgrade path that no customer at a realistic volume
should take. Either the Growth allowances need to be far larger, the overage
rates need to diverge much harder, or Growth needs to be sold on capability
(advanced routing, staging environment, SLA) rather than on cost. Flagged, not
silently fixed — these are the client's numbers to change.
