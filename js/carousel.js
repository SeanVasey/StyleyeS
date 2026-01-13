/**
 * StyleyeS v2.1.0 — Carousel Physics Engine
 * Replaces linear scroll with 3D cylindrical rotation
 *
 * @version 2.1.0
 * @updated 2026-01-13
 */

const StyleyeSCarousel = {

  // Configuration
  config: {
    radius: 220,              // Cylinder radius (px) - tuned for card widths
    friction: 0.92,           // Velocity decay per frame
    snapThreshold: 0.12,      // Velocity below which snap begins
    sensitivity: 0.4,         // Degrees per pixel dragged
    maxVelocity: 20,          // Clamp throw speed
    snapEasing: 0.1,          // Lerp factor for snap

    // Depth visual treatment
    minScale: 0.65,           // Scale at back
    maxScale: 1.0,            // Scale at front
    minOpacity: 0.35,         // Opacity at back
    maxBlur: 3,               // Blur (px) at back
    zThreshold: -0.2          // Z below which pointer-events disabled
  },

  // Per-carousel state (keyed by category)
  instances: new Map(),

  // Active animation frames (keyed by category)
  rafIds: new Map(),

  /**
   * Initialize a carousel instance for a category
   * @param {string} categoryId - Category identifier
   * @param {number} itemCount - Number of items in carousel
   * @returns {Object|null} State object or null if no items
   */
  init(categoryId, itemCount) {
    if (itemCount === 0) return null;

    const state = {
      categoryId,
      itemCount,
      anglePerItem: 360 / itemCount,
      rotation: 0,
      velocity: 0,
      activeIndex: 0,
      isDragging: false,
      dragStartX: 0,
      dragStartRotation: 0,
      lastX: 0,
      lastTime: 0,
      isAnimating: false
    };

    this.instances.set(categoryId, state);
    return state;
  },

  /**
   * Get state for a category
   * @param {string} categoryId - Category identifier
   * @returns {Object|undefined} State object
   */
  get(categoryId) {
    return this.instances.get(categoryId);
  },

  /**
   * Calculate 2D visual properties from angle position
   * @param {number} angleDeg - Angle in degrees
   * @returns {Object} CSS style properties
   */
  getStyleForAngle(angleDeg) {
    const { radius, minScale, maxScale, minOpacity, maxBlur, zThreshold } = this.config;
    const rad = (angleDeg * Math.PI) / 180;

    // X = horizontal offset, Z = depth (-1 back to +1 front)
    const x = Math.sin(rad) * radius;
    const z = Math.cos(rad);

    // Normalize z from [-1, +1] to [0, 1]
    const zNorm = (z + 1) / 2;

    // Interpolate visual properties
    const scale = minScale + (maxScale - minScale) * zNorm;
    const opacity = minOpacity + (1 - minOpacity) * zNorm;
    const blur = maxBlur * (1 - zNorm);
    const zIndex = Math.round(zNorm * 100);

    return {
      transform: `translateX(${x.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(3),
      filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
      zIndex,
      pointerEvents: z > zThreshold ? 'auto' : 'none'
    };
  },

  /**
   * Calculate active index from rotation
   * @param {number} rotation - Current rotation value
   * @param {number} itemCount - Number of items
   * @returns {number} Active index
   */
  getActiveIndex(rotation, itemCount) {
    const anglePerItem = 360 / itemCount;
    let idx = Math.round(-rotation / anglePerItem) % itemCount;
    if (idx < 0) idx += itemCount;
    return idx;
  },

  /**
   * Physics loop - momentum + magnetic snap
   * @param {Object} state - Carousel state
   * @param {Function} onUpdate - Update callback
   */
  runPhysics(state, onUpdate) {
    const { friction, snapThreshold, snapEasing } = this.config;

    // Apply friction
    state.velocity *= friction;
    state.rotation += state.velocity;

    // Check for snap
    if (Math.abs(state.velocity) < snapThreshold) {
      const snapIdx = Math.round(state.rotation / state.anglePerItem);
      const target = snapIdx * state.anglePerItem;
      const delta = target - state.rotation;

      // Close enough? Finalize.
      if (Math.abs(delta) < 0.05) {
        state.rotation = target;
        state.velocity = 0;
        state.isAnimating = false;
        state.activeIndex = this.getActiveIndex(target, state.itemCount);
        onUpdate(state, true);
        return;
      }

      // Ease toward target
      state.rotation += delta * snapEasing;
    }

    onUpdate(state, false);

    // Continue if still moving
    if (Math.abs(state.velocity) > 0.01 || state.isAnimating) {
      const rafId = requestAnimationFrame(() => this.runPhysics(state, onUpdate));
      this.rafIds.set(state.categoryId, rafId);
    }
  },

  /**
   * Cancel animation for a specific category
   * @param {string} categoryId - Category identifier
   */
  cancelAnimation(categoryId) {
    const rafId = this.rafIds.get(categoryId);
    if (rafId) {
      cancelAnimationFrame(rafId);
      this.rafIds.delete(categoryId);
    }
  },

  /**
   * Handle drag start
   * @param {Object} state - Carousel state
   * @param {number} clientX - Mouse/touch X position
   */
  startDrag(state, clientX) {
    this.cancelAnimation(state.categoryId);

    state.isDragging = true;
    state.dragStartX = clientX;
    state.dragStartRotation = state.rotation;
    state.lastX = clientX;
    state.lastTime = performance.now();
    state.velocity = 0;
  },

  /**
   * Handle drag move
   * @param {Object} state - Carousel state
   * @param {number} clientX - Mouse/touch X position
   * @param {Function} onUpdate - Update callback
   */
  moveDrag(state, clientX, onUpdate) {
    if (!state.isDragging) return;

    const { sensitivity } = this.config;
    const deltaX = clientX - state.dragStartX;
    state.rotation = state.dragStartRotation + (deltaX * sensitivity);

    // Calculate velocity
    const now = performance.now();
    const dt = now - state.lastTime;
    if (dt > 0) {
      const dx = clientX - state.lastX;
      state.velocity = (dx * sensitivity) * (16 / dt);
    }

    state.lastX = clientX;
    state.lastTime = now;

    onUpdate(state, false);
  },

  /**
   * Handle drag end - start physics
   * @param {Object} state - Carousel state
   * @param {Function} onUpdate - Update callback
   */
  endDrag(state, onUpdate) {
    if (!state.isDragging) return;

    state.isDragging = false;
    state.isAnimating = true;

    // Clamp velocity
    const { maxVelocity } = this.config;
    state.velocity = Math.max(-maxVelocity, Math.min(maxVelocity, state.velocity));

    this.runPhysics(state, onUpdate);
  },

  /**
   * Programmatic rotation to specific index
   * @param {Object} state - Carousel state
   * @param {number} targetIndex - Target index to rotate to
   * @param {Function} onUpdate - Update callback
   */
  rotateTo(state, targetIndex, onUpdate) {
    targetIndex = ((targetIndex % state.itemCount) + state.itemCount) % state.itemCount;
    const targetRot = -targetIndex * state.anglePerItem;

    // Find shortest path
    let delta = targetRot - state.rotation;
    // Normalize to -180 to 180 range
    while (delta > 180) delta -= 360;
    while (delta < -180) delta += 360;

    state.velocity = delta * 0.12;
    state.isAnimating = true;

    this.cancelAnimation(state.categoryId);
    this.runPhysics(state, onUpdate);
  },

  /**
   * Rotate by a specific number of positions
   * @param {Object} state - Carousel state
   * @param {number} positions - Number of positions to rotate (positive = forward, negative = backward)
   * @param {Function} onUpdate - Update callback
   */
  rotateBy(state, positions, onUpdate) {
    const newIndex = state.activeIndex + positions;
    this.rotateTo(state, newIndex, onUpdate);
  },

  /**
   * Clean up a specific carousel instance
   * @param {string} categoryId - Category identifier
   */
  destroy(categoryId) {
    this.cancelAnimation(categoryId);
    this.instances.delete(categoryId);
  },

  /**
   * Clean up all carousel instances
   */
  destroyAll() {
    this.rafIds.forEach((rafId, categoryId) => {
      cancelAnimationFrame(rafId);
    });
    this.rafIds.clear();
    this.instances.clear();
  }
};

// Freeze config to prevent mutations
Object.freeze(StyleyeSCarousel.config);
