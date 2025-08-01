# Watson Webflow JS Build Script

This build script combines and minifies all CSS and JavaScript files for your Webflow project.

## Brand Colors

Watson Creative uses a carefully curated color palette that balances professional teal tones with warm accent colors. These colors are used throughout the animations and effects in this build system.

### Primary Brand Colors

#### Teal Palette
- **Bright Teal**: `#00b795` / `rgba(0, 183, 149, 1)` - Primary brand color, used for main CTAs and key elements
- **Medium Teal**: `rgba(0, 140, 115, 1)` - Secondary teal for supporting elements
- **Dark Teal**: `rgba(12, 75, 65, 1)` - Deep teal for text and subtle accents

#### Warm Accent Colors
- **Red**: `rgba(233, 56, 38, 1)` - High-energy accent for alerts and important calls-to-action
- **Orange**: `rgba(245, 128, 32, 1)` - Warm accent for highlights and secondary CTAs
- **Yellow-Orange**: `rgba(220, 140, 0, 1)` - Golden accent for premium features

### Neutral Colors
- **Light Background**: `#f0edec` - Subtle background color for the logo preloader
- **Light Gray**: `#c6c6c6` - Neutral gray for dots and subtle elements
- **Off-White**: `#f5f5f5` - Clean background color for sections

### Color Usage Guidelines

- **Primary Actions**: Use Bright Teal (`#00b795`) for main buttons and primary CTAs
- **Secondary Actions**: Use Medium Teal or Orange for secondary buttons
- **Accents**: Use warm colors sparingly for highlights and important information
- **Backgrounds**: Use neutral colors for clean, professional layouts
- **Text**: Use Dark Teal for primary text, with appropriate contrast ratios

### CSS Custom Properties

You can use these colors in your custom CSS with the following variables (if defined in your project):

```css
:root {
  --watson-bright-teal: #00b795;
  --watson-medium-teal: rgb(0, 140, 115);
  --watson-dark-teal: rgb(12, 75, 65);
  --watson-red: rgb(233, 56, 38);
  --watson-orange: rgb(245, 128, 32);
  --watson-yellow-orange: rgb(220, 140, 0);
  --watson-light-bg: #f0edec;
  --watson-light-gray: #c6c6c6;
  --watson-off-white: #f5f5f5;
}
```

## Build Script Features

- **Combines** all CSS files from `/css` directory into a single minified file
- **Combines** all JS files from `/js` directory (including magnetic-dots.js) into a single minified file
- **Minifies** the output for optimal performance
- **Watch mode** for automatic rebuilding during development
- **Size reporting** shows original vs minified file sizes

## Setup

1. Install Node.js dependencies:
```bash
npm install
```

## Usage

### Build once
```bash
npm run build
```

This will:
- Combine and minify all CSS files → `custom-styles.min.css`
- Combine and minify all JS files → `custom-scripts.min.js`

### Watch mode (development)
```bash
npm run watch
```

This will:
- Build all files initially
- Watch for changes in `/css` and `/js` directories
- Automatically rebuild when files are added, changed, or removed

## File Structure

```
/
├── css/                  # Source CSS files
│   ├── animated-svg-logo.css
│   ├── glass-button.css
│   ├── no-highlight.css
│   ├── splide.css
│   ├── text-animations.css
│   ├── virtual-scroll.css
│   └── 3d-text-effects.css
├── js/                   # Source JS files
│   ├── anime.min.js      # Animation library (bundled)
│   ├── animated-svg-logo.js
│   ├── aurorahover.js    # Aurora hover effect
│   ├── magnetic-dots.js  # Interactive dot grid animation
│   ├── slider.js
│   ├── smooth-scroll.js
│   └── text-animations.js
├── custom-styles.min.css # Minified CSS output
├── custom-scripts.min.js # Minified JS output (includes all JS)
├── build.js             # Build script
└── package.json         # Node.js dependencies
```

## Text Animations

The `text-animations.js` file provides several animation classes that can be applied to text elements in Webflow. These animations automatically wrap words and letters in spans and animate them using anime.js. All animations are viewport-triggered, meaning they only play when the element becomes visible during scrolling.

### Key Features

- **Viewport-Based Triggering**: All animations automatically trigger when elements enter the viewport (10% visibility threshold)
- **One-Time Animation**: Each element animates only once when it first becomes visible
- **Click to Retrigger**: Click any animated text to replay its animation
- **Performance Optimized**: Uses Intersection Observer for efficient scroll detection
- **Manual Control**: Animations can also be triggered programmatically via JavaScript
- **10 Different Animation Styles**: Wide variety of professional text effects
- **Custom Class Mapping**: Support for automatic animation assignment to custom classes

### Available Animation Classes

Apply these classes to any text element (heading, paragraph, text block, etc.) in Webflow:

#### 1. **fadeup**
- **Effect**: Letters fade in from below with a smooth upward motion
- **Duration**: 2.5 seconds
- **Trigger**: When element enters viewport
- **Usage**: Great for hero headings or important text that needs emphasis
```html
<h1 class="fadeup">Your animated text here</h1>
```

#### 2. **slideup**
- **Effect**: Letters slide up from below with opacity fade
- **Duration**: 750ms
- **Trigger**: When element enters viewport
- **Usage**: Good for subheadings or secondary text
```html
<p class="slideup">Sliding text animation</p>
```

