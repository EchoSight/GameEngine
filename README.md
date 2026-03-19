# Tactical Slate Static Site

Tactical Slate is now a fully static GitHub Pages-compatible campaign toolkit built with plain HTML, CSS, and JavaScript.

## What changed

- React, TypeScript, Vite, Tailwind build tooling, social metadata, and generator-specific integrations were removed.
- The app now runs directly in the browser from static files.
- All user data still persists locally with `localStorage`.
- Routing now uses hash-based URLs (`#/`, `#/create`, `#/maps/...`) so the site works correctly from a GitHub Pages repository subpath without redirects or server rewrites.

## Run locally

You do **not** need Node to run the site.

### Option 1: Open directly
Open `index.html` in a browser.

### Option 2: Use a tiny static server
```bash
python3 -m http.server 8080
```
Then visit:
```text
http://localhost:8080/
```

## Deploy to GitHub Pages

1. Commit the repository contents to the branch you want to publish.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source:** `Deploy from a branch`
   - **Branch:** your publishing branch (for example `main`)
   - **Folder:** `/ (root)`
4. Save the settings.
5. Wait for GitHub Pages to publish the site.
6. Open the published URL. The app will load from the repository subpath and use hash routing for internal navigation.

Example published paths:
- Home: `https://<user>.github.io/<repo>/#/`
- Create character: `https://<user>.github.io/<repo>/#/create`
- Resources: `https://<user>.github.io/<repo>/#/resources`
- Maps: `https://<user>.github.io/<repo>/#/maps`

## Static file structure

- `index.html` — application shell
- `styles/site.css` — complete styling
- `scripts/app.js` — routing, rendering, state, storage, dice, resources, and map tooling
- `public/favicon.svg` — favicon

## Data storage

The app stores all gameplay data in `localStorage`, including:

- characters
- resources
- uploaded maps
- map tokens
- obstacles
- active role selection
- dice history for the current browser session state

Because everything is browser-only, data is scoped to the user and browser profile currently in use.
