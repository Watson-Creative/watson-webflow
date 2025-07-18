// Copyright start
// © Code by T.RICKS, https://www.tricksdesign.com/
// You have the license to use this code in your projects but not redistribute it to others

// Find all text with animation classes and break each letter into a span
var animationClasses = ['fade-up', 'fade-up3', 'slide-up', 'slide-in', 'rotate-in', 'pop-in'];
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

// Now wrap individual letters
var tricksLetter = document.getElementsByClassName("tricksword");
for (var i = 0; i < tricksLetter.length; i++) {
  var letterWrap = tricksLetter.item(i);
  letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
}
// Copyright end

// Slide In Animation
var slideIn = anime.timeline({
  loop: false,
  autoplay: false,
});

slideIn
  .add({
    targets: '.slide-in .tricksword',
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
    targets: '.slide-up .letter',
    translateY: ["1.1em", 0],
    opacity: [0,1],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.slide-up',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Fade Up Animation
var fadeUp = anime.timeline({
  loop: false,
  autoplay: false,
});

fadeUp 
  .add({
    targets: '.fade-up .letter',
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
    targets: '.fade-up3 .letter',
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
    targets: '.rotate-in .letter',
    translateY: ["1.1em", 0],
    translateX: ["0.55em", 0],
    translateZ: 0,
    rotateZ: [180, 0],
    duration: 750,
    easing: "easeOutExpo",
    delay: (el, i) => 50 * i
  }).add({
    targets: '.rotate-in',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

// Pop In Animation
var popIn = anime.timeline({
  loop: false,
  autoplay: false,
});

popIn
  .add({
    targets: '.pop-in .letter',
    scale: [0, 1],
    duration: 1500,
    elasticity: 600,
    delay: (el, i) => 45 * (i+1)
  }).add({
    targets: '.pop-in',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

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