#### 3. **slidein**
- **Effect**: Entire words (not individual letters) slide in with opacity fade
- **Duration**: 1 second with staggered delay
- **Trigger**: When element enters viewport
- **Usage**: Best for longer text where letter-by-letter might be too slow
```html
<p class="slidein">Words slide in one by one</p>
```

#### 4. **rotatein**
- **Effect**: Letters rotate in with a 3D effect while sliding from top-right
- **Duration**: 750ms
- **Trigger**: When element enters viewport
- **Usage**: Eye-catching effect for special callouts or CTAs
```html
<span class="rotatein">Rotating text!</span>
```

#### 5. **popin**
- **Effect**: Letters scale from 0 to full size with elastic bounce
- **Duration**: 1.5 seconds
- **Trigger**: When element enters viewport
- **Usage**: Playful effect for informal or creative content
```html
<h3 class="popin">Pop in animation</h3>
```

#### 6. **typewriter**
- **Effect**: Letters appear one by one like typing on a keyboard
- **Duration**: 100ms per letter
- **Trigger**: When element enters viewport
- **Usage**: Perfect for terminal-style text, quotes, or important messages
```html
<h2 class="typewriter">Typing effect text</h2>
```

#### 7. **wavein**
- **Effect**: Letters flow in with a wave-like sine motion and elastic bounce
- **Duration**: 1.2 seconds
- **Trigger**: When element enters viewport
- **Usage**: Dynamic effect for creative headlines or playful content
```html
<p class="wavein">Wave motion text</p>
```

#### 8. **zoomin**
- **Effect**: Letters zoom in from 3x scale with blur effect transitioning to sharp
- **Duration**: 1 second
- **Trigger**: When element enters viewport
- **Usage**: Dramatic entrance for hero text or important announcements
```html
<h1 class="zoomin">Zooming text effect</h1>
```

#### 9. **flipin**
- **Effect**: Letters flip in on Y-axis with 3D rotation effect
- **Duration**: 800ms
- **Trigger**: When element enters viewport
- **Usage**: Modern effect for tech-focused content or interactive elements
```html
<span class="flipin">Flipping text!</span>
```

#### 10. **bouncein**
- **Effect**: Letters drop from above with realistic bounce easing
- **Duration**: 1 second
- **Trigger**: When element enters viewport
- **Usage**: Fun, energetic effect for CTAs or promotional content
```html
<h2 class="bouncein">Bouncing text</h2>
```

#### 11. **horizontal-split**
- **Effect**: Letters slide in horizontally from right to left with a smooth split motion
- **Duration**: 500ms
- **Trigger**: When element enters viewport
- **Usage**: Modern, clean entrance for headings and titles
```html
<h1 class="horizontal-split">Sliding text from right</h1>
```

#### 12. **wavy-text**
- **Effect**: Letters animate in with a wave-like sine motion creating a flowing effect
- **Duration**: 500ms
- **Trigger**: When element enters viewport
- **Usage**: Dynamic, organic feel for creative headlines or playful content
```html
<p class="wavy-text">Wavy flowing text animation</p>
```

#### 13. **raining-letters**
- **Effect**: Letters fall from above like rain with staggered timing
- **Duration**: 800ms
- **Trigger**: When element enters viewport
- **Usage**: Dramatic entrance for important announcements or hero text
```html
<h2 class="raining-letters">Letters falling like rain</h2>
```

#### 14. **subtle-highlight**
- **Effect**: Letters start dimmed and brighten with a subtle glow effect
- **Duration**: 350ms
- **Trigger**: When element enters viewport
- **Usage**: Elegant, understated effect for professional content
```html
<h3 class="subtle-highlight">Subtle glowing text</h3>
```

#### 15. **exploding-chars**
- **Effect**: Letters explode outward in random directions with rotation
- **Duration**: 600ms
- **Trigger**: When element enters viewport
- **Usage**: High-energy effect for CTAs, announcements, or creative content
```html
<span class="exploding-chars">Explosive text effect!</span>
```

### Custom Class Mappings (extraClasses)

The animation system now supports custom class mappings through the `extraClasses` object. This allows you to define your own semantic class names that automatically apply specific animations.

#### How It Works

In `text-animations.js`, you can define custom mappings:
```javascript
var extraClasses = { 
  'intro-heading': 'slideup',
  'hero-title': 'fadeup',
  'section-header': 'rotatein',
  'banner-text': 'subtle-highlight',
  'main-title': 'horizontal-split'
  // Add more mappings as needed
};
```

Any element with a custom class will automatically receive the mapped animation:
```html
<!-- This will animate with slideup animation -->
<h1 class="intro-heading">Welcome to Our Site</h1>

<!-- This will animate with fadeup animation -->
<h2 class="hero-title">Main Hero Text</h2>

<!-- This will animate with subtle highlight effect -->
<h3 class="banner-text">Banner Text</h3>
```

#### Benefits

- **Semantic naming**: Use meaningful class names that describe the content's purpose
- **Consistency**: Ensure similar elements always use the same animation
- **Easy updates**: Change animations site-wide by updating the mapping
- **Clean HTML**: Your Webflow classes remain descriptive rather than technical

