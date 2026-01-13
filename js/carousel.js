/**
 * StyleyeS v2.2.0 — Carousel Physics Engine
 * 3D cylindrical rotation with enhanced front-card focus
 *
 * @version 2.2.0
 * @updated 2026-01-13
 * @changelog
 *   - 2.2.0: Enhanced carousel interaction - front card pop-up, blur/dim edges,
 *            single-card selection, smoother motion
 */

const StyleyeSCarousel = {

  // Configuration
  config: {
    radius: 280,                      // Cylinder radius (px) - increased for less overlap
    friction: 0.92,                   // Velocity decay per frame
    snapThreshold: 0.15,              // Velocity below which snap begins
    sensitivity: 0.35,                // Degrees per pixel dragged - slightly reduced for smoother feel
    maxVelocity: 18,                  // Clamp throw speed
    snapEasing: 0.12,                 // Lerp factor for snap - slightly faster snap

    // Physics thresholds
    snapFinalizeThreshold: 0.05,      // Delta below which snap finalizes
    minAnimationVelocity: 0.01,       // Velocity below which animation stops
    velocityFrameMultiplier: 16,      // Normalizes velocity to ~60fps (1000ms/60fps ≈ 16ms)
    programmaticRotationFactor: 0.12, // Velocity factor for rotateTo()

    // Depth visual treatment
    minScale: 0.55,                   // Scale at back - smaller for more depth
    maxScale: 1.0,                    // Scale at front
    minOpacity: 0.25,                 // Opacity at back - more faded
    maxBlur: 6,                       // Blur (px) at back - stronger blur
    zThreshold: 0.7,                  // Z threshold for front card (only front card is interactive)

    // Pop-up effect for front card
    frontLiftY: -12,                  // Pixels to lift front card (negative = up)
    frontThreshold: 0.85             // Z value above which card gets full lift
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
    const { radius, minScale, maxScale, minOpacity, maxBlur, zThreshold, frontLiftY, frontThreshold } = this.config;
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

    // Calculate Y lift for front card pop-up effect
    // Cards above frontThreshold get progressively lifted
    let liftY = 0;
    if (z > frontThreshold) {
      // Smooth easing: how far past threshold (0 to 1)
      const liftProgress = (z - frontThreshold) / (1 - frontThreshold);
      // Use easeOutCubic for smooth pop-up
      const eased = 1 - Math.pow(1 - liftProgress, 3);
      liftY = frontLiftY * eased;
    }

    // Determine if this is the "front" card (for special styling)
    const isFront = z > zThreshold;

    return {
      transform: `translateX(${x.toFixed(1)}px) translateY(${liftY.toFixed(1)}px) scale(${scale.toFixed(3)})`,
      opacity: opacity.toFixed(3),
      filter: blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none',
      zIndex,
      pointerEvents: isFront ? 'auto' : 'none',
      isFront
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
    const { friction, snapThreshold, snapEasing, snapFinalizeThreshold, minAnimationVelocity } = this.config;

    // Apply friction
    state.velocity *= friction;
    state.rotation += state.velocity;

    // Check for snap
    if (Math.abs(state.velocity) < snapThreshold) {
      const snapIdx = Math.round(state.rotation / state.anglePerItem);
      const target = snapIdx * state.anglePerItem;
      const delta = target - state.rotation;

      // Close enough? Finalize.
      if (Math.abs(delta) < snapFinalizeThreshold) {
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
    if (Math.abs(state.velocity) > minAnimationVelocity || state.isAnimating) {
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

    const { sensitivity, velocityFrameMultiplier } = this.config;
    const deltaX = clientX - state.dragStartX;
    state.rotation = state.dragStartRotation + (deltaX * sensitivity);

    // Calculate velocity (normalized to ~60fps using velocityFrameMultiplier)
    const now = performance.now();
    const dt = now - state.lastTime;
    if (dt > 0) {
      const dx = clientX - state.lastX;
      state.velocity = (dx * sensitivity) * (velocityFrameMultiplier / dt);
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
    const { programmaticRotationFactor } = this.config;
    targetIndex = ((targetIndex % state.itemCount) + state.itemCount) % state.itemCount;
    const targetRot = -targetIndex * state.anglePerItem;

    // Find shortest path
    let delta = targetRot - state.rotation;
    // Normalize to -180 to 180 range
    while (delta > 180) delta -= 360;
    while (delta < -180) delta += 360;

    state.velocity = delta * programmaticRotationFactor;
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
