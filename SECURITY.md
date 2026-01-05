# Security Policy

## Overview

StyleyeS is committed to maintaining the security and integrity of our image generation prompt builder. This document outlines our security practices, supported versions, and vulnerability reporting procedures.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.8.x   | :white_check_mark: |
| < 1.8   | :x:                |

## Security Practices

### Client-Side Security

StyleyeS operates entirely client-side with the following security measures:

1. **No External Data Transmission**: All prompt generation occurs locally in your browser. No prompts, images, or user data are sent to external servers.

2. **Content Security Policy**: The application implements strict CSP headers to prevent XSS attacks and unauthorized script execution.

3. **Input Sanitization**: All user inputs are sanitized before rendering to prevent injection attacks:
   - HTML entities are escaped via `escapeHtml()`
   - Attribute values are sanitized via `sanitizeAttr()`

4. **File Validation**: Image uploads are validated for:
   - MIME type verification (only jpeg, png, gif, webp, svg+xml allowed)
   - File size limits (10MB maximum)
   - Secure FileReader error handling

5. **Local Storage Security**: State persistence uses secure localStorage practices with:
   - JSON serialization/deserialization with error handling
   - No sensitive data storage
   - Configurable storage keys

### Asset Security

1. **External SVG Icons**: Model icons are loaded from the local `/icons/models/` directory:
   - Icons use `currentColor` for styling (no hardcoded colors)
   - Fetch requests include proper error handling
   - Icons are cached after initial load

2. **No Third-Party Dependencies**: The application has minimal external dependencies to reduce attack surface.

### Service Worker Security

The service worker (`sw.js`) implements:
- Cache-first strategy for static assets
- Version-based cache invalidation
- Network fallback for dynamic content

## Reporting a Vulnerability

If you discover a security vulnerability in StyleyeS, please report it responsibly.

### How to Report

- **Email**: security@vasey.ai
- **Subject Line**: `[SECURITY] StyleyeS Vulnerability Report`

### What to Include

1. A clear description of the vulnerability
2. Steps to reproduce the issue
3. Potential impact assessment
4. Any proof-of-concept code (if applicable)
5. Your recommended fix (optional)

### Response Timeline

| Stage | Timeline |
| ----- | -------- |
| Acknowledgment | Within 3 business days |
| Initial Assessment | Within 7 business days |
| Status Update | Every 14 days until resolved |
| Fix Deployment | Based on severity (critical: 24-48h, high: 7 days, medium: 30 days) |

### Severity Classifications

- **Critical**: Remote code execution, data exfiltration, authentication bypass
- **High**: XSS, CSRF, significant data exposure
- **Medium**: Information disclosure, limited impact vulnerabilities
- **Low**: Best practice violations, theoretical issues

## Security Best Practices for Users

1. **Keep Updated**: Always use the latest version of StyleyeS
2. **Browser Security**: Use a modern, up-to-date browser
3. **HTTPS**: Access StyleyeS only via HTTPS connections
4. **Extensions**: Be cautious with browser extensions that may interfere with the application

## Audit History

| Date | Auditor | Scope | Result |
| ---- | ------- | ----- | ------ |
| 2026-01-04 | Internal | Full application review | See SECURITY_AUDIT.md |

## Contact

For security-related inquiries:
- Email: security@vasey.ai
- Response: Within 3 business days