#### Adding More Mappings

To add custom mappings, edit the `extraClasses` object in `text-animations.js`:
```javascript
var extraClasses = { 
  'intro-heading': 'slideup',
  'hero-title': 'fadeup',
  'section-header': 'rotatein',
  'banner-text': 'popin',
  'subtitle': 'fadeup3',
  'side-content': 'slidein'
};
```

### Additional Features

#### Image Card Animation
The script also animates elements with the `image-card` class:
```html
<div class="image-card">
  <!-- Your card content -->
</div>
```
- Cards fade up from below when they enter the viewport
- Multiple cards visible at once animate together with 150ms stagger between them
- Perfect for gallery grids or card layouts

### Implementation in Webflow

1. **Include the compiled scripts** (anime.js is already bundled):
   - The minified script includes anime.js, so no additional dependencies needed
   - Just add the compiled `custom-scripts.min.js` to your Webflow project

2. **Apply animation classes** to text elements in the Webflow Designer:
   - Select your text element
   - Add the desired animation class (e.g., `fadeup`, `slidein`, etc.)
   - OR use your custom semantic classes defined in `extraClasses` (e.g., `intro-heading`, `hero-title`)
   - The animations will trigger automatically when scrolled into view

3. **Viewport Detection**:
   - Animations trigger when 10% of the element becomes visible
   - Each element animates only once
   - No need for separate scroll triggers - it's built-in
   - Works with all modern browsers that support Intersection Observer

4. **Manual Animation Control**:
   ```javascript
   // Trigger any animation manually
   window.triggerAnimation('#my-element', 'fadeup');
   window.triggerAnimation('.my-class', 'slideup');
   
   // Works with any animation type
   window.triggerAnimation(selector, animationType);
   ```

   Available animation types:
   - `fadeup`, `slideup`, `slidein`, `rotatein`, `popin`
   - `typewriter`, `wavein`, `zoomin`, `flipin`, `bouncein`
   - `horizontal-split`, `wavy-text`, `raining-letters`
   - `subtle-highlight`, `exploding-chars`

5. **Click to Retrigger Animations**:
   - All animated text is automatically clickable
   - Clicking any animated text will replay its animation
   - The cursor changes to a pointer on hover to indicate interactivity
   - No additional code needed - this feature is built-in

6. **Event-Based Triggers** (custom code):
   ```javascript
   // Click trigger example
   document.getElementById('my-button').addEventListener('click', function() {
     window.triggerAnimation('#target-element', 'popin');
   });
   
   // Hover trigger example
   document.getElementById('hover-zone').addEventListener('mouseenter', function() {
     window.triggerAnimation('#hover-text', 'rotatein');
   });
   ```

### Tips for Webflow

- **Performance**: These animations work best on headings and short text blocks
- **Mobile**: Consider reducing animation complexity on mobile devices
- **Accessibility**: Add `prefers-reduced-motion` media query in custom CSS for users who prefer no animations
- **Multiple animations**: You can apply different animation classes to different text elements on the same page
- **Natural Flow**: Animations trigger as users scroll, creating a natural reveal effect
- **Above the Fold**: Elements visible on page load will animate immediately after a short delay
- **Long Pages**: Perfect for long-scrolling pages where content reveals progressively
- **Debugging**: Check browser console for Intersection Observer support on older browsers

## Animated SVG Preloader

The `animated-svg-logo.js` provides a sophisticated preloader that displays your Watson Creative logo while the page loads. The preloader uses a mask animation to reveal the green portion of the logo from bottom to top.

### Features

- **Controlled Activation**: Only appears on pages with a designated placeholder element
- **Smooth Fill Animation**: The green logo fills from bottom to top over a configurable duration
- **Animation Blocking**: Pauses all page animations until loading completes
- **Customizable Duration**: Set your preferred animation timing
- **Responsive**: Adapts to different screen sizes
- **Progress Display**: Optional percentage counter (can be hidden via CSS)

### How It Works

1. **Placeholder Detection**: The preloader looks for a `<div class="loaderholder"></div>` element
2. **Initialization**: If found, replaces the placeholder with the animated logo
3. **Animation**: The green portion of the logo reveals from bottom to top
4. **Completion**: After the animation duration, the loader slides up and page animations begin

### Basic Usage

1. **Include the CSS and JS files**:
```html
<!-- In <head> -->
<link rel="stylesheet" href="css/animated-svg-logo.css">

<!-- Before </body> -->
<script src="js/animated-svg-logo.js"></script>
```

2. **Add the placeholder on pages where you want the preloader**:
```html
<!-- Place this where you want the preloader to appear -->
<div class="loaderholder"></div>
```

**Important**: The preloader will ONLY appear on pages that have the `loaderholder` div. Pages without this element will skip the preloader entirely and animations will start after the standard delay.

### Enabling/Disabling Per Page

- **To enable**: Add `<div class="loaderholder"></div>` to the page
- **To disable**: Simply don't include the loaderholder div
- **Placement**: The preloader will appear exactly where you place the loaderholder div

### Configuration

You can customize the preloader by modifying the config object in `animated-svg-logo.js`:

