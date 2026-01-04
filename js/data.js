/**
 * StyleyeS v1.5 — Data
 * Styles and Controls Definitions with Visual Previews
 */

const StyleyeSData = {
  // Lighting & White Balance Controls
  controls: [
    // White Balance
    { id: 'wb-neutral-5600', name: 'WB: Neutral 5600K', category: 'White Balance', tags: ['neutral white balance', '5600K', 'accurate color', 'true whites'], preview: { colors: ['#f5f5f5', '#e8e8e8'], effect: 'neutral' } },
    { id: 'wb-cool-6500', name: 'WB: Cool 6500K', category: 'White Balance', tags: ['cool daylight', '6500K', 'neutral highlights', 'reduced warm cast'], preview: { colors: ['#e3f2fd', '#bbdefb'], effect: 'cool' } },
    { id: 'wb-warm-3200', name: 'WB: Warm 3200K', category: 'White Balance', tags: ['tungsten balance', '3200K', 'warm practical lights', 'cozy warm highlights'], preview: { colors: ['#fff8e1', '#ffecb3'], effect: 'warm' } },
    { id: 'wb-tint-magenta', name: 'Tint: Magenta Bias', category: 'White Balance', tags: ['slight magenta tint', 'counter green cast', 'neutral midtones'], preview: { colors: ['#fce4ec', '#f8bbd9'], effect: 'tint' } },

    // Anti-Cast
    { id: 'anti-yellow-cast', name: 'No Yellow Cast', category: 'Anti-Cast', tags: ['no yellow tint', 'no sepia', 'neutral whites', 'color-accurate grade'], preview: { colors: ['#fafafa', '#f0f0f0'], effect: 'clean' } },
    { id: 'anti-green-cast', name: 'No Green Cast', category: 'Anti-Cast', tags: ['no green tint', 'clean neutrals', 'balanced midtones', 'true skin tones'], preview: { colors: ['#fff5f5', '#ffe8e8'], effect: 'clean' } },

    // Lighting
    { id: 'light-overcast', name: 'Lighting: Overcast', category: 'Lighting', tags: ['soft overcast lighting', 'diffuse light', 'soft shadows', 'low color cast'], preview: { colors: ['#cfd8dc', '#b0bec5'], effect: 'soft' } },
    { id: 'light-studio-softbox', name: 'Lighting: Softbox', category: 'Lighting', tags: ['studio softbox lighting', 'even key light', 'clean highlights', 'controlled shadows'], preview: { colors: ['#ffffff', '#f5f5f5', '#e0e0e0'], effect: 'gradient' } },
    { id: 'light-window-north', name: 'Lighting: North Window', category: 'Lighting', tags: ['north-facing window light', 'soft natural daylight', 'gentle falloff', 'true-to-life tones'], preview: { colors: ['#e3f2fd', '#fff8e1'], effect: 'window' } },
    { id: 'light-hmi-5600', name: 'Lighting: HMI Daylight', category: 'Lighting', tags: ['HMI daylight lighting', '5600K', 'clean white highlights', 'neutral fill'], preview: { colors: ['#ffffff', '#e8f4fd'], effect: 'bright' } },
    { id: 'light-rembrandt', name: 'Lighting: Rembrandt', category: 'Lighting', tags: ['rembrandt lighting', 'chiaroscuro', 'triangle of light', 'dramatic shadows'], preview: { colors: ['#3e2723', '#5d4037', '#d4a574'], effect: 'chiaroscuro' } },
    { id: 'light-rim', name: 'Lighting: Rim Light', category: 'Lighting', tags: ['rim lighting', 'backlight', 'silhouette edge', 'separation light'], preview: { colors: ['#1a1a2e', '#ffffff'], effect: 'rim' } }
  ],

  // Art Styles with Visual Previews
  styles: [
    // Photo
    { id: 'raw-realism', name: 'Raw Realism', category: 'Photo', tags: ['ultra-realistic', 'photorealistic', 'natural lighting', 'authentic textures', 'sharp focus', 'documentary style'], preview: { colors: ['#2c3e50', '#34495e', '#7f8c8d'], effect: 'sharp', pattern: 'none' } },
    { id: 'studio-portrait', name: 'Studio Portrait', category: 'Photo', tags: ['studio lighting', 'softbox', 'beauty dish', 'shallow depth of field', 'creamy bokeh', 'rembrandt lighting'], preview: { colors: ['#1a1a2e', '#4a4a6a', '#f5deb3'], effect: 'bokeh', pattern: 'circles' } },
    { id: 'street-documentary', name: 'Street Documentary', category: 'Photo', tags: ['candid moment', 'decisive moment', 'urban environment', 'gritty realism', 'high contrast', 'street photography'], preview: { colors: ['#1c1c1c', '#4a4a4a', '#8c8c8c'], effect: 'grain', pattern: 'noise' } },
    { id: 'editorial-fashion', name: 'Editorial Fashion', category: 'Photo', tags: ['high fashion', 'vogue style', 'dramatic lighting', 'bold composition', 'luxury aesthetic', 'avant-garde'], preview: { colors: ['#0d0d0d', '#d4af37', '#f5f5f5'], effect: 'contrast', pattern: 'diagonal' } },
    { id: 'macro-detail', name: 'Macro Detail', category: 'Photo', tags: ['extreme close-up', 'macro photography', 'intricate details', 'shallow DOF', 'texture emphasis', 'precise focus'], preview: { colors: ['#2e7d32', '#81c784', '#c8e6c9'], effect: 'zoom', pattern: 'organic' } },
    { id: 'landscape-epic', name: 'Landscape Epic', category: 'Photo', tags: ['sweeping vista', 'golden hour', 'dramatic sky', 'leading lines', 'ansel adams style', 'majestic scale'], preview: { colors: ['#ff7043', '#ffab91', '#1a237e'], effect: 'horizon', pattern: 'layers' } },
    { id: 'product-commercial', name: 'Product Commercial', category: 'Photo', tags: ['product photography', 'clean backdrop', 'commercial lighting', 'hero shot', 'advertising style', 'crisp edges'], preview: { colors: ['#ffffff', '#f5f5f5', '#e0e0e0'], effect: 'clean', pattern: 'minimal' } },
    { id: 'food-culinary', name: 'Food Culinary', category: 'Photo', tags: ['food photography', 'appetizing', 'fresh ingredients', 'styled plating', 'natural window light', 'gourmet presentation'], preview: { colors: ['#ff8a65', '#a5d6a7', '#fff59d'], effect: 'warm', pattern: 'organic' } },
    { id: 'architecture-interior', name: 'Architecture', category: 'Photo', tags: ['architectural photography', 'interior design', 'symmetrical composition', 'wide angle', 'clean lines', 'spatial depth'], preview: { colors: ['#455a64', '#78909c', '#eceff1'], effect: 'lines', pattern: 'geometric' } },
    { id: 'wildlife-nature', name: 'Wildlife Nature', category: 'Photo', tags: ['wildlife photography', 'natural habitat', 'animal portrait', 'telephoto compression', 'national geographic style'], preview: { colors: ['#33691e', '#689f38', '#8d6e63'], effect: 'natural', pattern: 'organic' } },
    { id: 'astrophotography', name: 'Astrophotography', category: 'Photo', tags: ['night sky', 'milky way', 'star trails', 'long exposure', 'deep space', 'cosmic'], preview: { colors: ['#0d0d1a', '#1a1a3e', '#4a148c'], effect: 'stars', pattern: 'dots' } },
    { id: 'drone-aerial', name: 'Drone Aerial', category: 'Photo', tags: ['aerial photography', 'birds eye view', 'drone shot', 'top-down perspective', 'landscape patterns', 'geometric terrain'], preview: { colors: ['#1565c0', '#4fc3f7', '#81c784'], effect: 'aerial', pattern: 'geometric' } },

    // Cinematic
    { id: 'blockbuster-epic', name: 'Blockbuster Epic', category: 'Cinematic', tags: ['cinematic', 'anamorphic lens flare', 'epic scale', 'dramatic lighting', 'movie still', '35mm film'], preview: { colors: ['#0d253f', '#01579b', '#ff6f00'], effect: 'flare', pattern: 'horizontal' } },
    { id: 'film-noir', name: 'Film Noir', category: 'Cinematic', tags: ['film noir', 'high contrast', 'dramatic shadows', 'venetian blind lighting', 'moody atmosphere', '1940s cinema'], preview: { colors: ['#000000', '#1a1a1a', '#4a4a4a'], effect: 'noir', pattern: 'blinds' } },
    { id: 'scifi-dystopia', name: 'Sci-Fi Dystopia', category: 'Cinematic', tags: ['sci-fi', 'dystopian', 'blade runner aesthetic', 'neon reflections', 'cyberpunk', 'volumetric fog'], preview: { colors: ['#0a192f', '#00bcd4', '#ff4081'], effect: 'neon', pattern: 'grid' } },
    { id: 'wes-anderson', name: 'Wes Anderson', category: 'Cinematic', tags: ['wes anderson style', 'symmetrical framing', 'pastel color palette', 'whimsical', 'centered composition', 'diorama-like'], preview: { colors: ['#ffccbc', '#b2dfdb', '#fff9c4'], effect: 'pastel', pattern: 'symmetrical' } },
    { id: 'horror-suspense', name: 'Horror Suspense', category: 'Cinematic', tags: ['horror movie', 'suspenseful', 'low-key lighting', 'ominous shadows', 'psychological terror', 'tension-filled'], preview: { colors: ['#1a0a0a', '#4a0e0e', '#8b0000'], effect: 'dark', pattern: 'vignette' } },
    { id: 'period-drama', name: 'Period Drama', category: 'Cinematic', tags: ['period drama', 'costume design', 'candlelight', 'baroque interior', 'historical accuracy', 'regal atmosphere'], preview: { colors: ['#3e2723', '#8d6e63', '#d4a574'], effect: 'warm', pattern: 'ornate' } },
    { id: 'indie-film', name: 'Indie Film', category: 'Cinematic', tags: ['indie film', 'naturalistic', 'handheld camera feel', 'available light', 'intimate framing', 'authentic moments'], preview: { colors: ['#5d4037', '#8d6e63', '#d7ccc8'], effect: 'natural', pattern: 'grain' } },
    { id: 'action-thriller', name: 'Action Thriller', category: 'Cinematic', tags: ['action movie', 'dynamic composition', 'motion blur', 'intense lighting', 'high stakes', 'explosive energy'], preview: { colors: ['#1a1a2e', '#ff6b35', '#ffc107'], effect: 'motion', pattern: 'dynamic' } },
    { id: 'neo-western', name: 'Neo-Western', category: 'Cinematic', tags: ['modern western', 'desert landscapes', 'dusty atmosphere', 'amber tones', 'wide shots', 'frontier aesthetic'], preview: { colors: ['#bf8040', '#d4a574', '#8b4513'], effect: 'dusty', pattern: 'horizon' } },
    { id: 'french-new-wave', name: 'French New Wave', category: 'Cinematic', tags: ['nouvelle vague', 'jump cuts', 'natural lighting', 'existential mood', 'black and white', 'artistic freedom'], preview: { colors: ['#2c2c2c', '#5c5c5c', '#9c9c9c'], effect: 'grain', pattern: 'abstract' } },
    { id: 'anime-cinematic', name: 'Anime Cinematic', category: 'Cinematic', tags: ['anime movie', 'makoto shinkai style', 'dramatic clouds', 'light rays', 'emotional atmosphere', 'detailed backgrounds'], preview: { colors: ['#1e88e5', '#ff7043', '#fff176'], effect: 'rays', pattern: 'clouds' } },

    // Art
    { id: 'oil-painting', name: 'Oil Painting', category: 'Art', tags: ['oil painting', 'visible brushstrokes', 'rich pigments', 'classical technique', 'canvas texture', 'chiaroscuro'], preview: { colors: ['#5d4037', '#8d6e63', '#d4a574'], effect: 'brush', pattern: 'strokes' } },
    { id: 'watercolor-wash', name: 'Watercolor', category: 'Art', tags: ['watercolor', 'soft washes', 'bleeding edges', 'transparent layers', 'wet-on-wet', 'luminous'], preview: { colors: ['#e1f5fe', '#b3e5fc', '#81d4fa'], effect: 'wash', pattern: 'bleed' } },
    { id: 'art-nouveau', name: 'Art Nouveau', category: 'Art', tags: ['art nouveau', 'alphonse mucha style', 'organic curves', 'decorative borders', 'flowing lines', 'belle époque'], preview: { colors: ['#8d6e63', '#a1887f', '#d4a574'], effect: 'ornate', pattern: 'curves' } },
    { id: 'impressionist', name: 'Impressionist', category: 'Art', tags: ['impressionist', 'monet style', 'dappled light', 'broken color', 'outdoor scene', 'visible brushwork'], preview: { colors: ['#81c784', '#64b5f6', '#fff176'], effect: 'dappled', pattern: 'dots' } },
    { id: 'surrealist', name: 'Surrealist', category: 'Art', tags: ['surrealist', 'salvador dali style', 'dreamlike', 'impossible physics', 'melting forms', 'uncanny'], preview: { colors: ['#ff8a65', '#ba68c8', '#4dd0e1'], effect: 'warp', pattern: 'melting' } },
    { id: 'pop-art', name: 'Pop Art', category: 'Art', tags: ['pop art', 'andy warhol style', 'bold colors', 'ben-day dots', 'comic book', 'screen print effect'], preview: { colors: ['#f44336', '#ffeb3b', '#2196f3'], effect: 'halftone', pattern: 'dots' } },
    { id: 'ukiyo-e', name: 'Ukiyo-e', category: 'Art', tags: ['ukiyo-e', 'japanese woodblock', 'hokusai style', 'flat color', 'bold outlines', 'traditional japanese'], preview: { colors: ['#1565c0', '#ef5350', '#fff8e1'], effect: 'flat', pattern: 'waves' } },
    { id: 'renaissance', name: 'Renaissance', category: 'Art', tags: ['renaissance', 'leonardo da vinci style', 'sfumato', 'golden ratio', 'classical composition', 'anatomical precision'], preview: { colors: ['#4e342e', '#795548', '#d7ccc8'], effect: 'sfumato', pattern: 'classical' } },
    { id: 'expressionist', name: 'Expressionist', category: 'Art', tags: ['expressionist', 'edvard munch style', 'emotional intensity', 'distorted forms', 'bold colors', 'raw emotion'], preview: { colors: ['#ff5722', '#9c27b0', '#1a237e'], effect: 'distort', pattern: 'swirl' } },
    { id: 'baroque', name: 'Baroque', category: 'Art', tags: ['baroque', 'caravaggio style', 'dramatic lighting', 'tenebrism', 'ornate detail', 'dynamic composition'], preview: { colors: ['#1a0a00', '#4e342e', '#d4a574'], effect: 'dramatic', pattern: 'ornate' } },
    { id: 'cubist', name: 'Cubist', category: 'Art', tags: ['cubism', 'picasso style', 'geometric forms', 'multiple perspectives', 'abstract shapes', 'fragmented'], preview: { colors: ['#795548', '#9e9e9e', '#607d8b'], effect: 'fragment', pattern: 'geometric' } },
    { id: 'art-deco', name: 'Art Deco', category: 'Art', tags: ['art deco', 'geometric elegance', 'gold accents', 'symmetrical', 'gatsby era', 'luxurious'], preview: { colors: ['#0d0d0d', '#d4af37', '#1a1a2e'], effect: 'geometric', pattern: 'rays' } },
    { id: 'pointillism', name: 'Pointillism', category: 'Art', tags: ['pointillism', 'seurat style', 'color dots', 'optical mixing', 'impressionist technique', 'stippled'], preview: { colors: ['#4caf50', '#2196f3', '#ffeb3b'], effect: 'dots', pattern: 'stipple' } },
    { id: 'minimalist-art', name: 'Minimalist Art', category: 'Art', tags: ['minimalism', 'simple forms', 'negative space', 'clean lines', 'essential elements', 'reductive'], preview: { colors: ['#fafafa', '#e0e0e0', '#424242'], effect: 'clean', pattern: 'minimal' } },

    // Digital
    { id: 'anime-cel', name: 'Anime Cel', category: 'Digital', tags: ['anime', 'cel-shaded', 'vibrant colors', 'clean lines', 'expressive eyes', 'studio ghibli style'], preview: { colors: ['#e91e63', '#03a9f4', '#ffeb3b'], effect: 'cel', pattern: 'clean' } },
    { id: '3d-render', name: '3D Render', category: 'Digital', tags: ['3d render', 'octane render', 'subsurface scattering', 'global illumination', 'ray-traced', 'hyper-detailed'], preview: { colors: ['#37474f', '#78909c', '#eceff1'], effect: 'render', pattern: 'smooth' } },
    { id: 'pixel-art', name: 'Pixel Art', category: 'Digital', tags: ['pixel art', '8-bit', 'retro gaming', 'limited palette', 'dithering', 'nostalgic'], preview: { colors: ['#4caf50', '#9c27b0', '#ff9800'], effect: 'pixel', pattern: 'grid' } },
    { id: 'glitch-art', name: 'Glitch Art', category: 'Digital', tags: ['glitch art', 'data corruption', 'digital artifacts', 'RGB split', 'scan lines', 'vaporwave'], preview: { colors: ['#ff0040', '#00ff00', '#0000ff'], effect: 'glitch', pattern: 'scan' } },
    { id: 'vector-minimal', name: 'Vector Minimal', category: 'Digital', tags: ['vector art', 'flat design', 'minimal', 'geometric shapes', 'clean edges', 'modern illustration'], preview: { colors: ['#ff7043', '#42a5f5', '#66bb6a'], effect: 'flat', pattern: 'geometric' } },
    { id: 'vaporwave', name: 'Vaporwave', category: 'Digital', tags: ['vaporwave', 'aesthetic', 'neon pink', 'cyan', 'retro-futurism', 'greek statues', '80s nostalgia'], preview: { colors: ['#ff71ce', '#01cdfe', '#b967ff'], effect: 'neon', pattern: 'grid' } },
    { id: 'isometric', name: 'Isometric', category: 'Digital', tags: ['isometric', '30-degree angle', 'no perspective', 'technical illustration', 'clean geometry', 'game art style'], preview: { colors: ['#5c6bc0', '#26a69a', '#ffca28'], effect: 'iso', pattern: 'cubes' } },
    { id: 'concept-art', name: 'Concept Art', category: 'Digital', tags: ['concept art', 'digital painting', 'environment design', 'matte painting', 'cinematic concept', 'atmospheric'], preview: { colors: ['#37474f', '#ff7043', '#4dd0e1'], effect: 'paint', pattern: 'atmospheric' } },
    { id: 'low-poly', name: 'Low Poly', category: 'Digital', tags: ['low poly', 'geometric 3d', 'faceted', 'polygon mesh', 'stylized 3d', 'modern minimal'], preview: { colors: ['#00bcd4', '#8bc34a', '#ff9800'], effect: 'poly', pattern: 'triangles' } },
    { id: 'neon-digital', name: 'Neon Digital', category: 'Digital', tags: ['neon art', 'glowing lines', 'dark background', 'light painting', 'electric', 'luminous'], preview: { colors: ['#0a0a1a', '#ff00ff', '#00ffff'], effect: 'glow', pattern: 'lines' } },
    { id: 'synthwave-retro', name: 'Synthwave Retro', category: 'Digital', tags: ['synthwave', 'retrowave', 'sunset gradient', 'grid horizon', 'outrun', 'retro future'], preview: { colors: ['#ff6b9d', '#c44569', '#1a1a2e'], effect: 'sunset', pattern: 'grid' } },
    { id: 'holographic', name: 'Holographic', category: 'Digital', tags: ['holographic', 'iridescent', 'rainbow gradient', 'prismatic', 'foil effect', 'chromatic'], preview: { colors: ['#ff9a9e', '#a8edea', '#d299c2'], effect: 'rainbow', pattern: 'shimmer' } },

    // Mood
    { id: 'golden-hour', name: 'Golden Hour', category: 'Mood', tags: ['golden hour', 'warm sunlight', 'long shadows', 'magic hour', 'orange glow', 'romantic lighting'], preview: { colors: ['#ff9800', '#ff5722', '#ffc107'], effect: 'warm', pattern: 'rays' } },
    { id: 'neon-noir', name: 'Neon Noir', category: 'Mood', tags: ['neon lights', 'noir atmosphere', 'rain reflections', 'urban night', 'cyberpunk lighting', 'dark streets'], preview: { colors: ['#0d0d0d', '#e91e63', '#00bcd4'], effect: 'neon', pattern: 'reflect' } },
    { id: 'ethereal-dream', name: 'Ethereal Dream', category: 'Mood', tags: ['ethereal', 'dreamy', 'soft focus', 'pastel tones', 'otherworldly', 'fantasy atmosphere'], preview: { colors: ['#e1bee7', '#b3e5fc', '#fff9c4'], effect: 'soft', pattern: 'glow' } },
    { id: 'dark-brooding', name: 'Dark Brooding', category: 'Mood', tags: ['dark', 'brooding', 'low-key lighting', 'mysterious', 'shadowy', 'gothic undertones'], preview: { colors: ['#0d0d0d', '#1a1a2e', '#2d2d44'], effect: 'dark', pattern: 'vignette' } },
    { id: 'misty-melancholy', name: 'Misty Melancholy', category: 'Mood', tags: ['misty', 'melancholic', 'fog', 'muted colors', 'lonely atmosphere', 'contemplative'], preview: { colors: ['#90a4ae', '#b0bec5', '#cfd8dc'], effect: 'mist', pattern: 'fade' } },
    { id: 'vibrant-energy', name: 'Vibrant Energy', category: 'Mood', tags: ['vibrant', 'energetic', 'saturated colors', 'dynamic', 'lively', 'electric atmosphere'], preview: { colors: ['#ff4081', '#ffea00', '#00e676'], effect: 'vibrant', pattern: 'burst' } },
    { id: 'romantic-soft', name: 'Romantic Soft', category: 'Mood', tags: ['romantic', 'soft light', 'warm tones', 'intimate', 'tender mood', 'gentle atmosphere'], preview: { colors: ['#ffcdd2', '#f8bbd9', '#e1bee7'], effect: 'soft', pattern: 'glow' } },
    { id: 'epic-dramatic', name: 'Epic Dramatic', category: 'Mood', tags: ['epic', 'dramatic', 'powerful', 'intense contrast', 'heroic', 'monumental'], preview: { colors: ['#1a1a2e', '#ff6b35', '#ffd93d'], effect: 'dramatic', pattern: 'rays' } },
    { id: 'serene-calm', name: 'Serene Calm', category: 'Mood', tags: ['serene', 'peaceful', 'calm waters', 'tranquil', 'zen', 'balanced harmony'], preview: { colors: ['#b2ebf2', '#80deea', '#e0f7fa'], effect: 'calm', pattern: 'waves' } },
    { id: 'mystical-magic', name: 'Mystical Magic', category: 'Mood', tags: ['mystical', 'magical', 'enchanted', 'sparkles', 'fairy tale', 'supernatural glow'], preview: { colors: ['#7c4dff', '#e040fb', '#18ffff'], effect: 'magic', pattern: 'sparkle' } },

    // Texture
    { id: 'heavy-grain', name: 'Heavy Film Grain', category: 'Texture', tags: ['heavy film grain', 'ISO 3200', 'analog texture', 'vintage film', 'gritty', 'kodak tri-x'], preview: { colors: ['#3e3e3e', '#5e5e5e', '#8e8e8e'], effect: 'grain', pattern: 'noise' } },
    { id: 'matte-editorial', name: 'Matte Editorial', category: 'Texture', tags: ['matte finish', 'editorial', 'desaturated blacks', 'lifted shadows', 'magazine quality', 'polished'], preview: { colors: ['#424242', '#616161', '#9e9e9e'], effect: 'matte', pattern: 'smooth' } },
    { id: 'crisp-clarity', name: 'Crisp Clarity', category: 'Texture', tags: ['razor sharp', 'crystal clear', 'high definition', 'pristine detail', 'ultra-HD', 'immaculate'], preview: { colors: ['#eceff1', '#ffffff', '#f5f5f5'], effect: 'sharp', pattern: 'clean' } },
    { id: 'soft-diffusion', name: 'Soft Diffusion', category: 'Texture', tags: ['soft focus', 'diffused', 'glowing highlights', 'dreamy blur', 'pro-mist filter', 'flattering'], preview: { colors: ['#fff3e0', '#ffe0b2', '#ffcc80'], effect: 'diffuse', pattern: 'soft' } },
    { id: 'vintage-fade', name: 'Vintage Fade', category: 'Texture', tags: ['vintage fade', 'washed out', 'faded colors', 'retro feel', 'aged look', 'nostalgic haze'], preview: { colors: ['#d7ccc8', '#bcaaa4', '#a1887f'], effect: 'fade', pattern: 'soft' } },
    { id: 'film-halation', name: 'Film Halation', category: 'Texture', tags: ['halation effect', 'light bloom', 'red glow', 'analog artifacts', 'cinematic film', 'highlight bleed'], preview: { colors: ['#ff5252', '#ff8a80', '#ffd180'], effect: 'bloom', pattern: 'glow' } },

    // Color
    { id: 'mono-drama', name: 'Monochrome Drama', category: 'Color', tags: ['black and white', 'monochrome', 'high contrast', 'dramatic tones', 'noir', 'timeless'], preview: { colors: ['#000000', '#424242', '#ffffff'], effect: 'mono', pattern: 'contrast' } },
    { id: 'cross-process', name: 'Cross Process', category: 'Color', tags: ['cross-processed', 'color shift', 'cyan shadows', 'yellow highlights', 'lomography', 'surreal colors'], preview: { colors: ['#00acc1', '#cddc39', '#ff7043'], effect: 'cross', pattern: 'shift' } },
    { id: 'desat-cine', name: 'Desaturated Cine', category: 'Color', tags: ['desaturated', 'cinematic color grade', 'teal and orange', 'blockbuster look', 'hollywood grade'], preview: { colors: ['#004d40', '#bf360c', '#37474f'], effect: 'cine', pattern: 'split' } },
    { id: 'hyper-saturated', name: 'Hyper Saturated', category: 'Color', tags: ['hyper-saturated', 'vivid colors', 'punchy', 'bold palette', 'eye-popping', 'intense hues'], preview: { colors: ['#d500f9', '#00e676', '#ffea00'], effect: 'saturate', pattern: 'vibrant' } },
    { id: 'pastel-soft', name: 'Pastel Soft', category: 'Color', tags: ['pastel colors', 'soft palette', 'muted tones', 'cotton candy', 'light and airy', 'delicate hues'], preview: { colors: ['#f8bbd9', '#b2ebf2', '#fff9c4'], effect: 'pastel', pattern: 'soft' } },
    { id: 'earth-tones', name: 'Earth Tones', category: 'Color', tags: ['earth tones', 'natural palette', 'warm browns', 'olive greens', 'terracotta', 'autumnal'], preview: { colors: ['#5d4037', '#689f38', '#bf360c'], effect: 'earthy', pattern: 'organic' } },
    { id: 'duotone', name: 'Duotone', category: 'Color', tags: ['duotone', 'two-color', 'gradient map', 'modern design', 'bold statement', 'graphic'], preview: { colors: ['#6200ea', '#ff6d00'], effect: 'duo', pattern: 'gradient' } },
    { id: 'split-toning', name: 'Split Toning', category: 'Color', tags: ['split toning', 'warm highlights', 'cool shadows', 'color grading', 'cinematic split', 'complementary'], preview: { colors: ['#ff8a65', '#4dd0e1', '#78909c'], effect: 'split', pattern: 'blend' } },
    { id: 'candy-pop', name: 'Candy Pop', category: 'Color', tags: ['candy colors', 'bright saturated', 'playful palette', 'sugar sweet', 'pop colors', 'cheerful'], preview: { colors: ['#ff4081', '#40c4ff', '#69f0ae'], effect: 'pop', pattern: 'bright' } },

    // Era
    { id: '1950s-americana', name: '1950s Americana', category: 'Era', tags: ['1950s', 'americana', 'kodachrome colors', 'nostalgic', 'retro', 'mid-century'], preview: { colors: ['#e57373', '#81d4fa', '#fff59d'], effect: 'retro', pattern: 'vintage' } },
    { id: '1970s-analog', name: '1970s Analog', category: 'Era', tags: ['1970s', 'analog film', 'warm tones', 'faded', 'vintage', 'polaroid feel'], preview: { colors: ['#d4a574', '#8d6e63', '#a1887f'], effect: 'analog', pattern: 'faded' } },
    { id: '1980s-synthwave', name: '1980s Synthwave', category: 'Era', tags: ['1980s', 'synthwave', 'neon', 'retro-futurism', 'chrome', 'outrun aesthetic'], preview: { colors: ['#e91e63', '#9c27b0', '#00bcd4'], effect: 'synth', pattern: 'grid' } },
    { id: '1990s-grunge', name: '1990s Grunge', category: 'Era', tags: ['1990s', 'grunge', 'desaturated', 'gritty', 'alternative', 'raw'], preview: { colors: ['#5d4037', '#795548', '#4e342e'], effect: 'grunge', pattern: 'dirty' } },
    { id: 'y2k-futurism', name: 'Y2K Futurism', category: 'Era', tags: ['y2k', 'millennium', 'chrome', 'holographic', 'cyber', 'iridescent'], preview: { colors: ['#e0e0e0', '#b388ff', '#18ffff'], effect: 'chrome', pattern: 'shiny' } },
    { id: 'victorian-gothic', name: 'Victorian Gothic', category: 'Era', tags: ['victorian', 'gothic', 'dark romanticism', 'ornate', 'sepia', 'moody elegance'], preview: { colors: ['#3e2723', '#5d4037', '#8d6e63'], effect: 'antique', pattern: 'ornate' } },
    { id: '1960s-mod', name: '1960s Mod', category: 'Era', tags: ['1960s', 'mod style', 'op art', 'bold geometric', 'psychedelic', 'pop culture'], preview: { colors: ['#ff5722', '#000000', '#ffffff'], effect: 'mod', pattern: 'circles' } },
    { id: '2000s-digicam', name: '2000s Digicam', category: 'Era', tags: ['2000s aesthetic', 'early digital', 'flash photography', 'party vibes', 'myspace era', 'low res charm'], preview: { colors: ['#ff4081', '#536dfe', '#ffeb3b'], effect: 'flash', pattern: 'bright' } },
    { id: 'silent-film', name: 'Silent Film Era', category: 'Era', tags: ['silent film', '1920s cinema', 'black and white', 'expressionist', 'vintage cinema', 'film artifacts'], preview: { colors: ['#212121', '#424242', '#757575'], effect: 'silent', pattern: 'flicker' } },
    { id: 'daguerreotype', name: 'Daguerreotype', category: 'Era', tags: ['daguerreotype', '1800s photography', 'silver plate', 'antique portrait', 'early photography', 'metallic sheen'], preview: { colors: ['#5d4037', '#8d6e63', '#bcaaa4'], effect: 'metallic', pattern: 'aged' } }
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
