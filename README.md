# Watson Webflow JS Build Script

This build script combines and minifies all CSS and JavaScript files for your Webflow project.

## Features

- **Combines** all CSS files from `/css` directory into a single minified file
- **Combines** all JS files from `/js` directory into a single minified file
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
│   └── virtual-scroll.css
├── js/                   # Source JS files
│   ├── anime.min.js      # Animation library (bundled)
│   ├── animated-svg-logo.js
│   ├── aurorahover.js    # Aurora hover effect
│   ├── slider.js
│   ├── smooth-scroll.js
│   └── text-animations.js
├── custom-styles.min.css # Minified CSS output
├── custom-scripts.min.js # Minified JS output (includes all JS)
├── build.js             # Build script
└── package.json         # Node.js dependencies
```

## Text Animations

The `text-animations.js` file provides several animation classes that can be applied to text elements in Webflow. These animations automatically wrap words and letters in spans and animate them using anime.js.

### Available Animation Classes

Apply these classes to any text element (heading, paragraph, text block, etc.) in Webflow:

#### 1. **fadeup**
- **Effect**: Letters fade in from below with a smooth upward motion
- **Duration**: 2.5 seconds
- **Usage**: Great for hero headings or important text that needs emphasis
```html
<h1 class="fadeup">Your animated text here</h1>
```

#### 2. **fadeup3**
- **Effect**: Similar to fadeup but much faster
- **Duration**: 600ms
- **Trigger**: Activates when scrolled into view (requires element with ID `text-container`)
- **Usage**: Perfect for section headings that appear on scroll
```html
<div id="text-container">
  <h2 class="fadeup3">This animates on scroll</h2>
</div>
```

#### 3. **slideup**
- **Effect**: Letters slide up from below with opacity fade
- **Duration**: 750ms
- **Usage**: Good for subheadings or secondary text
```html
<p class="slideup">Sliding text animation</p>
```

#### 4. **slidein**
- **Effect**: Entire words (not individual letters) slide in with opacity fade
- **Duration**: 1 second with staggered delay
- **Usage**: Best for longer text where letter-by-letter might be too slow
```html
<p class="slidein">Words slide in one by one</p>
```

#### 5. **rotatein**
- **Effect**: Letters rotate in with a 3D effect while sliding from top-right
- **Duration**: 750ms
- **Usage**: Eye-catching effect for special callouts or CTAs
```html
<span class="rotatein">Rotating text!</span>
```

#### 6. **popin**
- **Effect**: Letters scale from 0 to full size with elastic bounce
- **Duration**: 1.5 seconds
- **Usage**: Playful effect for informal or creative content
```html
<h3 class="popin">Pop in animation</h3>
```

### Custom Class Mappings (extraClasses)

The animation system now supports custom class mappings through the `extraClasses` object. This allows you to define your own semantic class names that automatically apply specific animations.

#### How It Works

In `text-animations.js`, you can define custom mappings:
```javascript
var extraClasses = { 
  'intro-heading': 'slideup',
  'hero-title': 'fadeup',
  'section-header': 'rotatein'
  // Add more mappings as needed
};
```

Any element with a custom class will automatically receive the mapped animation:
```html
<!-- This will animate with slideup animation -->
<h1 class="intro-heading">Welcome to Our Site</h1>

<!-- This will animate with fadeup animation -->
<h2 class="hero-title">Main Hero Text</h2>
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
- Cards fade up from below with 850ms base delay + 150ms stagger between cards

### Implementation in Webflow

1. **Include the compiled scripts** (anime.js is already bundled):
   - The minified script includes anime.js, so no additional dependencies needed
   - Just add the compiled `custom-scripts.min.js` to your Webflow project

2. **Apply animation classes** to text elements in the Webflow Designer:
   - Select your text element
   - Add the desired animation class (e.g., `fadeup`, `slidein`, etc.)
   - OR use your custom semantic classes defined in `extraClasses` (e.g., `intro-heading`, `hero-title`)
   - The animations will trigger automatically on page load

3. **Timing control**:
   - Most animations start immediately on page load
   - `slidein` and `image-card` animations have an 800ms delay
   - `fadeup3` requires scroll trigger setup (element with ID `text-container`)

4. **Custom triggers** (requires custom code):
   - The script includes placeholders for click and hover triggers
   - Modify the jQuery selectors at the bottom of `text-animations.js` to add custom triggers

### Tips for Webflow

- **Performance**: These animations work best on headings and short text blocks
- **Mobile**: Consider reducing animation complexity on mobile devices
- **Accessibility**: Add `prefers-reduced-motion` media query in custom CSS for users who prefer no animations
- **Multiple animations**: You can apply different animation classes to different text elements on the same page
- **Timing**: Stagger your animations by using different classes to create a sequential reveal effect

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

- **With preloader**: Text animations wait for the preloader to complete
- **Without preloader**: Text animations start after the standard delay (500ms)

This ensures smooth animation sequencing regardless of whether the preloader is shown.

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
- **Pulsing Animation**: Spheres expand and contract rhythmically with configurable wave patterns
- **Shape Morphing**: Spheres continuously morph between circular and elliptical shapes
- **Color Palettes**: Built-in warm, cool, and mixed color schemes using Watson Creative brand colors
- **Fully Configurable**: Every aspect can be customized through configuration variables

### Basic Usage

