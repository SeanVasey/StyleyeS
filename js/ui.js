/**
 * StyleyeS v1.8 — UI Module
 * Rendering and DOM manipulation
 */

const StyleyeSUI = {
  // DOM Element References (cached)
  elements: {},
  aspectRatioState: {
    sliderValue: 50,
    isDragging: false
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
      categories: document.getElementById('categories'),
      grid: document.getElementById('grid'),
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
      modelDropdownIcon.innerHTML = model.icon;
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

    return `
      <button class="model-card ${isSelected ? 'selected' : ''}" type="button" data-model="${sanitizedId}" role="option" aria-selected="${isSelected}">
        <div class="model-card-header">
          <span class="model-card-icon" aria-hidden="true">${model.icon}</span>
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
      aspectRatioRange,
      aspectRatioLabel,
      aspectRatioPreview,
      aspectRatioReset,
      aspectRatioFill,
      aspectRatioThumb
    } = this.elements;

    const sliderValue = this.aspectRatioState.sliderValue;
    const currentRatio = this.getRatioFromSlider(sliderValue);
    const nearest = this.getNearestAspectRatio(sliderValue);
    const currentCategory = this.getCategoryFromSlider(sliderValue);
    const shapeSize = this.getPreviewSize(currentRatio);

    if (aspectRatioRange) {
      aspectRatioRange.value = sliderValue;
      aspectRatioRange.setAttribute('aria-valuetext', nearest.label);
    }

    if (aspectRatioLabel) {
      aspectRatioLabel.textContent = nearest.label;
    }

    if (aspectRatioPreview) {
      aspectRatioPreview.style.width = `${shapeSize.width}px`;
      aspectRatioPreview.style.height = `${shapeSize.height}px`;
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
    const maxDimension = 60; // TODO: Move to StyleyeSConfig as AR_PREVIEW_MAX_DIMENSION
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
    
    let cats, activeCat, emojiMap;
    
    if (StyleyeSState.pickerMode === 'styles') {
      cats = ['all', ...StyleyeSData.getStyleCategories()];
      activeCat = StyleyeSState.activeCategory;
      emojiMap = StyleyeSConfig.categoryEmojis;
    } else {
      cats = ['all', ...StyleyeSData.getControlCategories()];
      activeCat = StyleyeSState.controlActiveCategory;
      emojiMap = StyleyeSConfig.controlCategoryEmojis;
    }
    
    categories.innerHTML = cats.map(cat => {
      const emoji = cat === 'all' 
        ? (StyleyeSState.pickerMode === 'styles' ? '✨' : '🧩') 
        : emojiMap[cat] || '';
      const label = cat === 'all' ? 'All' : cat;
      return `<button class="cat-btn ${cat === activeCat ? 'active' : ''}" data-cat="${cat}">${emoji} ${label}</button>`;
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
   * Render styles/controls grid
   */
  renderGrid() {
    const { grid } = this.elements;
    if (!grid) return;

    let items, stackIds;

    if (StyleyeSState.pickerMode === 'styles') {
      const cat = StyleyeSState.activeCategory;
      if (cat === 'favorites') {
        items = StyleyeSData.styles.filter(s => StyleyeSState.favorites.includes(s.id));
      } else {
        items = StyleyeSData.getStylesByCategory(cat);
      }
      stackIds = StyleyeSState.stack;
    } else {
      items = StyleyeSData.getControlsByCategory(StyleyeSState.controlActiveCategory);
      stackIds = StyleyeSState.controlStack;
    }

    if (items.length === 0) {
      grid.innerHTML = '<p style="color:var(--t3);grid-column:1/-1;text-align:center;padding:2rem;">No items found.</p>';
      return;
    }

    grid.innerHTML = items.map(item => {
      const isFav = StyleyeSState.favorites.includes(item.id);
      const isSelected = stackIds.includes(item.id);

      const favBtn = StyleyeSState.pickerMode === 'styles' ? `
        <button class="card-fav ${isFav ? 'active' : ''}" data-fav="${item.id}" aria-label="Toggle favorite">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </button>
      ` : '';

      // Generate visual preview from item.preview data
      const preview = item.preview || { colors: ['#2a2a3e', '#3a3a4e'], effect: 'default', pattern: 'none' };
      const gradient = this.generatePreviewGradient(preview.colors, preview.effect);
      const pattern = this.generatePatternCSS(preview.pattern);
      const effectClass = preview.effect ? `effect-${preview.effect}` : '';

      // Generate sample tags for hover tooltip
      const sampleTags = item.tags ? item.tags.slice(0, 3).join(', ') : '';

      return `
        <div class="card-item ${isSelected ? 'selected' : ''} ${effectClass}" data-id="${item.id}" data-effect="${preview.effect || 'default'}">
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
          ${favBtn}
          <div class="card-content">
            <div class="card-name">${item.name}</div>
            <div class="card-sub">${item.category}</div>
          </div>
        </div>
      `;
    }).join('');
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
              <span class="row-icon">💡</span>
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
              <span class="row-icon">🎨</span>
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
    
    historyList.innerHTML = StyleyeSState.history.map((h, i) => `
      <div class="history-item">
        <div class="history-meta">
          <span class="history-time">${new Date(h.timestamp).toLocaleString()}</span>
          <span class="history-model">${this.escapeHtml(this.getModelName(h.model))}</span>
        </div>
        <div class="history-prompt">${this.escapeHtml(h.prompt)}</div>
        <div class="history-actions">
          <button data-action="copy" data-index="${i}">📋 Copy</button>
          <button data-action="delete" data-index="${i}">🗑️ Delete</button>
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
    toast.style.borderColor = type === 'ok' ? 'var(--success)' : 'var(--warn)';
    toast.style.color = type === 'ok' ? 'var(--success)' : 'var(--warn)';
    toast.classList.add('show');
    
    setTimeout(() => toast.classList.remove('show'), 2000);
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
   * Handle image selection
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

    // Cache zone elements to avoid multiple queries
    if (!this.zoneElements) {
      this.zoneElements = {
        icon: document.querySelector('.zone-icon'),
        text: document.querySelector('.zone-text'),
        sub: document.querySelector('.zone-sub')
      };
    }

    const { icon: zoneIcon, text: zoneText, sub: zoneSub } = this.zoneElements;

    const reader = new FileReader();

    // Add error handler for FileReader
    reader.onerror = () => {
      this.showToast('⚠️ Failed to read file', 'warn');
    };

    reader.onload = (e) => {
      if (imgPreview) {
        imgPreview.src = e.target.result;
        imgPreview.style.display = 'block';
      }
      if (imageZone) imageZone.classList.add('has-image');
      if (removeImg) removeImg.style.display = 'flex';
      if (zoneIcon) zoneIcon.style.display = 'none';
      if (zoneText) zoneText.style.display = 'none';
      if (zoneSub) zoneSub.style.display = 'none';

      StyleyeSState.hasImage = true;
      this.updateOutput();
    };

    reader.readAsDataURL(file);
  },
  
  /**
   * Remove selected image
   * @param {Event} e - Event object
   */
  removeImage(e) {
    if (e) e.stopPropagation();

    const { imgInput, imgPreview, imageZone, removeImg } = this.elements;

    // Cache zone elements to avoid multiple queries
    if (!this.zoneElements) {
      this.zoneElements = {
        icon: document.querySelector('.zone-icon'),
        text: document.querySelector('.zone-text'),
        sub: document.querySelector('.zone-sub')
      };
    }

    const { icon: zoneIcon, text: zoneText, sub: zoneSub } = this.zoneElements;

    if (imgInput) imgInput.value = '';
    if (imgPreview) {
      imgPreview.src = '';
      imgPreview.style.display = 'none';
    }
    if (imageZone) imageZone.classList.remove('has-image');
    if (removeImg) removeImg.style.display = 'none';
    if (zoneIcon) zoneIcon.style.display = 'block';
    if (zoneText) zoneText.style.display = 'block';
    if (zoneSub) zoneSub.style.display = 'block';

    StyleyeSState.hasImage = false;
    this.updateOutput();
  },
  
  /**
   * Render all UI components
   */
  renderAll() {
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