```javascript
const config = {
    svgWidth: '40%',              // Logo size
    viewBox: '0 0 387.33 270.66', // SVG viewbox
    backColor: '#f0edec',         // Background logo color
    frontColor: '#00b795',        // Animated fill color
    duration: 2000,               // Animation duration in ms
    removeDelay: 300,             // Delay before removing loader
    easingCurve: 'cubic-bezier(0.4, 0.0, 0.2, 1)' // Animation easing
};
```

### API Methods

The preloader exposes several methods via the global `AnimatedSVGPreloader` object:

```javascript
// Get current loading progress (0-100)
const progress = AnimatedSVGPreloader.getProgress();

// Check if loading is complete
if (AnimatedSVGPreloader.isComplete()) {
    // Do something
}

// Check if preloader was actually initialized (found loaderholder)
if (AnimatedSVGPreloader.isInitialized()) {
    // Preloader is active on this page
}

// Force complete the loading (only works if initialized)
AnimatedSVGPreloader.forceComplete();
```

### Events

Listen for the `preloadComplete` event to trigger actions after loading:

```javascript
document.addEventListener('preloadComplete', function() {
    console.log('Preloader animation finished!');
    // This fires whether the preloader was shown or not
    // Check isInitialized() if you need to know
});
```

### CSS Classes

The preloader adds these classes to the body:

- `preloading` - Added during loading (blocks animations)
- `preload-complete` - Added after completion (enables animations)

The loader element has these states:

- `svgloader-active` - Initial state
- `svgloader-complete` - Added when sliding up after completion

### Customization Options

#### Hide Progress Percentage
```css
.svgloader-progress {
    display: none;
}
```

#### Change Animation Timing
```css
.svgloader-complete {
    transition: transform 0.6s ease-out; /* Default is 0.4s */
}
```

#### Position the Preloader
```css
.loaderholder {
    /* Position where you want the preloader to appear */
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
```

### Webflow Integration

1. **Upload Files**: Add `animated-svg-logo.js` and `animated-svg-logo.css` to your Webflow project
2. **Add Script**: Place the script tag in Project Settings → Custom Code → Footer Code
3. **Include CSS**: Add the stylesheet in the head section
4. **Add Placeholder**: In the Webflow Designer, add a div with class `loaderholder` to pages where you want the preloader
5. **Test**: The preloader will appear on pages with the loaderholder div

### Integration with Text Animations

The text animations in `text-animations.js` automatically detect whether the preloader is active:

- **With preloader**: Viewport-based animations still work normally after preloader completes
- **Without preloader**: Animations trigger immediately when elements enter viewport
- **Seamless Integration**: The viewport detection system works independently of the preloader

This ensures animations work consistently regardless of whether the preloader is shown.

### Best Practices

- Place the `loaderholder` div early in your page structure for consistent positioning
- Consider showing the preloader only on key pages (homepage, major sections)
- Hide the progress percentage for a cleaner, more professional look
- Test both with and without the preloader to ensure animations work correctly
- Use consistent placement of the loaderholder div across pages for a cohesive experience

## Aurora Hover Effect

The `aurorahover.js` file provides a sophisticated hover effect that creates an organic, animated aurora-like glow around any element. The effect features multiple animated spheres that respond to mouse movement, creating a dynamic and engaging user experience.

### Features

- **Dynamic Sizing**: Spheres automatically scale based on the hovered element's dimensions
- **Mouse Interaction**: Spheres react to mouse movement with three distinct behaviors:
  - **Disruption**: Mouse pushes spheres away like magnetic repulsion
  - **Shrinking**: Spheres shrink when the mouse gets close, then expand back
  - **Following**: The entire glow subtly follows mouse movement
- **Cluster Lag**: The glow cluster can lag behind mouse movement for more natural interactions
- **Pulsing Animation**: Spheres expand and contract rhythmically with configurable wave patterns
- **Shape Morphing**: Spheres continuously morph between circular and elliptical shapes
- **Color Palettes**: Built-in warm, cool, and mixed color schemes using Watson Creative brand colors
- **Blend Modes**: Customizable blend mode for different visual effects
- **Fully Configurable**: Every aspect can be customized through configuration variables

### Basic Usage

1. **Include the aurora container** in your HTML:
```html
<div class="aurora-container" id="auroraContainer"></div>
```

2. **Add a supported class** to any element you want to have the effect:
```html
<!-- Primary hover class -->
<button class="hoverglow">Hover Me</button>
<h1 class="hoverglow">Glowing Heading</h1>

<!-- Additional supported classes -->
<a href="#" class="cta-load-more">Load More</a>
```

3. **Include the script**:
```html
<script src="js/aurorahover.js"></script>
```

### Supported Classes

The aurora effect can be triggered by any of these classes:
- `hoverglow` - Primary class for general hover effects
- `cta-load-more` - For load more buttons
- Additional custom classes can be added to the `otherClasses` array in the script

### How It Works

The aurora effect creates multiple layers of animated elements:

1. **Spheres (4-8)**: Main glow elements with varying sizes and colors
2. **Cores (1-2)**: Bright center points for added depth
3. **Wrapper**: Container with blur filter for soft glow effect

Each sphere has its own:
- Size (based on element height: 0.75x to 2x)
- Position (constrained within element bounds)
- Color (randomly selected from palette)
- Animation phase (for organic movement)
- Interaction state (disruption, scale, position)

