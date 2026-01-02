/**
 * StyleyeS v1.5 — Event Handlers
 * User interaction and event binding
 */

const StyleyeSHandlers = {
  /**
   * Bind all event listeners
   */
  bindAll() {
    this.bindModeSwitch();
    this.bindImageUpload();
    this.bindAspectRatios();
    this.bindPickerTabs();
    this.bindCategories();
    this.bindGrid();
    this.bindStack();
    this.bindInputs();
    this.bindUtilityButtons();
    this.bindModal();
    this.bindExportImport();
  },
  
  /**
   * Bind mode switch buttons
   */
  bindModeSwitch() {
    const { modeText, modeImage } = StyleyeSUI.elements;
    
    if (modeText) {
      modeText.addEventListener('click', () => StyleyeSUI.toggleInputMode('text'));
    }
    
    if (modeImage) {
      modeImage.addEventListener('click', () => StyleyeSUI.toggleInputMode('image'));
    }
  },
  
  /**
   * Bind image upload interactions
   */
  bindImageUpload() {
    const { imageZone, imgInput, removeImg } = StyleyeSUI.elements;
    
    if (imageZone) {
      // Click to upload
      imageZone.addEventListener('click', (e) => {
        if (e.target.id !== 'removeImg' && imgInput) {
          imgInput.click();
        }
      });
      
      // Drag and drop
      imageZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageZone.style.borderColor = 'var(--c1)';
      });
      
      imageZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        imageZone.style.borderColor = 'var(--border)';
      });
      
      imageZone.addEventListener('drop', (e) => {
        e.preventDefault();
        imageZone.style.borderColor = 'var(--border)';
        if (e.dataTransfer.files.length) {
          StyleyeSUI.handleImageSelect(e.dataTransfer.files[0]);
        }
      });
    }
    
    if (imgInput) {
      imgInput.addEventListener('change', (e) => {
        StyleyeSUI.handleImageSelect(e.target.files[0]);
      });
    }
    
    if (removeImg) {
      removeImg.addEventListener('click', (e) => StyleyeSUI.removeImage(e));
    }
  },
  
  /**
   * Bind aspect ratio toolbar
   */
  bindAspectRatios() {
    const { arToolbar } = StyleyeSUI.elements;
    
    if (arToolbar) {
      arToolbar.addEventListener('click', (e) => {
        const btn = e.target.closest('.ar-btn');
        if (!btn) return;
        
        const ar = btn.dataset.ar;
        StyleyeSState.setAspectRatio(ar);
        StyleyeSUI.renderAspectRatios();
        StyleyeSUI.updateOutput();
      });
    }
  },
  
  /**
   * Bind picker tab buttons
   */
  bindPickerTabs() {
    const { tabStyles, tabControls } = StyleyeSUI.elements;
    
    if (tabStyles) {
      tabStyles.addEventListener('click', () => StyleyeSUI.switchPickerMode('styles'));
    }
    
    if (tabControls) {
      tabControls.addEventListener('click', () => StyleyeSUI.switchPickerMode('controls'));
    }
  },
  
  /**
   * Bind category buttons
   */
  bindCategories() {
    const { categories } = StyleyeSUI.elements;
    
    if (categories) {
      categories.addEventListener('click', (e) => {
        if (e.target.classList.contains('cat-btn')) {
          const cat = e.target.dataset.cat;
          
          if (StyleyeSState.pickerMode === 'styles') {
            StyleyeSState.activeCategory = cat;
          } else {
            StyleyeSState.controlActiveCategory = cat;
          }
          
          StyleyeSUI.renderCategories();
          StyleyeSUI.renderGrid();
        }
      });
    }
  },
  
  /**
   * Bind grid interactions (card selection, favorites)
   */
  bindGrid() {
    const { grid } = StyleyeSUI.elements;
    
    if (grid) {
      grid.addEventListener('click', (e) => {
        // Check for favorite button click
        const favBtn = e.target.closest('.card-fav');
        if (favBtn) {
          e.stopPropagation();
          const id = favBtn.dataset.fav;
          StyleyeSState.toggleFavorite(id);
          StyleyeSUI.renderGrid();
          return;
        }
        
        // Check for card click
        const card = e.target.closest('.card-item');
        if (card) {
          const id = card.dataset.id;
          
          if (StyleyeSState.pickerMode === 'styles') {
            const result = StyleyeSState.toggleStyle(id);
            if (!result.success) {
              StyleyeSUI.showToast(`⚠️ ${result.message}`, 'warn');
              return;
            }
          } else {
            const result = StyleyeSState.toggleControl(id);
            if (!result.success) {
              StyleyeSUI.showToast(`⚠️ ${result.message}`, 'warn');
              return;
            }
          }
          
          StyleyeSUI.renderGrid();
          StyleyeSUI.renderStack();
          StyleyeSUI.updateOutput();
        }
      });
    }
  },
  
  /**
   * Bind stack remove buttons
   */
  bindStack() {
    const { stackList } = StyleyeSUI.elements;
    
    if (stackList) {
      stackList.addEventListener('click', (e) => {
        const styleId = e.target.dataset.removeStyle;
        const ctrlId = e.target.dataset.removeCtrl;
        
        if (styleId) {
          StyleyeSState.removeStyle(styleId);
        } else if (ctrlId) {
          StyleyeSState.removeControl(ctrlId);
        } else {
          return;
        }
        
        StyleyeSUI.renderGrid();
        StyleyeSUI.renderStack();
        StyleyeSUI.updateOutput();
      });
    }
  },
  
  /**
   * Bind input fields
   */
  bindInputs() {
    const { subject, model, weight, weightValue, controlWeight, controlWeightValue } = StyleyeSUI.elements;
    
    // Subject input
    if (subject) {
      subject.addEventListener('input', () => StyleyeSUI.updateOutput());
    }
    
    // Model select
    if (model) {
      model.addEventListener('change', () => StyleyeSUI.updateOutput());
    }
    
    // Style weight slider
    if (weight && weightValue) {
      weight.addEventListener('input', () => {
        weightValue.textContent = weight.value;
        StyleyeSUI.updateOutput();
      });
      
      weight.addEventListener('change', () => StyleyeSState.save());
    }
    
    // Control weight slider
    if (controlWeight && controlWeightValue) {
      controlWeight.addEventListener('input', () => {
        controlWeightValue.textContent = controlWeight.value;
        StyleyeSUI.updateOutput();
      });
      
      controlWeight.addEventListener('change', () => StyleyeSState.save());
    }
  },
  
  /**
   * Bind utility buttons (copy, clear, history, favorites)
   */
  bindUtilityButtons() {
    // Copy button
    const btnCopy = document.getElementById('btnCopy');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => this.handleCopy());
    }
    
    // Clear button
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
      btnClear.addEventListener('click', () => this.handleClear());
    }
    
    // History button
    const btnHistory = document.getElementById('btnHistory');
    if (btnHistory) {
      btnHistory.addEventListener('click', () => {
        StyleyeSUI.renderHistory();
        StyleyeSUI.showModal('historyModal');
      });
    }
    
    // Favorites button
    const btnFavorites = document.getElementById('btnFavorites');
    if (btnFavorites) {
      btnFavorites.addEventListener('click', () => {
        StyleyeSUI.switchPickerMode('styles');
        StyleyeSState.activeCategory = 'favorites';
        StyleyeSUI.renderCategories();
        StyleyeSUI.renderGrid();
      });
    }
  },
  
  /**
   * Handle copy action
   */
  handleCopy() {
    const { promptOutput, model } = StyleyeSUI.elements;
    if (!promptOutput) return;
    
    const prompt = promptOutput.textContent;
    if (prompt.includes('Your vivid prompt')) return;
    
    navigator.clipboard.writeText(prompt).then(() => {
      // Add to history
      StyleyeSState.addHistory({
        prompt,
        model: model ? model.value : 'unknown'
      });
      
      StyleyeSUI.showToast('✅ Copied!');
    }).catch(() => {
      StyleyeSUI.showToast('⚠️ Copy failed', 'warn');
    });
  },
  
  /**
   * Handle clear action
   */
  handleClear() {
    // Reset state
    StyleyeSState.stack = [];
    StyleyeSState.controlStack = [];
    StyleyeSState.currentAR = StyleyeSConfig.DEFAULT_AR;
    
    // Reset inputs
    const { subject, weight, weightValue, controlWeight, controlWeightValue } = StyleyeSUI.elements;
    
    if (subject) subject.value = '';
    if (weight) weight.value = StyleyeSConfig.DEFAULT_STYLE_WEIGHT;
    if (weightValue) weightValue.textContent = StyleyeSConfig.DEFAULT_STYLE_WEIGHT;
    if (controlWeight) controlWeight.value = StyleyeSConfig.DEFAULT_CONTROL_WEIGHT;
    if (controlWeightValue) controlWeightValue.textContent = StyleyeSConfig.DEFAULT_CONTROL_WEIGHT;
    
    // Remove image
    StyleyeSUI.removeImage();
    
    // Save and re-render
    StyleyeSState.save();
    StyleyeSUI.renderAll();
  },
  
  /**
   * Bind modal interactions
   */
  bindModal() {
    const { historyModal, historyList } = StyleyeSUI.elements;
    
    // Close button
    const closeHistory = document.getElementById('closeHistory');
    if (closeHistory) {
      closeHistory.addEventListener('click', () => {
        StyleyeSUI.hideModal('historyModal');
      });
    }
    
    // Click outside to close
    if (historyModal) {
      historyModal.addEventListener('click', (e) => {
        if (e.target === historyModal) {
          StyleyeSUI.hideModal('historyModal');
        }
      });
    }
    
    // History actions
    if (historyList) {
      historyList.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const action = btn.dataset.action;
        const index = parseInt(btn.dataset.index, 10);

        if (isNaN(index) || index < 0) return;

        if (action === 'copy') {
          const historyItem = StyleyeSState.history[index];
          if (historyItem && historyItem.prompt) {
            navigator.clipboard.writeText(historyItem.prompt).then(() => {
              StyleyeSUI.showToast('✅ Copied!');
            }).catch(() => {
              StyleyeSUI.showToast('⚠️ Copy failed', 'warn');
            });
          }
        } else if (action === 'delete') {
          StyleyeSState.removeHistory(index);
          StyleyeSUI.renderHistory();
        }
      });
    }
  },
  
  /**
   * Bind export/import buttons
   */
  bindExportImport() {
    const btnExport = document.getElementById('btnExport');
    const btnImport = document.getElementById('btnImport');
    const { importFile } = StyleyeSUI.elements;
    
    // Export
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        const data = StyleyeSState.export();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        try {
          const a = document.createElement('a');
          a.href = url;
          a.download = `styleyes-v${StyleyeSConfig.VERSION}-${Date.now()}.json`;
          a.click();
          StyleyeSUI.showToast('✅ Exported!');
        } finally {
          // Always revoke the object URL to prevent memory leak
          URL.revokeObjectURL(url);
        }
      });
    }
    
    // Import trigger
    if (btnImport && importFile) {
      btnImport.addEventListener('click', () => importFile.click());
    }
    
    // Import handler
    if (importFile) {
      importFile.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type === 'application/json' && !file.name.endsWith('.json')) {
          StyleyeSUI.showToast('⚠️ Please select a JSON file', 'warn');
          e.target.value = '';
          return;
        }

        // Validate file size (max 5MB for import)
        const MAX_IMPORT_SIZE = 5 * 1024 * 1024;
        if (file.size > MAX_IMPORT_SIZE) {
          StyleyeSUI.showToast('⚠️ File too large. Max 5MB', 'warn');
          e.target.value = '';
          return;
        }

        const reader = new FileReader();

        reader.onerror = () => {
          StyleyeSUI.showToast('⚠️ Failed to read file', 'warn');
        };

        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);
            StyleyeSState.import(data);
            StyleyeSUI.renderAll();
            StyleyeSUI.showToast('✅ Imported!');
          } catch (error) {
            console.warn('Import error:', error);
            StyleyeSUI.showToast('⚠️ Invalid file format', 'warn');
          }
        };

        reader.readAsText(file);
        e.target.value = '';
      });
    }
  }
};
