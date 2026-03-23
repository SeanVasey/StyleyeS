# CLAUDE.md — StyleyeS

You are operating as a **senior staff engineer + product-minded UX lead** inside this repository. Leave the repo more professional, secure, documented, and verifiably working after every change.

-----

## Project Overview

StyleyeS is a Progressive Web App (PWA) for vivid prompt engineering — helping users craft rich, descriptive prompts optimized for AI image generation models. Built by VASEY/AI as a zero-dependency vanilla JavaScript application.

**Deployed to:** GitHub Pages and Vercel (automated via GitHub Actions).

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
- **Architecture:** Modular vanilla JS with separation of concerns (no framework, no build step)
- **PWA:** Service Worker (`sw.js`), Web App Manifest (`manifest.json`), localStorage persistence
- **Fonts:** Google Fonts (Outfit + JetBrains Mono)
- **Dependencies:** None at runtime. Node.js used only for validation (`npm test`).

## Commands

```bash
# Run validation (version consistency, required files)
npm test

# No build step needed — open index.html directly or serve statically
```

-----

## Guiding Principles

- **Best-practices first.** Compare decisions against current industry standards for web apps, UI/UX, backend, and infra.
- **Ship-ready at all times.** Every commit leaves the repo deployable. No broken builds on `main`.
- **Boring is beautiful.** Reliable over clever. Document tradeoffs.
- **Verify before you push.** Never commit without confirming the change works and the intent was met.

-----

## Standards

### Accessibility

WCAG-minded, keyboard-first, semantic HTML. ARIA only when native semantics fall short.

Existing: semantic HTML, ARIA labels, `focus-visible` states, `prefers-reduced-motion` support.

### Performance

Measure first. Avoid regressions. Optimize critical rendering paths.

### Security

**Input & Data:** Validate all user inputs. `escapeHtml()` and `sanitizeAttr()` used for all dynamic HTML. Validate uploads by file signature (magic bytes), not extension. Never commit secrets — `.env.example` + `.gitignore`.

**Client-Side Hardening:** CSP meta tag in `index.html`. Input validation on all localStorage loads/imports. No hardcoded credentials, unsafe evals, or overly permissive CORS.

**Supply Chain:** Verify packages for vulnerabilities before installing. Run `npm audit` (or equivalent) in CI. Zero runtime dependencies — keep it that way.

**Production Hardening:** Strip `console.log` before production. DDoS protection via Cloudflare or Vercel edge. Lock storage access per-user. Test/prod environments fully isolated.

### UX

Responsive. Polished empty/loading/error states. Consistent patterns. Sensible copy.

-----

## Project Structure

