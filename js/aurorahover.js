class GlowEffect {
    constructor() {
        var otherClasses = ['cta-right-arrow'];
        this.container = document.getElementById('auroraContainer');
        this.activeGlows = new Map();
        this.frameId = null;
        
        // ===== CONFIGURATION VARIABLES =====
        // Easily adjust these values to customize the effect
        // 
        // QUICK TWEAKS:
        // - For subtler effect: Reduce sphereOpacityMax, wrapperBlur, and scaleAmplitude
        // - For more dramatic effect: Increase sphereSizeMax, morphAmplitude, and driftAmplitude
        // - For smoother animation: Decrease easingFactor and position smoothing values
        // - For more responsive: Increase easingFactor and mouseInfluence
        // 
        // OPACITY EXAMPLES:
        // - Subtle glow: sphereOpacityMin: 0.3, sphereOpacityMax: 0.5
        // - Strong glow: sphereOpacityMin: 0.8, sphereOpacityMax: 1.0
        // - Variable glow: sphereOpacityMin: 0.2, sphereOpacityMax: 1.0
        //
        // NEW MOUSE INTERACTIONS:
        // - Spheres pulse rhythmically with configurable speed and amplitude
        // - Mouse pushes spheres away like magnetic repulsion
        // - Spheres shrink when mouse gets close, then expand back
        // - All effects smoothly interpolate for organic motion
        //
        // INTERACTION TUNING:
        // - Increase mouseDisruptionRadius for wider influence area
        // - Increase mouseDisruptionForce for stronger push effect
        // - Increase mouseShrinkAmount for more dramatic shrinking
        // - Decrease sphereRecoverySpeed for slower, floatier response
        
        // Animation & Timing
        this.easingFactor = 0.12;                    // Mouse follow smoothness (0.01 = very smooth, 1 = instant)
        this.fadeInDuration = '0.3s';                // Glow fade in time
        this.fadeOutDuration = '0.4s';               // Glow fade out time
        this.animationFPS = 0.016;                   // Animation frame time (60fps)
        
        // Sphere Sizing (based on element height).
        this.sphereSizeMin = 0.75;                   // Minimum sphere size multiplier
        this.sphereSizeMax = 2;                      // Maximum sphere size multiplier
        this.sphereCountMin = 4;                     // Minimum number of spheres
        this.sphereCountMax = 12;                     // Maximum number of spheres (actual max is min + max)
        
        // Position Constraints (based on element dimensions)
        this.spherePositionRange = 1;              // Spheres stay within 60% of element size
        this.corePositionRange = 0.1;                // Cores stay within 30% of element size
        this.mouseInfluence = 0.6;                   // How much mouse position affects glow (0-1)
        
        // Core Settings
        this.coreSizeMin = 0.4;                      // Minimum core size (40% of element height)
        this.coreSizeMax = 0.6;                      // Maximum core size (60% of element height)
        this.coreCountMin = 1;                       // Minimum number of cores
        this.coreCountMax = 2;                       // Maximum number of cores
        
        // Opacity Settings
        this.sphereOpacityMin = 0.7;                 // Minimum sphere opacity
        this.sphereOpacityMax = 1.0;                 // Maximum sphere opacity
        this.coreOpacity = 0.8;                      // Core base opacity
        this.coreOpacityVariation = 0.2;             // Core opacity animation range
        
        // Blur Settings
        this.wrapperBlur = 50;                       // Main wrapper blur (px)
        this.coreBlur = 8;                           // Core blur (px)
        
        // Animation Parameters
        this.positionChangeIntervalMin = 2;          // Min seconds between position changes
        this.positionChangeIntervalMax = 5;          // Max seconds between position changes
        this.spherePositionSmoothing = 0.02;        // Sphere position interpolation speed
        this.corePositionSmoothing = 0.03;          // Core position interpolation speed
        
        // Drift & Movement
        this.driftSpeedMin = 0.1;                   // Minimum drift animation speed
        this.driftSpeedMax = 0.4;                   // Maximum drift animation speed
        this.driftAmplitude = 5;                    // Drift movement amplitude (px)
        this.coreDriftAmplitude = 3;                // Core drift amplitude (px)
        
        // Morphing & Rotation
        this.morphSpeedMin = 0.5;                   // Minimum shape morph speed
        this.morphSpeedMax = 1.5;                   // Maximum shape morph speed
        this.morphAmplitude = 20;                   // Shape morph amplitude (%)
        this.rotationSpeedMax = 0.3;                // Maximum rotation speed
        this.rotationMultiplier = 30;               // Rotation speed multiplier
        
        // Scale Animation
        this.scaleAmplitude = 0.1;                  // Scale breathing amplitude (10%)
        this.coreScaleAmplitude = 0.15;             // Core scale amplitude (15%)
        
        // Sphere Pulsing Animation
        this.spherePulseSpeed = 0.5;                // Speed of sphere pulsing
        this.spherePulseAmplitude = 0.2;            // How much spheres expand/contract (20%)
        this.spherePulsePhaseShift = 0.3;           // Phase difference between spheres for wave effect
        
        // Mouse Interaction
        this.mouseDisruptionRadius = 300;           // Radius around mouse that affects spheres (px)
        this.mouseDisruptionForce = 1;            // How strongly mouse pushes spheres (0-1)
        this.mouseShrinkAmount = 0.3;               // How much spheres shrink when mouse touches (30%)
        this.mouseShrinkRadius = 80;                // Distance from mouse to trigger shrink (px)
        this.sphereRecoverySpeed = 0.15;            // How fast spheres recover from mouse interaction
        this.mousePositionSmoothing = 0.2;          // Smoothing for mouse position tracking
        
        // Color Animation
        this.hueRotateSpeed = 0.1;                  // Hue rotation speed
        this.hueRotateAmount = 10;                  // Maximum hue rotation (degrees)
        
        // ===== PRESET EXAMPLES =====
        // Uncomment and modify values above to achieve different effects:
        
        // SUBTLE PROFESSIONAL:
        // this.sphereOpacityMin = 0.3; this.sphereOpacityMax = 0.5;
        // this.wrapperBlur = 80; this.scaleAmplitude = 0.05;
        // this.morphAmplitude = 10; this.driftAmplitude = 2;
        
        // DRAMATIC NEON:
        // this.sphereOpacityMin = 0.8; this.sphereOpacityMax = 1.0;
        // this.wrapperBlur = 40; this.sphereSizeMax = 4;
        // this.morphAmplitude = 30; this.coreOpacity = 1.0;
        
        // SMOOTH AMBIENT:
        // this.easingFactor = 0.05; this.spherePositionSmoothing = 0.01;
        // this.fadeInDuration = '0.8s'; this.fadeOutDuration = '1.2s';
        // this.driftSpeedMax = 0.2; this.morphSpeedMax = 0.8;
        
        // ENERGETIC:
        // this.sphereCountMax = 12; this.driftAmplitude = 15;
        // this.rotationSpeedMax = 0.5; this.scaleAmplitude = 0.2;
        // this.positionChangeIntervalMin = 1; this.positionChangeIntervalMax = 2;
        
        // REACTIVE BUBBLES:
        // this.mouseDisruptionRadius = 200; this.mouseDisruptionForce = 0.8;
        // this.mouseShrinkAmount = 0.5; this.sphereRecoverySpeed = 0.2;
        // this.spherePulseAmplitude = 0.3; this.spherePulseSpeed = 0.7;
        
        // GENTLE FLOW:
        // this.spherePulseSpeed = 0.3; this.spherePulseAmplitude = 0.15;
        // this.mouseDisruptionForce = 0.3; this.mouseShrinkAmount = 0.1;
        // this.spherePulsePhaseShift = 0.5; this.mousePositionSmoothing = 0.1;
        
        // Dynamic color palettes
        this.colorPalettes = {
            warm: [
                'rgba(233, 56, 38, 0.8)',   // redwood
                'rgba(245, 128, 32, 0.7)',  // sunset
                'rgba(253, 183, 26, 0.6)'   // larch
            ],
            cool: [
                'rgba(0, 183, 149, 0.8)',   // glacial
                'rgba(146, 208, 195, 0.7)', // light-green
                'rgba(12, 75, 65, 0.6)'     // forest
            ],
            mixed: [
                'rgba(233, 56, 38, 0.8)',   // redwood
                'rgba(245, 128, 32, 0.7)',  // sunset
                'rgba(253, 183, 26, 0.6)',   // larch
                'rgba(0, 183, 149, 0.8)',   // glacial
                'rgba(146, 208, 195, 0.7)', // light-green
                'rgba(12, 75, 65, 0.6)'     // forest
            ]
        };
        
        this.init();
    }

    init() {
        console.log('GlowEffect initialized');
        
        // Use event delegation for better handling of all hoverglow elements
        document.addEventListener('mouseenter', (e) => {
            // Check if the target or any parent has hoverglow class
            const hoverElement = e.target.closest('.hoverglow');
            if (hoverElement && !this.activeGlows.has(hoverElement)) {
                console.log('Mouse enter on:', hoverElement);
                // Create a new event with the hoverglow element as target
                this.handleMouseEnter(e, hoverElement);
            }
        }, true);
        
        document.addEventListener('mousemove', (e) => {
            const hoverElement = e.target.closest('.hoverglow');
            if (hoverElement && this.activeGlows.has(hoverElement)) {
                this.handleMouseMove(e, hoverElement);
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            const hoverElement = e.target.closest('.hoverglow');
            if (hoverElement) {
                // Check if we're actually leaving the hoverglow element
                const relatedTarget = e.relatedTarget;
                if (!relatedTarget || !hoverElement.contains(relatedTarget)) {
                    this.endGlow(hoverElement);
                }
            }
        }, true);
    }
    
    handleMouseEnter(event, element) {
        // Start glow with the original event but the correct element
        const e = {
            target: element,
            clientX: event.clientX,
            clientY: event.clientY
        };
        this.startGlow(e);
    }
    
    handleMouseMove(event, element) {
        // Update position with the original event but the correct element
        const e = {
            target: element,
            clientX: event.clientX,
            clientY: event.clientY
        };
        this.updateMousePosition(e);
    }

    startGlow(event) {
        try {
            const element = event.target;
            
            // Prevent duplicate glows for the same element
            if (this.activeGlows.has(element)) {
                return;
            }
            
            console.log('Starting glow for:', element);
            
            const rect = element.getBoundingClientRect();
            
            console.log('Element dimensions:', {
                width: rect.width,
                height: rect.height,
                minSphereSize: rect.height * this.sphereSizeMin,
                maxSphereSize: rect.height * this.sphereSizeMax
            });
            
            // Calculate wrapper size based on element dimensions
            // Wrapper needs to be large enough to contain the largest sphere (3x height)
            // Plus some extra room for movement
            const wrapperWidth = rect.width + (rect.height * this.sphereSizeMax); // Element width + max sphere size
            const wrapperHeight = rect.height + (rect.height * this.sphereSizeMax); // Element height + max sphere size
            const glowSize = Math.max(wrapperWidth, wrapperHeight); // Use the larger dimension
            
            // Create main wrapper
            const wrapper = document.createElement('div');
            wrapper.style.cssText = `
                position: absolute;
                opacity: 0;
                will-change: transform, opacity, filter;
                pointer-events: none;
                transition: opacity ${this.fadeInDuration} ease-in;
                mix-blend-mode: screen;
            `;
            
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseOffsetX = event.clientX - centerX;
            const mouseOffsetY = event.clientY - centerY;
            const mouseInfluence = this.mouseInfluence;
            const initialX = centerX + (mouseOffsetX * mouseInfluence);
            const initialY = centerY + (mouseOffsetY * mouseInfluence);
            
            wrapper.style.left = `${initialX - glowSize/2}px`;
            wrapper.style.top = `${initialY - glowSize/2}px`;
            wrapper.style.width = `${glowSize}px`;
            wrapper.style.height = `${glowSize}px`;

            // Choose color palette based on element
            let palette = this.colorPalettes.mixed;
            if (element.textContent.toLowerCase().includes('warm')) {
                palette = this.colorPalettes.warm;
            } else if (element.textContent.toLowerCase().includes('nature')) {
                palette = this.colorPalettes.cool;
            }

            const glowData = {
                element: element,
                wrapper: wrapper,
                orbs: [],
                cores: [],
                coreWrapper: null,
                rect: rect,
                glowSize: glowSize,
                targetX: initialX,
                targetY: initialY,
                currentX: initialX,
                currentY: initialY,
                centerX: centerX,
                centerY: centerY,
                mouseX: event.clientX,               // Track actual mouse position
                mouseY: event.clientY,               // Track actual mouse position
                smoothMouseX: event.clientX,         // Smoothed mouse position
                smoothMouseY: event.clientY,         // Smoothed mouse position
                time: 0,
                palette: palette,
                active: true,
                fadeTimeout: null,
                mouseInfluence: mouseInfluence
            };

            // Create dynamic glow layers
            this.createGlowLayers(wrapper, glowData);

            this.container.appendChild(wrapper);
            this.activeGlows.set(element, glowData);

            // Smooth fade in
            requestAnimationFrame(() => {
                wrapper.style.opacity = '1';
            });

            // Start animation loop if not already running
            if (!this.frameId) {
                this.animate();
            }
        } catch (error) {
            console.error('Error starting glow:', error);
        }
    }

    createGlowLayers(wrapper, glowData) {
        // Create random circles for more variation
        const circleCount = this.sphereCountMin + Math.floor(Math.random() * this.sphereCountMax);
        const elementWidth = glowData.rect.width;
        const elementHeight = glowData.rect.height;
        
        // Use element height for sphere sizing
        const minSphereSize = elementHeight * this.sphereSizeMin;
        const maxSphereSize = elementHeight * this.sphereSizeMax;
        
        for (let i = 0; i < circleCount; i++) {
            const circle = document.createElement('div');
            
            // Random size between min and max based on element height
            const circleSize = minSphereSize + Math.random() * (maxSphereSize - minSphereSize);
            
            // Random color from palette
            const color = glowData.palette[Math.floor(Math.random() * glowData.palette.length)];
            
            // Constrain position within element bounds
            // Spheres should be distributed within the element's width and height
            const maxOffsetX = elementWidth * this.spherePositionRange;
            const maxOffsetY = elementHeight * this.spherePositionRange;
            const randomX = (Math.random() - 0.5) * maxOffsetX;
            const randomY = (Math.random() - 0.5) * maxOffsetY;
            
            circle.style.cssText = `
                position: absolute;
                width: ${circleSize}px;
                height: ${circleSize}px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) translate(${randomX}px, ${randomY}px);
                border-radius: 50%;
                background: ${color};
                pointer-events: none;
                will-change: transform, border-radius;
                opacity: ${this.sphereOpacityMin + Math.random() * (this.sphereOpacityMax - this.sphereOpacityMin)};
                transition: all ${this.fadeInDuration} ease;
            `;
            
            // Store animation data with element-specific constraints
            circle.dataset.initialX = randomX.toString();
            circle.dataset.initialY = randomY.toString();
            circle.dataset.currentX = randomX.toString();
            circle.dataset.currentY = randomY.toString();
            circle.dataset.targetX = randomX.toString();
            circle.dataset.targetY = randomY.toString();
            circle.dataset.size = circleSize.toString();
            circle.dataset.maxOffsetX = maxOffsetX.toString();
            circle.dataset.maxOffsetY = maxOffsetY.toString();
            circle.dataset.driftSpeed = (this.driftSpeedMin + Math.random() * (this.driftSpeedMax - this.driftSpeedMin)).toString();
            circle.dataset.morphSpeed = (this.morphSpeedMin + Math.random() * (this.morphSpeedMax - this.morphSpeedMin)).toString();
            circle.dataset.phase = (Math.random() * Math.PI * 2).toString();
            circle.dataset.rotationSpeed = ((Math.random() - 0.5) * this.rotationSpeedMax).toString();
            circle.dataset.lastPositionChange = '0';
            circle.dataset.positionChangeInterval = (this.positionChangeIntervalMin + Math.random() * (this.positionChangeIntervalMax - this.positionChangeIntervalMin)).toString();
            
            // Mouse disruption properties
            circle.dataset.disruptionX = '0';
            circle.dataset.disruptionY = '0';
            circle.dataset.currentScale = '1';
            circle.dataset.targetScale = '1';
            circle.dataset.pulseOffset = (Math.random() * Math.PI * 2).toString(); // Random start for pulse wave
            
            glowData.orbs.push(circle);
        }
        
        // Apply blur to the entire wrapper for soft glow effect
        wrapper.style.filter = `blur(${this.wrapperBlur}px)`;
        
        // Add all circles to wrapper
        glowData.orbs.forEach(orb => wrapper.appendChild(orb));
        
        // Create a separate sharp core layer (optional, not blurred)
        const coreWrapper = document.createElement('div');
        coreWrapper.style.cssText = `
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
        `;
        
        // Add bright cores based on element size
        const coreCount = this.coreCountMin + Math.floor(Math.random() * this.coreCountMax);
        glowData.cores = [];
        
        for (let i = 0; i < coreCount; i++) {
            const core = document.createElement('div');
            const coreSize = elementHeight * (this.coreSizeMin + Math.random() * (this.coreSizeMax - this.coreSizeMin));
            const coreX = (Math.random() - 0.5) * elementWidth * this.corePositionRange;
            const coreY = (Math.random() - 0.5) * elementHeight * this.corePositionRange;
            
            core.style.cssText = `
                position: absolute;
                width: ${coreSize}px;
                height: ${coreSize}px;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%) translate(${coreX}px, ${coreY}px);
                border-radius: 50%;
                background: radial-gradient(circle, 
                    rgba(255,255,255,0.9) 0%, 
                    ${glowData.palette[0]} 50%, 
                    transparent 100%);
                filter: blur(${this.coreBlur}px);
                pointer-events: none;
                opacity: ${this.coreOpacity};
                transition: all ${this.fadeInDuration} ease;
            `;
            
            core.dataset.initialX = coreX.toString();
            core.dataset.initialY = coreY.toString();
            core.dataset.currentX = coreX.toString();
            core.dataset.currentY = coreY.toString();
            core.dataset.targetX = coreX.toString();
            core.dataset.targetY = coreY.toString();
            core.dataset.maxOffsetX = (elementWidth * this.corePositionRange).toString();
            core.dataset.maxOffsetY = (elementHeight * this.corePositionRange).toString();
            core.dataset.animSpeed = (2 + Math.random()).toString();
            core.dataset.phase = (Math.random() * Math.PI * 2).toString();
            core.dataset.lastPositionChange = '0';
            
            coreWrapper.appendChild(core);
            glowData.cores.push(core);
        }
        
        wrapper.appendChild(coreWrapper);
        glowData.coreWrapper = coreWrapper;
    }

    updateMousePosition(event) {
        const element = event.target;
        const glowData = this.activeGlows.get(element);
        if (!glowData || !glowData.active) return;

        // Update element rect in case it moved
        glowData.rect = element.getBoundingClientRect();
        
        // Update center position
        glowData.centerX = glowData.rect.left + glowData.rect.width / 2;
        glowData.centerY = glowData.rect.top + glowData.rect.height / 2;
        
        // Track actual mouse position
        glowData.mouseX = event.clientX;
        glowData.mouseY = event.clientY;
        
        // Calculate mouse offset from element center
        const mouseOffsetX = event.clientX - glowData.centerX;
        const mouseOffsetY = event.clientY - glowData.centerY;
        
        // Constrain the glow movement to a percentage of the offset
        // This keeps the glow mostly centered while allowing subtle movement
        glowData.targetX = glowData.centerX + (mouseOffsetX * glowData.mouseInfluence);
        glowData.targetY = glowData.centerY + (mouseOffsetY * glowData.mouseInfluence);
    }

    animate() {
        let hasActiveGlows = false;
        
        this.activeGlows.forEach((glowData, element) => {
            if (!glowData.active && !glowData.wrapper.parentNode) {
                this.activeGlows.delete(element);
                return;
            }
            
            if (glowData.active) {
                hasActiveGlows = true;
            }

            glowData.time += this.animationFPS;
            
            // Smooth mouse position tracking
            glowData.smoothMouseX += (glowData.mouseX - glowData.smoothMouseX) * this.mousePositionSmoothing;
            glowData.smoothMouseY += (glowData.mouseY - glowData.smoothMouseY) * this.mousePositionSmoothing;
            
            // Smooth position interpolation
            const deltaX = glowData.targetX - glowData.currentX;
            const deltaY = glowData.targetY - glowData.currentY;
            
            glowData.currentX += deltaX * this.easingFactor;
            glowData.currentY += deltaY * this.easingFactor;
            
            const wrapperX = glowData.currentX - glowData.glowSize/2;
            const wrapperY = glowData.currentY - glowData.glowSize/2;
            
            glowData.wrapper.style.left = `${wrapperX}px`;
            glowData.wrapper.style.top = `${wrapperY}px`;

            // Dynamic color shifting - subtle
            const hueRotate = Math.sin(glowData.time * this.hueRotateSpeed) * this.hueRotateAmount;
            glowData.wrapper.style.filter = `blur(${this.wrapperBlur}px) hue-rotate(${hueRotate}deg)`;

            // Animate each circle with gentle drift and morphing
            glowData.orbs.forEach((orb, index) => {
                const currentX = parseFloat(orb.dataset.currentX) || 0;
                const currentY = parseFloat(orb.dataset.currentY) || 0;
                const targetX = parseFloat(orb.dataset.targetX) || 0;
                const targetY = parseFloat(orb.dataset.targetY) || 0;
                const size = parseFloat(orb.dataset.size) || 100;
                const driftSpeed = parseFloat(orb.dataset.driftSpeed) || this.driftSpeedMin;
                const morphSpeed = parseFloat(orb.dataset.morphSpeed) || this.morphSpeedMin;
                const phase = parseFloat(orb.dataset.phase) || 0;
                const rotationSpeed = parseFloat(orb.dataset.rotationSpeed) || 0;
                const lastPositionChange = parseFloat(orb.dataset.lastPositionChange) || 0;
                const positionChangeInterval = parseFloat(orb.dataset.positionChangeInterval) || this.positionChangeIntervalMin;
                const pulseOffset = parseFloat(orb.dataset.pulseOffset) || 0;
                
                // Mouse disruption calculations
                const orbWorldX = wrapperX + glowData.glowSize/2 + currentX;
                const orbWorldY = wrapperY + glowData.glowSize/2 + currentY;
                const distToMouse = Math.sqrt(
                    Math.pow(orbWorldX - glowData.smoothMouseX, 2) + 
                    Math.pow(orbWorldY - glowData.smoothMouseY, 2)
                );
                
                // Calculate disruption force
                let disruptionX = parseFloat(orb.dataset.disruptionX) || 0;
                let disruptionY = parseFloat(orb.dataset.disruptionY) || 0;
                
                if (distToMouse < this.mouseDisruptionRadius) {
                    const force = 1 - (distToMouse / this.mouseDisruptionRadius);
                    const angle = Math.atan2(orbWorldY - glowData.smoothMouseY, orbWorldX - glowData.smoothMouseX);
                    const pushX = Math.cos(angle) * force * this.mouseDisruptionForce * 50;
                    const pushY = Math.sin(angle) * force * this.mouseDisruptionForce * 50;
                    
                    disruptionX += (pushX - disruptionX) * this.sphereRecoverySpeed;
                    disruptionY += (pushY - disruptionY) * this.sphereRecoverySpeed;
                } else {
                    disruptionX *= (1 - this.sphereRecoverySpeed);
                    disruptionY *= (1 - this.sphereRecoverySpeed);
                }
                
                orb.dataset.disruptionX = disruptionX.toString();
                orb.dataset.disruptionY = disruptionY.toString();
                
                // Calculate shrink effect
                let currentScale = parseFloat(orb.dataset.currentScale) || 1;
                let targetScale = parseFloat(orb.dataset.targetScale) || 1;
                
                if (distToMouse < this.mouseShrinkRadius) {
                    targetScale = 1 - this.mouseShrinkAmount * (1 - distToMouse / this.mouseShrinkRadius);
                } else {
                    targetScale = 1;
                }
                
                currentScale += (targetScale - currentScale) * this.sphereRecoverySpeed;
                orb.dataset.currentScale = currentScale.toString();
                orb.dataset.targetScale = targetScale.toString();
                
                // Check if it's time to change position
                if (glowData.time - lastPositionChange > positionChangeInterval) {
                    // Generate new target position within element constraints
                    const maxOffsetX = parseFloat(orb.dataset.maxOffsetX) || glowData.rect.width * this.spherePositionRange;
                    const maxOffsetY = parseFloat(orb.dataset.maxOffsetY) || glowData.rect.height * this.spherePositionRange;
                    orb.dataset.targetX = ((Math.random() - 0.5) * maxOffsetX).toString();
                    orb.dataset.targetY = ((Math.random() - 0.5) * maxOffsetY).toString();
                    orb.dataset.lastPositionChange = glowData.time.toString();
                }
                
                // Smooth interpolation towards target position
                const newX = currentX + (targetX - currentX) * this.spherePositionSmoothing;
                const newY = currentY + (targetY - currentY) * this.spherePositionSmoothing;
                orb.dataset.currentX = newX.toString();
                orb.dataset.currentY = newY.toString();
                
                const time = glowData.time * driftSpeed;
                const morphTime = glowData.time * morphSpeed;
                
                // Pulsing animation with phase shift between spheres
                const pulseTime = glowData.time * this.spherePulseSpeed + pulseOffset + (index * this.spherePulsePhaseShift);
                const pulseScale = 1 + Math.sin(pulseTime) * this.spherePulseAmplitude;
                
                // Shape morphing - change border radius
                const radiusX = 50 + Math.sin(morphTime + phase) * this.morphAmplitude;
                const radiusY = 50 + Math.cos(morphTime * 0.7 + phase) * this.morphAmplitude;
                
                // Gentle drift on top of position changes
                const driftX = Math.sin(time + phase) * this.driftAmplitude;
                const driftY = Math.cos(time * 0.8 + phase) * this.driftAmplitude;
                
                // Slight rotation
                const rotation = time * rotationSpeed * this.rotationMultiplier;
                
                // Gentle scale breathing (now combined with pulse and mouse effects)
                const scaleX = currentScale * pulseScale * (1 + Math.sin(time * 0.5 + phase) * this.scaleAmplitude);
                const scaleY = currentScale * pulseScale * (1 + Math.cos(time * 0.5 + phase * 1.3) * this.scaleAmplitude);
                
                // Apply all transformations including disruption
                orb.style.transform = `
                    translate(-50%, -50%) 
                    translate(${newX + driftX + disruptionX}px, ${newY + driftY + disruptionY}px) 
                    scale(${scaleX}, ${scaleY})
                    rotate(${rotation}deg)
                `;
                orb.style.borderRadius = `${radiusX}% ${radiusY}%`;
            });

            // Animate cores with subtle pulsing and position changes
            if (glowData.cores && glowData.coreWrapper) {
                glowData.cores.forEach((core) => {
                    const currentX = parseFloat(core.dataset.currentX) || 0;
                    const currentY = parseFloat(core.dataset.currentY) || 0;
                    const targetX = parseFloat(core.dataset.targetX) || 0;
                    const targetY = parseFloat(core.dataset.targetY) || 0;
                    const speed = parseFloat(core.dataset.animSpeed) || 2;
                    const phase = parseFloat(core.dataset.phase) || 0;
                    const lastPositionChange = parseFloat(core.dataset.lastPositionChange) || 0;
                    
                    // Change position every few seconds
                    if (glowData.time - lastPositionChange > this.positionChangeIntervalMin + Math.random() * (this.positionChangeIntervalMax - this.positionChangeIntervalMin)) {
                        const maxOffsetX = parseFloat(core.dataset.maxOffsetX) || glowData.rect.width * this.corePositionRange;
                        const maxOffsetY = parseFloat(core.dataset.maxOffsetY) || glowData.rect.height * this.corePositionRange;
                        core.dataset.targetX = ((Math.random() - 0.5) * maxOffsetX).toString();
                        core.dataset.targetY = ((Math.random() - 0.5) * maxOffsetY).toString();
                        core.dataset.lastPositionChange = glowData.time.toString();
                    }
                    
                    // Smooth interpolation
                    const newX = currentX + (targetX - currentX) * this.corePositionSmoothing;
                    const newY = currentY + (targetY - currentY) * this.corePositionSmoothing;
                    core.dataset.currentX = newX.toString();
                    core.dataset.currentY = newY.toString();
                    
                    const time = glowData.time * speed;
                    
                    // Add slight drift
                    const coreX = newX + Math.sin(time + phase) * this.coreDriftAmplitude;
                    const coreY = newY + Math.cos(time * 0.7 + phase) * this.coreDriftAmplitude;
                    
                    const coreScale = 1 + Math.sin(time + phase) * this.coreScaleAmplitude;
                    const coreBrightness = this.coreOpacity + Math.sin(time * 1.5 + phase) * this.coreOpacityVariation;
                    
                    core.style.transform = `
                        translate(-50%, -50%) 
                        translate(${coreX}px, ${coreY}px) 
                        scale(${coreScale})
                    `;
                    core.style.opacity = coreBrightness;
                });
            }
        });

        if (hasActiveGlows || this.activeGlows.size > 0) {
            this.frameId = requestAnimationFrame(() => this.animate());
        } else {
            this.frameId = null;
        }
    }

    endGlow(element) {
        const glowData = this.activeGlows.get(element);
        if (!glowData) return;

        if (glowData.fadeTimeout) {
            clearTimeout(glowData.fadeTimeout);
        }

        glowData.active = false;
        glowData.wrapper.style.opacity = '0';
        glowData.wrapper.style.transition = `opacity ${this.fadeOutDuration} ease-out`;

        glowData.fadeTimeout = setTimeout(() => {
            if (glowData.wrapper && glowData.wrapper.parentNode) {
                glowData.wrapper.parentNode.removeChild(glowData.wrapper);
            }
            this.activeGlows.delete(element);
            
            if (this.activeGlows.size === 0 && this.frameId) {
                cancelAnimationFrame(this.frameId);
                this.frameId = null;
            }
        }, parseFloat(this.fadeOutDuration) * 1000); // Convert seconds to milliseconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const effect = new GlowEffect();
    
    // Debug: Check how many hoverglow elements exist
    const hoverElements = document.querySelectorAll('.hoverglow');
    console.log(`Found ${hoverElements.length} hoverglow elements`);
    
    // Ensure all hoverglow elements are properly styled
    hoverElements.forEach(element => {
        // Make sure the element is interactive
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.pointerEvents === 'none') {
            element.style.pointerEvents = 'auto';
        }
    });
});