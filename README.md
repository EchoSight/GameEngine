# Adventurista Toolbelt

Adventurista Toolbelt is a static-ready React + Vite app for running tabletop RPG sessions in the browser. It keeps all campaign data in `localStorage`, so it can be hosted as plain static files on GitHub Pages without requiring a backend.

## Features

- Character creation and local roster management.
- Character detail views with equipment, hit points, and combat stats.
- Dice roller utilities.
- Campaign resources reference library.
- Map uploads stored locally in the browser.
- DM/player mode switching persisted in `localStorage`.

## Local development

```sh
npm install
npm run dev
```

This project now uses plain JavaScript source files and standard `.js` config files throughout the repo.

## Production build

```sh
npm run build
npm run preview
```

The app uses hash-based routing and a relative Vite base path, so the generated `dist/` folder can be deployed directly to GitHub Pages or any other static host.

## Deploying to GitHub Pages

1. Build the project with `npm run build`.
2. Publish the contents of `dist/` to your GitHub Pages branch or artifact.
3. Enable GitHub Pages for that branch in your repository settings.

Because the app stores its data in the browser, each user keeps their own local characters, maps, and resources on their device.
