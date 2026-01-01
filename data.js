/**
 * StyleyeS v1.5 — Data
 * Styles and Controls Definitions
 */

const StyleyeSData = {
  // Lighting & White Balance Controls
  controls: [
    // White Balance
    { id: 'wb-neutral-5600', name: 'WB: Neutral 5600K', category: 'White Balance', tags: ['neutral white balance', '5600K', 'accurate color', 'true whites'] },
    { id: 'wb-cool-6500', name: 'WB: Cool 6500K', category: 'White Balance', tags: ['cool daylight', '6500K', 'neutral highlights', 'reduced warm cast'] },
    { id: 'wb-warm-3200', name: 'WB: Warm 3200K', category: 'White Balance', tags: ['tungsten balance', '3200K', 'warm practical lights', 'cozy warm highlights'] },
    { id: 'wb-tint-magenta', name: 'Tint: Magenta Bias', category: 'White Balance', tags: ['slight magenta tint', 'counter green cast', 'neutral midtones'] },
    
    // Anti-Cast
    { id: 'anti-yellow-cast', name: 'No Yellow Cast', category: 'Anti-Cast', tags: ['no yellow tint', 'no sepia', 'neutral whites', 'color-accurate grade'] },
    { id: 'anti-green-cast', name: 'No Green Cast', category: 'Anti-Cast', tags: ['no green tint', 'clean neutrals', 'balanced midtones', 'true skin tones'] },
    
    // Lighting
    { id: 'light-overcast', name: 'Lighting: Overcast', category: 'Lighting', tags: ['soft overcast lighting', 'diffuse light', 'soft shadows', 'low color cast'] },
    { id: 'light-studio-softbox', name: 'Lighting: Softbox', category: 'Lighting', tags: ['studio softbox lighting', 'even key light', 'clean highlights', 'controlled shadows'] },
    { id: 'light-window-north', name: 'Lighting: North Window', category: 'Lighting', tags: ['north-facing window light', 'soft natural daylight', 'gentle falloff', 'true-to-life tones'] },
    { id: 'light-hmi-5600', name: 'Lighting: HMI Daylight', category: 'Lighting', tags: ['HMI daylight lighting', '5600K', 'clean white highlights', 'neutral fill'] },
    { id: 'light-rembrandt', name: 'Lighting: Rembrandt', category: 'Lighting', tags: ['rembrandt lighting', 'chiaroscuro', 'triangle of light', 'dramatic shadows'] },
    { id: 'light-rim', name: 'Lighting: Rim Light', category: 'Lighting', tags: ['rim lighting', 'backlight', 'silhouette edge', 'separation light'] }
  ],
  
  // Art Styles
  styles: [
    // Photo
    { id: 'raw-realism', name: 'Raw Realism', category: 'Photo', tags: ['ultra-realistic', 'photorealistic', 'natural lighting', 'authentic textures', 'sharp focus', 'documentary style'] },
    { id: 'studio-portrait', name: 'Studio Portrait', category: 'Photo', tags: ['studio lighting', 'softbox', 'beauty dish', 'shallow depth of field', 'creamy bokeh', 'rembrandt lighting'] },
    { id: 'street-documentary', name: 'Street Documentary', category: 'Photo', tags: ['candid moment', 'decisive moment', 'urban environment', 'gritty realism', 'high contrast', 'street photography'] },
    { id: 'editorial-fashion', name: 'Editorial Fashion', category: 'Photo', tags: ['high fashion', 'vogue style', 'dramatic lighting', 'bold composition', 'luxury aesthetic', 'avant-garde'] },
    { id: 'macro-detail', name: 'Macro Detail', category: 'Photo', tags: ['extreme close-up', 'macro photography', 'intricate details', 'shallow DOF', 'texture emphasis', 'precise focus'] },
    { id: 'landscape-epic', name: 'Landscape Epic', category: 'Photo', tags: ['sweeping vista', 'golden hour', 'dramatic sky', 'leading lines', 'ansel adams style', 'majestic scale'] },
    { id: 'product-commercial', name: 'Product Commercial', category: 'Photo', tags: ['product photography', 'clean backdrop', 'commercial lighting', 'hero shot', 'advertising style', 'crisp edges'] },
    { id: 'food-culinary', name: 'Food Culinary', category: 'Photo', tags: ['food photography', 'appetizing', 'fresh ingredients', 'styled plating', 'natural window light', 'gourmet presentation'] },
    { id: 'architecture-interior', name: 'Architecture', category: 'Photo', tags: ['architectural photography', 'interior design', 'symmetrical composition', 'wide angle', 'clean lines', 'spatial depth'] },
    { id: 'wildlife-nature', name: 'Wildlife Nature', category: 'Photo', tags: ['wildlife photography', 'natural habitat', 'animal portrait', 'telephoto compression', 'national geographic style'] },
    
    // Cinematic
    { id: 'blockbuster-epic', name: 'Blockbuster Epic', category: 'Cinematic', tags: ['cinematic', 'anamorphic lens flare', 'epic scale', 'dramatic lighting', 'movie still', '35mm film'] },
    { id: 'film-noir', name: 'Film Noir', category: 'Cinematic', tags: ['film noir', 'high contrast', 'dramatic shadows', 'venetian blind lighting', 'moody atmosphere', '1940s cinema'] },
    { id: 'scifi-dystopia', name: 'Sci-Fi Dystopia', category: 'Cinematic', tags: ['sci-fi', 'dystopian', 'blade runner aesthetic', 'neon reflections', 'cyberpunk', 'volumetric fog'] },
    { id: 'wes-anderson', name: 'Wes Anderson', category: 'Cinematic', tags: ['wes anderson style', 'symmetrical framing', 'pastel color palette', 'whimsical', 'centered composition', 'diorama-like'] },
    { id: 'horror-suspense', name: 'Horror Suspense', category: 'Cinematic', tags: ['horror movie', 'suspenseful', 'low-key lighting', 'ominous shadows', 'psychological terror', 'tension-filled'] },
    { id: 'period-drama', name: 'Period Drama', category: 'Cinematic', tags: ['period drama', 'costume design', 'candlelight', 'baroque interior', 'historical accuracy', 'regal atmosphere'] },
    { id: 'indie-film', name: 'Indie Film', category: 'Cinematic', tags: ['indie film', 'naturalistic', 'handheld camera feel', 'available light', 'intimate framing', 'authentic moments'] },
    { id: 'action-thriller', name: 'Action Thriller', category: 'Cinematic', tags: ['action movie', 'dynamic composition', 'motion blur', 'intense lighting', 'high stakes', 'explosive energy'] },
    
    // Art
    { id: 'oil-painting', name: 'Oil Painting', category: 'Art', tags: ['oil painting', 'visible brushstrokes', 'rich pigments', 'classical technique', 'canvas texture', 'chiaroscuro'] },
    { id: 'watercolor-wash', name: 'Watercolor', category: 'Art', tags: ['watercolor', 'soft washes', 'bleeding edges', 'transparent layers', 'wet-on-wet', 'luminous'] },
    { id: 'art-nouveau', name: 'Art Nouveau', category: 'Art', tags: ['art nouveau', 'alphonse mucha style', 'organic curves', 'decorative borders', 'flowing lines', 'belle époque'] },
    { id: 'impressionist', name: 'Impressionist', category: 'Art', tags: ['impressionist', 'monet style', 'dappled light', 'broken color', 'outdoor scene', 'visible brushwork'] },
    { id: 'surrealist', name: 'Surrealist', category: 'Art', tags: ['surrealist', 'salvador dali style', 'dreamlike', 'impossible physics', 'melting forms', 'uncanny'] },
    { id: 'pop-art', name: 'Pop Art', category: 'Art', tags: ['pop art', 'andy warhol style', 'bold colors', 'ben-day dots', 'comic book', 'screen print effect'] },
    { id: 'ukiyo-e', name: 'Ukiyo-e', category: 'Art', tags: ['ukiyo-e', 'japanese woodblock', 'hokusai style', 'flat color', 'bold outlines', 'traditional japanese'] },
    { id: 'renaissance', name: 'Renaissance', category: 'Art', tags: ['renaissance', 'leonardo da vinci style', 'sfumato', 'golden ratio', 'classical composition', 'anatomical precision'] },
    { id: 'expressionist', name: 'Expressionist', category: 'Art', tags: ['expressionist', 'edvard munch style', 'emotional intensity', 'distorted forms', 'bold colors', 'raw emotion'] },
    { id: 'baroque', name: 'Baroque', category: 'Art', tags: ['baroque', 'caravaggio style', 'dramatic lighting', 'tenebrism', 'ornate detail', 'dynamic composition'] },
    
    // Digital
    { id: 'anime-cel', name: 'Anime Cel', category: 'Digital', tags: ['anime', 'cel-shaded', 'vibrant colors', 'clean lines', 'expressive eyes', 'studio ghibli style'] },
    { id: '3d-render', name: '3D Render', category: 'Digital', tags: ['3d render', 'octane render', 'subsurface scattering', 'global illumination', 'ray-traced', 'hyper-detailed'] },
    { id: 'pixel-art', name: 'Pixel Art', category: 'Digital', tags: ['pixel art', '8-bit', 'retro gaming', 'limited palette', 'dithering', 'nostalgic'] },
    { id: 'glitch-art', name: 'Glitch Art', category: 'Digital', tags: ['glitch art', 'data corruption', 'digital artifacts', 'RGB split', 'scan lines', 'vaporwave'] },
    { id: 'vector-minimal', name: 'Vector Minimal', category: 'Digital', tags: ['vector art', 'flat design', 'minimal', 'geometric shapes', 'clean edges', 'modern illustration'] },
    { id: 'vaporwave', name: 'Vaporwave', category: 'Digital', tags: ['vaporwave', 'aesthetic', 'neon pink', 'cyan', 'retro-futurism', 'greek statues', '80s nostalgia'] },
    { id: 'isometric', name: 'Isometric', category: 'Digital', tags: ['isometric', '30-degree angle', 'no perspective', 'technical illustration', 'clean geometry', 'game art style'] },
    { id: 'concept-art', name: 'Concept Art', category: 'Digital', tags: ['concept art', 'digital painting', 'environment design', 'matte painting', 'cinematic concept', 'atmospheric'] },
    
    // Mood
    { id: 'golden-hour', name: 'Golden Hour', category: 'Mood', tags: ['golden hour', 'warm sunlight', 'long shadows', 'magic hour', 'orange glow', 'romantic lighting'] },
    { id: 'neon-noir', name: 'Neon Noir', category: 'Mood', tags: ['neon lights', 'noir atmosphere', 'rain reflections', 'urban night', 'cyberpunk lighting', 'dark streets'] },
    { id: 'ethereal-dream', name: 'Ethereal Dream', category: 'Mood', tags: ['ethereal', 'dreamy', 'soft focus', 'pastel tones', 'otherworldly', 'fantasy atmosphere'] },
    { id: 'dark-brooding', name: 'Dark Brooding', category: 'Mood', tags: ['dark', 'brooding', 'low-key lighting', 'mysterious', 'shadowy', 'gothic undertones'] },
    { id: 'misty-melancholy', name: 'Misty Melancholy', category: 'Mood', tags: ['misty', 'melancholic', 'fog', 'muted colors', 'lonely atmosphere', 'contemplative'] },
    { id: 'vibrant-energy', name: 'Vibrant Energy', category: 'Mood', tags: ['vibrant', 'energetic', 'saturated colors', 'dynamic', 'lively', 'electric atmosphere'] },
    
    // Texture
    { id: 'heavy-grain', name: 'Heavy Film Grain', category: 'Texture', tags: ['heavy film grain', 'ISO 3200', 'analog texture', 'vintage film', 'gritty', 'kodak tri-x'] },
    { id: 'matte-editorial', name: 'Matte Editorial', category: 'Texture', tags: ['matte finish', 'editorial', 'desaturated blacks', 'lifted shadows', 'magazine quality', 'polished'] },
    { id: 'crisp-clarity', name: 'Crisp Clarity', category: 'Texture', tags: ['razor sharp', 'crystal clear', 'high definition', 'pristine detail', 'ultra-HD', 'immaculate'] },
    { id: 'soft-diffusion', name: 'Soft Diffusion', category: 'Texture', tags: ['soft focus', 'diffused', 'glowing highlights', 'dreamy blur', 'pro-mist filter', 'flattering'] },
    
    // Color
    { id: 'mono-drama', name: 'Monochrome Drama', category: 'Color', tags: ['black and white', 'monochrome', 'high contrast', 'dramatic tones', 'noir', 'timeless'] },
    { id: 'cross-process', name: 'Cross Process', category: 'Color', tags: ['cross-processed', 'color shift', 'cyan shadows', 'yellow highlights', 'lomography', 'surreal colors'] },
    { id: 'desat-cine', name: 'Desaturated Cine', category: 'Color', tags: ['desaturated', 'cinematic color grade', 'teal and orange', 'blockbuster look', 'hollywood grade'] },
    { id: 'hyper-saturated', name: 'Hyper Saturated', category: 'Color', tags: ['hyper-saturated', 'vivid colors', 'punchy', 'bold palette', 'eye-popping', 'intense hues'] },
    { id: 'pastel-soft', name: 'Pastel Soft', category: 'Color', tags: ['pastel colors', 'soft palette', 'muted tones', 'cotton candy', 'light and airy', 'delicate hues'] },
    { id: 'earth-tones', name: 'Earth Tones', category: 'Color', tags: ['earth tones', 'natural palette', 'warm browns', 'olive greens', 'terracotta', 'autumnal'] },
    
    // Era
    { id: '1950s-americana', name: '1950s Americana', category: 'Era', tags: ['1950s', 'americana', 'kodachrome colors', 'nostalgic', 'retro', 'mid-century'] },
    { id: '1970s-analog', name: '1970s Analog', category: 'Era', tags: ['1970s', 'analog film', 'warm tones', 'faded', 'vintage', 'polaroid feel'] },
    { id: '1980s-synthwave', name: '1980s Synthwave', category: 'Era', tags: ['1980s', 'synthwave', 'neon', 'retro-futurism', 'chrome', 'outrun aesthetic'] },
    { id: '1990s-grunge', name: '1990s Grunge', category: 'Era', tags: ['1990s', 'grunge', 'desaturated', 'gritty', 'alternative', 'raw'] },
    { id: 'y2k-futurism', name: 'Y2K Futurism', category: 'Era', tags: ['y2k', 'millennium', 'chrome', 'holographic', 'cyber', 'iridescent'] },
    { id: 'victorian-gothic', name: 'Victorian Gothic', category: 'Era', tags: ['victorian', 'gothic', 'dark romanticism', 'ornate', 'sepia', 'moody elegance'] }
  ],
  
  // Helper Methods
  getStyleById(id) {
    return this.styles.find(s => s.id === id);
  },
  
  getControlById(id) {
    return this.controls.find(c => c.id === id);
  },
  
  getStyleCategories() {
    return [...new Set(this.styles.map(s => s.category))];
  },
  
  getControlCategories() {
    return [...new Set(this.controls.map(c => c.category))];
  },
  
  getStylesByCategory(category) {
    if (category === 'all') return this.styles;
    return this.styles.filter(s => s.category === category);
  },
  
  getControlsByCategory(category) {
    if (category === 'all') return this.controls;
    return this.controls.filter(c => c.category === category);
  }
};

// Freeze data to prevent mutations
Object.freeze(StyleyeSData.controls);
Object.freeze(StyleyeSData.styles);