### Configuration Variables

The effect is highly customizable through configuration variables at the top of the `GlowEffect` class:

#### Animation & Timing
```javascript
this.easingFactor = 0.12;              // Mouse follow smoothness (0.01 = very smooth, 1 = instant)
this.fadeInDuration = '0.3s';          // Glow fade in time
this.fadeOutDuration = '0.4s';         // Glow fade out time
this.animationFPS = 0.016;             // Animation frame time (60fps)
```

#### Cluster Movement Lag
```javascript
this.clusterLagFactor = 0.03;          // How slowly the cluster follows mouse (0.01 = very slow, 1 = instant)
this.clusterMaxDistance = 150;         // Maximum distance cluster can lag behind mouse (px)
this.clusterCatchUpDelay = 0.5;        // Seconds before cluster starts catching up after mouse stops
this.clusterCatchUpSpeed = 0.05;       // Speed at which cluster catches up when mouse is still
```

#### Sphere Settings
```javascript
this.sphereSizeMin = 0.75;             // Minimum sphere size (75% of element height)
this.sphereSizeMax = 2;                // Maximum sphere size (200% of element height)
this.sphereCountMin = 4;               // Minimum number of spheres
this.sphereCountMax = 8;               // Maximum number of spheres
this.spherePositionRange = 0.6;        // Spheres stay within 60% of element size
```

#### Mouse Interaction
```javascript
this.mouseDisruptionRadius = 100;      // Radius around mouse that affects spheres (px)
this.mouseDisruptionForce = 1;         // How strongly mouse pushes spheres (0-1)
this.mouseShrinkAmount = 0.3;          // How much spheres shrink when touched (30%)
this.mouseShrinkRadius = 120;          // Distance to trigger shrink effect (px)
this.sphereRecoverySpeed = 0.15;       // Recovery speed from mouse interaction
this.mouseInfluence = 0.6;             // How much mouse affects glow position (0-1)
```

#### Pulsing & Animation
```javascript
this.spherePulseSpeed = 0.5;           // Speed of sphere pulsing
this.spherePulseAmplitude = 0.2;       // Expansion/contraction amount (20%)
this.spherePulsePhaseShift = 0.3;      // Phase difference for wave effect
this.morphAmplitude = 20;              // Shape morphing amount (%)
this.driftAmplitude = 5;               // Drift movement distance (px)
this.rotationSpeedMax = 0.25;          // Maximum rotation speed
```

#### Opacity & Blur
```javascript
this.sphereOpacityMin = 0.6;           // Minimum sphere opacity (increased for light backgrounds)
this.sphereOpacityMax = 0.8;           // Maximum sphere opacity
this.coreOpacity = 0.6;                // Core base opacity
this.wrapperBlur = 30;                 // Main glow blur amount (px) - reduced for better visibility
this.coreBlur = 6;                     // Core blur amount (px)
```

#### Visual Effects
```javascript
this.zIndex = auto;                    // Layer stacking order (auto or specific number)
this.blendMode = 'overlay';            // How the glow blends with background
```

Available blend modes:
- `normal`, `multiply`, `screen`, `overlay`, `darken`, `lighten`
- `color-dodge`, `color-burn`, `hard-light`, `soft-light`
- `difference`, `exclusion`, `hue`, `saturation`, `color`, `luminosity`

### Preset Examples

The effect includes several preset configurations you can use:

#### Subtle Professional
```javascript
this.sphereOpacityMin = 0.3; 
this.sphereOpacityMax = 0.5;
this.wrapperBlur = 80; 
this.scaleAmplitude = 0.05;
this.morphAmplitude = 10; 
this.driftAmplitude = 2;
```

#### Dramatic Neon
```javascript
this.sphereOpacityMin = 0.8; 
this.sphereOpacityMax = 1.0;
this.wrapperBlur = 40; 
this.sphereSizeMax = 4;
this.morphAmplitude = 30; 
this.coreOpacity = 1.0;
```

#### Reactive Bubbles
```javascript
this.mouseDisruptionRadius = 200; 
this.mouseDisruptionForce = 0.8;
this.mouseShrinkAmount = 0.5; 
this.sphereRecoverySpeed = 0.2;
this.spherePulseAmplitude = 0.3; 
this.spherePulseSpeed = 0.7;
```

#### Gentle Flow
```javascript
this.spherePulseSpeed = 0.3; 
this.spherePulseAmplitude = 0.15;
this.mouseDisruptionForce = 0.3; 
this.mouseShrinkAmount = 0.1;
this.spherePulsePhaseShift = 0.5; 
this.mousePositionSmoothing = 0.1;
```

#### Laggy Interaction
```javascript
this.clusterLagFactor = 0.02; 
this.clusterMaxDistance = 200;
this.clusterCatchUpDelay = 1.0; 
this.mouseDisruptionRadius = 150;
this.mouseDisruptionForce = 0.8; 
this.sphereRecoverySpeed = 0.2;
```

#### Elastic Follow
```javascript
this.clusterLagFactor = 0.01; 
this.clusterMaxDistance = 300;
this.clusterCatchUpSpeed = 0.08; 
this.clusterCatchUpDelay = 0.3;
this.easingFactor = 0.15; 
this.mouseInfluence = 0.8;
```

