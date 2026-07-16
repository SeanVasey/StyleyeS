# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.2.2] - 2026-07-16

### Fixed
- **Home-screen / favicon icons now match the updated tile.** The `styleyes-icon-ios.svg` source was updated to a full-bleed border-plate design (opaque edge-to-edge, so iOS's own squircle mask never lets light/dark mode show through), but the raster PNGs were still rendered from the previous tile. Re-rendered the complete raster set — 16/32 px favicons, 72–512 px PWA icons (`any`), 152/167/180 px `apple-touch-icon`s, and 192/512 px maskable icons — from the current SVG so the installed app, browser tab, and Add-to-Home-Screen icons all reflect the new branding.
- Bumped service worker `CACHE_NAME` to `styleyes-v2.2.2` so returning users and installed PWAs re-fetch the regenerated icons instead of serving stale cached copies.

### Notes
- The in-app header logo continues to use the transparent `StyleyeS_icon_optimized.svg`, which remains the preferred asset wherever a transparent background is ideal.

## [2.2.1] - 2026-07-16

### Added
- **Branded iOS / PWA app icon**: New `styleyes-icon-ios.svg` — an opaque, rounded "squircle" tile — is now the favicon and the iOS/Android "Add to Home Screen" icon, so the installed app shows the proper StyleyeS branding on the home screen.
- Rendered a full raster icon set from the new tile: 16/32 px favicons, 152/167/180 px `apple-touch-icon`s (opaque), 192/384/512 px PWA icons (`any`), and 192/512 px full-bleed maskable icons for Android adaptive shapes.

### Changed
- `index.html`: favicon now references the branded SVG tile with 16/32 px PNG fallbacks, and declares sized `apple-touch-icon` links (152/167/180) for iOS.
- `manifest.json`: replaced the single SVG entry with a proper icon array — separate `any` (SVG + 192/512 PNG) and `maskable` (192/512 PNG) purposes so Android no longer masks a transparent icon; shortcut icons now use a sized PNG.
- The in-app header logo continues to use the transparent `StyleyeS_icon_optimized.svg`, which remains the preferred asset wherever a transparent background is ideal.
- Bumped service worker `CACHE_NAME` to `styleyes-v2.2.1` so returning users receive the updated icons.

## [2.2.0] - 2026-07-12

### Added
- **Subject Persistence**: The subject text now survives page reloads — it is saved to localStorage (length-capped at 2,000 characters, with a matching `maxLength` on the input so nothing is silently truncated) and included in Export/Import backups.
- **Copy Keyboard Shortcut**: Press `Ctrl+Enter` (or `Cmd+Enter` on macOS) anywhere to copy the generated prompt.
- **Copy Button Feedback**: The Copy button briefly turns green and reads "Copied ✓" after a successful copy.
- Concurrency controls on Vercel deployment workflow to prevent overlapping preview/production deploys.
- `vercel.json` with explicit static site configuration and PWA-safe headers for `sw.js` and `manifest.json`.
- Created `tasks/` directory with `todo.md` and `lessons.md` for session-based task tracking and self-improvement, as specified by CLAUDE.md protocol.
- README: Added live demo link, zero-dependencies badge, and reordered badges to lead with CI/deploy status.

### Improved
- **Accessibility — Pinch Zoom**: Removed `maximum-scale=1.0, user-scalable=no` from the viewport meta tag so users can zoom the page (WCAG 1.4.4 Resize Text).
- **Accessibility — Live Toasts**: Toast notifications are now announced to screen readers via `role="status"` and `aria-live="polite"`.
- **Accessibility — Labels**: Added `aria-label`s to the image-remove and history-close icon buttons.
- Recipe Stack counter now derives its maximum from `StyleyeSConfig` limits instead of a hardcoded "/ 8".

### Fixed
- Updated the header brand icon to use the new `StyleyeS_icon_optimized.svg` asset so the top-of-page logo now matches the latest icon update.
- Hardened Vercel deployment workflow conditions to skip deploy jobs when required Vercel secrets are unavailable, preventing false-fail CI runs on PRs.
- Fixed script injection vulnerability in Vercel workflow — secrets are now passed via environment variables instead of direct `${{ }}` interpolation in shell commands.

### Changed
- Replaced app favicon and manifest icon references with the new `StyleyeS_icon_optimized.svg` asset.
- Updated PWA shortcut icons to use the optimized SVG icon for consistency across install surfaces.
- Restructured `CLAUDE.md` with streamlined standards (security hardening, supply chain, production hardening), consolidated workflow orchestration, and updated README spec requirements.
- Updated `SECURITY.md` supported versions table to reflect current release line (2.1.x, 2.0.x).

## [2.1.1] - 2026-01-14
### Fixed
- **Carousel Performance**: Resolved sluggish scrolling and choppy interactions in style card carousels, especially on mobile devices.
- **Tab Icon Alignment**: Fixed icon and text alignment in "Art Styles" and "Lighting & WB" tab buttons using proper flexbox centering.
- **Duplicate Event Listeners**: Fixed memory leak caused by duplicate event listeners being added on each carousel re-render.

### Improved
- **Touch Scrolling**: Added momentum-based touch scrolling with velocity tracking for smoother swipe interactions.
- **Scroll Performance**: Changed `scroll-snap-type` from `mandatory` to `proximity` for less jarring scroll behavior.
- **Rendering Performance**: Added `contain: layout style paint` to carousel cards to prevent layout thrashing during scroll.
- **Hover Effects**: Optimized card hover preview to only use backdrop-filter on capable desktop devices, improving mobile performance.
- **Event Handling**: Implemented throttled scroll handlers (50ms) to reduce scroll event overhead.
- Added `will-change`, `backface-visibility`, and `touch-action` CSS hints for GPU-accelerated scrolling.
- Carousels now properly track initialization state to prevent duplicate listener binding.

## [2.1.0] - 2026-01-14
### Added
- **Category Carousel Navigation**: Horizontal swipe-based style selection grouped by category with smooth scroll snap.
- **Vector Icons for Categories**: Replaced emoji icons with custom SVG vector icons for style categories, control categories, and stack row indicators.
- **Multi-line Subject Input**: Expanded textarea for complex prompt composition with adjustable height (80px-200px).
- **Aspect-Ratio Preserving Image Display**: Uploaded images now display at their natural aspect ratio without cropping.
- **Enhanced Effect-Specific CSS Treatments**: New visual effects for Film Noir (venetian blinds), Neon (glowing grid), Pastel, Golden Hour, Vintage/Analog, Chiaroscuro, Bokeh, Mist, and more.
- Carousel arrow navigation for desktop users with scroll position indicators.
- Dynamic fade indicators showing scroll state on category sections.
- New `icons/categories/` directory with 15 custom SVG icons (photo, cinematic, art, digital, mood, texture, color, era, lighting, white-balance, anti-cast, style, control, all-styles, all-controls).

### Changed
- Restructured styles display from flat grid to category-grouped carousel layout.
- Image upload zone now uses `object-fit: contain` instead of `cover` for full image visibility.
- Improved style card visual previews with more accurate effect representations.
- Updated subject input placeholder with more descriptive example prompt.

### Improved
- Better mobile experience with touch-optimized horizontal scrolling and scroll-snap alignment.
- Enhanced visual coherence between style card previews and actual style effects.
- Cleaner separation between styles mode (carousels) and controls mode (traditional grid).
- Reduced context switching when browsing large style libraries.

## [2.0.1] - 2026-01-05
### Changed
- Updated all 8 model icons to new white-line design on transparent backgrounds.
- Icons now use `currentColor` with 0.9 fill-opacity for consistent theming.
- Cleaned up legacy model icon files from `/icons/` root directory.
- Updated icon version metadata to 2.0.1 with standardized XML declarations.
- Removed references to missing optional PWA assets (splash screens, screenshots).

### Improved
- Reduced icon file sizes with optimized SVG paths.
- Better visual consistency across all model icons in the dropdown.
- Enhanced icon compatibility with dark/light theme switching.
- Streamlined manifest.json and index.html for cleaner deployment.

## [2.0.0] - 2026-01-05
### Added
- Magnetic aspect ratio slider notches with haptic feedback and morphing preview transitions.
- Enhanced model card selection motion for clearer active feedback.
- 70+ curated art styles across 8 categories with visual preview gradients.
- New v2.0 branded cover image and repository assets.
- Version badge in README for quick version identification.

### Changed
- **Major version bump** to v2.0.0 reflecting significant UI/UX improvements and polish.
- Improved aspect ratio preview styling with bolder orange outlines and fixed preview framing.
- Stabilized input row layout across portrait and landscape orientations.
- Increased model dropdown and aspect ratio selector widths for more comfortable mobile layouts.
- Shifted model icons to a lighter tone for improved contrast on dark backgrounds.
- Updated all documentation and code comments to v2.0.0.
- Unified version across all JS modules, service worker, and HTML.

### Improved
- Comprehensive documentation updates across README, inline comments, and module headers.
- Better consistency between package.json, config.js, and UI version displays.
- Enhanced code organization with standardized header comments including @version and @updated tags.

## [1.8.1] - 2026-01-04
### Added
- Externalized model icons to `/icons/models/` directory for better maintainability.
- Added XML declarations and documentation comments to all SVG icon files.
- Implemented asynchronous icon loading with caching for optimal performance.
- Created `ETHICS.md` documenting AI ethics and responsible use guidelines.
- Created `PRIVACY.md` with comprehensive data handling policies.
- Expanded `SECURITY.md` with detailed security practices and guidelines.

### Changed
- Updated model configurations to use `iconPath` instead of inline `icon` SVG strings.
- Refactored UI module to load external SVG icons with graceful fallbacks.
- Version bump to 1.8.1 across config.js and ui.js.

### Improved
- Better separation of concerns: icons now maintained as standalone files.
- Reduced JavaScript bundle size by moving SVG content to external files.
- Added inline changelog documentation to config.js and ui.js headers.

## [1.8.0] - 2026-01-04
### Added
- Rich model dropdown with SOTA and Standard model cards, icons, descriptions, and capability badges.
- Dynamic aspect ratio slider with category toggles, live preview, and reset behavior.
- Mobile landscape responsive safeguards via `css/responsive.css`.
- Validation script and CI workflow for consistency checks.

### Changed
- Default aspect ratio updated to 1:1 and default model set to Nano Banana Pro.
- Updated prompt formatting mappings to support new model IDs.
- Version bumps across UI, config, service worker cache, and documentation.
