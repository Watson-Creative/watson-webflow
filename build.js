const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const UglifyJS = require('uglify-js');
const chokidar = require('chokidar');

// Configuration
const config = {
  css: {
    inputDir: './css',
    outputFile: './styles.min.css',
    extension: '.css'
  },
  js: {
    inputDir: './js',
    outputFile: './scripts.min.js',
    extension: '.js'
  }
};

// Function to generate a unique build ID
function generateBuildId() {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

// Helper function to read all files from a directory
function getFilesFromDirectory(dir, extension) {
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter(file => path.extname(file) === extension)
      .map(file => path.join(dir, file));
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message);
    return [];
  }
}

// Function to combine and minify CSS files
function buildCSS() {
  console.log('Building CSS...');
  
  const cssFiles = getFilesFromDirectory(config.css.inputDir, config.css.extension);
  
  if (cssFiles.length === 0) {
    console.log('No CSS files found to process.');
    return;
  }
  
  // Generate unique build ID
  const buildId = generateBuildId();
  
  // Read and combine all CSS files
  let combinedCSS = '';
  cssFiles.forEach(file => {
    console.log(`  Processing: ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    combinedCSS += `/* Source: ${path.basename(file)} */\n${content}\n\n`;
  });
  
  // Minify the combined CSS
  const minifier = new CleanCSS({
    level: 2, // Advanced optimizations
    compatibility: 'ie11'
  });
  
  const minified = minifier.minify(combinedCSS);
  
  if (minified.errors.length > 0) {
    console.error('CSS minification errors:', minified.errors);
  }
  
  if (minified.warnings.length > 0) {
    console.warn('CSS minification warnings:', minified.warnings);
  }
  
  // Add build ID comment at the top
  const finalCSS = `/* Build ID: ${buildId} */\n/* Built: ${new Date().toISOString()} */\n${minified.styles}`;
  
  // Write the minified CSS to output file
  fs.writeFileSync(config.css.outputFile, finalCSS);
  
  // Calculate and display file sizes
  const originalSize = Buffer.byteLength(combinedCSS, 'utf8');
  const minifiedSize = Buffer.byteLength(finalCSS, 'utf8');
  const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
  
  console.log(`✓ CSS build complete!`);
  console.log(`  Build ID: ${buildId}`);
  console.log(`  Original size: ${(originalSize / 1024).toFixed(2)} KB`);
  console.log(`  Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);
  console.log(`  Size reduction: ${savings}%`);
  console.log(`  Output: ${config.css.outputFile}\n`);
}

// Function to combine and minify JS files
function buildJS() {
  console.log('Building JavaScript...');
  
  const jsFiles = getFilesFromDirectory(config.js.inputDir, config.js.extension);
  
  if (jsFiles.length === 0) {
    console.log('No JavaScript files found to process.');
    return;
  }
  
  // Generate unique build ID
  const buildId = generateBuildId();
  
  // Read all JS files
  const jsContents = {};
  let combinedJS = '';
  
  jsFiles.forEach(file => {
    console.log(`  Processing: ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    jsContents[path.basename(file)] = content;
    combinedJS += `/* Source: ${path.basename(file)} */\n${content}\n\n`;
  });
  
  // Minify the combined JS
  try {
    const minified = UglifyJS.minify(jsContents, {
      compress: {
        drop_console: false, // Keep console statements
        drop_debugger: true,
        passes: 2
      },
      mangle: {
        reserved: ['$', 'jQuery', 'Webflow', 'anime', 'Splide', 'Smooth'] // Preserve global variable names
      },
      output: {
        comments: false
      }
    });
    
    if (minified.error) {
      console.error('JavaScript minification error:', minified.error);
      return;
    }
    
    // Add build ID comment at the top
    const finalJS = `/* Build ID: ${buildId} */\n/* Built: ${new Date().toISOString()} */\n${minified.code}`;
    
    // Write the minified JS to output file
    fs.writeFileSync(config.js.outputFile, finalJS);
    
    // Calculate and display file sizes
    const originalSize = Buffer.byteLength(combinedJS, 'utf8');
    const minifiedSize = Buffer.byteLength(finalJS, 'utf8');
    const savings = ((originalSize - minifiedSize) / originalSize * 100).toFixed(2);
    
    console.log(`✓ JavaScript build complete!`);
    console.log(`  Build ID: ${buildId}`);
    console.log(`  Original size: ${(originalSize / 1024).toFixed(2)} KB`);
    console.log(`  Minified size: ${(minifiedSize / 1024).toFixed(2)} KB`);
    console.log(`  Size reduction: ${savings}%`);
    console.log(`  Output: ${config.js.outputFile}\n`);
  } catch (error) {
    console.error('JavaScript minification error:', error.message);
  }
}

// Main build function
function build() {
  console.log('\n🔨 Starting build process...\n');
  buildCSS();
  buildJS();
  console.log('✨ Build complete!\n');
}

// Watch mode
function watch() {
  console.log('👁  Watching for changes...\n');
  
  // Initial build
  build();
  
  // Watch CSS files
  const cssWatcher = chokidar.watch(path.join(config.css.inputDir, '*' + config.css.extension), {
    ignoreInitial: true
  });
  
  cssWatcher
    .on('add', () => buildCSS())
    .on('change', () => buildCSS())
    .on('unlink', () => buildCSS());
  
  // Watch JS files
  const jsWatcher = chokidar.watch(path.join(config.js.inputDir, '*' + config.js.extension), {
    ignoreInitial: true
  });
  
  jsWatcher
    .on('add', () => buildJS())
    .on('change', () => buildJS())
    .on('unlink', () => buildJS());
  
  console.log('Press Ctrl+C to stop watching.\n');
}

// Check command line arguments
const args = process.argv.slice(2);
const isWatchMode = args.includes('--watch') || args.includes('-w');

// Run the appropriate mode
if (isWatchMode) {
  watch();
} else {
  build();
} 