### Color Palettes

The effect includes three built-in color palettes based on Watson Creative brand colors:

```javascript
warm: [
    'rgba(233, 56, 38, 1)',     // Red
    'rgba(245, 128, 32, 1)',    // Orange  
    'rgba(220, 140, 0, 1)'      // Yellow-orange
]
cool: [
    'rgba(12, 75, 65, 1)',      // Dark teal
    'rgba(0, 140, 115, 1)',     // Medium teal
    'rgba(0, 183, 149, 1)'      // Bright teal
]
mixed: [
    'rgba(0, 183, 149, 1)',     // Bright teal
    'rgba(0, 140, 115, 1)',     // Medium teal
    'rgba(245, 128, 32, 1)'     // Orange
]
```

The effect automatically selects palettes based on element content:
- Elements containing "warm" use the warm palette
- Elements containing "cool" use the cool palette
- All others use the mixed palette

### Dynamic Sizing

The effect automatically adapts to each element's dimensions:

- **Sphere sizes**: Based on element height (min 0.75x, max 2x)
- **Distribution area**: Based on element width and height
- **Wrapper size**: Calculated to contain largest possible sphere plus movement space
- **Core size**: 40-60% of element height

This ensures the effect looks proportional on any size element, from small buttons to large headings.

### Mouse Interaction Details

The aurora effect features four types of mouse interaction:

1. **Mouse Following**: The entire glow subtly follows the mouse cursor
   - Controlled by `mouseInfluence` (0-1)
   - Smoothed with `easingFactor`

2. **Cluster Lag**: The glow cluster lags behind mouse movement
   - Lag amount controlled by `clusterLagFactor`
   - Maximum lag distance set by `clusterMaxDistance`
   - Catches up when mouse stops after `clusterCatchUpDelay`

3. **Sphere Disruption**: Mouse pushes spheres away
   - Active within `mouseDisruptionRadius`
   - Force decreases with distance
   - Spheres recover at `sphereRecoverySpeed`

4. **Touch Response**: Spheres shrink when mouse gets close
   - Triggers within `mouseShrinkRadius`
   - Shrinks by `mouseShrinkAmount`
   - Smooth interpolation for natural feel

### Webflow Integration

1. **Upload the Script**: Add `aurorahover.js` to your Webflow project
2. **Add Container**: Place the aurora container div in your page
3. **Apply Classes**: Add the `hoverglow`, `cta-right-arrow`, or `cta-load-more` class to elements in the Designer
4. **Include Script**: Reference the script in Project Settings or page custom code

#### CSS Requirements

The aurora container is automatically created and styled by the script, but you may want to ensure your hover elements have proper styling:

```css
.hoverglow, .cta-right-arrow, .cta-load-more {
    position: relative;
    cursor: pointer;
}
```

### Performance Considerations

- The effect uses `requestAnimationFrame` for smooth 60fps animation
- Animations pause when no elements are hovered
- Each sphere tracks its own state to minimize calculations
- Blur effects are GPU-accelerated via CSS

### Tips for Best Results

1. **Element Padding**: Ensure hovered elements have adequate padding for the effect to display properly
2. **Blend Mode**: Experiment with different blend modes for various background colors
3. **Light Backgrounds**: The default settings are optimized for light backgrounds with increased opacity
4. **Mobile**: Consider reducing sphere count and interaction radius on mobile devices
5. **Multiple Elements**: The effect handles multiple simultaneous hovers efficiently

### Advanced Customization

To create your own preset:

1. Copy the configuration section from the GlowEffect constructor
2. Adjust values to achieve your desired effect
3. Test with different element sizes to ensure it scales well
4. Document your preset for team use

Example custom configuration:
```javascript
// Ethereal Mist
this.sphereOpacityMin = 0.2;
this.sphereOpacityMax = 0.4;
this.wrapperBlur = 100;
this.sphereSizeMax = 5;
this.spherePulseSpeed = 0.2;
this.morphAmplitude = 30;
this.mouseDisruptionForce = 0.2;
this.blendMode = 'screen';
this.clusterLagFactor = 0.05;
```

## Scroll Color Transition

The `scroll-color-transition.js` file provides a smooth background color transition effect that changes the body background color as the user scrolls through the first viewport height. This creates an engaging visual progression through your brand colors.

### Features

- **Smooth Color Interpolation**: Seamlessly transitions between four brand colors
- **Viewport-Based**: Transitions occur over exactly one viewport height (100vh)
- **Bidirectional**: Colors transition forward when scrolling down and reverse when scrolling up
- **Performance Optimized**: Uses throttling to maintain smooth 60fps performance
- **Responsive**: Automatically adjusts to viewport height changes

### Color Progression

The background transitions through these Watson Creative brand colors:

1. **Forest** (`#0c4b41`) - Dark green starting color
2. **Glacial** (`#00b795`) - Bright teal at 33.33% scroll
3. **Light Green** (`#92d0c3`) - Soft green at 66.66% scroll
4. **Off-White** (`#f0edec`) - Light background at 100% scroll and beyond

### How It Works

The transition is divided into three equal segments over the first viewport height:

