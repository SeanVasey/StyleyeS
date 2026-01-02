/**
 * StyleyeS v1.5 — State Management
 * Application state and persistence
 */

const StyleyeSState = {
  // Current State
  inputMode: 'text',
  pickerMode: 'styles',
  hasImage: false,
  currentAR: StyleyeSConfig.DEFAULT_AR,
  
  // Selection Stacks
  stack: [],
  controlStack: [],
  favorites: [],
  history: [],
  
  // UI State
  activeCategory: 'all',
  controlActiveCategory: 'all',
  
  /**
   * Initialize state from localStorage
   */
  init() {
    this.load();
  },
  
  /**
   * Load state from localStorage
   */
  load() {
    try {
      const saved = localStorage.getItem(StyleyeSConfig.STORAGE_KEY);
      if (!saved) return;

      const data = JSON.parse(saved);

      // Validate data structure to prevent injection attacks
      if (!data || typeof data !== 'object') {
        console.warn('Invalid state data structure');
        return;
      }

      // Restore arrays with validation
      this.favorites = Array.isArray(data.favorites) ? data.favorites.filter(id => typeof id === 'string') : [];
      this.history = Array.isArray(data.history) ? data.history.filter(h => h && typeof h === 'object') : [];
      this.stack = Array.isArray(data.stack) ? data.stack.filter(id => typeof id === 'string') : [];
      this.controlStack = Array.isArray(data.controlStack) ? data.controlStack.filter(id => typeof id === 'string') : [];

      // Validate aspect ratio
      const validARs = StyleyeSConfig.aspectRatios.map(ar => ar.id);
      this.currentAR = validARs.includes(data.currentAR) ? data.currentAR : StyleyeSConfig.DEFAULT_AR;

      // Restore weights to DOM if elements exist (with validation)
      if (data.weight && typeof data.weight === 'number' && data.weight >= 1 && data.weight <= 10) {
        const weightEl = document.getElementById('weight');
        const weightValueEl = document.getElementById('weightValue');
        if (weightEl) weightEl.value = data.weight;
        if (weightValueEl) weightValueEl.textContent = data.weight;
      }

      if (data.controlWeight && typeof data.controlWeight === 'number' && data.controlWeight >= 1 && data.controlWeight <= 10) {
        const controlWeightEl = document.getElementById('controlWeight');
        const controlWeightValueEl = document.getElementById('controlWeightValue');
        if (controlWeightEl) controlWeightEl.value = data.controlWeight;
        if (controlWeightValueEl) controlWeightValueEl.textContent = data.controlWeight;
      }
    } catch (e) {
      console.warn('Failed to load StyleyeS state:', e);
      // Clear potentially corrupted data
      localStorage.removeItem(StyleyeSConfig.STORAGE_KEY);
    }
  },
  
  /**
   * Save state to localStorage
   */
  save() {
    try {
      const weightEl = document.getElementById('weight');
      const controlWeightEl = document.getElementById('controlWeight');

      localStorage.setItem(StyleyeSConfig.STORAGE_KEY, JSON.stringify({
        favorites: this.favorites,
        history: this.history,
        stack: this.stack,
        controlStack: this.controlStack,
        weight: weightEl ? parseInt(weightEl.value, 10) : StyleyeSConfig.DEFAULT_STYLE_WEIGHT,
        controlWeight: controlWeightEl ? parseInt(controlWeightEl.value, 10) : StyleyeSConfig.DEFAULT_CONTROL_WEIGHT,
        currentAR: this.currentAR
      }));
    } catch (e) {
      console.warn('Failed to save StyleyeS state:', e);
    }
  },
  
  /**
   * Reset state to defaults
   */
  reset() {
    this.stack = [];
    this.controlStack = [];
    this.currentAR = StyleyeSConfig.DEFAULT_AR;
    this.inputMode = 'text';
    this.hasImage = false;
    this.save();
  },
  
  /**
   * Add style to stack
   * @param {string} id - Style ID
   * @returns {boolean} Success
   */
  addStyle(id) {
    if (this.stack.includes(id)) return false;
    if (this.stack.length >= StyleyeSConfig.MAX_STYLES) return false;
    
    this.stack.push(id);
    this.save();
    return true;
  },
  
  /**
   * Remove style from stack
   * @param {string} id - Style ID
   */
  removeStyle(id) {
    this.stack = this.stack.filter(s => s !== id);
    this.save();
  },
  
  /**
   * Toggle style in stack
   * @param {string} id - Style ID
   * @returns {Object} Result with success and message
   */
  toggleStyle(id) {
    if (this.stack.includes(id)) {
      this.removeStyle(id);
      return { success: true, added: false };
    } else {
      if (this.stack.length >= StyleyeSConfig.MAX_STYLES) {
        return { success: false, message: `Max ${StyleyeSConfig.MAX_STYLES} styles allowed` };
      }
      this.addStyle(id);
      return { success: true, added: true };
    }
  },
  
  /**
   * Add control to stack (with White Balance exclusivity)
   * @param {string} id - Control ID
   * @returns {boolean} Success
   */
  addControl(id) {
    if (this.controlStack.includes(id)) return false;
    if (this.controlStack.length >= StyleyeSConfig.MAX_CONTROLS) return false;
    
    // Check for White Balance exclusivity
    const newControl = StyleyeSData.getControlById(id);
    if (newControl && newControl.category === 'White Balance') {
      // Remove any existing White Balance controls
      const wbIds = StyleyeSData.controls
        .filter(c => c.category === 'White Balance')
        .map(c => c.id);
      this.controlStack = this.controlStack.filter(cid => !wbIds.includes(cid));
    }
    
    this.controlStack.push(id);
    this.save();
    return true;
  },
  
  /**
   * Remove control from stack
   * @param {string} id - Control ID
   */
  removeControl(id) {
    this.controlStack = this.controlStack.filter(c => c !== id);
    this.save();
  },
  
  /**
   * Toggle control in stack
   * @param {string} id - Control ID
   * @returns {Object} Result with success and message
   */
  toggleControl(id) {
    if (this.controlStack.includes(id)) {
      this.removeControl(id);
      return { success: true, added: false };
    } else {
      if (this.controlStack.length >= StyleyeSConfig.MAX_CONTROLS) {
        return { success: false, message: `Max ${StyleyeSConfig.MAX_CONTROLS} lighting controls` };
      }
      this.addControl(id);
      return { success: true, added: true };
    }
  },
  
  /**
   * Toggle favorite
   * @param {string} id - Style ID
   */
  toggleFavorite(id) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(f => f !== id);
    } else {
      this.favorites.push(id);
    }
    this.save();
  },
  
  /**
   * Check if style is favorited
   * @param {string} id - Style ID
   * @returns {boolean}
   */
  isFavorite(id) {
    return this.favorites.includes(id);
  },
  
  /**
   * Add to history
   * @param {Object} entry - History entry with prompt, model, timestamp
   */
  addHistory(entry) {
    this.history.unshift({
      ...entry,
      timestamp: Date.now()
    });
    
    // Trim history to max size
    if (this.history.length > StyleyeSConfig.MAX_HISTORY) {
      this.history.pop();
    }
    
    this.save();
  },
  
  /**
   * Remove history entry
   * @param {number} index - Index to remove
   */
  removeHistory(index) {
    this.history.splice(index, 1);
    this.save();
  },
  
  /**
   * Get total stack count
   * @returns {number}
   */
  getTotalCount() {
    return this.stack.length + this.controlStack.length;
  },
  
  /**
   * Set aspect ratio
   * @param {string} ar - Aspect ratio ID
   */
  setAspectRatio(ar) {
    this.currentAR = ar;
    this.save();
  },
  
  /**
   * Export state for backup
   * @returns {Object}
   */
  export() {
    const weightEl = document.getElementById('weight');
    const controlWeightEl = document.getElementById('controlWeight');

    return {
      version: StyleyeSConfig.VERSION,
      favorites: this.favorites,
      history: this.history,
      stack: this.stack,
      controlStack: this.controlStack,
      currentAR: this.currentAR,
      weight: weightEl ? parseInt(weightEl.value, 10) : StyleyeSConfig.DEFAULT_STYLE_WEIGHT,
      controlWeight: controlWeightEl ? parseInt(controlWeightEl.value, 10) : StyleyeSConfig.DEFAULT_CONTROL_WEIGHT
    };
  },
  
  /**
   * Import state from backup
   * @param {Object} data - Imported data
   */
  import(data) {
    // Validate import data structure to prevent malicious imports
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid import data structure');
    }

    // Validate and import arrays (type checking and filtering)
    if (data.favorites && Array.isArray(data.favorites)) {
      this.favorites = data.favorites.filter(id => typeof id === 'string');
    }

    if (data.history && Array.isArray(data.history)) {
      this.history = data.history
        .filter(h => h && typeof h === 'object' && typeof h.prompt === 'string')
        .slice(0, StyleyeSConfig.MAX_HISTORY); // Enforce max history limit
    }

    if (data.stack && Array.isArray(data.stack)) {
      this.stack = data.stack
        .filter(id => typeof id === 'string')
        .slice(0, StyleyeSConfig.MAX_STYLES); // Enforce max styles limit
    }

    if (data.controlStack && Array.isArray(data.controlStack)) {
      this.controlStack = data.controlStack
        .filter(id => typeof id === 'string')
        .slice(0, StyleyeSConfig.MAX_CONTROLS); // Enforce max controls limit
    }

    // Validate aspect ratio against allowed values
    if (data.currentAR) {
      const validARs = StyleyeSConfig.aspectRatios.map(ar => ar.id);
      if (validARs.includes(data.currentAR)) {
        this.currentAR = data.currentAR;
      }
    }

    // Restore weights with validation
    if (data.weight && typeof data.weight === 'number' && data.weight >= 1 && data.weight <= 10) {
      const weightEl = document.getElementById('weight');
      const weightValueEl = document.getElementById('weightValue');
      if (weightEl) weightEl.value = data.weight;
      if (weightValueEl) weightValueEl.textContent = data.weight;
    }

    if (data.controlWeight && typeof data.controlWeight === 'number' && data.controlWeight >= 1 && data.controlWeight <= 10) {
      const controlWeightEl = document.getElementById('controlWeight');
      const controlWeightValueEl = document.getElementById('controlWeightValue');
      if (controlWeightEl) controlWeightEl.value = data.controlWeight;
      if (controlWeightValueEl) controlWeightValueEl.textContent = data.controlWeight;
    }

    this.save();
  }
};
