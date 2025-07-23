document.addEventListener('DOMContentLoaded', function () {
  /**
   * Init magnetic dots animated sections 
   */
  const animationCanvas = document.querySelectorAll('.animation-magnetic-dots');
  if (animationCanvas) {
    animationCanvas.forEach(canvasParent => {

      const canvas = document.createElement('canvas');
      canvas.setAttribute('class', 'animation-magnetic-dots__canvas');
      canvasParent.appendChild(canvas);

      setupCanvas(canvasParent);
    });
  }
});

/**
* Define dots behavior
*/
function setupCanvas(canvasParent) {
  const canvas = canvasParent.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const magnet = 500;
  const dotSize = 1;
  const dotSpacing = 14;
  const mouse = { x: null, y: null };

  const disableHover = canvasParent.getAttribute('disable-hover');

  // Detect mouse movement inside the canvas
  if (!disableHover) {
    canvasParent.addEventListener('mousemove', function (event) {
      const canvasCoords = canvasParent.getBoundingClientRect();
      mouse.x = event.clientX - canvasCoords.left;
      mouse.y = event.clientY - canvasCoords.top;
    });
    
    // Restore the positions when mouse leaves the div, with animation
    canvasParent.addEventListener('mouseleave', function () {
      mouse.x = null;
      mouse.y = null;
    });
  }

  // Define animation canvas size
  function resizeCanvas() {
    const hasWidth = canvasParent.dataset.dotsWidth;
    if (hasWidth) {
      canvas.width = canvasParent.offsetWidth * (hasWidth / 100);
    } else {
      canvas.width = canvasParent.offsetWidth;
    }

    canvas.height = canvasParent.offsetHeight;
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Create the dots
  function makeDot(x, y) {
    this.x = x;
    this.y = y;
    this.originalX = x;
    this.originalY = y;
    this.draw = () => {
      ctx.beginPath();
      ctx.arc(this.x, this.y, dotSize, 0, 2 * Math.PI);
      ctx.fillStyle = '#c6c6c6';
      ctx.fill();
    };

    this.update = () => {
      if (!disableHover) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const powerX = this.x - (dx / distance) * magnet / distance;
          const powerY = this.y - (dy / distance) * magnet / distance;

          this.x = powerX + (this.originalX - this.x) * 0.5;
          this.y = powerY + (this.originalY - this.y) * 0.5;
        } else {
          // Smoothly interpolate back to the original position
          this.x += (this.originalX - this.x) * 0.05; // Adjust 0.05 for the smoothness
          this.y += (this.originalY - this.y) * 0.05; // Adjust 0.05 for the smoothness
        }
      }
      this.draw();
    };
  }

  let allDots = [];
  function init() {
    const yLength = (canvas.height - dotSpacing) / dotSpacing;
    const xLength = (canvas.width - dotSpacing) / dotSpacing;

    for (let j = 0; j < yLength; j++) {
      for (let i = 0; i < xLength; i++) {
        allDots.push(new makeDot(i * dotSpacing + dotSpacing, j * dotSpacing + dotSpacing));
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allDots.forEach(dot => dot.update());
    requestAnimationFrame(animate);
  }

  init();
  animate();
} 