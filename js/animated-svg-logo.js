(function() {
  'use strict';

  // Configuration options
  const config = {
    svgWidth: '40%',
    viewBox: '0 0 387.33 270.66',
    backColor: '#f0edec',
    frontColor: '#00b795',
    svgPath: 'm383.23,23.79l-242.77,242.77c-8.77,8.77-23.79,2.55-23.79-9.86V54.85L23.8,147.71c-8.79,8.77-23.8,2.57-23.8-9.85V13.94C0,6.24,6.24,0,13.94,0h359.43c12.41,0,18.63,15.01,9.86,23.79Z',
    animationDuration: 1400, // Total animation duration in ms
    removeOnComplete: true // Whether to remove loader after animation
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
      mask.setAttribute('id', 'mask');
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('id', 'mask-rect');
      rect.setAttribute('x', '0');
      rect.setAttribute('y', '0');
      rect.setAttribute('width', '100%');
      rect.setAttribute('height', '100%');
      rect.setAttribute('fill', '#fff');
      
      mask.appendChild(rect);
      defs.appendChild(mask);
      svg.appendChild(defs);
    }

    // Create path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', config.svgPath);
    path.setAttribute('fill', color);
    
    if (useMask) {
      path.setAttribute('mask', 'url(#mask)');
    }
    
    svg.appendChild(path);
    return svg;
  }

  // Create loader element
  function createLoader() {
    // Create main loader container
    const loader = document.createElement('div');
    loader.className = 'loader';

    // Create back logo container
    const logoBack = document.createElement('div');
    logoBack.className = 'logo-back';
    logoBack.appendChild(createSVG(config.backColor, false));

    // Create front logo container
    const logoFront = document.createElement('div');
    logoFront.className = 'logo-front';
    logoFront.appendChild(createSVG(config.frontColor, true));

    // Append logo containers to loader
    loader.appendChild(logoBack);
    loader.appendChild(logoFront);

    return loader;
  }

  // Initialize loader
  function init() {
    // Check if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Create and append loader
    const loader = createLoader();
    document.body.insertBefore(loader, document.body.firstChild);

    // Optional: Remove loader after animation completes
    if (config.removeOnComplete) {
      setTimeout(() => {
        loader.addEventListener('transitionend', () => {
          loader.remove();
        });
      }, config.animationDuration);
    }
  }

  // Public API
  window.AnimatedSVGLogo = {
    init: init,
    config: config,
    create: createLoader,
    remove: function() {
      const loader = document.querySelector('.loader');
      if (loader) loader.remove();
    }
  };

  // Auto-initialize
  init();

})(); 