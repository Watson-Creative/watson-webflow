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
    
    // Function to interpolate between two colors
    function interpolateColor(color1, color2, factor) {
        const result = {
            r: Math.round(color1.r + factor * (color2.r - color1.r)),
            g: Math.round(color1.g + factor * (color2.g - color1.g)),
            b: Math.round(color1.b + factor * (color2.b - color1.b))
        };
        return result;
    }
    
    // Function to convert RGB object to CSS string
    function rgbToString(color) {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
    }
    
    // Function to update background color based on scroll
    function updateBackgroundColor() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollableHeight = document.documentElement.scrollHeight;
        
        // Calculate total scrollable height
        const totalHeight = viewportHeight;
        const halfPageHeight = totalHeight / 6;
    
        // Calculate progress based on half the total scroll distance
        const scrollProgress = Math.min(scrollY / halfPageHeight, 1);
        
        let backgroundColor;
        
        if (scrollProgress <= 0.333) {
            // Forest to Glacial (0% to 33.33%)
            const localProgress = scrollProgress / 0.333;
            backgroundColor = interpolateColor(colors.forest, colors.glacial, localProgress);
        } else if (scrollProgress <= 0.666) {
            // Glacial to Light Green (33.33% to 66.66%)
            const localProgress = (scrollProgress - 0.333) / 0.333;
            backgroundColor = interpolateColor(colors.glacial, colors.lightGreen, localProgress);
        } else {
            // Light Green to Off White (66.66% to 100%)
            const localProgress = (scrollProgress - 0.666) / 0.334;
            backgroundColor = interpolateColor(colors.lightGreen, colors.offWhite, localProgress);
        }
        
        // Apply the color to body
        document.body.style.backgroundColor = rgbToString(backgroundColor);
        
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
    
    // Initialize on DOM ready
    function init() {
        // Set initial color
        updateBackgroundColor();
        
        // Add scroll event listener with throttling
        window.addEventListener('scroll', throttle(updateBackgroundColor, 16)); // ~60fps
        
        // Update on resize as viewport height might change
        window.addEventListener('resize', throttle(updateBackgroundColor, 100));
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})(); 