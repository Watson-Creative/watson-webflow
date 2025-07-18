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
│   ├── no-highlight.css
│   ├── splide.css
│   ├── text-animations.css
│   └── virtual-scroll.css
├── js/                   # Source JS files
│   ├── slider.js
│   ├── smooth-scroll.js
│   └── text-animations.js
├── custom-styles.min.css # Minified CSS output
├── custom-scripts.min.js # Minified JS output
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

1. **Add the anime.js dependency** in your project settings:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js"></script>
   ```

2. **Apply animation classes** to text elements in the Webflow Designer:
   - Select your text element
   - Add the desired animation class (e.g., `fadeup`, `slidein`, etc.)
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