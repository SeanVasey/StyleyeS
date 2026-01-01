/**
 * StyleyeS v1.5 — Configuration
 * Model configs, aspect ratios, and constants
 */

const StyleyeSConfig = {
  // Application Version
  VERSION: '1.5',
  
  // Storage Keys
  STORAGE_KEY: 'styleyes_v1_state',
  
  // Limits
  MAX_STYLES: 5,
  MAX_CONTROLS: 3,
  MAX_HISTORY: 50,
  
  // Default Values
  DEFAULT_AR: '16:9',
  DEFAULT_STYLE_WEIGHT: 7,
  DEFAULT_CONTROL_WEIGHT: 6,
  
  // Aspect Ratios
  aspectRatios: [
    { id: '21:9', label: '21:9', width: 28, height: 12, name: 'Cinema' },
    { id: '16:9', label: '16:9', width: 24, height: 13.5, name: 'Wide' },
    { id: '3:2', label: '3:2', width: 22, height: 15, name: 'Photo' },
    { id: '1:1', label: '1:1', width: 18, height: 18, name: 'Square' },
    { id: '2:3', label: '2:3', width: 15, height: 22, name: 'Portrait' },
    { id: '4:5', label: '4:5', width: 16, height: 20, name: 'Social' },
    { id: '9:16', label: '9:16', width: 13.5, height: 24, name: 'Story' }
  ],
  
  // Model Configurations
  modelConfig: {
    flux: {
      suffix: ' --style raw',
      refPrefix: 'Apply this style to the attached image: ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    midjourney: {
      suffix: ' --v 6 --s 750',
      refPrefix: '[INSERT_IMAGE_URL] ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    sd: {
      suffix: ', masterpiece, best quality, highly detailed',
      refPrefix: 'Style transfer for attached image: ',
      arParam: ' (Aspect Ratio: ',
      arStyle: 'natural'
    },
    gpt15: {
      suffix: '',
      refPrefix: 'Create an image based on this reference with the following aesthetic: ',
      arParam: ' Aspect Ratio: ',
      arStyle: 'natural'
    },
    nano: {
      suffix: ', highly detailed, pro quality',
      refPrefix: 'Style transfer: ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    qwen: {
      suffix: '',
      refPrefix: 'Generate an image with this style: ',
      arParam: ' Aspect Ratio: ',
      arStyle: 'natural'
    },
    leonardo: {
      suffix: ', high quality, detailed',
      refPrefix: 'Image to Image style: ',
      arParam: ' Aspect Ratio: ',
      arStyle: 'natural'
    }
  },
  
  // Category Emojis
  categoryEmojis: {
    'Photo': '📷',
    'Cinematic': '🎬',
    'Art': '🖼️',
    'Digital': '💻',
    'Mood': '🌙',
    'Texture': '🧱',
    'Color': '🎨',
    'Era': '⏳'
  },
  
  controlCategoryEmojis: {
    'Lighting': '💡',
    'White Balance': '⚪️',
    'Anti-Cast': '🧼'
  }
};

// Freeze configuration to prevent mutations
Object.freeze(StyleyeSConfig);
Object.freeze(StyleyeSConfig.aspectRatios);
Object.freeze(StyleyeSConfig.modelConfig);
Object.freeze(StyleyeSConfig.categoryEmojis);
Object.freeze(StyleyeSConfig.controlCategoryEmojis);
