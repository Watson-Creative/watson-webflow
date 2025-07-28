var startdelay = 200;
var animationClasses = ['fadeup', 'slideup', 'slidein', 'rotatein', 'popin', 'typewriter', 'wavein', 'zoomin', 'flipin', 'bouncein', 'horizontal-split', 'wavy-text', 'raining-letters', 'subtle-highlight', 'exploding-chars'];
var extraClasses = { 
  'intro-heading': 'slidein',
  'heading-2-big': 'slidein'
};
var elementsToAnimate = [];

// Collect all elements with animation classes
animationClasses.forEach(function(className) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    elementsToAnimate.push(elements[i]);
  }
});

// Collect all elements with extra classes and add the corresponding animation class
Object.keys(extraClasses).forEach(function(customClass) {
  var elements = document.getElementsByClassName(customClass);
  var animationClass = extraClasses[customClass];
  
  for (var i = 0; i < elements.length; i++) {
    // Add the animation class to the element
    elements[i].classList.add(animationClass);
    // Add to the elements to animate array
    elementsToAnimate.push(elements[i]);
  }
});

// Process each element to wrap words and letters
elementsToAnimate.forEach(function(element) {
  // Add a marker that this element is prepared for animation
  element.setAttribute('data-animation-ready', 'true');
  element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
});

// Apply styles to tricksword elements
var tricksWords = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksWords.length; i++) {
  tricksWords[i].style.whiteSpace = 'nowrap';
}

// Now wrap individual letters and apply styles
var tricksLetter = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksLetter.length; i++) {
  var letterWrap = tricksLetter.item(i);
  letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}

// Apply styles to all letter elements
var letters = document.getElementsByClassName("letter");
for (var i = 0; i < letters.length; i++) {
  letters[i].style.display = 'inline-block';
}

// Set initial opacity for animated elements
document.querySelectorAll('.fadeup .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.slideup .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.slidein .tricksword').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.rotatein .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.popin .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.typewriter .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.wavein .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.zoomin .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.flipin .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.bouncein .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.horizontal-split .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.wavy-text .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.raining-letters .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.subtle-highlight .letter').forEach(function(el) {
  el.style.opacity = '0.25';
});

document.querySelectorAll('.exploding-chars .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.image-card').forEach(function(el) {
  el.style.opacity = '0';
});

// Create animation functions that can be called on demand
function createFadeUpAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2500,
    delay: (el, i) => startdelay + 50 * i,
    autoplay: false
  });
}

function createSlideUpAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: ["1.1em", 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => startdelay + 50 * i,
    autoplay: false
  });
}

function createSlideInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.tricksword'),
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => startdelay + 90 * (i+1),
    autoplay: false
  });
}

function createRotateInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    opacity: [0,1],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => startdelay + 50 * i,
    autoplay: false
  });
}

function createPopInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    scale: [0, 1],
    opacity: [0,1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => startdelay + 45 * (i+1),
    autoplay: false
  });
}

function createTypewriterAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    opacity: [0,1],
    easing: "linear",
    duration: 100,
    delay: (el, i) => startdelay + 100 * i,
    autoplay: false
  });
}

function createWaveInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: function(el, i) {
      return [Math.sin(i * 0.5) * 50, 0];
    },
    opacity: [0,1],
    easing: "easeOutElastic",
    duration: 1200,
    delay: (el, i) => startdelay + 40 * i,
    autoplay: false
  });
}

function createZoomInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    scale: [3, 1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 1000,
    delay: (el, i) => startdelay + 30 * i,
    autoplay: false
  });
}

function createFlipInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    rotateY: [-90, 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 800,
    easing: "easeOutExpo",
    delay: (el, i) => startdelay + 60 * i,
    autoplay: false
  });
}

function createBounceInAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: [-100, 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 1000,
    easing: "easeOutElastic",
    delay: (el, i) => startdelay + 50 * i,
    autoplay: false
  });
}

function createHorizontalSplitAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateX: ['100%', 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 500,
    easing: "easeInOutQuad",
    delay: (el, i) => startdelay + 5 * i,
    autoplay: false
  });
}

function createWavyTextAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: function(el, i) {
      return [Math.sin(i * 0.3) * 30, 0];
    },
    opacity: [0,1],
    duration: 500,
    easing: "easeInOutCubic",
    delay: (el, i) => startdelay + 50 * i,
    autoplay: false
  });
}

function createRainingLettersAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    translateY: ['100%', 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 800,
    easing: "easeOutQuad",
    delay: (el, i) => startdelay + 10 * i,
    autoplay: false
  });
}

function createSubtleHighlightAnimation(element) {
  return anime({
    targets: element.querySelectorAll('.letter'),
    opacity: [0.25, 1],
    textShadow: ['0 0 0px rgba(255,255,255,0)', '0 0 30px rgba(255,255,255,0.9)'],
    duration: 350,
    easing: "easeOutCubic",
    delay: (el, i) => startdelay + 12 * i,
    autoplay: false
  });
}

function createExplodingCharsAnimation(element) {
  // First, create the explosion animation
  const explosionAnimation = anime({
    targets: element.querySelectorAll('.letter'),
    translateX: function(el, i) {
      return (Math.random() - 0.5) * 60;
    },
    translateY: function(el, i) {
      return (Math.random() - 0.5) * 100;
    },
    rotate: function(el, i) {
      return Math.random() * 360 - 180;
    },
    opacity: [0, 1],
    scale: [0, 1],
    duration: 600,
    easing: "easeOutCirc",
    delay: (el, i) => startdelay + 5 * i,
    autoplay: false,
    complete: function() {
      // After explosion completes, animate back to original positions
      const returnAnimation = anime({
        targets: element.querySelectorAll('.letter'),
        translateX: 0,
        translateY: 0,
        rotate: 0,
        duration: 600,
        easing: "easeInOutQuad",
        delay: (el, i) => 100 + 10 * i,
        autoplay: false
      });
      returnAnimation.play();
    }
  });
  
  return explosionAnimation;
}

function createImageCardAnimation() {
  return anime({
    targets: '.image-card',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => startdelay + 150 * i,
    autoplay: false
  });
}

// Create Intersection Observer to trigger animations when elements come into view
var observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1 // Trigger when 10% of element is visible
};

var observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
      // Mark as animated to prevent re-animation
      entry.target.setAttribute('data-animated', 'true');
      
      var element = entry.target;
      var animation = null;
      
      // Create and play the appropriate animation
      if (element.classList.contains('fadeup')) {
        animation = createFadeUpAnimation(element);
      } else if (element.classList.contains('slideup')) {
        animation = createSlideUpAnimation(element);
      } else if (element.classList.contains('slidein')) {
        animation = createSlideInAnimation(element);
      } else if (element.classList.contains('rotatein')) {
        animation = createRotateInAnimation(element);
      } else if (element.classList.contains('popin')) {
        animation = createPopInAnimation(element);
      } else if (element.classList.contains('typewriter')) {
        animation = createTypewriterAnimation(element);
      } else if (element.classList.contains('wavein')) {
        animation = createWaveInAnimation(element);
      } else if (element.classList.contains('zoomin')) {
        animation = createZoomInAnimation(element);
      } else if (element.classList.contains('flipin')) {
        animation = createFlipInAnimation(element);
      } else if (element.classList.contains('bouncein')) {
        animation = createBounceInAnimation(element);
      } else if (element.classList.contains('horizontal-split')) {
        animation = createHorizontalSplitAnimation(element);
      } else if (element.classList.contains('wavy-text')) {
        animation = createWavyTextAnimation(element);
      } else if (element.classList.contains('raining-letters')) {
        animation = createRainingLettersAnimation(element);
      } else if (element.classList.contains('subtle-highlight')) {
        animation = createSubtleHighlightAnimation(element);
      } else if (element.classList.contains('exploding-chars')) {
        animation = createExplodingCharsAnimation(element);
      }
      
      if (animation) {
        animation.play();
      }
      
      // Stop observing this element
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
elementsToAnimate.forEach(function(element) {
  observer.observe(element);
});

