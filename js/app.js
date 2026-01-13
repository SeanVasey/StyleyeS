/**
 * StyleyeS v2.3.0 — Main Application
 * Initialization and orchestration
 *
 * @version 2.3.0
 * @updated 2026-01-13
 * @changelog
 *   - 2.3.0: Memory leak fixes, performance optimizations, version sync
 *   - 2.2.0: Enhanced carousel interaction with front-card focus
 *   - 2.1.0: Icon system replacing emojis, 3D carousel
 *   - 2.0.0: Major release with enhanced branding
 */

const StyleyeS = {
  /**
   * Initialize the application
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.bootstrap());
    } else {
      this.bootstrap();
    }
  },

  /**
   * Bootstrap the application
   */
  bootstrap() {
    console.log(`%c StyleyeS v${StyleyeSConfig.VERSION} `, 'background: linear-gradient(135deg, #ff6b35, #dc2f5a, #9b4dca); color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
    console.log('%c VASEY/AI — Vivid Prompt Engineering ', 'color: #8b98a5; font-style: italic;');

    // Register service worker
    this.registerServiceWorker();

    // Initialize icons in static HTML elements
    this.initIcons();

    // Cache DOM elements
    StyleyeSUI.cacheElements();

    // Load saved state
    StyleyeSState.init();

    // Initial render
    StyleyeSUI.renderAll();

    // Set initial input mode
    StyleyeSUI.toggleInputMode('text');

    // Bind event handlers
    StyleyeSHandlers.bindAll();

    // Handle iOS standalone mode
    this.handleStandaloneMode();

    // Mark as ready
    document.body.classList.add('app-ready');
  },

  /**
   * Initialize SVG icons for all data-icon elements in static HTML
   */
  initIcons() {
    const iconElements = document.querySelectorAll('[data-icon]');
    iconElements.forEach(el => {
      const iconName = el.dataset.icon;
      if (iconName && StyleyeSIcons[iconName]) {
        el.innerHTML = StyleyeSIcons[iconName];
      }
    });
  },

  /**
   * Register service worker for offline support
   */
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('[SW] Registered:', reg.scope))
        .catch(err => console.warn('[SW] Registration failed:', err));
    }
  },
  
  /**
   * Handle iOS standalone (PWA) mode specifics
   */
  handleStandaloneMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
    
    if (isStandalone) {
      document.body.classList.add('pwa-standalone');
      
      // Prevent overscroll/bounce
      document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('.styles-grid, .categories, .aspect-ratio-slider-container, .history-list, .stack-list')) {
          return;
        }
        if (document.body.scrollHeight <= window.innerHeight) {
          e.preventDefault();
        }
      }, { passive: false });
      
      // Handle status bar tap to scroll top
      document.addEventListener('touchstart', (e) => {
        if (e.touches[0].clientY < 20) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  },
  
  /**
   * Get current prompt
   * @returns {string}
   */
  getPrompt() {
    const output = document.getElementById('promptOutput');
    return output ? output.textContent : '';
  },
  
  /**
   * Get application version
   * @returns {string}
   */
  getVersion() {
    return StyleyeSConfig.VERSION;
  }
};

// Initialize application
StyleyeS.init();

// Expose to global scope for debugging
window.StyleyeS = StyleyeS;
window.StyleyeSState = StyleyeSState;
window.StyleyeSConfig = StyleyeSConfig;
