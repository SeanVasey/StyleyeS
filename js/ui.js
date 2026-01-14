/**
 * StyleyeS v2.3.0 — UI Module
 * Rendering and DOM manipulation
 *
 * @version 2.3.0
 * @updated 2026-01-13
 * @changelog
 *   - 2.3.0: Added destroyAll() call before re-render to prevent memory leaks
 *   - 2.2.0: Enhanced carousel with front-card focus indicator class
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

  /**
   * Load external SVG icon content
   * @param {string} iconPath - Relative path to icon file
   * @returns {Promise<string>} SVG content
   */
  async loadIcon(iconPath) {
    if (!iconPath) return '';

    const fullPath = StyleyeSConfig.ICON_BASE_PATH + iconPath;

    // Return cached icon if available
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
      // Cache the loaded icon
      this.iconCache[fullPath] = svgContent;
      return svgContent;
    } catch (error) {
      console.warn(`Error loading icon ${fullPath}:`, error);
      return '';
    }
  },

  /**
   * Preload all model icons for better performance
   * @returns {Promise<void>}
   */
  async preloadIcons() {
    const iconPromises = StyleyeSConfig.models.map(model =>
      this.loadIcon(model.iconPath)
    );
    await Promise.all(iconPromises);
  },

  /**
   * Get cached icon or placeholder
   * @param {string} iconPath - Relative path to icon file
   * @returns {string} SVG content or placeholder
   */
  getIconSync(iconPath) {
    if (!iconPath) return '';
    const fullPath = StyleyeSConfig.ICON_BASE_PATH + iconPath;
    return this.iconCache[fullPath] || '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor" opacity="0.3"/></svg>';
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
          <span class="capability-badge quality">${StyleyeSIcons.inline('bolt', 'badge-icon')}${this.escapeHtml(String(model.capabilities.quality))}</span>
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
      let iconHtml;
      if (cat === 'all') {
        iconHtml = StyleyeSState.pickerMode === 'styles'
          ? StyleyeSIcons.inline('sparkles', 'cat-icon')
          : StyleyeSIcons.inline('puzzle', 'cat-icon');
      } else {
        const iconName = iconMap[cat] || '';
        iconHtml = iconName ? StyleyeSIcons.inline(iconName, 'cat-icon') : '';
      }
      const label = cat === 'all' ? 'All' : cat;
      return `<button class="cat-btn ${cat === activeCat ? 'active' : ''}" data-cat="${cat}">${iconHtml} ${label}</button>`;
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

    // Cancel all active carousel animations before destroying DOM
    // Prevents orphaned RAF callbacks and memory leaks
    StyleyeSCarousel.destroyAll();

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

      const iconName = iconMap[category] || 'sparkles';
      const iconHtml = StyleyeSIcons.inline(iconName, 'category-icon');
      const sanitizedCat = this.sanitizeAttr(category);

      return `
        <section class="style-category-section" data-category="${sanitizedCat}">
          <div class="category-header">
            <h3 class="category-title">${iconHtml} ${this.escapeHtml(category)}</h3>
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
        <div class="card-item ${isSelected ? 'selected' : ''}" data-id="${item.id}" data-effect="${preview.effect || 'default'}">
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

  /**
   * Initialize 3D carousel controls for all category sections
   */
  initCarouselControls() {
    const tracks = document.querySelectorAll('.carousel-track');

    tracks.forEach(track => {
      const category = track.dataset.carousel;
      const cards = track.querySelectorAll('.card-item');
      const section = track.closest('.style-category-section');
      const prevBtn = document.querySelector(`[data-carousel-prev="${category}"]`);
      const nextBtn = document.querySelector(`[data-carousel-next="${category}"]`);

      // Initialize physics state
      const state = StyleyeSCarousel.init(category, cards.length);
      if (!state) return;

      // Update callback
      const onUpdate = (s, isFinal) => {
        this.updateCarouselCards(track, s);
        if (isFinal) {
          this.updateCarouselArrows(prevBtn, nextBtn, s);
        }
      };

      // Initial render
      this.updateCarouselCards(track, state);
      this.updateCarouselArrows(prevBtn, nextBtn, state);

      // Mouse events - attach document listeners dynamically to prevent memory leaks
      track.addEventListener('mousedown', (e) => {
        if (e.target.closest('.card-fav')) return; // Don't drag on fav button
        e.preventDefault();
        StyleyeSCarousel.startDrag(state, e.clientX);
        track.style.cursor = 'grabbing';

        // Define handlers scoped to this drag operation
        const handleMouseMove = (moveEvent) => {
          StyleyeSCarousel.moveDrag(state, moveEvent.clientX, onUpdate);
        };

        const handleMouseUp = () => {
          StyleyeSCarousel.endDrag(state, onUpdate);
          track.style.cursor = 'grab';
          // Clean up listeners when drag ends
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        // Attach listeners only during active drag
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      });

      // Touch events - same pattern for touch devices
      track.addEventListener('touchstart', (e) => {
        if (e.target.closest('.card-fav')) return;
        StyleyeSCarousel.startDrag(state, e.touches[0].clientX);

        const handleTouchMove = (moveEvent) => {
          if (state.isDragging) {
            StyleyeSCarousel.moveDrag(state, moveEvent.touches[0].clientX, onUpdate);
          }
        };

        const handleTouchEnd = () => {
          if (state.isDragging) {
            StyleyeSCarousel.endDrag(state, onUpdate);
          }
          // Clean up listeners when touch ends
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
      }, { passive: true });

      // Arrow buttons
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          StyleyeSCarousel.rotateBy(state, -1, onUpdate);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          StyleyeSCarousel.rotateBy(state, 1, onUpdate);
        });
      }
    });
  },

  /**
   * Update card positions based on carousel state
   * @param {HTMLElement} track - Carousel track element
   * @param {Object} state - Carousel state object
   */
  updateCarouselCards(track, state) {
    const cards = track.querySelectorAll('.card-item');

    cards.forEach((card, index) => {
      const itemAngle = index * state.anglePerItem;
      const currentAngle = state.rotation + itemAngle;
      const styles = StyleyeSCarousel.getStyleForAngle(currentAngle);

      // For non-front cards, apply full inline styles
      // For front card, use CSS custom properties so CSS can add hover effects
      if (!styles.isFront) {
        card.style.transform = styles.transform;
      } else {
        // Set base values as CSS custom properties for front card
        // This allows CSS :hover to build on these values
        card.style.setProperty('--carousel-x', `${styles.x.toFixed(1)}px`);
        card.style.setProperty('--carousel-scale', styles.scale.toFixed(3));
        // Set base transform for when not hovering
        card.style.transform = styles.transform;
      }

      card.style.opacity = styles.opacity;
      card.style.filter = styles.filter;
      card.style.zIndex = styles.zIndex;
      card.style.pointerEvents = styles.pointerEvents;

      // Set focus intensity as CSS custom property for hover/selection effects
      card.style.setProperty('--focus-intensity', styles.focusIntensity.toFixed(3));
      card.style.setProperty('--base-lift', `${styles.liftY.toFixed(1)}px`);

      // Toggle carousel-front class based on position
      card.classList.toggle('carousel-front', styles.isFront);
    });
  },

  /**
   * Update arrow button states
   * @param {HTMLElement} prevBtn - Previous button element
   * @param {HTMLElement} nextBtn - Next button element
   * @param {Object} state - Carousel state object
   */
  updateCarouselArrows(prevBtn, nextBtn, state) {
    // In a circular carousel, arrows are always enabled
    if (prevBtn) prevBtn.disabled = false;
    if (nextBtn) nextBtn.disabled = false;
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
    
    let html = '';
    
    // Render controls first
    StyleyeSState.controlStack.forEach(id => {
      const item = StyleyeSData.getControlById(id);
      if (item) {
        html += `
          <div class="stack-row type-control">
            <div class="row-info">
              ${StyleyeSIcons.inline('lightbulb', 'row-icon')}
              <span class="row-name">${item.name}</span>
            </div>
            <button class="row-remove" data-remove-ctrl="${id}" aria-label="Remove ${item.name}">${StyleyeSIcons.get('close')}</button>
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
              ${StyleyeSIcons.inline('palette', 'row-icon')}
              <span class="row-name">${item.name}</span>
            </div>
            <button class="row-remove" data-remove-style="${id}" aria-label="Remove ${item.name}">${StyleyeSIcons.get('close')}</button>
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
    
    historyList.innerHTML = StyleyeSState.history.map((h, i) => `
      <div class="history-item">
        <div class="history-meta">
          <span class="history-time">${new Date(h.timestamp).toLocaleString()}</span>
          <span class="history-model">${this.escapeHtml(this.getModelName(h.model))}</span>
        </div>
        <div class="history-prompt">${this.escapeHtml(h.prompt)}</div>
        <div class="history-actions">
          <button data-action="copy" data-index="${i}">${StyleyeSIcons.inline('clipboard', 'btn-icon')} Copy</button>
          <button data-action="delete" data-index="${i}">${StyleyeSIcons.inline('trash', 'btn-icon')} Delete</button>
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
  
  /**
   * Show toast notification
   * @param {string} message - Message to display
   * @param {string} type - 'ok' or 'warn'
   */
  showToast(message, type = 'ok') {
    const { toast } = this.elements;
    if (!toast) return;

    toast.textContent = message;
    // Use CSS classes instead of inline styles for maintainability
    toast.classList.remove('success', 'warn');
    toast.classList.add(type === 'ok' ? 'success' : 'warn');
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
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
      this.showToast('Invalid file type. Allowed: JPG, PNG, GIF, WebP, SVG', 'warn');
      return;
    }

    // Validate file size (10MB limit to prevent DoS)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      this.showToast('File too large. Max size: 10MB', 'warn');
      return;
    }

    const { imgPreview, imageZone, removeImg } = this.elements;

    const reader = new FileReader();

    // Add error handler for FileReader
    reader.onerror = () => {
      this.showToast('Failed to read file', 'warn');
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
   * Render all UI components
   * Preloads icons before rendering for optimal performance
   */
  async renderAll() {
    // Preload icons first for smooth rendering
    await this.preloadIcons();

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
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
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