1. **Include the aurora container** in your HTML:
```html
<div class="aurora-container" id="auroraContainer"></div>
```

2. **Add the hoverglow class** to any element you want to have the effect:
```html
<button class="hoverglow">Hover Me</button>
<h1 class="hoverglow">Glowing Heading</h1>
<a href="#" class="hoverglow">Glowing Link</a>
```

3. **Include the script**:
```html
<script src="js/aurorahover.js"></script>
```

### How It Works

The aurora effect creates multiple layers of animated elements:

1. **Spheres (4-12)**: Main glow elements with varying sizes and colors
2. **Cores (1-2)**: Bright center points for added depth
3. **Wrapper**: Container with blur filter for soft glow effect

Each sphere has its own:
- Size (based on element height: 1.25x to 3x)
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

#### Sphere Settings
```javascript
this.sphereSizeMin = 1.25;             // Minimum sphere size (125% of element height)
this.sphereSizeMax = 3;                // Maximum sphere size (300% of element height)
this.sphereCountMin = 4;               // Minimum number of spheres
this.sphereCountMax = 8;               // Maximum additional spheres
this.spherePositionRange = 0.6;        // Spheres stay within 60% of element size
```

#### Mouse Interaction
```javascript
this.mouseDisruptionRadius = 150;      // Radius around mouse that affects spheres (px)
this.mouseDisruptionForce = 0.6;       // How strongly mouse pushes spheres (0-1)
this.mouseShrinkAmount = 0.3;          // How much spheres shrink when touched (30%)
this.mouseShrinkRadius = 80;           // Distance to trigger shrink effect (px)
this.sphereRecoverySpeed = 0.15;       // Recovery speed from mouse interaction
this.mouseInfluence = 0.3;             // How much mouse affects glow position (0-1)
```

#### Pulsing & Animation
```javascript
this.spherePulseSpeed = 0.5;           // Speed of sphere pulsing
this.spherePulseAmplitude = 0.2;       // Expansion/contraction amount (20%)
this.spherePulsePhaseShift = 0.3;      // Phase difference for wave effect
this.morphAmplitude = 20;              // Shape morphing amount (%)
this.driftAmplitude = 5;               // Drift movement distance (px)
this.rotationSpeedMax = 0.3;           // Maximum rotation speed
```

#### Opacity & Blur
```javascript
this.sphereOpacityMin = 0.7;           // Minimum sphere opacity
this.sphereOpacityMax = 1.0;           // Maximum sphere opacity
this.wrapperBlur = 50;                 // Main glow blur amount (px)
this.coreBlur = 8;                     // Core blur amount (px)
```

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

### Color Palettes

The effect includes three built-in color palettes based on Watson Creative brand colors:

```javascript
warm: ['rgba(233, 56, 38, 0.8)', 'rgba(245, 128, 32, 0.7)', 'rgba(253, 183, 26, 0.6)']
cool: ['rgba(0, 183, 149, 0.8)', 'rgba(146, 208, 195, 0.7)', 'rgba(12, 75, 65, 0.6)']
mixed: // Combination of warm and cool colors
```

The effect automatically selects palettes based on element content:
- Elements containing "warm" use the warm palette
- Elements containing "nature" use the cool palette
- All others use the mixed palette

### Dynamic Sizing

The effect automatically adapts to each element's dimensions:

- **Sphere sizes**: Based on element height (min 1.25x, max 3x)
- **Distribution area**: Based on element width and height
- **Wrapper size**: Calculated to contain largest possible sphere plus movement space
- **Core size**: 40-60% of element height

This ensures the effect looks proportional on any size element, from small buttons to large headings.

### Mouse Interaction Details

The aurora effect features three types of mouse interaction:

1. **Mouse Following**: The entire glow subtly follows the mouse cursor
   - Controlled by `mouseInfluence` (0-1)
   - Smoothed with `easingFactor`

2. **Sphere Disruption**: Mouse pushes spheres away
   - Active within `mouseDisruptionRadius`
   - Force decreases with distance
   - Spheres recover at `sphereRecoverySpeed`

3. **Touch Response**: Spheres shrink when mouse gets close
   - Triggers within `mouseShrinkRadius`
   - Shrinks by `mouseShrinkAmount`
   - Smooth interpolation for natural feel

### Webflow Integration

1. **Upload the Script**: Add `aurorahover.js` to your Webflow project
2. **Add Container**: Place the aurora container div in your page
3. **Apply Classes**: Add the `hoverglow` class to elements in the Designer
4. **Include Script**: Reference the script in Project Settings or page custom code

#### CSS Requirements

Make sure your CSS includes:
```css
.aurora-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 5;
    overflow: hidden;
}

.hoverglow {
    position: relative;
    cursor: pointer;
    z-index: 10;
}
```

### Performance Considerations

- The effect uses `requestAnimationFrame` for smooth 60fps animation
- Animations pause when no elements are hovered
- Each sphere tracks its own state to minimize calculations
- Blur effects are GPU-accelerated via CSS

### Tips for Best Results

1. **Element Padding**: Ensure hovered elements have adequate padding for the effect to display properly
2. **Z-Index**: Keep hoverglow elements above the aurora container (z-index: 10+)
3. **Dark Backgrounds**: The effect works best on dark backgrounds due to the `mix-blend-mode: screen`
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
```

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