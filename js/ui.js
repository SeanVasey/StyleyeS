/**
 * StyleyeS v2.1.1 — UI Module
 * Rendering and DOM manipulation
 *
 * @version 2.1.1
 * @updated 2026-01-14
 * @changelog
 *   - 2.1.1: Carousel performance fixes, throttled scroll handlers, touch momentum scrolling
 *   - 2.1.0: Category carousels, multi-line input, aspect-ratio-preserving images
 *   - 2.0.1: Updated model icons to white-line design
 *   - 2.0.0: Major release with enhanced branding and documentation
 *   - 1.8.1: Added external SVG icon loading with caching
 *   - 1.8.0: Initial release with rich model dropdown
 */

const StyleyeSUI = {
  // DOM Element References (cached)
  elements: {},
  aspectRatioState: {
    sliderValue: 50,
    isDragging: false,
    lastSnappedId: null
  },

  // Icon cache for loaded SVG content
  iconCache: {},

  // Placeholder SVG for icons that haven't loaded yet
  ICON_PLACEHOLDER: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"/></svg>',

  /**
   * Load an SVG icon from a given base path and cache it
   * @param {string} basePath - Base directory path
   * @param {string} iconPath - Relative path to icon file
   * @returns {Promise<string>} SVG content
   */
  async _loadIconFromPath(basePath, iconPath) {
    if (!iconPath) return '';

    const fullPath = basePath + iconPath;

    if (this.iconCache[fullPath]) {
      return this.iconCache[fullPath];
    }

    try {
      const response = await fetch(fullPath);
      if (!response.ok) {
        console.warn(`Failed to load icon: ${fullPath}`);
        return '';
      }
      const svgContent = await response.text();
      this.iconCache[fullPath] = svgContent;
      return svgContent;
    } catch (error) {
      console.warn(`Error loading icon ${fullPath}:`, error);
      return '';
    }
  },

  /**
   * Get a cached icon or return placeholder
   * @param {string} basePath - Base directory path
   * @param {string} iconPath - Relative path to icon file
   * @returns {string} SVG content or placeholder
   */
  _getIconFromPath(basePath, iconPath) {
    if (!iconPath) return '';
    return this.iconCache[basePath + iconPath] || this.ICON_PLACEHOLDER;
  },

  // Convenience loaders for each icon type
  async loadIcon(iconPath) { return this._loadIconFromPath(StyleyeSConfig.ICON_BASE_PATH, iconPath); },
  async loadCategoryIcon(iconPath) { return this._loadIconFromPath(StyleyeSConfig.CATEGORY_ICON_PATH, iconPath); },
  async loadUIIcon(iconPath) { return this._loadIconFromPath(StyleyeSConfig.UI_ICON_PATH, iconPath); },

  // Convenience sync getters for each icon type
  getIconSync(iconPath) { return this._getIconFromPath(StyleyeSConfig.ICON_BASE_PATH, iconPath); },
  getCategoryIconSync(iconPath) { return this._getIconFromPath(StyleyeSConfig.CATEGORY_ICON_PATH, iconPath); },
  getUIIconSync(iconPath) { return this._getIconFromPath(StyleyeSConfig.UI_ICON_PATH, iconPath); },

  /**
   * Preload all model, category, and UI icons for better performance
   * @returns {Promise<void>}
   */
  async preloadIcons() {
    const promises = [
      ...StyleyeSConfig.models.map(model => this.loadIcon(model.iconPath)),
      ...Object.values(StyleyeSConfig.categoryIcons).map(p => this.loadCategoryIcon(p)),
      ...Object.values(StyleyeSConfig.controlCategoryIcons).map(p => this.loadCategoryIcon(p)),
      ...Object.values(StyleyeSConfig.stackIcons).map(p => this.loadCategoryIcon(p)),
      ...Object.values(StyleyeSConfig.uiIcons).map(p => this.loadUIIcon(p))
    ];
    await Promise.all(promises);
  },
  
  /**
   * Cache DOM element references
   */
  cacheElements() {
    this.elements = {
      // Inputs
      subject: document.getElementById('subject'),
      modelDropdown: document.getElementById('modelDropdown'),
      modelDropdownTrigger: document.getElementById('modelDropdownTrigger'),
      modelDropdownPanel: document.getElementById('modelDropdownPanel'),
      modelDropdownIcon: document.getElementById('modelDropdownIcon'),
      modelDropdownName: document.getElementById('modelDropdownName'),
      imageZone: document.getElementById('imageZone'),
      imgInput: document.getElementById('imgInput'),
      imgPreview: document.getElementById('imgPreview'),
      removeImg: document.getElementById('removeImg'),
      
      // Mode buttons
      modeText: document.getElementById('modeText'),
      modeImage: document.getElementById('modeImage'),
      
      // Picker tabs
      tabStyles: document.getElementById('tabStyles'),
      tabControls: document.getElementById('tabControls'),
      
      // Containers
      aspectRatioSlider: document.getElementById('aspectRatioSlider'),
      aspectRatioRange: document.getElementById('aspectRatioRange'),
      aspectRatioLabel: document.getElementById('aspectRatioLabel'),
      aspectRatioPreview: document.getElementById('aspectRatioPreview'),
      aspectRatioReset: document.getElementById('aspectRatioReset'),
      aspectRatioFill: document.getElementById('aspectRatioFill'),
      aspectRatioThumb: document.getElementById('aspectRatioThumb'),
      aspectRatioNotches: document.getElementById('aspectRatioNotches'),
      categories: document.getElementById('categories'),
      stylesContainer: document.getElementById('stylesContainer'),
      stackList: document.getElementById('stackList'),
      totalCount: document.getElementById('totalCount'),
      
      // Weights
      weight: document.getElementById('weight'),
      weightValue: document.getElementById('weightValue'),
      controlWeight: document.getElementById('controlWeight'),
      controlWeightValue: document.getElementById('controlWeightValue'),
      
      // Output
      promptOutput: document.getElementById('promptOutput'),
      
      // Modals
      historyModal: document.getElementById('historyModal'),
      historyList: document.getElementById('historyList'),
      
      // Toast
      toast: document.getElementById('toast'),
      
      // File input
      importFile: document.getElementById('importFile')
    };
  },
  
  /**
   * Render aspect ratio slider
   */
  renderAspectRatios() {
    const { aspectRatioSlider } = this.elements;
    if (!aspectRatioSlider) return;

    const sliderValue = StyleyeSConfig.sliderPositions[StyleyeSState.currentAR] ?? 50;
    this.aspectRatioState.sliderValue = sliderValue;
    this.aspectRatioState.isDragging = false;
    this.renderAspectRatioNotches();
    this.updateAspectRatioUI();
  },

  /**
   * Render model dropdown
   */
  renderModelDropdown() {
    const { modelDropdownPanel } = this.elements;
    if (!modelDropdownPanel) return;

    const selectedId = StyleyeSState.currentModel || StyleyeSConfig.DEFAULT_MODEL;
    const selectedModel = StyleyeSConfig.models.find(model => model.id === selectedId) || StyleyeSConfig.models[0];

    this.updateModelDropdownTrigger(selectedModel);

    const renderSection = (label, models) => `
      <div class="model-category-label">${label}</div>
      ${models.map(model => this.renderModelCard(model, model.id === selectedId)).join('')}
    `;

    const sotaModels = StyleyeSConfig.models.filter(model => model.category === 'sota');
    const standardModels = StyleyeSConfig.models.filter(model => model.category === 'standard');

    modelDropdownPanel.innerHTML = `
      ${renderSection('SOTA Models', sotaModels)}
      ${renderSection('Standard Models', standardModels)}
    `;
  },

  /**
   * Update model dropdown trigger UI
   * @param {Object} model - Selected model data
   */
  updateModelDropdownTrigger(model) {
    const { modelDropdownIcon, modelDropdownName } = this.elements;
    if (modelDropdownIcon) {
      // Use cached icon or load asynchronously
      modelDropdownIcon.innerHTML = this.getIconSync(model.iconPath);
    }
    if (modelDropdownName) {
      modelDropdownName.textContent = model.name;
    }
  },

  /**
   * Render a model card
   * @param {Object} model - Model data
   * @param {boolean} isSelected - Selection state
   * @returns {string} HTML string
   */
  renderModelCard(model, isSelected) {
    const sanitizedId = this.sanitizeAttr(model.id);
    const description = this.escapeHtml(model.description);
    const features = model.capabilities.features || [];
    const iconContent = this.getIconSync(model.iconPath);

    return `
      <button class="model-card ${isSelected ? 'selected' : ''}" type="button" data-model="${sanitizedId}" role="option" aria-selected="${isSelected}">
        <div class="model-card-header">
          <span class="model-card-icon" aria-hidden="true">${iconContent}</span>
          <span class="model-card-name">${this.escapeHtml(model.name)}</span>
          ${isSelected ? '<span class="checkmark" aria-hidden="true">✓</span>' : ''}
        </div>
        <p class="model-card-description">${description}</p>
        <div class="model-card-capabilities">
          <span class="capability-badge speed">${this.escapeHtml(model.capabilities.speed)}</span>
          <span class="capability-badge quality">⚡${this.escapeHtml(String(model.capabilities.quality))}</span>
          ${features.map(feature => `<span class="capability-badge feature">${this.escapeHtml(feature)}</span>`).join('')}
        </div>
      </button>
    `;
  },

  /**
   * Toggle model dropdown open state
   */
  toggleModelDropdown() {
    const { modelDropdown, modelDropdownTrigger } = this.elements;
    if (!modelDropdown || !modelDropdownTrigger) return;

    const isOpen = modelDropdown.classList.toggle('open');
    modelDropdownTrigger.setAttribute('aria-expanded', String(isOpen));
  },

  /**
   * Close model dropdown
   */
  closeModelDropdown() {
    const { modelDropdown, modelDropdownTrigger } = this.elements;
    if (!modelDropdown || !modelDropdownTrigger) return;

    modelDropdown.classList.remove('open');
    modelDropdownTrigger.setAttribute('aria-expanded', 'false');
  },

  /**
   * Select a model
   * @param {string} modelId - Model ID
   */
  selectModel(modelId) {
    const model = StyleyeSConfig.models.find(item => item.id === modelId);
    if (!model) return;

    StyleyeSState.setModel(modelId);
    this.renderModelDropdown();
    this.updateOutput();
  },

  /**
   * Update aspect ratio slider UI
   */
  updateAspectRatioUI() {
    const {
      aspectRatioSlider,
      aspectRatioRange,
      aspectRatioLabel,
      aspectRatioPreview,
      aspectRatioReset,
      aspectRatioFill,
      aspectRatioThumb,
      aspectRatioNotches
    } = this.elements;

    const sliderValue = this.aspectRatioState.sliderValue;
    const nearest = this.getNearestAspectRatio(sliderValue);
    const currentCategory = this.getCategoryFromSlider(sliderValue);
    const previewSize = StyleyeSConfig.AR_PREVIEW_MAX_DIMENSION ?? 60;
    const { lower, upper, progress } = this.getBoundingAspectRatios(sliderValue);

    if (aspectRatioSlider) {
      aspectRatioSlider.classList.toggle('is-dragging', this.aspectRatioState.isDragging);
    }

    if (aspectRatioRange) {
      aspectRatioRange.value = sliderValue;
      aspectRatioRange.setAttribute('aria-valuetext', nearest.label);
    }

    if (aspectRatioLabel) {
      aspectRatioLabel.textContent = nearest.label;
    }

    if (aspectRatioPreview) {
      aspectRatioPreview.style.width = `${previewSize}px`;
      aspectRatioPreview.style.height = `${previewSize}px`;
      this.updateAspectRatioPreviewLayers(aspectRatioPreview, lower, upper, progress);
    }

    if (aspectRatioFill) {
      if (sliderValue <= 50) {
        aspectRatioFill.style.left = `${sliderValue}%`;
        aspectRatioFill.style.right = '50%';
      } else {
        aspectRatioFill.style.left = '50%';
        aspectRatioFill.style.right = `${100 - sliderValue}%`;
      }
    }

    if (aspectRatioThumb) {
      aspectRatioThumb.style.left = `${sliderValue}%`;
      aspectRatioThumb.style.transform = `translateX(-50%) scale(${this.aspectRatioState.isDragging ? 1.2 : 1})`;
    }

    if (aspectRatioReset) {
      aspectRatioReset.hidden = StyleyeSState.currentAR === StyleyeSConfig.DEFAULT_AR;
    }

    if (aspectRatioNotches) {
      const notchElements = aspectRatioNotches.querySelectorAll('.slider-notch');
      notchElements.forEach(notch => {
        const notchId = notch.dataset.ar;
        notch.classList.toggle('active', notchId === nearest.id);
      });
    }

    const categoryButtons = document.querySelectorAll('.aspect-ratio-categories .category-btn');
    categoryButtons.forEach(button => {
      const category = button.dataset.category;
      if (!category) return;
      button.classList.toggle('active', category === currentCategory);
    });
  },

  /**
   * Update slider value
   * @param {number} value - Slider value
   * @param {boolean} isDragging - Dragging state
   */
  setAspectRatioSliderValue(value, isDragging) {
    this.aspectRatioState.sliderValue = value;
    this.aspectRatioState.isDragging = isDragging;
    this.updateAspectRatioUI();
  },

  /**
   * Render aspect ratio slider notches
   */
  renderAspectRatioNotches() {
    const { aspectRatioNotches } = this.elements;
    if (!aspectRatioNotches) return;

    aspectRatioNotches.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (const aspectRatio of StyleyeSConfig.aspectRatios) {
      const position = StyleyeSConfig.sliderPositions[aspectRatio.id] ?? 50;
      const notch = document.createElement('span');
      notch.className = 'slider-notch';
      notch.dataset.ar = aspectRatio.id;
      notch.style.left = `${position}%`;
      fragment.appendChild(notch);
    }

    aspectRatioNotches.appendChild(fragment);
  },

  /**
   * Update aspect ratio preview layers for morph + fade effect
   * @param {HTMLElement} preview
   * @param {Object} lower
   * @param {Object} upper
   * @param {number} progress
   */
  updateAspectRatioPreviewLayers(preview, lower, upper, progress) {
    const primaryLayer = preview.querySelector('.aspect-preview-primary');
    const secondaryLayer = preview.querySelector('.aspect-preview-secondary');
    if (!primaryLayer || !secondaryLayer) return;

    const primaryOpacity = 1 - progress;
    const secondaryOpacity = progress;

    this.updateAspectRatioLayer(primaryLayer, lower, primaryOpacity);
    this.updateAspectRatioLayer(secondaryLayer, upper, secondaryOpacity);
  },

  /**
   * Update a single aspect ratio preview layer
   * @param {HTMLElement} layer
   * @param {Object} aspectRatio
   * @param {number} opacity
   */
  updateAspectRatioLayer(layer, aspectRatio, opacity) {
    if (!layer || !aspectRatio) return;

    const shapeSize = this.getPreviewSize(aspectRatio.ratio);
    layer.style.width = `${shapeSize.width}px`;
    layer.style.height = `${shapeSize.height}px`;
    layer.style.opacity = opacity.toFixed(2);
    layer.classList.toggle('is-visible', opacity > 0.05);
  },

  /**
   * Apply magnetic snapping to aspect ratio slider
   * @param {number} sliderValue
   * @returns {{value: number, snappedId: (string|null)}}
   */
  applyAspectRatioMagnet(sliderValue) {
    const magnetRange = StyleyeSConfig.AR_MAGNET_THRESHOLD;
    const nearest = this.getNearestAspectRatio(sliderValue);
    const nearestValue = StyleyeSConfig.sliderPositions[nearest.id] ?? sliderValue;
    const distance = Math.abs(nearestValue - sliderValue);
    const isSnapped = distance <= magnetRange;

    return {
      value: isSnapped ? nearestValue : sliderValue,
      snappedId: isSnapped ? nearest.id : null
    };
  },

  /**
   * Trigger haptic feedback when snapping
   * @param {string|null} snappedId
   */
  triggerAspectRatioHaptics(snappedId) {
    if (!snappedId) {
      this.aspectRatioState.lastSnappedId = null;
      return;
    }

    if (snappedId !== this.aspectRatioState.lastSnappedId) {
      this.aspectRatioState.lastSnappedId = snappedId;
      if (navigator.vibrate) {
        navigator.vibrate(StyleyeSConfig.AR_HAPTIC_DURATION_MS);
      }
    }
  },

  /**
   * Get bounding aspect ratios around a slider value
   * @param {number} sliderValue
   * @returns {{lower: Object, upper: Object, progress: number}}
   */
  getBoundingAspectRatios(sliderValue) {
    const stops = this.getAspectRatioStops();
    let lower = stops[0];
    let upper = stops[stops.length - 1];

    for (let i = 0; i < stops.length; i += 1) {
      if (stops[i].position <= sliderValue) {
        lower = stops[i];
      }
      if (stops[i].position >= sliderValue) {
        upper = stops[i];
        break;
      }
    }

    const range = upper.position - lower.position || 1;
    const progress = Math.min(Math.max((sliderValue - lower.position) / range, 0), 1);

    return {
      lower: lower.aspectRatio,
      upper: upper.aspectRatio,
      progress: lower.aspectRatio.id === upper.aspectRatio.id ? 0 : progress
    };
  },

  /**
   * Get aspect ratio stops with positions
   * @returns {Array}
   */
  getAspectRatioStops() {
    return StyleyeSConfig.aspectRatios
      .map(aspectRatio => ({
        aspectRatio,
        position: StyleyeSConfig.sliderPositions[aspectRatio.id] ?? 50
      }))
      .sort((a, b) => a.position - b.position);
  },

  /**
   * Commit aspect ratio selection based on slider value
   */
  commitAspectRatioSelection() {
    const nearest = this.getNearestAspectRatio(this.aspectRatioState.sliderValue);
    if (!nearest) return;

    this.aspectRatioState.sliderValue = StyleyeSConfig.sliderPositions[nearest.id] ?? 50;
    this.aspectRatioState.isDragging = false;
    StyleyeSState.setAspectRatio(nearest.id);
    this.updateAspectRatioUI();
    this.updateOutput();
  },

  /**
   * Get current aspect ratio category from slider
   * @param {number} sliderValue - Slider value
   * @returns {string} Category
   */
  getCategoryFromSlider(sliderValue) {
    if (sliderValue < 37.5) return 'portrait';
    if (sliderValue > 62.5) return 'landscape';
    return 'square';
  },

  /**
   * Get interpolated ratio from slider value
   * @param {number} sliderValue - Slider value
   * @returns {number} Ratio
   */
  getRatioFromSlider(sliderValue) {
    if (sliderValue <= 37.5) {
      const t = sliderValue / 37.5;
      return 0.5625 + (1 - 0.5625) * t;
    }
    if (sliderValue >= 62.5) {
      const t = (sliderValue - 62.5) / 37.5;
      return 1 + (2.333 - 1) * t;
    }
    return 1;
  },

  /**
   * Get nearest aspect ratio by slider value
   * @param {number} sliderValue - Slider value
   * @returns {Object} Aspect ratio
   */
  getNearestAspectRatio(sliderValue) {
    return StyleyeSConfig.aspectRatios.reduce((prev, curr) => {
      const prevDistance = Math.abs((StyleyeSConfig.sliderPositions[prev.id] ?? 50) - sliderValue);
      const currDistance = Math.abs((StyleyeSConfig.sliderPositions[curr.id] ?? 50) - sliderValue);
      return currDistance < prevDistance ? curr : prev;
    }, StyleyeSConfig.aspectRatios[0]);
  },

  /**
   * Calculate preview size
   * @param {number} ratio - Current ratio
   * @returns {Object} width/height
   */
  getPreviewSize(ratio) {
    const maxDimension = StyleyeSConfig.AR_PREVIEW_MAX_DIMENSION;
    if (ratio >= 1) {
      return { width: maxDimension, height: maxDimension / ratio };
    }
    return { width: maxDimension * ratio, height: maxDimension };
  },

  /**
   * Get model display name
   * @param {string} modelId - Model ID
   * @returns {string} Model name
   */
  getModelName(modelId) {
    const model = StyleyeSConfig.models.find(item => item.id === modelId);
    return model ? model.name : modelId || 'Unknown';
  },
  
  /**
   * Render category buttons
   */
  renderCategories() {
    const { categories } = this.elements;
    if (!categories) return;

    let cats, activeCat, iconMap;

    if (StyleyeSState.pickerMode === 'styles') {
      cats = ['all', ...StyleyeSData.getStyleCategories()];
      activeCat = StyleyeSState.activeCategory;
      iconMap = StyleyeSConfig.categoryIcons;
    } else {
      cats = ['all', ...StyleyeSData.getControlCategories()];
      activeCat = StyleyeSState.controlActiveCategory;
      iconMap = StyleyeSConfig.controlCategoryIcons;
    }

    categories.innerHTML = cats.map(cat => {
      const iconPath = iconMap[cat] || iconMap['all'];
      const iconContent = this.getCategoryIconSync(iconPath);
      const label = cat === 'all' ? 'All' : cat;
      return `<button class="cat-btn ${cat === activeCat ? 'active' : ''}" data-cat="${cat}"><span class="cat-icon">${iconContent}</span> ${label}</button>`;
    }).join('');
  },
  
  /**
   * Generate preview gradient CSS from colors array
   * @param {Array} colors - Array of color hex codes
   * @param {string} effect - Effect type for gradient style
   * @returns {string} CSS gradient string
   */
  generatePreviewGradient(colors, effect) {
    if (!colors || colors.length === 0) return 'transparent';
    if (colors.length === 1) return colors[0];

    // Different gradient styles based on effect type
    switch (effect) {
      case 'neon':
      case 'glow':
        return `radial-gradient(ellipse at center, ${colors.join(', ')})`;
      case 'horizon':
      case 'sunset':
      case 'layers':
        return `linear-gradient(to bottom, ${colors.join(', ')})`;
      case 'diagonal':
      case 'dynamic':
        return `linear-gradient(135deg, ${colors.join(', ')})`;
      case 'rays':
        return `conic-gradient(from 0deg, ${colors.join(', ')}, ${colors[0]})`;
      case 'split':
      case 'blend':
        return `linear-gradient(90deg, ${colors.join(', ')})`;
      default:
        return `linear-gradient(145deg, ${colors.join(', ')})`;
    }
  },

  /**
   * Generate pattern overlay based on pattern type
   * @param {string} pattern - Pattern type
   * @returns {string} CSS for pattern overlay
   */
  generatePatternCSS(pattern) {
    switch (pattern) {
      case 'dots':
      case 'stipple':
        return 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)';
      case 'grid':
        return 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)';
      case 'noise':
        return 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.4\'/%3E%3C/svg%3E")';
      case 'waves':
        return 'repeating-linear-gradient(45deg, transparent, transparent 3px, rgba(255,255,255,0.1) 3px, rgba(255,255,255,0.1) 6px)';
      case 'strokes':
        return 'repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)';
      case 'geometric':
      case 'triangles':
        return 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(225deg, rgba(255,255,255,0.1) 25%, transparent 25%)';
      case 'scan':
        return 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)';
      case 'circles':
        return 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)';
      case 'vignette':
        return 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)';
      case 'shimmer':
        return 'linear-gradient(110deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)';
      default:
        return 'none';
    }
  },

  /**
   * Render styles/controls - carousels for styles, grid for controls
   */
  renderGrid() {
    const { stylesContainer } = this.elements;
    if (!stylesContainer) return;

    if (StyleyeSState.pickerMode === 'styles') {
      this.renderCategoryCarousels();
    } else {
      this.renderControlsGrid();
    }
  },

  /**
   * Render styles grouped by category with horizontal carousels
   */
  renderCategoryCarousels() {
    const { stylesContainer } = this.elements;
    if (!stylesContainer) return;

    // Clear carousel tracking since we're re-rendering
    this.clearCarouselTracking();

    const activeCat = StyleyeSState.activeCategory;
    const iconMap = StyleyeSConfig.categoryIcons;

    let categories;
    if (activeCat === 'all') {
      categories = StyleyeSData.getStyleCategories();
    } else if (activeCat === 'favorites') {
      // For favorites, group by original category
      const favStyles = StyleyeSData.styles.filter(s => StyleyeSState.favorites.includes(s.id));
      if (favStyles.length === 0) {
        stylesContainer.innerHTML = '<p style="color:var(--t3);text-align:center;padding:2rem;">No favorites yet. Tap the star on any style to add it.</p>';
        return;
      }
      categories = [...new Set(favStyles.map(s => s.category))];
    } else {
      categories = [activeCat];
    }

    stylesContainer.innerHTML = categories.map(category => {
      let styles;
      if (activeCat === 'favorites') {
        styles = StyleyeSData.styles.filter(s => s.category === category && StyleyeSState.favorites.includes(s.id));
      } else {
        styles = StyleyeSData.getStylesByCategory(category);
      }

      if (styles.length === 0) return '';

      const iconPath = iconMap[category] || iconMap['all'];
      const iconContent = this.getCategoryIconSync(iconPath);
      const sanitizedCat = this.sanitizeAttr(category);

      return `
        <section class="style-category-section" data-category="${sanitizedCat}">
          <div class="category-header">
            <h3 class="category-title"><span class="category-icon">${iconContent}</span> ${this.escapeHtml(category)}</h3>
            <div class="carousel-nav">
              <button class="carousel-arrow prev" data-carousel-prev="${sanitizedCat}" aria-label="Previous" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button class="carousel-arrow next" data-carousel-next="${sanitizedCat}" aria-label="Next" type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          <div class="carousel-track" data-carousel="${sanitizedCat}">
            ${styles.map(style => this.renderStyleCard(style)).join('')}
          </div>
        </section>
      `;
    }).join('');

    // Initialize carousel interactions
    this.initCarouselControls();
  },

  /**
   * Render individual style card for carousel
   * @param {Object} style - Style data object
   * @returns {string} HTML string
   */
  renderStyleCard(style) {
    const isFav = StyleyeSState.favorites.includes(style.id);
    const isSelected = StyleyeSState.stack.includes(style.id);
    const preview = style.preview || { colors: ['#2a2a3e', '#3a3a4e'], effect: 'default' };
    const gradient = this.generatePreviewGradient(preview.colors, preview.effect);
    const pattern = this.generatePatternCSS(preview.pattern);
    const sampleTags = style.tags ? style.tags.slice(0, 3).join(', ') : '';

    return `
      <div class="card-item ${isSelected ? 'selected' : ''}"
           data-id="${this.sanitizeAttr(style.id)}"
           data-effect="${preview.effect || 'default'}">
        <div class="card-preview" style="background: ${gradient};">
          <div class="card-preview-pattern" style="background: ${pattern};"></div>
          <div class="card-preview-shine"></div>
        </div>
        <div class="card-preview-hover">
          <div class="preview-sample" style="background: ${gradient};">
            <div class="preview-sample-pattern" style="background: ${pattern};"></div>
          </div>
          <div class="preview-tags">${this.escapeHtml(sampleTags)}</div>
        </div>
        <button class="card-fav ${isFav ? 'active' : ''}" data-fav="${style.id}" aria-label="Toggle favorite">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
        <div class="card-content">
          <div class="card-name">${this.escapeHtml(style.name)}</div>
          <div class="card-sub">${this.escapeHtml(style.category)}</div>
        </div>
      </div>
    `;
  },

  /**
   * Render controls as a traditional grid
   */
  renderControlsGrid() {
    const { stylesContainer } = this.elements;
    if (!stylesContainer) return;

    const items = StyleyeSData.getControlsByCategory(StyleyeSState.controlActiveCategory);
    const stackIds = StyleyeSState.controlStack;

    if (items.length === 0) {
      stylesContainer.innerHTML = '<p style="color:var(--t3);text-align:center;padding:2rem;">No items found.</p>';
      return;
    }

    stylesContainer.innerHTML = `<div class="styles-grid">${items.map(item => {
      const isSelected = stackIds.includes(item.id);
      const preview = item.preview || { colors: ['#2a2a3e', '#3a3a4e'], effect: 'default', pattern: 'none' };
      const gradient = this.generatePreviewGradient(preview.colors, preview.effect);
      const pattern = this.generatePatternCSS(preview.pattern);
      const sampleTags = item.tags ? item.tags.slice(0, 3).join(', ') : '';

      return `
        <div class="card-item ${isSelected ? 'selected' : ''}" data-id="${this.sanitizeAttr(item.id)}" data-effect="${preview.effect || 'default'}">
          <div class="card-preview" style="background: ${gradient};">
            <div class="card-preview-pattern" style="background: ${pattern};"></div>
            <div class="card-preview-shine"></div>
          </div>
          <div class="card-preview-hover">
            <div class="preview-sample" style="background: ${gradient};">
              <div class="preview-sample-pattern" style="background: ${pattern};"></div>
            </div>
            <div class="preview-tags">${this.escapeHtml(sampleTags)}</div>
          </div>
          <div class="card-content">
            <div class="card-name">${this.escapeHtml(item.name)}</div>
            <div class="card-sub">${this.escapeHtml(item.category)}</div>
          </div>
        </div>
      `;
    }).join('')}</div>`;
  },

  // Track initialized carousels to prevent duplicate event listeners
  initializedCarousels: new Set(),

  // Throttle utility for scroll performance
  throttle(fn, delay) {
    let lastCall = 0;
    let timeoutId = null;
    return function(...args) {
      const now = Date.now();
      const remaining = delay - (now - lastCall);

      if (remaining <= 0) {
        if (timeoutId) {
          clearTimeout(timeoutId);
          timeoutId = null;
        }
        lastCall = now;
        fn.apply(this, args);
      } else if (!timeoutId) {
        timeoutId = setTimeout(() => {
          lastCall = Date.now();
          timeoutId = null;
          fn.apply(this, args);
        }, remaining);
      }
    };
  },

  /**
   * Initialize carousel scroll controls
   * Uses tracking to prevent duplicate event listeners
   */
  initCarouselControls() {
    const carousels = document.querySelectorAll('.carousel-track');
    const scrollAmount = 200;

    carousels.forEach(track => {
      const category = track.dataset.carousel;

      // Skip if already initialized
      if (this.initializedCarousels.has(category)) {
        // Just update the initial state for existing carousels
        this.updateCarouselScrollState(track);
        return;
      }

      const section = track.closest('.style-category-section');
      const prevBtn = section?.querySelector(`[data-carousel-prev="${category}"]`);
      const nextBtn = section?.querySelector(`[data-carousel-next="${category}"]`);

      // Arrow navigation with event delegation
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
      }

      // Throttled scroll handler for performance
      const throttledScrollHandler = this.throttle(() => {
        this.updateCarouselScrollState(track);
      }, 50);

      track.addEventListener('scroll', throttledScrollHandler, { passive: true });

      // Initialize touch support for better mobile scrolling
      this.initCarouselTouchSupport(track);

      // Mark as initialized
      this.initializedCarousels.add(category);

      // Initial state update
      this.updateCarouselScrollState(track);
    });
  },

  /**
   * Update carousel scroll state (button states and fade indicators)
   * @param {HTMLElement} track - The carousel track element
   */
  updateCarouselScrollState(track) {
    const category = track.dataset.carousel;
    const section = track.closest('.style-category-section');
    const prevBtn = section?.querySelector(`[data-carousel-prev="${category}"]`);
    const nextBtn = section?.querySelector(`[data-carousel-next="${category}"]`);

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const atStart = scrollLeft <= 10;
    const atEnd = scrollLeft >= scrollWidth - clientWidth - 10;

    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;

    // Update fade indicators on section
    if (section) {
      section.classList.toggle('scroll-left', !atStart);
      section.classList.toggle('scroll-right', !atEnd);
    }
  },

  /**
   * Clear carousel tracking (call when categories change)
   */
  clearCarouselTracking() {
    this.initializedCarousels.clear();
  },

  /**
   * Initialize touch/swipe support for carousels
   * Improves scroll feel on mobile devices
   * @param {HTMLElement} track - The carousel track element
   */
  initCarouselTouchSupport(track) {
    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;
    let velocity = 0;
    let lastX = 0;
    let lastTime = 0;

    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].pageX;
      startScrollLeft = track.scrollLeft;
      lastX = startX;
      lastTime = Date.now();
      velocity = 0;
      track.style.scrollBehavior = 'auto';
      track.style.scrollSnapType = 'none';
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const x = e.touches[0].pageX;
      const now = Date.now();
      const dt = now - lastTime;

      if (dt > 0) {
        velocity = (x - lastX) / dt;
      }

      lastX = x;
      lastTime = now;

      const walk = startX - x;
      track.scrollLeft = startScrollLeft + walk;
    };

    const handleTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      // Apply momentum scrolling
      const momentumDistance = velocity * 150;
      const targetScroll = track.scrollLeft - momentumDistance;

      track.style.scrollBehavior = 'smooth';
      track.scrollLeft = targetScroll;

      // Re-enable scroll snap after momentum
      setTimeout(() => {
        track.style.scrollSnapType = 'x proximity';
      }, 300);
    };

    track.addEventListener('touchstart', handleTouchStart, { passive: true });
    track.addEventListener('touchmove', handleTouchMove, { passive: true });
    track.addEventListener('touchend', handleTouchEnd, { passive: true });
    track.addEventListener('touchcancel', handleTouchEnd, { passive: true });
  },
  
  /**
   * Render recipe stack
   */
  renderStack() {
    const { stackList, totalCount } = this.elements;
    if (!stackList || !totalCount) return;

    const total = StyleyeSState.getTotalCount();
    totalCount.textContent = `${total} / 8`;

    if (total === 0) {
      stackList.innerHTML = '<span class="stack-empty">Tap styles or lighting to build your recipe</span>';
      return;
    }

    const controlIcon = this.getCategoryIconSync(StyleyeSConfig.stackIcons.control);
    const styleIcon = this.getCategoryIconSync(StyleyeSConfig.stackIcons.style);

    let html = '';

    // Render controls first
    StyleyeSState.controlStack.forEach(id => {
      const item = StyleyeSData.getControlById(id);
      if (item) {
        html += `
          <div class="stack-row type-control">
            <div class="row-info">
              <span class="row-icon">${controlIcon}</span>
              <span class="row-name">${item.name}</span>
            </div>
            <button class="row-remove" data-remove-ctrl="${id}" aria-label="Remove ${item.name}">×</button>
          </div>
        `;
      }
    });

    // Render styles
    StyleyeSState.stack.forEach(id => {
      const item = StyleyeSData.getStyleById(id);
      if (item) {
        html += `
          <div class="stack-row type-style">
            <div class="row-info">
              <span class="row-icon">${styleIcon}</span>
              <span class="row-name">${item.name}</span>
            </div>
            <button class="row-remove" data-remove-style="${id}" aria-label="Remove ${item.name}">×</button>
          </div>
        `;
      }
    });

    stackList.innerHTML = html;
  },
  
  /**
   * Render history modal content
   */
  renderHistory() {
    const { historyList } = this.elements;
    if (!historyList) return;
    
    if (StyleyeSState.history.length === 0) {
      historyList.innerHTML = '<p class="history-empty">No history yet</p>';
      return;
    }
    
    const copyIcon = this.getUIIconSync(StyleyeSConfig.uiIcons.copy);
    const clearIcon = this.getUIIconSync(StyleyeSConfig.uiIcons.clear);

    historyList.innerHTML = StyleyeSState.history.map((h, i) => `
      <div class="history-item">
        <div class="history-meta">
          <span class="history-time">${new Date(h.timestamp).toLocaleString()}</span>
          <span class="history-model">${this.escapeHtml(this.getModelName(h.model))}</span>
        </div>
        <div class="history-prompt">${this.escapeHtml(h.prompt)}</div>
        <div class="history-actions">
          <button data-action="copy" data-index="${i}"><span class="btn-icon">${copyIcon}</span> Copy</button>
          <button data-action="delete" data-index="${i}"><span class="btn-icon">${clearIcon}</span> Delete</button>
        </div>
      </div>
    `).join('');
  },
  
  /**
   * Update prompt output
   */
  updateOutput() {
    const { subject, weight, controlWeight, promptOutput } = this.elements;
    if (!promptOutput) return;
    
    const subjectText = subject ? subject.value.trim() : '';
    const modelId = StyleyeSState.currentModel || StyleyeSConfig.DEFAULT_MODEL;
    const styleWeight = weight ? parseInt(weight.value) : StyleyeSConfig.DEFAULT_STYLE_WEIGHT;
    const ctrlWeight = controlWeight ? parseInt(controlWeight.value) : StyleyeSConfig.DEFAULT_CONTROL_WEIGHT;
    
    // Check if we have anything to generate
    if (StyleyeSState.inputMode === 'text' && !subjectText && 
        StyleyeSState.stack.length === 0 && StyleyeSState.controlStack.length === 0) {
      promptOutput.textContent = 'Your vivid prompt will appear here...';
      return;
    }
    
    // Collect tags
    let tags = [];
    
    // Add control tags
    StyleyeSState.controlStack.forEach(id => {
      const ctrl = StyleyeSData.getControlById(id);
      if (ctrl) {
        const count = Math.max(1, Math.ceil(ctrl.tags.length * (ctrlWeight / 10)));
        tags.push(...ctrl.tags.slice(0, count));
      }
    });
    
    // Add style tags
    StyleyeSState.stack.forEach(id => {
      const style = StyleyeSData.getStyleById(id);
      if (style) {
        const count = Math.max(1, Math.ceil(style.tags.length * (styleWeight / 10)));
        tags.push(...style.tags.slice(0, count));
      }
    });
    
    // Deduplicate tags
    const uniqueTags = [...new Set(tags)];
    
    // Get model config
    const modelInfo = StyleyeSConfig.modelConfig[modelId] || StyleyeSConfig.modelConfig[StyleyeSConfig.DEFAULT_MODEL];
    
    // Build prompt
    let prompt = '';
    
    if (StyleyeSState.inputMode === 'image') {
      prompt = modelInfo.refPrefix;
      prompt += uniqueTags.length > 0 ? uniqueTags.join(', ') : 'original style';
    } else {
      prompt = subjectText || '[Your subject here]';
      if (uniqueTags.length > 0) {
        prompt += ', ' + uniqueTags.join(', ');
      }
    }
    
    // Append aspect ratio
    if (modelInfo.arStyle === 'natural') {
      const arObj = StyleyeSConfig.aspectRatios.find(a => a.id === StyleyeSState.currentAR);
      const arLabel = arObj ? (arObj.name || arObj.label) : StyleyeSState.currentAR;
      prompt += modelInfo.arParam + arLabel;
    } else {
      prompt += modelInfo.arParam + StyleyeSState.currentAR;
    }
    
    // Append suffix
    prompt += modelInfo.suffix;
    
    promptOutput.textContent = prompt;
  },
  
  /**
   * Toggle input mode (text/image)
   * @param {string} mode - 'text' or 'image'
   */
  toggleInputMode(mode) {
    StyleyeSState.inputMode = mode;
    
    const { modeText, modeImage, subject, imageZone } = this.elements;
    
    if (mode === 'text') {
      if (modeText) modeText.classList.add('active');
      if (modeImage) modeImage.classList.remove('active');
      if (subject) subject.style.display = 'block';
      if (imageZone) imageZone.classList.remove('active');
    } else {
      if (modeText) modeText.classList.remove('active');
      if (modeImage) modeImage.classList.add('active');
      if (subject) subject.style.display = 'none';
      if (imageZone) imageZone.classList.add('active');
    }
    
    this.updateOutput();
  },
  
  /**
   * Switch picker mode (styles/controls)
   * @param {string} mode - 'styles' or 'controls'
   */
  switchPickerMode(mode) {
    StyleyeSState.pickerMode = mode;
    
    const { tabStyles, tabControls } = this.elements;
    
    if (tabStyles) tabStyles.className = `tab-btn ${mode === 'styles' ? 'active' : ''}`;
    if (tabControls) tabControls.className = `tab-btn ${mode === 'controls' ? 'active' : ''}`;
    
    // Reset category selection
    if (mode === 'styles') {
      StyleyeSState.activeCategory = 'all';
    } else {
      StyleyeSState.controlActiveCategory = 'all';
    }
    
    this.renderCategories();
    this.renderGrid();
  },
  
  // Toast timer reference
  _toastTimer: null,

  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - 'ok' or 'warn'
   */
  showToast(message, type = 'ok') {
    const { toast } = this.elements;
    if (!toast) return;

    // Clear any pending toast timer to prevent stacking
    if (this._toastTimer) {
      clearTimeout(this._toastTimer);
      this._toastTimer = null;
    }

    toast.textContent = message;
    toast.style.borderColor = type === 'ok' ? 'var(--success)' : 'var(--warn)';
    toast.style.color = type === 'ok' ? 'var(--success)' : 'var(--warn)';
    toast.classList.add('show');

    this._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      this._toastTimer = null;
    }, 2000);
  },
  
  /**
   * Show modal
   * @param {string} modalId - Modal element ID
   */
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('show');
  },
  
  /**
   * Hide modal
   * @param {string} modalId - Modal element ID
   */
  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  },
  
  /**
   * Handle image selection with aspect-ratio preservation
   * @param {File} file - Selected file
   */
  handleImageSelect(file) {
    if (!file) return;

    // Validate file type (MIME type - more secure than extension)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      this.showToast('⚠️ Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG', 'warn');
      return;
    }

    // Validate file size (10MB limit to prevent DoS)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      this.showToast('⚠️ File too large. Max size: 10MB', 'warn');
      return;
    }

    const { imgPreview, imageZone, removeImg } = this.elements;

    const reader = new FileReader();

    // Add error handler for FileReader
    reader.onerror = () => {
      this.showToast('⚠️ Failed to read file', 'warn');
    };

    reader.onload = (e) => {
      // Create temporary image to get natural dimensions
      const tempImg = new Image();
      tempImg.onload = () => {
        const aspectRatio = tempImg.naturalWidth / tempImg.naturalHeight;

        // Apply aspect ratio as CSS custom property for container sizing
        if (imageZone) {
          imageZone.style.setProperty('--img-aspect-ratio', aspectRatio.toFixed(4));
          imageZone.classList.add('has-image');
        }

        if (imgPreview) {
          imgPreview.src = e.target.result;
          imgPreview.style.display = 'block';
        }

        // Hide placeholder elements
        if (removeImg) removeImg.style.display = 'flex';
        this.hideZonePlaceholders();

        StyleyeSState.hasImage = true;
        this.updateOutput();
      };
      tempImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
  },

  /**
   * Hide zone placeholder elements
   */
  hideZonePlaceholders() {
    if (!this.zoneElements) {
      this.zoneElements = {
        icon: document.querySelector('.zone-icon'),
        text: document.querySelector('.zone-text'),
        sub: document.querySelector('.zone-sub')
      };
    }
    const { icon, text, sub } = this.zoneElements;
    if (icon) icon.style.display = 'none';
    if (text) text.style.display = 'none';
    if (sub) sub.style.display = 'none';
  },

  /**
   * Show zone placeholder elements
   */
  showZonePlaceholders() {
    if (!this.zoneElements) {
      this.zoneElements = {
        icon: document.querySelector('.zone-icon'),
        text: document.querySelector('.zone-text'),
        sub: document.querySelector('.zone-sub')
      };
    }
    const { icon, text, sub } = this.zoneElements;
    if (icon) icon.style.display = 'block';
    if (text) text.style.display = 'block';
    if (sub) sub.style.display = 'block';
  },
  
  /**
   * Remove selected image
   * @param {Event} e - Event object
   */
  removeImage(e) {
    if (e) e.stopPropagation();

    const { imgInput, imgPreview, imageZone, removeImg } = this.elements;

    if (imgInput) imgInput.value = '';
    if (imgPreview) {
      imgPreview.src = '';
      imgPreview.style.display = 'none';
    }
    if (imageZone) {
      imageZone.classList.remove('has-image');
      imageZone.style.removeProperty('--img-aspect-ratio');
    }
    if (removeImg) removeImg.style.display = 'none';

    // Show placeholder elements
    this.showZonePlaceholders();

    StyleyeSState.hasImage = false;
    this.updateOutput();
  },
  
  /**
   * Initialize UI icons by injecting SVG content into icon containers
   */
  initUIIcons() {
    const iconElements = document.querySelectorAll('[data-ui-icon]');
    iconElements.forEach(el => {
      const iconName = el.dataset.uiIcon;
      const iconPath = StyleyeSConfig.uiIcons[iconName];
      if (iconPath) {
        el.innerHTML = this.getUIIconSync(iconPath);
      }
    });
  },

  /**
   * Render all UI components
   * Preloads icons before rendering for optimal performance
   */
  async renderAll() {
    // Preload icons first for smooth rendering
    await this.preloadIcons();

    // Initialize UI icons
    this.initUIIcons();

    this.renderAspectRatios();
    this.renderModelDropdown();
    this.renderCategories();
    this.renderGrid();
    this.renderStack();
    this.updateOutput();
  },
  
  /**
   * Escape HTML for safe rendering
   * @param {string} str - String to escape
   * @returns {string} Escaped string
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  },

  /**
   * Sanitize attribute values to prevent XSS in data attributes
   * @param {string} value - Attribute value to sanitize
   * @returns {string} Sanitized value
   */
  sanitizeAttr(value) {
    if (typeof value !== 'string') return '';
    // Remove quotes and angle brackets to prevent breaking out of attributes
    return value.replace(/["'<>]/g, '');
  }
};
