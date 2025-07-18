/* Webflow Slider Arrow Navigation */
var Webflow = Webflow || [];
Webflow.push(function() {
  var l = $('#flowbaseSlider .w-slider-arrow-left');
  var r = $('#flowbaseSlider .w-slider-arrow-right');
  $('#flowbaseSlider')
    .on('click', '.slider-left', function() {
      l.trigger('tap');
    })
    .on('click', '.slider-right', function() {
      r.trigger('tap');
    });
});

/* Slider Counter */
$(document).ready(function() {
  /* Get the number of slides */
  var numItems = $(".w-slider-dot").length;
  var totalSlides = document.getElementById("totalSlides");
  if (totalSlides) {
    totalSlides.innerHTML = numItems;
  }
  
  /* Set the index value before slide changed */
  var myIndex = $(".w-slider-dot.w-active").index();
  var counter = document.getElementById("counter");
  if (counter) {
    counter.innerHTML = myIndex + 1;
  }

  /* Change the index dynamically */
  $(".w-slide").attrchange({
    trackValues: true,
    callback: function(event) {
      myIndex = $(".w-slider-dot.w-active").index();
      if (counter) {
        counter.innerHTML = myIndex + 1;
      }
    }
  });
});

/* Splide Carousel Configuration */
function slider1() {
  let splides = $('.slider1');
  for (let i = 0, splideLength = splides.length; i < splideLength; i++) {
    new Splide(splides[i], {
      // Desktop on down
      perPage: 2,
      perMove: 1,
      focus: 0, // 0 = left and 'center' = center
      type: 'slide', // 'loop' or 'slide'
      gap: '3em', // space between slides
      arrows: false, // 'slider' or false
      pagination: 'slider', // 'slider' or false
      speed: 600, // transition speed in milliseconds
      dragAngleThreshold: 60, // default is 30
      autoWidth: false, // for cards with differing widths
      rewind: false, // go back to beginning when reach end
      rewindSpeed: 400,
      waitForTransition: false,
      updateOnMove: true,
      trimSpace: false, // true removes empty space from end of list
      breakpoints: {
        991: {
          // Tablet
          perPage: 2,
          gap: '3vw',
        },
        767: {
          // Mobile Landscape
          perPage: 1,
          gap: '3vw',
        },
        479: {
          // Mobile Portrait
          perPage: 1,
          gap: '3vw',
        }
      }
    }).mount();
  }
}

// Initialize slider if Splide is loaded
if (typeof Splide !== 'undefined') {
  slider1();
} 