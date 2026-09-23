# SAFI — Developer Portfolio

A single-page React portfolio built with Vite + Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs static files to `dist/`. Preview the production build with:

```bash
npm run preview
```

## Deploy

**Vercel**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite (auto-detected). Click Deploy.

**Netlify**
1. Push to GitHub.
2. Netlify → Add new site → Import from Git.
3. Build command: `npm run build`, publish directory: `dist`.

**GitHub Pages**
1. `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. Set `base: '/your-repo-name/'` in `vite.config.js`.
4. `npm run build && npm run deploy`

## Before you publish

- Replace the placeholder email (`safi@example.com`) in `src/App.jsx`.
- Replace the placeholder GitHub/LinkedIn links (currently `#`).
- Swap "SAFI" for your full name if you'd like.
