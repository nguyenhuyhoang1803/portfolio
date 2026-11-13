# Nguyễn Huy Hoàng · Portfolio

A personal developer portfolio featuring an introduction, the InternBridge graduation thesis, and contact links. The site uses React, TypeScript, Vite, Tailwind CSS, Motion, and Lucide.

It includes responsive navigation, a scroll progress indicator, motion that respects reduced-motion preferences, and fallbacks for optional local media.

## Run locally

Use Node.js 24.

```sh
npm ci
npm run dev
```

## Production build

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Vite builds the static site to `dist/`. The site uses section anchors and serves from the domain root.

## Update the portfolio

Edit [the portfolio configuration](src/data/portfolio.ts) to update copy, contact links, and project details. Media files are optional.

| Asset | Path |
| --- | --- |
| Portrait | `public/media/profile/portrait.webp` |
| Intro video | `public/media/profile/intro.mp4` |
| Intro video poster | `public/media/profile/intro-poster.webp` |
| InternBridge cover | `public/media/projects/internbridge-cover.webp` |
| InternBridge screenshots | `public/media/projects/internbridge-01.webp`, `public/media/projects/internbridge-02.webp` |

Rebuild after changing production media. Local CV copies are excluded from Git.
