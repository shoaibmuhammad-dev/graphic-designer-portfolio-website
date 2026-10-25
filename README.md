# Khan Zadi — Portfolio

Minimal, editorial portfolio for a graphic designer. Next.js 15 (App Router), TypeScript (strict), Tailwind CSS 3, Motion (Framer Motion), Lenis, React Hook Form + Zod, Resend.

> Built to be edited from the `data/` folder. You should rarely need to touch components.

---

## 1. Prerequisites

- **Node.js 20.9 or newer** (Node 22 LTS recommended). Check with `node -v`.
- **A package manager**: npm (bundled with Node), pnpm or yarn. Examples below use npm.
- A free **Resend** account (for the contact form) and a **Vercel** account (for hosting).

## 2. Install, run, build

```bash
npm install            # install dependencies
cp .env.example .env.local   # create your local environment file, then edit it
npm run dev            # http://localhost:3000 (hot reload)

npm run typecheck      # TypeScript check
npm run lint           # ESLint
npm run format         # Prettier

npm run build          # production build (also statically generates every project page)
npm run start          # serve the production build on http://localhost:3000
```

## 3. Environment variables (`.env.local`)

| Variable | Required | What it does |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Full public URL, no trailing slash, e.g. `https://khanzadi.design`. Used for canonical URLs, sitemap, Open Graph and JSON-LD. |
| `RESEND_API_KEY` | Yes (production) | API key from Resend. Without it the form logs to the console in dev and returns a 503 in production. |
| `CONTACT_TO_EMAIL` | Yes | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | Yes | Sender, e.g. `Khan Zadi <hello@khanzadi.design>`. Must be on a domain verified in Resend. For testing use `Portfolio <onboarding@resend.dev>`. |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Optional | Google Search Console verification token (the `content` value of the meta tag). |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Enables Plausible analytics, e.g. `khanzadi.design`. Leave empty to disable. |

Never commit `.env.local` (it is already in `.gitignore`).

## 4. Project structure

```
app/                 routes: /, /work, /work/[slug], /contact, /api/contact, sitemap, robots, manifest, icons, OG images
components/
  ui/                buttons, split text, reveal, artwork, icons, small primitives
  layout/            navbar, footer, preloader, cursor, smooth scroll, WhatsApp button
  sections/          home page sections (Hero, Marquee, SelectedWork, About, ...)
  work/              project card, archive filter, gallery, lightbox, next-project
data/                ALL editable content (site, projects, services, skills, experience, testimonials, theme)
lib/                 helpers (schema, rate limit, JSON-LD, Lenis, utils)
types/               TypeScript interfaces
public/              images, CV file
```

## 5. Add or edit a project and its images

1. Open `data/projects.ts`.
2. Copy an existing object in the `projects` array and change `slug` (this becomes the URL `/work/your-slug`), `title`, `client`, `year`, `category`, `role`, `services`, `tools`, `summary`, `overview`, `challenge`, `solution`, `result`.
3. Set `featured: true` to show it in the home page "Selected work" grid (the first 6 featured projects are shown).
4. **Images**: every image is an object created with `img(alt, art, aspect, span, src)`.
   - Put your file in `public/images/projects/`, e.g. `public/images/projects/orbit-01.jpg`.
   - Pass its path as the last argument: `img('Orbit logo suite', art, 'wide', 'full', '/images/projects/orbit-01.jpg')`.
   - For the cover, add `src` inside `cover`: `cover: { ...cover, src: '/images/projects/orbit-cover.jpg' }` (or build it with `img(...)`).
   - `aspect` is `'landscape' | 'portrait' | 'square' | 'wide'`. `span` is `'full'` (both columns) or `'half'` (two-up row).
   - While `src` is empty, generated gradient artwork is shown, so the site never looks broken.
5. If you add a project, the archive, case study page, sitemap, JSON-LD and Open Graph image update automatically. No other file needs editing.

To use a CMS later (Sanity, Contentlayer), keep the `Project` type in `types/index.ts` and replace the exports in `data/projects.ts` with functions that fetch from the CMS.

## 6. Change colours, fonts and the accent colour

- **Colours**: edit `data/theme.ts`. It is the single source for the Tailwind config AND the generated OG/icon images. To change the accent, edit `accent.DEFAULT` (buttons, highlights), `accent.tint` (soft backgrounds), `accent.ink` (a darker shade for text on white, keep contrast high) and `accent.onAccent` (text placed on the accent colour: white for dark accents, near-black for light ones like lime `#D4FF3F` or lilac `#C8B6FF`).
  - Presets: electric periwinkle `#6C63FF` (current), soft lilac `#C8B6FF`, acid lime `#D4FF3F`, warm coral `#FF6B57`.
  - The placeholder artwork colours live in `data/projects.ts` and `data/site.ts` (`art: { from, to, shape }`) and are independent of the accent.
