// Scroll Color Transition
// Smoothly transitions body background color based on scroll position

(function() {
    'use strict';
    
    // Color values from CSS variables
    const colors = {
        forest: { r: 12, g: 75, b: 65 },      // #0c4b41
        glacial: { r: 0, g: 183, b: 149 },    // #00b795
        lightGreen: { r: 146, g: 208, b: 195 }, // #92d0c3
        offWhite: { r: 240, g: 237, b: 236 }   // #f0edec
    };
    
    // Function to check if we're on mobile devices
    function isMobileDevice() {
        return window.innerWidth <= 991;
    }
    
    // Function to interpolate between two colors
    function interpolateColor(color1, color2, factor) {
        const result = {
            r: Math.round(color1.r + factor * (color2.r - color1.r)),
            g: Math.round(color1.g + factor * (color2.g - color1.g)),
            b: Math.round(color1.b + factor * (color2.b - color1.b))
        };
        // Handle alpha if present
        if (color1.a !== undefined && color2.a !== undefined) {
            result.a = color1.a + factor * (color2.a - color1.a);
        }
        return result;
    }
    
    // Function to convert RGB object to CSS string
    function rgbToString(color) {
        if (color.a !== undefined) {
            return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
        }
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
    
    // Function to update background color based on scroll
    function updateBackgroundColor() {
        // Only run if body has the scrollcolortransition class
        if (!document.body.classList.contains('scrollcolortransition')) {
            return;
        }
        
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = document.documentElement.scrollHeight;
        
        // Calculate total scrollable height
        const totalHeight = viewportHeight;
        const halfPageHeight = totalHeight / 6;
    
        // Calculate progress based on half the total scroll distance
        const scrollProgress = Math.min(scrollY / halfPageHeight, 1);
        
        let backgroundColor;
        let siteMenuColor;
        
        if (scrollProgress <= 0.333) {
            // Forest to Glacial (0% to 33.33%)
            const localProgress = scrollProgress / 0.333;
            backgroundColor = interpolateColor(colors.forest, colors.glacial, localProgress);
            // Site menu: transparent to glacial
            siteMenuColor = interpolateColor({ r: 0, g: 0, b: 0, a: 0 }, colors.glacial, localProgress);
        } else if (scrollProgress <= 0.666) {
            // Glacial to Light Green (33.33% to 66.66%)
            const localProgress = (scrollProgress - 0.333) / 0.333;
            backgroundColor = interpolateColor(colors.glacial, colors.lightGreen, localProgress);
            // Site menu: glacial to light green
            siteMenuColor = interpolateColor(colors.glacial, colors.lightGreen, localProgress);
        } else {
            // Light Green to Off White (66.66% to 100%)
            const localProgress = (scrollProgress - 0.666) / 0.334;
            backgroundColor = interpolateColor(colors.lightGreen, colors.offWhite, localProgress);
            // Site menu: light green to off white
            siteMenuColor = interpolateColor(colors.lightGreen, colors.offWhite, localProgress);
        }
        
        // Apply the color to body
        document.body.style.backgroundColor = rgbToString(backgroundColor);
        
        // Apply the color to site menu
        const siteMenu = document.querySelector('.site-menu');
        if (siteMenu && isMobileDevice()) {
            if (scrollProgress <= 0.333) {
                // For the first third, interpolate from transparent to glacial
                const localProgress = scrollProgress / 0.333;
                const transparentColor = { r: 0, g: 0, b: 0, a: 0 };
                const glacialColor = { ...colors.glacial, a: 1 };
                const interpolatedColor = interpolateColor(transparentColor, glacialColor, localProgress);
                siteMenu.style.backgroundColor = rgbToString(interpolatedColor);
            } else {
                // For the rest, use solid colors
                siteMenu.style.backgroundColor = rgbToString(siteMenuColor);
            }
        }
        
        // Handle text color transition
        // Start transitioning text color in the last third of the scroll (when approaching off-white)
        if (scrollProgress > 0.666) {
            // Calculate how far through the final third we are (0 to 1)
            const textTransitionProgress = (scrollProgress - 0.666) / 0.334;
            document.body.style.setProperty('--text-transition-progress', textTransitionProgress);
            
            // Add class when fully transitioned
            if (textTransitionProgress >= 0.95) {
                document.body.classList.add('text-transitioned');
            } else {
                document.body.classList.remove('text-transitioned');
            }
        } else {
            document.body.style.setProperty('--text-transition-progress', 0);
            document.body.classList.remove('text-transitioned');
        }
    }
    
    // Throttle function to improve performance
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Variables to store event listeners
    let scrollHandler = null;
    let resizeHandler = null;
    let isActive = false;
    
    // Function to activate scroll color transitions
    function activate() {
        if (isActive) return;
        isActive = true;
        
        // Set initial color
        updateBackgroundColor();
        
        // Create throttled handlers
        scrollHandler = throttle(updateBackgroundColor, 16); // ~60fps
        resizeHandler = throttle(updateBackgroundColor, 100);
        
        // Add event listeners
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', resizeHandler);
    }
    
    // Function to deactivate scroll color transitions
    function deactivate() {
        if (!isActive) return;
        isActive = false;
        
        // Remove event listeners
        if (scrollHandler) window.removeEventListener('scroll', scrollHandler);
        if (resizeHandler) window.removeEventListener('resize', resizeHandler);
        
        // Reset body styles
        document.body.style.backgroundColor = '';
        document.body.style.removeProperty('--text-transition-progress');
        document.body.classList.remove('text-transitioned');
        
        // Reset site menu styles
        const siteMenu = document.querySelector('.site-menu');
        if (siteMenu && isMobileDevice()) {
            siteMenu.style.backgroundColor = '';
        }
    }
    
    // Initialize and watch for class changes
    function init() {
        // Check initial state
        if (document.body.classList.contains('scrollcolortransition')) {
            activate();
        }
        
        // Watch for class changes on body
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (document.body.classList.contains('scrollcolortransition')) {
                        activate();
                    } else {
                        deactivate();
                    }
                }
            });
        });
        
        // Start observing body for class changes
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(); 