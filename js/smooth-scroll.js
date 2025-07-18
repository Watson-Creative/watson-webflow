/* Smooth Scroll Initialization */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize smooth scroll with native scrolling and preload enabled
  var scroll = new Smooth({ 
    native: true, 
    preload: true 
  });
  
  scroll.init();
}); 