- **Fonts**: edit the three `next/font/google` imports at the top of `app/layout.tsx` (Space Grotesk for headings, Inter for body, JetBrains Mono for labels). Keep the `variable` names (`--font-heading`, `--font-body`, `--font-mono`). Alternatives: Syne or Unbounded for headings, DM Sans for body, Space Mono for labels.
- **Type sizes**: there are no custom size tokens. Sizes are standard Tailwind classes written directly in components (e.g. `text-5xl`, `text-[clamp(2.25rem,6.5vw,5.5rem)]`), so you can search and edit them in place.
- **Corner radius**: one token, `rounded-brand` (14px), set in `tailwind.config.ts`.

## 7. Replace the portrait, logo and CV

- **Portrait**: add `public/images/portrait.jpg` (4:5 ratio), then in `data/site.ts` set `portrait: { src: '/images/portrait.jpg', alt: '...', aspect: 'portrait', art: ... }`.
- **Logo / monogram**: the navbar logo is the `monogram` text in `data/site.ts` (default "KZ"). To use an image logo, replace the monogram `<span>` in `components/layout/Navbar.tsx` with a `next/image`. Replace the favicon by editing `app/icon.tsx` and `app/apple-icon.tsx` (or delete them and drop `icon.png`/`apple-icon.png` into `app/`).
- **PWA icons**: `app/manifest.ts` points to the generated 32px and 180px icons. For full installability, add 192px and 512px PNGs to `public/icons/` and list them in the manifest.
- **CV**: replace `public/cv/khan-zadi-cv.pdf` with the real file (keep the filename), or change `cvPath` in `data/site.ts`.

## 8. Change the WhatsApp number and contact email

Everything lives in `data/site.ts`:

```ts
email: 'hello@khanzadi.design',
whatsapp: { number: '923001234567', message: "Hi Khan, ..." },
```

`number` must be international format, digits only (no `+`, spaces or dashes). The floating button, the contact section button and the prefilled message all read from here. Also edit `socials`, `city`, `country`, `bio`, `facts`, `tagline`, and the `availability` badge (`open: false` hides it).

Note: the form sends to `CONTACT_TO_EMAIL`, which is separate from the display email above.

## 9. Set up Resend for the contact form

1. Create an account at https://resend.com and open **API Keys** > **Create API Key** (sending access). Copy it into `RESEND_API_KEY`.
2. **Testing**: keep `CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>`. Resend only delivers test emails to the address that owns your Resend account, so set `CONTACT_TO_EMAIL` to that address.
3. **Production**: in Resend open **Domains** > **Add Domain**, add `khanzadi.design`, and create the DNS records Resend shows (SPF, DKIM) at your domain provider. Once verified, set `CONTACT_FROM_EMAIL=Khan Zadi <hello@khanzadi.design>` and `CONTACT_TO_EMAIL` to the inbox that should receive enquiries.
4. Submit the form locally and check the inbox. Replies go straight to the visitor (the API sets `replyTo`).

How the form is protected: Zod validation on client and server, a hidden honeypot field (bots that fill it get a fake success), and an in-memory rate limit of 5 submissions per IP per 10 minutes (`lib/rate-limit.ts`). The in-memory limiter is per server instance; if you expect abuse, swap it for Upstash Ratelimit.

## 10. Deploy on Vercel and connect a custom domain

1. Push the project to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New > Project**, import the repo (framework auto-detected as Next.js).
3. Under **Environment Variables** add every variable from section 3 (set `NEXT_PUBLIC_SITE_URL` to your final domain, e.g. `https://khanzadi.design`).
4. Click **Deploy**.
5. **Custom domain**: Project > **Settings > Domains** > add `khanzadi.design` and `www.khanzadi.design`. Add the DNS records Vercel shows (an `A` record for the apex domain, a `CNAME` for `www`), or switch to Vercel nameservers. Pick one version as primary and let the other redirect.
6. After the domain is live, check that `NEXT_PUBLIC_SITE_URL` matches it exactly, then **redeploy** (public variables are baked in at build time).

## 11. Post-launch SEO checklist