```
StyleyeS/
├── CLAUDE.md               # Claude Code project context
├── README.md / LICENSE / CHANGELOG.md / SECURITY.md
├── .editorconfig / .gitignore
├── index.html              # Single-page application entry point
├── sw.js                   # Service worker for offline support
├── manifest.json           # PWA manifest
├── package.json            # Validation tooling and metadata
│
├── .github/workflows/
│   ├── ci.yml              # CI — validation on push/PR
│   ├── deploy-pages.yml    # Deploy to GitHub Pages on push to main
│   └── deploy-vercel.yml   # Deploy to Vercel (preview on PR, production on main)
│
├── css/
│   ├── variables.css       # Design tokens (colors, spacing, typography)
│   ├── base.css            # Reset, typography, form elements
│   ├── components.css      # UI components, cards, buttons (~2100 lines)
│   ├── layout.css          # Page structure, responsive grid
│   ├── animations.css      # Keyframes, motion effects
│   └── responsive.css      # Mobile landscape overrides
│
├── js/
│   ├── config.js           # Model configs, aspect ratios, constants (loaded first)
│   ├── data.js             # Style & control definitions (70+ styles, 13 controls)
│   ├── state.js            # State management & localStorage persistence
│   ├── ui.js               # DOM rendering & updates (~1500 lines, largest module)
│   ├── handlers.js         # Event binding & interactions
│   └── app.js              # Application initialization (loaded last)
│
├── icons/
│   ├── models/             # Model-specific SVG icons (white-line design)
│   ├── categories/         # Category filter SVG icons
│   └── ui/                 # UI action SVG icons
│
├── scripts/
│   └── validate.js         # Repository validation checks
│
├── tasks/
│   ├── todo.md             # Active task plan with checkable items
│   └── lessons.md          # Accumulated patterns from corrections and mistakes
│
├── docs/
│   └── MANIFEST.md         # Artifact inventory
│
└── images/
    └── styleyes-hero-v2.png  # Repository hero image
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

-----

## Verification

Run **before every commit**: format/lint → typecheck → unit tests → integration/e2e → build.

For this project: `npm test` (version consistency, required files).

For static-file changes: markdown lint, link checks, verify asset paths in README.

If tests don't exist, add smoke tests. If tooling isn't available, document what should run and add CI config.

-----

## Commits

Conventional Commits (`feat:` `fix:` `chore:` `docs:` `refactor:` `test:`). Every commit includes what/why/how-verified. Update docs in the same PR when changes affect them. Bug fixes include a regression test.

-----

## CI / CD

### GitHub Actions (on every PR + `main` push)

| Workflow | File | Trigger | Purpose |
|----------|------|---------|---------|
| CI | `ci.yml` | Push to `main`, all PRs | Runs `npm test` validation |
| GitHub Pages | `deploy-pages.yml` | Push to `main`, manual | Validates then deploys static files via `actions/deploy-pages@v4` |
| Vercel | `deploy-vercel.yml` | Push to `main`, all PRs | Preview deploys on PRs, production deploy on `main` |

**Must pass before merge:** `npm test` validation (version sync, required files).

If CI is missing, create it with the first meaningful change.

### Deployment

**Vercel (primary):** `vercel.json` for custom routing/headers/redirects. Preview deploys on PRs, production on `main`. Requires secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

**GitHub Pages:** Actions workflow via `actions/deploy-pages`. Enable Pages in repo settings (Source: GitHub Actions).

**Pre-deploy gate:** CI green. `npm test` passes. No unresolved `TODO`/`FIXME` in deployed files.

-----

## README.md Spec

The README is the product's storefront. Treat it like a production release page.

**Header block:**

- App icon / logo (centered, with alt text)
- Product name + one-line description
- Badge row: build status, version/release, license, deploy status (use shields.io)

**Body:**

- Screenshot or screen capture preview (hero image showing the app in use, with alt text)
- Features (concise list)
- Tech stack
- Live demo link (when deployed)
- Setup / Install / Run / Build / Test commands
- Environment variables (reference `.env.example`)
- Architecture overview (when non-trivial)
- Deployment notes
- Usage examples
- Contributing + License links

-----

## Required Repo Files

- `LICENSE` (Apache 2.0)
- `CHANGELOG.md` — [Keep a Changelog](https://keepachangelog.com/) style. Upgrade notes for breaking changes.
- `SECURITY.md` — How to report vulnerabilities.
- `.editorconfig`, `.gitignore`
- `CODE_OF_CONDUCT.md`
- Lockfiles current. Asset licenses documented when mixed.

-----

## Key Conventions

- **Indentation:** 2 spaces, LF line endings, UTF-8 (see `.editorconfig`)
- **No build process:** All files served as-is. No transpilation, no bundling.
- **Frozen configs:** `StyleyeSConfig` and `StyleyeSData` are `Object.freeze()`-d at load time to prevent runtime mutation.
- **Icon system:** SVG icons loaded via `fetch()`, cached in `StyleyeSUI.iconCache`, injected as innerHTML. Three icon types: models, categories, UI.
- **State persistence:** All state saved to `localStorage` under key `styleyes_v1_state`. Validated on load to prevent injection.
- **Event delegation:** Grid/carousel clicks, stack removes, and category buttons use event delegation with `closest()`.

## Version Management

Version string appears in multiple files and must stay in sync:
- `package.json` → `version`
- `js/config.js` → `StyleyeSConfig.VERSION`
- `index.html` → title and footer
- `README.md` → badge/header
- `sw.js` → `CACHE_NAME` (includes version for cache busting)

The `npm test` validation script checks version consistency across these files.

## Important Patterns

- **`renderAll()` is async** — it preloads icons before rendering. Always `await` it.
- **Toast notifications** use a timer reference (`_toastTimer`) to prevent stacking.
- **Carousel touch support** includes momentum scrolling with velocity tracking.
- **Aspect ratio slider** uses magnetic snapping with haptic feedback.
- **White Balance controls** are mutually exclusive — adding one removes any existing WB control from the stack.
- **Max limits:** 5 styles, 3 controls, 50 history entries (enforced in `StyleyeSConfig`).

-----

## Workflow Orchestration

**Plan mode:** Default to planning before execution on non-trivial tasks. For complex work, write the plan to a file first.

**Subagents:** For complex multi-file tasks, delegate via Task tool. Lead agent coordinates; subagents inherit this CLAUDE.md.

**Self-improvement:** Append lessons to `tasks/lessons.md` after non-trivial debugging. Track deferred work in `tasks/todo.md` with issue links. Review lessons at session start.

**Autonomous bug fixing:** When given a bug report, just fix it. Point at logs, errors, failing tests — then resolve them. Zero context switching required from the user.

-----

## Quality Gates

- Keep dependencies minimal. This project intentionally has zero runtime dependencies.
- Prefer consistent patterns over cleverness.
- Every meaningful change gets a CHANGELOG entry.
- A `tasks/lessons.md` that grows smarter with every session.
