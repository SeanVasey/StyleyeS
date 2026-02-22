# CLAUDE.md — StyleyeS

## Project Overview

StyleyeS is a Progressive Web App (PWA) for vivid prompt engineering — helping users craft rich, descriptive prompts optimized for AI image generation models. Built by VASEY/AI as a zero-dependency vanilla JavaScript application.

**Deployed to:** GitHub Pages and Vercel (automated via GitHub Actions).

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architecture:** Modular vanilla JS with separation of concerns (no framework, no build step)
- **PWA:** Service Worker (`sw.js`), Web App Manifest (`manifest.json`), localStorage persistence
- **Fonts:** Google Fonts (Outfit + JetBrains Mono)
- **Dependencies:** None at runtime. Node.js used only for validation (`npm test`).

## Project Structure

```
StyleyeS/
├── index.html              # Single-page application entry point
├── sw.js                   # Service worker for offline support
├── manifest.json           # PWA manifest
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   ├── base.css            # Reset, typography, form elements
│   ├── components.css      # UI components, cards, buttons (~2100 lines)
│   ├── layout.css          # Page structure, responsive grid
│   ├── animations.css      # Keyframes, motion effects
│   └── responsive.css      # Mobile landscape overrides
├── js/
│   ├── config.js           # Model configs, aspect ratios, constants (loaded first)
│   ├── data.js             # Style & control definitions (70+ styles, 13 controls)
│   ├── state.js            # State management & localStorage persistence
│   ├── ui.js               # DOM rendering & updates (~1500 lines, largest module)
│   ├── handlers.js         # Event binding & interactions
│   └── app.js              # Application initialization (loaded last)
├── icons/
│   ├── models/             # Model-specific SVG icons (white-line design)
│   ├── categories/         # Category filter SVG icons
│   └── ui/                 # UI action SVG icons
├── scripts/
│   └── validate.js         # Repository validation checks
└── .github/workflows/
    ├── ci.yml              # CI — validation on push/PR
    ├── deploy-pages.yml    # Deploy to GitHub Pages on push to main
    └── deploy-vercel.yml   # Deploy to Vercel (preview on PR, production on main)
```

## Commands

```bash
# Run validation (version consistency, required files)
npm test

# No build step needed — open index.html directly or serve statically
```

## Architecture & Data Flow

```
User Input → Handlers (event listeners)
           ↓
         State (state.js) ← localStorage
           ↓
         UI (ui.js) ← renders to DOM
           ↓
         Output (prompt generation)
```

**Script load order matters** (no module bundler):
`config.js` → `data.js` → `state.js` → `ui.js` → `handlers.js` → `app.js`

Each module is a global object (`StyleyeSConfig`, `StyleyeSData`, `StyleyeSState`, `StyleyeSUI`, `StyleyeSHandlers`, `StyleyeS`).

## Key Conventions

- **Indentation:** 2 spaces, LF line endings, UTF-8 (see `.editorconfig`)
- **No build process:** All files served as-is. No transpilation, no bundling.
- **Frozen configs:** `StyleyeSConfig` and `StyleyeSData` are `Object.freeze()`-d at load time to prevent runtime mutation.
- **Icon system:** SVG icons are loaded via `fetch()`, cached in `StyleyeSUI.iconCache`, and injected as innerHTML. Three icon types with separate base paths: models, categories, UI.
- **State persistence:** All state saved to `localStorage` under key `styleyes_v1_state`. Validated on load to prevent injection.
- **Security:** CSP meta tag in index.html, input validation on all localStorage loads/imports, `escapeHtml()` and `sanitizeAttr()` used for all dynamic HTML.
- **Event delegation:** Grid/carousel clicks, stack removes, and category buttons use event delegation with `closest()` for robust handling of nested elements.
- **Accessibility:** Semantic HTML, ARIA labels, `focus-visible` states, `prefers-reduced-motion` support.

## Version Management

Version string appears in multiple files and must stay in sync:
- `package.json` → `version`
- `js/config.js` → `StyleyeSConfig.VERSION`
- `index.html` → title and footer
- `README.md` → badge/header
- `sw.js` → `CACHE_NAME` (includes version for cache busting)

The `npm test` validation script checks version consistency across these files.

## CI/CD Workflows

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| CI | `ci.yml` | Push to `main`, all PRs | Runs `npm test` validation |
| GitHub Pages | `deploy-pages.yml` | Push to `main`, manual | Validates then deploys static files to GitHub Pages |
| Vercel | `deploy-vercel.yml` | Push to `main`, all PRs | Preview deploys on PRs, production deploy on `main` |

**Vercel secrets required** (set in GitHub repo settings):
- `VERCEL_TOKEN` — Vercel API token
- `VERCEL_ORG_ID` — Vercel organization/team ID
- `VERCEL_PROJECT_ID` — Vercel project ID

All deployment workflows run validation (`npm test`) before deploying.

## Important Patterns

- **`renderAll()` is async** — it preloads icons before rendering. Always `await` it.
- **Toast notifications** use a timer reference (`_toastTimer`) to prevent stacking.
- **Carousel touch support** includes momentum scrolling with velocity tracking.
- **Aspect ratio slider** uses magnetic snapping with haptic feedback.
- **White Balance controls** are mutually exclusive — adding one removes any existing WB control from the stack.
- **Max limits:** 5 styles, 3 controls, 50 history entries (enforced in `StyleyeSConfig`).
