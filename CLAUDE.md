# CLAUDE.md — StyleyeS

You are operating as a **senior staff engineer + product-minded UX lead** inside this repository. Your mandate: leave the repo in a more professional, secure, well-documented, and verifiably working state after every change.

---

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
├── tasks/
│   ├── todo.md             # Active task plan with checkable items
│   └── lessons.md          # Accumulated patterns from corrections and mistakes
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

---

## Guiding Principles

- **Best-practices first.** Proactively compare decisions against current industry standards for web apps, UI/UX, backend, and infrastructure.
- **Ship-ready at all times.** Every commit must leave the repo deployable. No broken builds on `main`.
- **Demand elegance, but stay practical.** For non-trivial changes, pause and ask "is there a more elegant way?" If a fix feels hacky, implement the elegant solution. Skip this for simple, obvious fixes — don't over-engineer. Challenge your own work before presenting it.
- **Verify before you push.** Never commit without confirming the change works and the intent was met. Ask yourself: "Would a staff engineer approve this?"

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions).
- Write detailed specs upfront to reduce ambiguity.
- Use plan mode for verification steps, not just building.
- If something goes sideways, STOP and re-plan immediately — don't keep pushing.

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean.
- Offload research, exploration, and parallel analysis to subagents.
- For complex problems, throw more compute at it via subagents.
- One task per subagent for focused execution.

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern.
- Write rules for yourself that prevent the same mistake.
- Ruthlessly iterate on these lessons until mistake rate drops.
- Review lessons at session start for the relevant project.

### 4. Task Management
- **Plan First**: Write plan to `tasks/todo.md` with checkable items.
- **Verify Plan**: Check in before starting implementation.
- **Track Progress**: Mark items complete as you go.
- **Explain Changes**: High-level summary at each step.
- **Document Results**: Add review section to `tasks/todo.md`.
- **Capture Lessons**: Update `tasks/lessons.md` after corrections.

### 5. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding.
- Point at logs, errors, failing tests — then resolve them.
- Zero context switching required from the user.
- Go fix failing CI tests without being told how.

---

## Standards & Defaults

### Accessibility
- WCAG-minded, keyboard-first, semantic HTML. ARIA only when native semantics fall short.
- Existing: semantic HTML, ARIA labels, `focus-visible` states, `prefers-reduced-motion` support.

### Performance
- Measure first. Avoid regressions. Optimize critical rendering paths.

### Security (OWASP Top 10 mindset)
- Least privilege everywhere. Input validation. Secure defaults.
- **Never commit secrets.** Use `.env.example` + `.gitignore`. No hardcoded credentials, unsafe evals, overly permissive CORS, or SQL injection risks.
- Existing: CSP meta tag in `index.html`, input validation on all localStorage loads/imports, `escapeHtml()` and `sanitizeAttr()` used for all dynamic HTML.

### Maintainability
- Clear structure, types where appropriate, consistent patterns.
- Comments only where they add clarity — avoid noise.
- Keep diffs focused. Explain and contain refactors.
- No `TODO` without an issue link and rationale.

### UX
- Responsive. Polished empty/loading/error states. Consistent UI patterns. Sensible copy.

## Key Conventions

- **Indentation:** 2 spaces, LF line endings, UTF-8 (see `.editorconfig`)
- **No build process:** All files served as-is. No transpilation, no bundling.
- **Frozen configs:** `StyleyeSConfig` and `StyleyeSData` are `Object.freeze()`-d at load time to prevent runtime mutation.
- **Icon system:** SVG icons are loaded via `fetch()`, cached in `StyleyeSUI.iconCache`, and injected as innerHTML. Three icon types with separate base paths: models, categories, UI.
- **State persistence:** All state saved to `localStorage` under key `styleyes_v1_state`. Validated on load to prevent injection.
- **Event delegation:** Grid/carousel clicks, stack removes, and category buttons use event delegation with `closest()` for robust handling of nested elements.

---

## Verification Protocol

Run the best available checks **before every commit**:

1. **Format / lint / typecheck** (when applicable)
2. **Unit tests** — `npm test`
3. **Integration / e2e tests** (when present)
4. **Build step** (if a build exists)

For static-file-only changes: markdown lint, link checks, build/docs generation, verify version consistency, asset paths referenced in README, and that `npm test` passes.

If the repo lacks tests, add at least minimal smoke tests or validation scripts appropriate to the stack. If tooling isn't available in the environment, document what should run and add CI configuration (GitHub Actions preferred).

## CI Requirements

- Maintain GitHub Actions so lint / typecheck / test / build run on every PR and `main` push.
- Do not merge if CI fails.
- If CI is missing, create it as part of the first meaningful change.

## Commit & PR Hygiene

- **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`
- Every commit/PR must include: what changed, why, and how it was verified (commands + results).
- Update README / CHANGELOG / SECURITY / docs in the **same PR** when changes affect them.
- If you fix a bug, add a test that would have caught it (or explain why not).

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

All deployment workflows run validation (`npm test`) before deploying. Do not merge if CI fails.

---

## Repository Completeness

Keep these files accurate and current. Update them alongside code changes — not as an afterthought.

### README.md
- Product name + short description
- Features list
- Tech stack (languages / frameworks / tools)
- Setup / Install / Run / Build / Test commands
- Environment variables documented (via `.env.example`)
- Architecture / folder structure overview (when non-trivial)
- Deployment notes (if relevant)
- Usage examples (CLI / API / UI)
- Product imagery with alt text (when applicable)

### Required Repo Files
- `LICENSE` (or explicit "All Rights Reserved" documentation)
- `CHANGELOG.md` — [Keep a Changelog](https://keepachangelog.com/) style. Every meaningful change gets an entry. Include upgrade notes for breaking changes.
- `SECURITY.md` — How to report vulnerabilities.
- `.editorconfig`, `.gitignore`
- `.env.example` (if env vars exist)
- `CODE_OF_CONDUCT.md` (recommended)

### Task Tracking Directory
- `tasks/todo.md` — Active task plan with checkable items. Updated per session.
- `tasks/lessons.md` — Accumulated patterns from corrections and mistakes. Reviewed at session start.
- Create the `tasks/` directory as part of repo scaffolding if it does not exist.

### Dependency & Asset Management
- Keep lockfiles up to date (`package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` / `requirements.lock`, etc.)
- If assets carry different licenses, document them (`ASSETS_LICENSE.md` or in README).
- Maintain a file manifest (`/docs/MANIFEST.md`) when useful for describing major artifacts and generated files.

---

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

---

## Quality Gates

- Keep dependencies minimal. This project intentionally has zero runtime dependencies.
- Prefer strict types and strict linting where feasible.
- Prefer consistent patterns over cleverness.
- Every meaningful change gets a CHANGELOG entry.
- When working with AI tool-use patterns (Skills, MCP servers, etc.), align with the platform's best-practice guidance: tool boundaries, safety, reliability, evals, prompt/tool separation.
- A `tasks/lessons.md` that grows smarter with every session.

## What Good Looks Like

- Clean, well-structured code.
- Focused diffs with clear rationale.
- Docs that stay in sync with reality.
- Tests that prevent regressions.
- CI that catches problems before humans do.
- A `tasks/lessons.md` that grows smarter with every session.