- **0-33.33%**: Forest → Glacial
- **33.33-66.66%**: Glacial → Light Green
- **66.66-100%**: Light Green → Off-White
- **Beyond 100vh**: Remains Off-White

Text elements:
- **During dark backgrounds**: All text is forced to white for visibility
- **On light background**: Text returns to its original CSS-defined colors

### Basic Usage

1. **Include the CSS files**:
```html
<!-- Brand colors -->
<link rel="stylesheet" href="css/colors.css">
<!-- Scroll transition styles -->
<link rel="stylesheet" href="css/scroll-color-transition.css">
```

2. **Include the JavaScript**:
```html
<script src="js/scroll-color-transition.js"></script>
```

3. **Add the activation class to the body**:
```html
<body class="scrollcolortransition">
```

The effect will only activate on pages where the body has the `scrollcolortransition` class. This allows you to selectively enable the feature on specific pages.

### Dynamic Activation

The scroll color transition can be toggled on/off dynamically via JavaScript:

```javascript
// Enable the effect
document.body.classList.add('scrollcolortransition');

// Disable the effect
document.body.classList.remove('scrollcolortransition');

// Toggle the effect
document.body.classList.toggle('scrollcolortransition');
```

The effect automatically:
- Activates when the class is added
- Deactivates when the class is removed
- Cleans up all styles when deactivated
- Re-initializes from the current scroll position when reactivated

### Customization

#### Adjusting Transition Speed

In `scroll-color-transition.css`, modify the transition duration:
```css
body {
    transition: background-color 0.5s ease-out; /* Default is 0.3s */
}
```

#### Changing Colors

To use different colors, edit the color values in `scroll-color-transition.js`:
```javascript
const colors = {
    forest: { r: 12, g: 75, b: 65 },      // Your starting color
    glacial: { r: 0, g: 183, b: 149 },    // First transition
    lightGreen: { r: 146, g: 208, b: 195 }, // Second transition
    offWhite: { r: 240, g: 237, b: 236 }   // Final color
};
```

#### Adjusting Transition Distance

To make the transition happen over a different distance (default is 100vh):
```javascript
// In updateBackgroundColor function
const scrollProgress = Math.min(scrollY / (viewportHeight * 2), 1); // 200vh
```

#### Adding More Color Stops

To add more colors to the transition, modify the color interpolation logic:
```javascript
if (scrollProgress <= 0.25) {
    // First quarter
} else if (scrollProgress <= 0.5) {
    // Second quarter
} else if (scrollProgress <= 0.75) {
    // Third quarter
} else {
    // Final quarter
}
```

### Webflow Integration

1. **Upload Files**: Add `scroll-color-transition.js` and `scroll-color-transition.css` to your Webflow project
2. **Include Dependencies**: Make sure `colors.css` is included for the CSS variables
3. **Add Scripts**: Include both CSS and JS files in your page or project settings
4. **Add Body Class**: In Webflow Designer, add the class `scrollcolortransition` to the body element for pages where you want the effect
5. **Content Structure**: Ensure your first section has enough height for the full transition

#### Best Practices for Webflow

- **Hero Sections**: Perfect for landing pages with tall hero sections
- **Storytelling**: Use the color progression to enhance narrative flow
- **Section Backgrounds**: Consider semi-transparent section backgrounds to blend with the changing body color
- **Text Contrast**: Ensure text remains readable across all background colors
- **Performance**: The effect is lightweight and won't impact Webflow's built-in animations

### Performance Considerations

- Uses `requestAnimationFrame` throttling for smooth 60fps updates
- Minimal DOM manipulation (only updates body background)
- Automatically pauses calculations when scroll position hasn't changed
- Lightweight with no dependencies beyond vanilla JavaScript

### Tips for Design

1. **Content Planning**: Design your first viewport content to align with the color progression
2. **Text Colors**: Use colors that work well against all four background colors
3. **Section Transitions**: Add subtle overlays or gradients to sections for smoother visual flow
4. **Mobile Consideration**: Test on various device heights as viewport height varies
5. **Accessibility**: Ensure sufficient contrast ratios throughout the transition

### Combining with Other Effects

The scroll color transition works seamlessly with other animations in the build:

- **Text Animations**: Will trigger normally as elements enter viewport
- **Aurora Hover**: Hover effects will adapt to the changing background
- **Magnetic Dots**: Can be overlaid for additional visual interest

### Troubleshooting

- **Colors Not Changing**: Ensure the JavaScript file is loaded and colors.css is included
- **Jumpy Transitions**: Increase the CSS transition duration for smoother changes
- **Performance Issues**: Check if other heavy scripts are running simultaneously
- **Wrong Colors**: Verify the RGB values match your brand colors exactly

## Magnetic Dots Animation

The `magnetic-dots.js` file provides an interactive canvas-based animation that creates a grid of dots that respond to mouse movement with a magnetic attraction effect. This creates an engaging visual effect perfect for backgrounds or interactive sections.

### Features

- **Dynamic Grid Generation**: Automatically creates a grid of dots based on container size
- **Magnetic Mouse Interaction**: Dots are attracted to and repelled by the mouse cursor
- **Smooth Animation**: Uses requestAnimationFrame for smooth 60fps performance
- **Responsive**: Automatically resizes and regenerates dots when the window resizes
- **Customizable Width**: Control canvas width as a percentage of container
- **Hover Toggle**: Option to disable mouse interaction for static displays
- **Elastic Return**: Dots smoothly return to their original positions when mouse leaves

