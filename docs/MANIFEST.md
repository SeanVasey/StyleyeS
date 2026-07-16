# StyleyeS Artifact Manifest

This inventory highlights the primary artifacts shipped with the project.

## Core Application
- `index.html` — Main application shell and markup.
- `css/` — Styling layers (tokens, base styles, components, layout, animations, responsive overrides).
- `js/` — Application logic (config, data, state, UI rendering, handlers, app bootstrap).
- `images/` — Product imagery for documentation and marketing.
- `styleyes-icon-ios.svg` — Branded app tile used for the favicon and iOS/PWA "Add to Home Screen" icon.
- `icons/` — PWA/favicon raster icons (rendered from the branded tile), the transparent in-app logo `StyleyeS_icon_optimized.svg`, plus model-specific SVG icons (`icons/models/`).
- `manifest.json` — Progressive Web App manifest.
- `sw.js` — Service worker for offline caching.

## Documentation & Governance
- `README.md` — Product overview, setup, usage, and project structure.
- `CHANGELOG.md` — Release history (Keep a Changelog format).
- `SECURITY.md` — Vulnerability reporting instructions.
- `SECURITY_AUDIT.md` — Security audit notes.
- `LICENSE` — Apache 2.0 license.
- `CODE_OF_CONDUCT.md` — Community guidelines.

## Tooling
- `package.json` — Validation scripts and metadata.
- `scripts/validate.js` — Consistency checks for versions and required files.
- `.github/workflows/ci.yml` — Continuous integration workflow.
