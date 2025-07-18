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

## Webflow Integration

You have two options for integrating the minified files into your Webflow project:

### Option 1: Use CDN Links (Recommended)

Link directly to the files from GitHub using raw.githack.com:

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

### Option 2: Upload to Webflow

1. Upload the generated files to your Webflow project:
   - `custom-styles.min.css`
   - `custom-scripts.min.js`

2. Link them in your Webflow project's custom code section:
   ```html
   <!-- In <head> -->
   <link rel="stylesheet" href="/custom-styles.min.css">
   
   <!-- Before </body> -->
   <script src="/custom-scripts.min.js"></script>
   ```

## Notes

- The build script preserves important global variables like `$`, `jQuery`, `Webflow`, `anime`, `Splide`, and `Smooth`
- CSS is optimized for IE11+ compatibility
- Console statements are preserved in the minified JS for debugging 