### Basic Usage

1. **Add a container element** with the class `animation-magnetic-dots`:
```html
<div class="animation-magnetic-dots"></div>
```

2. **Include the script**:
```html
<script src="js/magnetic-dots.js"></script>
```

The script will automatically:
- Find all elements with the `animation-magnetic-dots` class
- Create a canvas element inside each container
- Generate a grid of dots that respond to mouse movement

### Configuration Options

#### Container Attributes

**Disable Hover Interaction**
```html
<div class="animation-magnetic-dots" disable-hover></div>
```
- Dots will remain static without mouse interaction
- Useful for decorative backgrounds that shouldn't be interactive

**Custom Canvas Width**
```html
<div class="animation-magnetic-dots" data-dots-width="80"></div>
```
- Sets the canvas width as a percentage of the container (default: 100%)
- Useful for creating margins or specific layouts

### Customization

The animation parameters can be adjusted in the `setupCanvas` function:

```javascript
const magnet = 500;        // Magnetic force strength (higher = stronger attraction)
const dotSize = 1;         // Radius of each dot in pixels
const dotSpacing = 14;     // Distance between dots in pixels
```

#### Visual Customization

**Dot Color**
```javascript
ctx.fillStyle = '#c6c6c6';  // Change to any color
```

**Smoothing Factor**
```javascript
// In the update function - adjust for different effects
this.x += (this.originalX - this.x) * 0.05;  // 0.05 = smooth, 0.5 = snappy
```

### Styling the Container

The container element should have defined dimensions:

```css
.animation-magnetic-dots {
    width: 100%;
    height: 400px;  /* Or any specific height */
    position: relative;
    overflow: hidden;
    background: #f5f5f5;  /* Optional background */
}

/* The canvas is automatically styled by the script */
.animation-magnetic-dots__canvas {
    position: absolute;
    top: 0;
    left: 0;
}
```

### Advanced Examples

#### Full-Screen Background
```html
<div class="animation-magnetic-dots" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1;"></div>
```

#### Section Background with Centered Content
```html
<section style="position: relative;">
    <div class="animation-magnetic-dots" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div>
    <div style="position: relative; z-index: 1;">
        <!-- Your content here -->
    </div>
</section>
```

#### Multiple Instances with Different Settings
```html
<!-- Interactive dots -->
<div class="animation-magnetic-dots" id="interactive-dots"></div>

<!-- Static decorative dots -->
<div class="animation-magnetic-dots" disable-hover id="static-dots"></div>

<!-- Partial width dots -->
<div class="animation-magnetic-dots" data-dots-width="70"></div>
```

### Performance Considerations

- Each dot is individually animated, so limit container size on mobile devices
- The animation runs continuously using requestAnimationFrame
- Consider using `disable-hover` on mobile to save processing power
- Multiple instances on the same page will each run their own animation loop

### Webflow Integration

1. **Upload the Script**: Add `magnetic-dots.js` to your Webflow project
2. **Create a Div Block**: In the Designer, add a div and give it the class `animation-magnetic-dots`
3. **Set Dimensions**: Give your div specific width and height values
4. **Add Attributes**: Use Webflow's custom attributes to add `disable-hover` or `data-dots-width` if needed
5. **Position as Needed**: Use absolute/fixed positioning for background effects

#### Tips for Webflow

- Create a Symbol for reusable magnetic dot backgrounds
- Use Webflow's interactions to show/hide dot containers
- Combine with other animations for layered effects
- Test performance on mobile devices in Webflow's preview

### Customization Ideas

1. **Gradient Dots**: Modify the drawing function to create gradient-filled dots
2. **Connected Dots**: Add lines between nearby dots for a constellation effect
3. **Variable Sizes**: Make dots different sizes based on position or randomness
4. **Color Transitions**: Change dot colors based on mouse proximity
5. **Wave Effects**: Add sine wave movements independent of mouse interaction

## Webflow Integration

You have two options for integrating the minified files into your Webflow project:

### How to Use CDN Links

Link directly to the minified [stylesheet](https://raw.githack.com/Watson-Creative/watson-webflow/refs/heads/master/custom-styles.min.css) and [script](https://raw.githack.com/Watson-Creative/watson-webflow/refs/heads/master/custom-scripts.min.js) files from GitHub using raw.githack.com:

```html
<!-- In <head> -->
<link rel="stylesheet" href="https://raw.githack.com/Watson-Creative/watson-webflow/refs/heads/master/custom-styles.min.css">

<!-- Before </body> -->
<script src="https://raw.githack.com/Watson-Creative/watson-webflow/refs/heads/master/custom-scripts.min.js"></script>
```

**Benefits:**
- No need to upload files to Webflow
- Automatically uses the latest version from your GitHub repository
- Faster deployment of updates

## Notes

- The build script preserves important global variables like `$`, `jQuery`, `Webflow`, `anime`, `Splide`, and `Smooth`
- CSS is optimized for IE11+ compatibility
- Console statements are preserved in the minified JS for debugging