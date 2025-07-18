var animationClasses = ['fadeup', 'fadeup3', 'slideup', 'slidein', 'rotatein', 'popin'];
var elementsToAnimate = [];

// Collect all elements with animation classes
animationClasses.forEach(function(className) {
  var elements = document.getElementsByClassName(className);
  for (var i = 0; i < elements.length; i++) {
    elementsToAnimate.push(elements[i]);
  }
});

// Process each element to wrap words and letters
elementsToAnimate.forEach(function(element) {
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
document.querySelectorAll('.fadeup .letter, .fadeup3 .letter').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.slidein .tricksword').forEach(function(el) {
  el.style.opacity = '0';
});

document.querySelectorAll('.image-card').forEach(function(el) {
  el.style.opacity = '0';
});
// Copyright end

// Slide In Animation
var slideIn = anime.timeline({
  loop: false,
  autoplay: false,
});

slideIn
  .add({
    targets: '.slidein .tricksword',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 1000,
    delay: (el, i) => 400 + 90 * (i+1)
  });

// Slide Up Animation
var slideUp = anime.timeline({
  loop: false,
  autoplay: false,
});

slideUp
  .add({
    targets: '.slideup .letter',
    translateY: ["1.1em", 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  });

// Fade Up Animation
var fadeUp = anime.timeline({
  loop: false,
  autoplay: false,
});

fadeUp 
  .add({
    targets: '.fadeup .letter',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 2500,
    delay: (el, i) => 500 + 50 * i
  });

// Fade Up3 Animation
var fadeUp3 = anime.timeline({
  loop: false,
  autoplay: false,
});

fadeUp3 
  .add({
    targets: '.fadeup3 .letter',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 50 + 20 * i
  });

// Fade Up Card Animation
var fadeUpCard = anime.timeline({
  loop: false,
  autoplay: false,
});

fadeUpCard 
  .add({
    targets: '.image-card',
    translateY: [100,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: (el, i) => 850 + 150 * i
  });

// Rotate In Animation
var rotateIn = anime.timeline({
  loop: false,
  autoplay: false,
});

rotateIn 
  .add({
    targets: '.rotatein .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  });

// Pop In Animation
var popIn = anime.timeline({
  loop: false,
  autoplay: false,
});

popIn
  .add({
    targets: '.popin .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  });

// Function to play all animations
function playAllAnimations() {
  // Play your animation with these
  fadeUp.play();
  slideUp.play();
  rotateIn.play();
  popIn.play();

  // Wait before playing animation
  setTimeout(() => {  
    // Put the play below this line
    fadeUpCard.play();
    slideIn.play();
  }, 800);
}

// Check if SVG preloader exists and wait for it to complete
if (typeof window.AnimatedSVGPreloader !== 'undefined' && !window.AnimatedSVGPreloader.isComplete()) {
  // Wait for preloader to complete
  document.addEventListener('preloadComplete', function() {
    playAllAnimations();
  });
} else {
  // Preloader doesn't exist or is already complete, play immediately
  playAllAnimations();
}

// Play animation when something is clicked
$( ".your-button-class" ).click(function() {
  // Put the play below this line
});

// Play animation when hovered in
$( ".your-button-class" ).mouseenter(function() {
  // Put the play below this line
});

// Play animation when scrolled into view
$('#text-container').on('inview', function(event, isInView) {
  if (isInView) {
    fadeUp3.play();
  } else {
  }
}); 