- [ ] `NEXT_PUBLIC_SITE_URL` is the final domain and the site was redeployed.
- [ ] Visit `/sitemap.xml` and `/robots.txt` and confirm they list the right URLs.
- [ ] **Google Search Console**: add the property (Domain or URL prefix). For the URL-prefix method choose the HTML tag option and put the token in `NEXT_PUBLIC_GSC_VERIFICATION`, redeploy, then verify.
- [ ] Submit `https://your-domain/sitemap.xml` under **Sitemaps**.
- [ ] Request indexing for `/`, `/work` and your best case studies using **URL Inspection**.
- [ ] Validate structured data at https://search.google.com/test/rich-results and https://validator.schema.org (Person, WebSite, CreativeWork, BreadcrumbList).
- [ ] Share a project link in a chat app or at https://opengraph.xyz to confirm the Open Graph image.
- [ ] Replace placeholder alt text with specific descriptions of each real image.
- [ ] Link the site from Behance, Instagram, Dribbble and LinkedIn bios (the `sameAs` links in the JSON-LD should match your real profiles).
- [ ] **Analytics**: set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (privacy-friendly, no cookie banner) or add Google Analytics / Vercel Analytics.
- [ ] Add real keywords naturally to bio and project descriptions: "graphic designer in [city]", "freelance graphic designer", "branding and logo design", "social media design".

## 12. Run Lighthouse and fix common issues

1. Run a production build: `npm run build && npm run start`.
2. Open the site in Chrome **Incognito** (extensions skew results), open DevTools > **Lighthouse**, choose **Mobile**, tick all four categories, and run it. Or test the deployed URL at https://pagespeed.web.dev.
3. Test with a clean browser profile: the preloader appears on first visit only and delays the first paint of the hero by about 1.5 seconds. If Performance is below 90 in lab tests, this is the first thing to tune (shorten the timers in `components/layout/Preloader.tsx`, or skip it when `navigator.webdriver` is true).

Common fixes:

| Issue | Fix |
| --- | --- |
| Large images / slow LCP | Compress sources to under ~600 KB, use correct `sizes`, only the hero cover uses `priority`. |
| CLS (layout shift) | Every image sits in a fixed aspect-ratio box; keep that when you add content. |
| Contrast warnings | Keep text colours from `data/theme.ts`. For text on white use `text-ink`, `text-muted` or `text-accent-ink`, not `text-subtle` or the raw accent on light accents (lime, lilac). |
| Unused JavaScript | The lightbox, cursor, slider and form are already code-split; avoid adding heavy libraries. |
| Missing `alt` | Every image has `alt` in `data/*`; fill them in properly when you add real images. |
| Console errors from fonts | Check the network is available at build time (fonts are downloaded during `next build`). |

## 13. Common errors and fixes

| Error | Fix |
| --- | --- |
| `Module not found` / red import errors after pulling changes | Run `npm install` again. |
| `Error: You are using Node.js 18...` | Upgrade to Node 20.9+ (`nvm install 22 && nvm use 22`). |
| Contact form shows "temporarily unavailable" in production | `RESEND_API_KEY` is missing in Vercel. Add it and redeploy. |
| Resend error: domain not verified / `from` not allowed | Use `onboarding@resend.dev` for tests, or verify your domain and use an address on it. |
| Emails only arrive for one address | In Resend test mode you can only send to the account owner's email. Verify a domain for real use. |
| Canonical/OG URLs show `localhost:3000` | Set `NEXT_PUBLIC_SITE_URL` and **redeploy**. |
| New project 404s | Check the `slug` is unique, lowercase, with hyphens, and restart `npm run dev`. |
| `Hydration failed` warning | Usually a browser extension modifying the page; try Incognito. Do not use `Math.random()` or `Date.now()` in server-rendered markup. |
| Images don't change | Hard refresh; confirm the path starts with `/` and the file is under `public/`. |
| Smooth scroll feels off in an embedded preview | Lenis is skipped for reduced-motion users; test in a normal browser window. |
| Port 3000 busy | `npm run dev -- -p 3001`. |
| TypeScript error after editing data | Run `npm run typecheck`; the `Project` interface in `types/index.ts` shows required fields. |

## Notes on animation and accessibility

- Motion respects `prefers-reduced-motion`: Lenis and the preloader are skipped, transform animations are disabled globally (`MotionConfig reducedMotion="user"`), and the marquee/pulse CSS animations stop.
- The custom cursor only renders on devices with a mouse (`hover: hover` and `pointer: fine`).
- Only `transform`, `opacity` (and one `clip-path` reveal on project cards) are animated. The services list uses a CSS grid-row transition for its expand effect.
- Page transitions are a fade/slide on route change. (Exit animations are not supported by the App Router.)
- The optional sticky "stacked cards" effect for Selected Work was intentionally left out to keep the grid light on mobile.
# graphic-designer-portfolio-website