// Add click handlers to all animated elements to retrigger animations
elementsToAnimate.forEach(function(element) {
  element.style.cursor = 'pointer'; // Add pointer cursor to indicate clickability
  
  element.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remove the animated attribute to allow re-animation
    element.removeAttribute('data-animated');
    
    // Reset opacity for all animation types
    if (element.classList.contains('fadeup')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createFadeUpAnimation(element);
      animation.play();
    } else if (element.classList.contains('slideup')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createSlideUpAnimation(element);
      animation.play();
    } else if (element.classList.contains('slidein')) {
      element.querySelectorAll('.tricksword').forEach(function(word) {
        word.style.opacity = '0';
      });
      var animation = createSlideInAnimation(element);
      animation.play();
    } else if (element.classList.contains('rotatein')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createRotateInAnimation(element);
      animation.play();
    } else if (element.classList.contains('popin')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createPopInAnimation(element);
      animation.play();
    } else if (element.classList.contains('typewriter')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createTypewriterAnimation(element);
      animation.play();
    } else if (element.classList.contains('wavein')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createWaveInAnimation(element);
      animation.play();
    } else if (element.classList.contains('zoomin')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createZoomInAnimation(element);
      animation.play();
    } else if (element.classList.contains('flipin')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createFlipInAnimation(element);
      animation.play();
    } else if (element.classList.contains('bouncein')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createBounceInAnimation(element);
      animation.play();
    } else if (element.classList.contains('horizontal-split')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createHorizontalSplitAnimation(element);
      animation.play();
    } else if (element.classList.contains('wavy-text')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createWavyTextAnimation(element);
      animation.play();
    } else if (element.classList.contains('raining-letters')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createRainingLettersAnimation(element);
      animation.play();
    } else if (element.classList.contains('subtle-highlight')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0.25';
      });
      var animation = createSubtleHighlightAnimation(element);
      animation.play();
    } else if (element.classList.contains('exploding-chars')) {
      element.querySelectorAll('.letter').forEach(function(letter) {
        letter.style.opacity = '0';
      });
      var animation = createExplodingCharsAnimation(element);
      animation.play();
    }
    
    // Re-mark as animated after a short delay to prevent immediate re-triggering
    setTimeout(function() {
      element.setAttribute('data-animated', 'true');
    }, 100);
  });
});

// Special observer for image cards
var imageCardObserver = new IntersectionObserver(function(entries, observer) {
  var visibleCards = [];
  
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
      visibleCards.push(entry.target);
    }
  });
  
  if (visibleCards.length > 0) {
    // Mark all visible cards as animated
    visibleCards.forEach(function(card) {
      card.setAttribute('data-animated', 'true');
      observer.unobserve(card);
    });
    
    // Animate all visible cards together
    var animation = createImageCardAnimation();
    animation.play();
  }
}, observerOptions);

// Observe all image cards
document.querySelectorAll('.image-card').forEach(function(card) {
  imageCardObserver.observe(card);
});

// Handle SVG preloader if it exists
if (typeof window.AnimatedSVGPreloader !== 'undefined' && !window.AnimatedSVGPreloader.isComplete()) {
  document.addEventListener('preloadComplete', function() {
    // Preloader complete - animations will trigger on scroll
  });
}

// Event-based animation triggers for manual control
window.triggerAnimation = function(selector, animationType) {
  var element = document.querySelector(selector);
  if (!element) return;
  
  var animation = null;
  
  switch(animationType) {
    case 'fadeup':
      animation = createFadeUpAnimation(element);
      break;
    case 'slideup':
      animation = createSlideUpAnimation(element);
      break;
    case 'slidein':
      animation = createSlideInAnimation(element);
      break;
    case 'rotatein':
      animation = createRotateInAnimation(element);
      break;
    case 'popin':
      animation = createPopInAnimation(element);
      break;
    case 'typewriter':
      animation = createTypewriterAnimation(element);
      break;
    case 'wavein':
      animation = createWaveInAnimation(element);
      break;
    case 'zoomin':
      animation = createZoomInAnimation(element);
      break;
    case 'flipin':
      animation = createFlipInAnimation(element);
      break;
    case 'bouncein':
      animation = createBounceInAnimation(element);
      break;
    case 'horizontal-split':
      animation = createHorizontalSplitAnimation(element);
      break;
    case 'wavy-text':
      animation = createWavyTextAnimation(element);
      break;
    case 'raining-letters':
      animation = createRainingLettersAnimation(element);
      break;
    case 'subtle-highlight':
      animation = createSubtleHighlightAnimation(element);
      break;
    case 'exploding-chars':
      animation = createExplodingCharsAnimation(element);
      break;
  }
  
  if (animation) {
    animation.play();
  }
}; 