# Images

Drop real images here and reference them from `data/projects.ts` / `data/site.ts`.

- `public/images/portrait.jpg`            -> set `portrait.src` in data/site.ts (4:5 ratio, ~1600px tall)
- `public/images/projects/<name>.jpg`     -> set `src: '/images/projects/<name>.jpg'` on any project image

Recommended: JPG/WebP/PNG, 2000px on the long edge, under 600 KB. Next.js converts to AVIF/WebP automatically.
