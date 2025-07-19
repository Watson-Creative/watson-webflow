(function() {
  'use strict';

  // Configuration options
  const config = {
    svgWidth: '40%',
    viewBox: '0 0 387.33 270.66',
    backColor: '#f0edec',
    frontColor: '#00b795',
    svgPath: 'm383.23,23.79l-242.77,242.77c-8.77,8.77-23.79,2.55-23.79-9.86V54.85L23.8,147.71c-8.79,8.77-23.8,2.57-23.8-9.85V13.94C0,6.24,6.24,0,13.94,0h359.43c12.41,0,18.63,15.01,9.86,23.79Z',
    duration: 2000, // Total animation duration in ms
    removeDelay: 300, // Delay before removing loader after completion
    easingCurve: 'cubic-bezier(0.4, 0.0, 0.2, 1)' // Smooth easing
  };

  let loader = null;
  let maskRect = null;
  let progressDisplay = null;
  let startTime = null;
  let animationFrame = null;
  let isComplete = false;

  // Create SVG element helper
  function createSVG(color, useMask = false) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', config.svgWidth);
    svg.setAttribute('viewBox', config.viewBox);
    svg.setAttribute('fill', 'none');

    if (useMask) {
      // Create defs and mask for front SVG
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
      mask.setAttribute('id', 'preloader-mask');
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('id', 'preloader-mask-rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '100%'); // Start at bottom
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', '#fff');
      
      maskRect = rect; // Store reference
      mask.appendChild(rect);
      defs.appendChild(mask);
      svg.appendChild(defs);
    }

    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', config.svgPath);
    path.setAttribute('fill', color);
    
    if (useMask) {
      path.setAttribute('mask', 'url(#preloader-mask)');
    }
    
    svg.appendChild(path);
    return svg;
  }

  // Create loader element
  function createLoader() {
    // Create main loader container
    const loaderEl = document.createElement('div');
    loaderEl.className = 'svgloader svgloader-active';

    // Create back logo container
    const logoBack = document.createElement('div');
    logoBack.className = 'logo-back';
    logoBack.appendChild(createSVG(config.backColor, false));

    // Create front logo container
    const logoFront = document.createElement('div');
    logoFront.className = 'logo-front';
    logoFront.appendChild(createSVG(config.frontColor, true));

    // Create progress display (optional, can be hidden via CSS)
    progressDisplay = document.createElement('div');
    progressDisplay.className = 'svgloader-progress';
    progressDisplay.textContent = '0%';

    // Append elements
    loaderEl.appendChild(logoBack);
    loaderEl.appendChild(logoFront);
    loaderEl.appendChild(progressDisplay);

    return loaderEl;
  }

  // Easing function for smooth animation
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Animate progress
  function animateProgress(timestamp) {
    if (!startTime) startTime = timestamp;
    
    const elapsed = timestamp - startTime;
    const rawProgress = Math.min(elapsed / config.duration, 1);
    const easedProgress = easeInOutCubic(rawProgress);
    const progress = easedProgress * 100;

    // Update mask position (100% - progress because we're revealing from bottom)
    if (maskRect) {
      const yPosition = 100 - progress;
      maskRect.setAttribute('y', yPosition + '%');
    }

    // Update progress display
    if (progressDisplay) {
      progressDisplay.textContent = Math.round(progress) + '%';
    }

    // Continue animation or complete
    if (rawProgress < 1) {
      animationFrame = requestAnimationFrame(animateProgress);
    } else {
      completeLoading();
    }
  }

  // Complete loading
  function completeLoading() {
    if (isComplete) return;
    isComplete = true;
    
    // Ensure mask is fully revealed
    if (maskRect) {
      maskRect.setAttribute('y', '0%');
    }
    if (progressDisplay) {
      progressDisplay.textContent = '100%';
    }

    // Cancel animation frame
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }

    // Trigger completion event
    document.dispatchEvent(new Event('preloadComplete'));

    // Remove loader after delay
    setTimeout(() => {
      if (loader) {
        loader.classList.add('svgloader-complete');
        loader.addEventListener('transitionend', () => {
          loader.remove();
          // Enable animations on body
          document.body.classList.add('preload-complete');
          // Remove animation block
          const blockStyle = document.getElementById('preloader-animation-block');
          if (blockStyle) blockStyle.remove();
        }, { once: true });
      }
    }, config.removeDelay);
  }

  // Prevent animations until preload is complete
  function blockAnimations() {
    // Add class to body to disable animations
    document.body.classList.add('preloading');
    
    // Create style to disable all animations/transitions
    const style = document.createElement('style');
    style.id = 'preloader-animation-block';
    style.textContent = `
      .preloading * {
        animation-play-state: paused !important;
        transition: none !important;
      }
      .preloading .svgloader,
      .preloading .svgloader * {
        animation-play-state: running !important;
        transition: all 0.3s ease !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize loader
  function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Check for loaderholder element
    const loaderHolder = document.querySelector('.loaderholder');
    if (!loaderHolder) {
      // No loaderholder found, don't create preloader
      console.log('AnimatedSVGPreloader: No loaderholder element found, skipping initialization');
      isComplete = true; // Mark as complete so other scripts don't wait
      document.dispatchEvent(new Event('preloadComplete'));
      return;
    }

    // Block animations immediately
    blockAnimations();

    // Create loader
    loader = createLoader();
    
    // Replace loaderholder with loader
    loaderHolder.parentNode.replaceChild(loader, loaderHolder);

    // Start animation
    requestAnimationFrame(animateProgress);

    // Listen for preload complete to unblock animations
    document.addEventListener('preloadComplete', () => {
      document.body.classList.remove('preloading');
    });
  }

  // Public API
  window.AnimatedSVGPreloader = {
    init: init,
    config: config,
    getProgress: () => {
      if (!loader || !startTime) return 100; // Return 100% if not initialized
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / config.duration) * 100, 100);
      return progress;
    },
    isComplete: () => isComplete,
    forceComplete: () => {
      if (!isComplete && loader) { // Only complete if loader exists
        completeLoading();
      }
    },
    isInitialized: () => loader !== null // New method to check if actually initialized
  };

  // Auto-initialize
  init();

})(); 