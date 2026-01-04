/**
 * StyleyeS v1.8 — Configuration
 * Model configs, aspect ratios, and constants
 */

const StyleyeSConfig = {
  // Application Version
  VERSION: '1.8.0',
  
  // Storage Keys
  STORAGE_KEY: 'styleyes_v1_state',
  
  // Limits
  MAX_STYLES: 5,
  MAX_CONTROLS: 3,
  MAX_HISTORY: 50,
  
  // Default Values
  DEFAULT_AR: '1:1',
  DEFAULT_MODEL: 'nano-banana-pro',
  DEFAULT_STYLE_WEIGHT: 7,
  DEFAULT_CONTROL_WEIGHT: 6,
  
  // Aspect Ratios
  aspectRatios: [
    { id: '9:16', label: '9:16', ratio: 0.5625, width: 9, height: 16, category: 'portrait' },
    { id: '4:5', label: '4:5', ratio: 0.8, width: 4, height: 5, category: 'portrait' },
    { id: '2:3', label: '2:3', ratio: 0.667, width: 2, height: 3, category: 'portrait' },
    { id: '1:1', label: '1:1', ratio: 1, width: 1, height: 1, category: 'square' },
    { id: '3:2', label: '3:2', ratio: 1.5, width: 3, height: 2, category: 'landscape' },
    { id: '16:9', label: '16:9', ratio: 1.778, width: 16, height: 9, category: 'landscape' },
    { id: '21:9', label: '21:9', ratio: 2.333, width: 21, height: 9, category: 'landscape' }
  ],

  sliderPositions: {
    '9:16': 0,
    '4:5': 12.5,
    '2:3': 25,
    '1:1': 50,
    '3:2': 62.5,
    '16:9': 75,
    '21:9': 100
  },

  models: [
    {
      id: 'nano-banana-pro',
      name: 'Nano Banana Pro',
      description: 'The upgraded successor to Gemini 2.5 Flash Image—built on Gemini 3 Pro, Google\'s flagship model for high-end image generation and editing. It blends real-time knowledge from Google Search with enhanced reasoning, enabling you not only to make images look beautiful, but also to ensure their content is precise and grounded. Optimized for complex creative workflows, delivers High-resolution outputs up to 4K.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      capabilities: {
        speed: '50s',
        quality: 72,
        features: ['4K']
      },
      category: 'sota'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      description: 'A highly artistic model known for its distinctive visual style and aesthetic sense, producing imaginative, detailed, and emotionally expressive images — ideal for creative exploration and concept art.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4L8 20L12 12L20 8L4 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      </svg>`,
      capabilities: {
        speed: '45s',
        quality: 5,
        features: ['×4']
      },
      category: 'sota'
    },
    {
      id: 'seedream-4.5',
      name: 'Seedream 4.5',
      description: 'A next-generation image creation and editing model that delivers highly consistent, production-quality visuals. It excels at preserving reference details during edits, maintaining accurate lighting, texture, and structure while enabling flexible transformations. The model can identify key subjects across multiple images for coherent multi-image editing, and it offers exceptional text rendering for posters, branding, and UI graphics. With stronger visual reasoning and more reliable reference fidelity, Seedream 4.5 provides a powerful, versatile creative workflow for professional content creation.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="4" height="18" fill="currentColor"/>
        <rect x="10" y="8" width="4" height="13" fill="currentColor"/>
        <rect x="17" y="5" width="4" height="16" fill="currentColor"/>
      </svg>`,
      capabilities: {
        speed: '45s',
        quality: 24,
        features: ['4K']
      },
      category: 'sota'
    },
    {
      id: 'gpt-image-1.5',
      name: 'GPT-Image-1.5',
      description: 'A versatile AI model that transforms text and images into high-quality visuals. It excels in generating detailed images across various styles and editing existing ones with precision. Ideal for creative professionals seeking to bring their ideas to life with clarity and artistic flair.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      capabilities: {
        speed: '45s',
        quality: 12,
        features: ['Editing']
      },
      category: 'sota'
    },
    {
      id: 'flux-2-pro',
      name: 'FLUX.2 Pro',
      description: 'A universal image generation model capable of creating a wide variety of visuals. It can produce photorealistic images as well as certain anime-style artworks, offering high versatility, efficiency, and affordability. Perfect for everyday use, content creation, and creative inspiration.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 8V14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      capabilities: {
        speed: '45s',
        quality: 20,
        features: ['Editing']
      },
      category: 'sota'
    },
    {
      id: 'qwen-image',
      name: 'Qwen-Image',
      description: 'A multimodal diffusion model specialized in rendering complex text and creating vivid visuals. It excels at embedding multilingual text in images with accurate typography and layout, while faithfully translating prompts into expressive imagery.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12L22 7" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12V22" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12L2 7" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      capabilities: {
        speed: '35s',
        quality: 10,
        features: []
      },
      category: 'sota'
    },
    {
      id: 'stable-diffusion',
      name: 'Stable Diffusion',
      description: 'Open-source image generation model with extensive community support and customization options. Excellent for fine-tuning and specialized use cases.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
        <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" stroke-dasharray="4 4"/>
      </svg>`,
      capabilities: {
        speed: '30s',
        quality: 15,
        features: ['Custom']
      },
      category: 'standard'
    },
    {
      id: 'leonardo',
      name: 'Leonardo',
      description: 'Creative AI platform specializing in game assets, concept art, and stylized imagery with consistent character generation capabilities.',
      icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="currentColor" stroke-width="2"/>
        <path d="M22 2L12 12" stroke="currentColor" stroke-width="2"/>
      </svg>`,
      capabilities: {
        speed: '40s',
        quality: 18,
        features: ['Assets']
      },
      category: 'standard'
    }
  ],
  
  // Model Configurations
  modelConfig: {
    'nano-banana-pro': {
      suffix: ', highly detailed, pro quality',
      refPrefix: 'Style transfer: ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    midjourney: {
      suffix: ' --v 6 --s 750',
      refPrefix: '[INSERT_IMAGE_URL] ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    'seedream-4.5': {
      suffix: '',
      refPrefix: 'Create an image based on this reference with the following aesthetic: ',
      arParam: ' Aspect Ratio: ',
      arStyle: 'natural'
    },
    'gpt-image-1.5': {
      suffix: '',
      refPrefix: 'Create an image based on this reference with the following aesthetic: ',
      arParam: ' Aspect Ratio: ',
      arStyle: 'natural'
    },
    'flux-2-pro': {
      suffix: ' --style raw',
      refPrefix: 'Apply this style to the attached image: ',
      arParam: ' --ar ',
      arStyle: 'cli'
    },
    'stable-diffusion': {
      suffix: ', masterpiece, best quality, highly detailed',
      refPrefix: 'Style transfer for attached image: ',
      arParam: ' (Aspect Ratio: ',
      arStyle: 'natural'
    },
    'qwen-image': {
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
Object.freeze(StyleyeSConfig.sliderPositions);
StyleyeSConfig.models.forEach(model => {
  Object.freeze(model);
  Object.freeze(model.capabilities);
  Object.freeze(model.capabilities.features);
});
Object.freeze(StyleyeSConfig.models);
Object.freeze(StyleyeSConfig.modelConfig);
Object.freeze(StyleyeSConfig.categoryEmojis);
Object.freeze(StyleyeSConfig.controlCategoryEmojis);
