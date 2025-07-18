(function() {
  'use strict';

  // Configuration options
  const config = {
    svgWidth: '40%',
    viewBox: '0 0 387.33 270.66',
    backColor: '#f0edec',
    frontColor: '#00b795',
    svgPath: 'm383.23,23.79l-242.77,242.77c-8.77,8.77-23.79,2.55-23.79-9.86V54.85L23.8,147.71c-8.79,8.77-23.8,2.57-23.8-9.85V13.94C0,6.24,6.24,0,13.94,0h359.43c12.41,0,18.63,15.01,9.86,23.79Z',
    minDuration: 800, // Minimum duration in ms
    removeDelay: 300, // Delay before removing loader after completion
    smoothingFactor: 0.1 // Smoothing for progress updates
  };

  let loader = null;
  let maskRect = null;
  let progressDisplay = null;
  let currentProgress = 0;
  let targetProgress = 0;
  let isComplete = false;
  let animationFrame = null;
  let loadStartTime = Date.now();

  // Resources to track
  const resources = {
    images: [],
    scripts: [],
    stylesheets: [],
    loaded: 0,
    total: 0
  };

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

  // Track resource loading
  function trackResources() {
    // Track images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete || img.naturalWidth === 0) {
        resources.images.push(img);
        resources.total++;
        img.addEventListener('load', handleResourceLoad);
        img.addEventListener('error', handleResourceLoad);
      }
    });

    // Track background images in CSS
    const elementsWithBg = document.querySelectorAll('[style*="background-image"]');
    elementsWithBg.forEach(el => {
      const bgImage = new Image();
      const urlMatch = el.style.backgroundImage.match(/url\(['"]?([^'")]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        bgImage.src = urlMatch[1];
        if (!bgImage.complete) {
          resources.images.push(bgImage);
          resources.total++;
          bgImage.addEventListener('load', handleResourceLoad);
          bgImage.addEventListener('error', handleResourceLoad);
        }
      }
    });

    // Track videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (video.readyState < 3) { // HAVE_FUTURE_DATA
        resources.total++;
        video.addEventListener('canplaythrough', handleResourceLoad);
        video.addEventListener('error', handleResourceLoad);
      }
    });

    // Track stylesheets
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach(link => {
      // Only track external stylesheets
      if (link.href && !link.href.startsWith('data:')) {
        resources.stylesheets.push(link);
        resources.total++;
      }
    });

    // Track scripts that haven't loaded yet
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      // Check if script is still loading
      if (!script.loaded && script.async !== false) {
        resources.scripts.push(script);
        resources.total++;
        script.addEventListener('load', handleResourceLoad);
        script.addEventListener('error', handleResourceLoad);
      }
    });

    // If no resources to track, simulate loading progress
    if (resources.total === 0) {
      resources.total = 10; // Simulate 10 steps
      let simulatedLoaded = 0;
      
      // Simulate gradual loading
      const simulateProgress = () => {
        if (simulatedLoaded < resources.total) {
          simulatedLoaded++;
          resources.loaded = simulatedLoaded;
          updateProgress();
          
          // Variable delay for more natural feel
          const delay = Math.random() * 50 + 30;
          setTimeout(simulateProgress, delay);
        }
      };
      
      // Start simulation after a small delay
      setTimeout(simulateProgress, 50);
    } else {
      // Start checking stylesheets
      checkStylesheets();
    }

    // Also listen for window load as a fallback
    if (document.readyState !== 'complete') {
      window.addEventListener('load', () => {
        // Force completion if we're still waiting
        if (!isComplete && targetProgress < 100) {
          targetProgress = 100;
          updateProgress();
        }
      });
    }
  }

  // Handle resource load
  function handleResourceLoad() {
    resources.loaded++;
    updateProgress();
  }

  // Check if stylesheets are loaded
  function checkStylesheets() {
    let allLoaded = true;
    resources.stylesheets.forEach(link => {
      try {
        // Try to access the stylesheet
        if (link.sheet && link.sheet.cssRules) {
          // Stylesheet is loaded
        } else {
          allLoaded = false;
        }
      } catch (e) {
        // External stylesheet not loaded yet
        allLoaded = false;
      }
    });

    if (allLoaded && resources.stylesheets.length > 0) {
      resources.loaded += resources.stylesheets.length;
      resources.stylesheets = [];
      updateProgress();
    } else if (resources.stylesheets.length > 0) {
      // Check again in a bit
      setTimeout(checkStylesheets, 50);
    }
  }

  // Update progress
  function updateProgress() {
    if (resources.total > 0) {
      targetProgress = (resources.loaded / resources.total) * 100;
    }

    // Check if we've reached minimum duration
    const elapsed = Date.now() - loadStartTime;
    if (targetProgress >= 100 && elapsed < config.minDuration) {
      // Delay completion until minimum duration
      setTimeout(updateProgress, 50);
      return;
    }

    if (targetProgress >= 100 && !isComplete) {
      completeLoading();
    }
  }

  // Smooth progress animation
  function animateProgress() {
    if (isComplete) return;

    // Smooth interpolation
    currentProgress += (targetProgress - currentProgress) * config.smoothingFactor;

    // Update mask position (100% - progress because we're revealing from bottom)
    if (maskRect) {
      const yPosition = 100 - currentProgress;
      maskRect.setAttribute('y', yPosition + '%');
    }

    // Update progress display
    if (progressDisplay) {
      progressDisplay.textContent = Math.round(currentProgress) + '%';
    }

    // Continue animation
    animationFrame = requestAnimationFrame(animateProgress);
  }

  // Complete loading
  function completeLoading() {
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

  // Remove animation block
  function unblockAnimations() {
    document.body.classList.remove('preloading');
    const blockStyle = document.getElementById('preloader-animation-block');
    if (blockStyle) blockStyle.remove();
  }

  // Initialize loader
  function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Block animations immediately
    blockAnimations();

    // Create and append loader
    loader = createLoader();
    document.body.insertBefore(loader, document.body.firstChild);

    // Reset start time
    loadStartTime = Date.now();

    // Start tracking resources
    trackResources();

    // Start progress animation immediately
    requestAnimationFrame(animateProgress);

    // Listen for window load as backup
    window.addEventListener('load', () => {
      // Ensure we complete after window load
      if (!isComplete) {
        targetProgress = 100;
        updateProgress();
      }
    });

    // Listen for preload complete to unblock animations
    document.addEventListener('preloadComplete', unblockAnimations);
  }

  // Public API
  window.AnimatedSVGPreloader = {
    init: init,
    config: config,
    getProgress: () => currentProgress,
    isComplete: () => isComplete,
    forceComplete: () => {
      targetProgress = 100;
      updateProgress();
    }
  };

  // Auto-initialize
  init();

})(); 