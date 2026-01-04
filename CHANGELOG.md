# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- Magnetic aspect ratio slider notches with haptic feedback and morphing preview transitions.
- Enhanced model card selection motion for clearer active feedback.

### Changed
- Improved aspect ratio preview styling with bolder orange outlines and fixed preview framing.
- Stabilized input row layout across portrait and landscape orientations.
- Increased model dropdown and aspect ratio selector widths for more comfortable mobile layouts.
- Shifted model icons to a lighter tone for improved contrast on dark backgrounds.

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
