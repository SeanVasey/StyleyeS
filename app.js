/**
 * StyleyeS v1.5 — Main Application
 * Initialization and orchestration
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
   * Handle iOS standalone (PWA) mode specifics
   */
  handleStandaloneMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                         window.navigator.standalone === true;
    
    if (isStandalone) {
      document.body.classList.add('pwa-standalone');
      
      // Prevent overscroll/bounce
      document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('.styles-grid, .categories, .ar-toolbar, .history-list, .stack-list')) {
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
