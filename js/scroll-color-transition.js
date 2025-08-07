// Scroll Color Transition
// Smoothly transitions body background color based on scroll position

(function() {
    'use strict';
    // Color values from CSS variables
    const colors = {
        midnight: { r: 2, g: 40, b: 34 },      // #022822
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
        
        if (scrollProgress <= 0.25) {
            // Midnight to Forest (0% to 25%)
            const localProgress = scrollProgress / 0.25;
            backgroundColor = interpolateColor(colors.midnight, colors.forest, localProgress);
            // Site menu: transparent to forest
            siteMenuColor = interpolateColor({ r: 0, g: 0, b: 0, a: 0 }, colors.forest, localProgress);
        } else if (scrollProgress <= 0.5) {
            // Forest to Glacial (25% to 50%)
            const localProgress = (scrollProgress - 0.25) / 0.25;
            backgroundColor = interpolateColor(colors.forest, colors.glacial, localProgress);
            // Site menu: forest to glacial
            siteMenuColor = interpolateColor(colors.forest, colors.glacial, localProgress);
        } else if (scrollProgress <= 0.75) {
            // Glacial to Light Green (50% to 75%)
            const localProgress = (scrollProgress - 0.5) / 0.25;
            backgroundColor = interpolateColor(colors.glacial, colors.lightGreen, localProgress);
            // Site menu: glacial to light green
            siteMenuColor = interpolateColor(colors.glacial, colors.lightGreen, localProgress);
        } else {
            // Light Green to Off White (75% to 100%)
            const localProgress = (scrollProgress - 0.75) / 0.25;
            backgroundColor = interpolateColor(colors.lightGreen, colors.offWhite, localProgress);
            // Site menu: light green to off white
            siteMenuColor = interpolateColor(colors.lightGreen, colors.offWhite, localProgress);
        }
        
        // Apply the color to body
        document.body.style.backgroundColor = rgbToString(backgroundColor);
        
        // Apply the color to site menu(s) (supports both legacy and new class names)
        const siteMenus = document.querySelectorAll('.site-menu, .site-main-menu');
        if (siteMenus.length > 0 && isMobileDevice()) {
            siteMenus.forEach((menuElement) => {
                if (scrollProgress <= 0.25) {
                    // For the first quarter, interpolate from transparent to forest
                    const localProgress = scrollProgress / 0.25;
                    const transparentColor = { r: 0, g: 0, b: 0, a: 0 };
                    const forestColor = { ...colors.forest, a: 1 };
                    const interpolatedColor = interpolateColor(transparentColor, forestColor, localProgress);
                    menuElement.style.backgroundColor = rgbToString(interpolatedColor);
                } else {
                    // For the rest, use solid colors
                    menuElement.style.backgroundColor = rgbToString(siteMenuColor);
                }
            });
        }
        
        // Handle text color transition
        // Start transitioning text color in the last quarter of the scroll (when approaching off-white)
        if (scrollProgress > 0.75) {
            // Calculate how far through the final quarter we are (0 to 1)
            const textTransitionProgress = (scrollProgress - 0.75) / 0.25;
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
        
        // Reset site menu styles (supports both legacy and new class names)
        const siteMenus = document.querySelectorAll('.site-menu, .site-main-menu');
        if (siteMenus.length > 0 && isMobileDevice()) {
            siteMenus.forEach((menuElement) => {
                menuElement.style.backgroundColor = '';
            });
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