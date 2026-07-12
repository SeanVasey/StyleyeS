/**
 * StyleyeS v2.2.0 — Event Handlers
 * User interaction and event binding
 *
 * @version 2.2.0
 * @updated 2026-07-12
 */

const StyleyeSHandlers = {
  /**
   * Bind all event listeners
   */
  bindAll() {
    this.bindModeSwitch();
    this.bindImageUpload();
    this.bindAspectRatioSlider();
    this.bindModelDropdown();
    this.bindPickerTabs();
    this.bindCategories();
    this.bindGrid();
    this.bindStack();
    this.bindInputs();
    this.bindUtilityButtons();
    this.bindModal();
    this.bindExportImport();
    this.bindKeyboardShortcuts();
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
   * Bind aspect ratio slider
   */
  bindAspectRatioSlider() {
    const { aspectRatioRange, aspectRatioReset } = StyleyeSUI.elements;

    if (aspectRatioRange) {
      aspectRatioRange.addEventListener('input', (e) => {
        const rawValue = parseFloat(e.target.value);
        const { value, snappedId } = StyleyeSUI.applyAspectRatioMagnet(rawValue);
        StyleyeSUI.triggerAspectRatioHaptics(snappedId);
        StyleyeSUI.setAspectRatioSliderValue(value, true);
      });

      aspectRatioRange.addEventListener('change', () => {
        StyleyeSUI.commitAspectRatioSelection();
      });
    }

    const categoryButtons = document.querySelectorAll('.aspect-ratio-categories .category-btn');
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        if (!category) return;

        if (category === 'portrait') {
          StyleyeSUI.setAspectRatioSliderValue(12.5, false);
          StyleyeSState.setAspectRatio('4:5');
        } else if (category === 'landscape') {
          StyleyeSUI.setAspectRatioSliderValue(75, false);
          StyleyeSState.setAspectRatio('16:9');
        } else {
          StyleyeSUI.setAspectRatioSliderValue(50, false);
          StyleyeSState.setAspectRatio('1:1');
        }

        StyleyeSUI.updateAspectRatioUI();
        StyleyeSUI.updateOutput();
      });
    });

    if (aspectRatioReset) {
      aspectRatioReset.addEventListener('click', () => {
        StyleyeSState.setAspectRatio(StyleyeSConfig.DEFAULT_AR);
        StyleyeSUI.setAspectRatioSliderValue(50, false);
        StyleyeSUI.updateOutput();
      });
    }
  },

  /**
   * Bind model dropdown
   */
  bindModelDropdown() {
    const { modelDropdown, modelDropdownTrigger, modelDropdownPanel } = StyleyeSUI.elements;
    if (!modelDropdown || !modelDropdownTrigger || !modelDropdownPanel) return;

    modelDropdownTrigger.addEventListener('click', () => {
      StyleyeSUI.toggleModelDropdown();
    });

    modelDropdownPanel.addEventListener('click', (e) => {
      const card = e.target.closest('.model-card');
      if (!card) return;

      const modelId = card.dataset.model;
      if (!modelId) return;

      StyleyeSUI.selectModel(modelId);
      StyleyeSUI.closeModelDropdown();
    });

    document.addEventListener('click', (e) => {
      if (!modelDropdown.contains(e.target)) {
        StyleyeSUI.closeModelDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        StyleyeSUI.closeModelDropdown();
      }
    });
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
        const btn = e.target.closest('.cat-btn');
        if (!btn) return;
        const cat = btn.dataset.cat;

        if (StyleyeSState.pickerMode === 'styles') {
          StyleyeSState.activeCategory = cat;
        } else {
          StyleyeSState.controlActiveCategory = cat;
        }

        StyleyeSUI.renderCategories();
        StyleyeSUI.renderGrid();
      });
    }
  },
  
  /**
   * Bind grid/carousel interactions (card selection, favorites)
   */
  bindGrid() {
    const { stylesContainer } = StyleyeSUI.elements;

    if (stylesContainer) {
      stylesContainer.addEventListener('click', (e) => {
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
        const removeBtn = e.target.closest('[data-remove-style], [data-remove-ctrl]');
        if (!removeBtn) return;

        const styleId = removeBtn.dataset.removeStyle;
        const ctrlId = removeBtn.dataset.removeCtrl;

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
    const { subject, weight, weightValue, controlWeight, controlWeightValue } = StyleyeSUI.elements;
    
    // Subject input (debounced for smoother typing, persisted across reloads)
    if (subject) {
      let subjectTimer = null;
      subject.addEventListener('input', () => {
        if (subjectTimer) clearTimeout(subjectTimer);
        subjectTimer = setTimeout(() => {
          StyleyeSUI.updateOutput();
          StyleyeSState.save();
        }, 120);
      });
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
   * Bind global keyboard shortcuts
   */
  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter copies the generated prompt
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        this.handleCopy();
      }
    });
  },

  // Copy button success-state timer reference
  _copyResetTimer: null,

  /**
   * Handle copy action
   */
  handleCopy() {
    const { promptOutput } = StyleyeSUI.elements;
    if (!promptOutput) return;

    const prompt = promptOutput.textContent;
    if (prompt.includes('Your vivid prompt')) return;

    navigator.clipboard.writeText(prompt).then(() => {
      // Add to history
      StyleyeSState.addHistory({
        prompt,
        model: StyleyeSState.currentModel || StyleyeSConfig.DEFAULT_MODEL
      });

      StyleyeSUI.showToast('✅ Copied!');
      this.flashCopySuccess();
    }).catch(() => {
      StyleyeSUI.showToast('⚠️ Copy failed', 'warn');
    });
  },

  /**
   * Briefly show a success state on the copy button
   */
  flashCopySuccess() {
    const btnCopy = document.getElementById('btnCopy');
    if (!btnCopy) return;

    const label = btnCopy.querySelector('.btn-label');

    if (this._copyResetTimer) clearTimeout(this._copyResetTimer);

    btnCopy.classList.add('copied');
    if (label) label.textContent = 'Copied ✓';

    this._copyResetTimer = setTimeout(() => {
      btnCopy.classList.remove('copied');
      if (label) label.textContent = 'Copy';
      this._copyResetTimer = null;
    }, 1500);
  },
  
  /**
   * Handle clear action
   */
  async handleClear() {
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
    await StyleyeSUI.renderAll();
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

    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && historyModal && historyModal.classList.contains('show')) {
        StyleyeSUI.hideModal('historyModal');
      }
    });
    
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

        // Validate file type (MIME type or extension)
        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
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
