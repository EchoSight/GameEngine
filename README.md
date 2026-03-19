# Adventurista Toolbelt

Adventurista Toolbelt is now a no-build static React app that can be hosted directly on GitHub Pages or any other static file host. All campaign data stays in `localStorage`, so no backend is required.

## Features

- Character creation and local roster management.
- Character detail views with equipment, hit points, and combat stats.
- Dice roller utilities.
- Campaign resources reference library.
- Map uploads stored locally in the browser.
- DM/player mode switching persisted in `localStorage`.

## Local preview

You do not need Vite or any bundler. Serve the repository root with any static file server, for example:

```sh
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

## GitHub Pages deployment

1. Push the repository contents as-is.
2. Configure GitHub Pages to serve from the branch/folder that contains `index.html`.
3. Visit the published site URL.

The app loads its JavaScript modules directly in the browser and uses CDN-hosted ESM packages plus Tailwind's browser runtime, so there is no build step to run before deploying.
