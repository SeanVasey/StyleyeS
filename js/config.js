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

  // Aspect Ratio UI
  AR_PREVIEW_MAX_DIMENSION: 64,
  AR_MAGNET_THRESHOLD: 2.5,
  AR_HAPTIC_DURATION_MS: 12,
  
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
      icon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,0 65,35 100,50 65,65 50,100 35,65 0,50 35,35" fill="currentColor"/>
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
      icon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,80 80,80 70,85 30,85" fill="currentColor"/>
        <polygon points="35,70 55,25 70,70" fill="currentColor"/>
        <polygon points="60,70 80,45 90,70" fill="currentColor"/>
        <path d="M15 90 Q35 95 50 90 T85 90" fill="currentColor"/>
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
      icon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="50" width="15" height="40" fill="currentColor"/>
        <rect x="40" y="35" width="15" height="55" fill="currentColor"/>
        <rect x="65" y="20" width="15" height="70" fill="currentColor"/>
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
      icon: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z" fill="currentColor"/>
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
      icon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="10,90 50,10 90,90" fill="none" stroke="currentColor" stroke-width="10"/>
        <polygon points="35,75 50,40 65,75" fill="none" stroke="currentColor" stroke-width="10"/>
        <line x1="60" y1="75" x2="80" y2="90" stroke="currentColor" stroke-width="10"/>
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
      icon: `<svg viewBox="28.16 17.52 146.66 145.51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M174.82 108.75L155.38 75L165.64 57.75C166.46 56.31 166.46 54.53 165.64 53.09L155.38 35.84C154.86 34.91 153.87 34.33 152.78 34.33H114.88L106.14 19.03C105.62 18.1 104.63 17.52 103.54 17.52H83.3C82.21 17.52 81.22 18.1 80.7 19.03L61.26 52.77H41.02C39.93 52.77 38.94 53.35 38.42 54.28L28.16 71.53C27.34 72.97 27.34 74.75 28.16 76.19L45.52 107.5L36.78 122.8C35.96 124.24 35.96 126.02 36.78 127.46L47.04 144.71C47.56 145.64 48.55 146.22 49.64 146.22H87.54L96.28 161.52C96.8 162.45 97.79 163.03 98.88 163.03H119.12C120.21 163.03 121.2 162.45 121.72 161.52L141.16 127.78H158.52C159.61 127.78 160.6 127.2 161.12 126.27L171.38 109.02C172.2 107.58 172.2 105.8 171.38 104.36L174.82 108.75Z M119.12 163.03H98.88L87.54 144.71H49.64L61.26 126.39H80.7L38.42 55.29H61.26L83.3 19.03L93.56 37.35L83.3 55.29H161.58L151.32 72.54L170.76 106.28H151.32L141.16 88.34L101.18 163.03H119.12Z M127.86 79.83H76.14L101.18 122.11L127.86 79.83Z" fill="currentColor" fill-rule="evenodd"/>
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
