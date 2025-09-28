// Theme toggle logic
// Dynamic background effect
function initDynamicBackground() {
    // Decide effect intensity level (0 = off, 1 = low, 2 = medium, 3 = high)
    const EFFECT_LEVEL = computeEffectLevel();
    // expose for other scripts/CSS
    document.documentElement.dataset.effectLevel = EFFECT_LEVEL;
    document.documentElement.classList.remove('effects-low','effects-medium','effects-high');
    if (EFFECT_LEVEL === 1) document.documentElement.classList.add('effects-low');
    if (EFFECT_LEVEL === 2) document.documentElement.classList.add('effects-medium');
    if (EFFECT_LEVEL >= 3) document.documentElement.classList.add('effects-high');

    // Skip effects if reduced motion is preferred or low-performance mode is active or effect level is 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
        document.documentElement.classList.contains('low-performance') ||
        document.body.classList.contains('low-performance') ||
        EFFECT_LEVEL === 0) return;

    const aurora = document.querySelector('.aurora-container');
    // Throttle background updates: only update when scroll changes by a threshold or at most every 120ms
    let lastScrollY = window.scrollY;
    let lastUpdate = 0;
    function updateBackground(scrollY) {
        const now = performance.now();
        // small threshold prevents micro-updates
        if (Math.abs(scrollY - lastScrollY) < 6 && (now - lastUpdate) < 120) return;
        lastScrollY = scrollY;
        lastUpdate = now;
        // scale the translate factor down on lower levels
        const baseFactor = (EFFECT_LEVEL >= 3) ? 0.12 : (EFFECT_LEVEL === 2 ? 0.07 : 0.03);
        const translateY = scrollY * baseFactor;
        if (aurora) aurora.style.transform = `translate3d(0, ${translateY}px, 0)`;
    }

    // Initial position
    updateBackground(window.scrollY);

    // Scroll handler with a light-weight throttle
    window.addEventListener('scroll', () => {
        // only schedule if enough time passed
        const now = performance.now();
        if (now - lastUpdate > 120) {
            window.requestAnimationFrame(() => updateBackground(window.scrollY));
        }
    }, { passive: true });
}

// Determine an effects intensity level based on device capabilities
function computeEffectLevel() {
    try {
        const mem = navigator.deviceMemory || 4; // GB
        const cores = navigator.hardwareConcurrency || 4;
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        // Start with high and clamp down based on signals
        let level = 3;

        // Very low memory or very low core counts -> disable
        if (mem < 1.5 || cores <= 1) return 0;

        // Mobile devices get a lower default
        if (isMobile) level = Math.min(level, 2);

        if (mem < 3) level = Math.min(level, 1);
        if (mem >= 3 && mem < 6) level = Math.min(level, 2);
        if (cores < 4) level = Math.min(level, 2);

        // Battery saver hint (best-effort): reduce if battery low
        if (navigator.getBattery) {
            navigator.getBattery().then(b => {
                if ((b.level !== undefined && b.level < 0.25) || b.charging === false && b.level < 0.35) {
                    // apply a conservative downgrade
                    document.documentElement.dataset.effectLevel = Math.min(parseInt(document.documentElement.dataset.effectLevel || level), 1);
                    document.documentElement.classList.add('effects-low');
                }
            }).catch(() => {});
        }

        return level;
    } catch (e) {
        return 1; // safe default
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance mode
    initPerformanceMode();
    
    // Initialize dynamic background
    initDynamicBackground();

    // Random ambient glow spheres
    const container = document.querySelector('.glow-spheres');
    if (container && 
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches && 
        !document.documentElement.classList.contains('low-performance') &&
        !document.body.classList.contains('low-performance')) {
        const colors = [
            'rgba(170,70,255,0.45)',
            'rgba(200,100,255,0.38)',
            'rgba(120,200,255,0.30)',
            'rgba(140,80,255,0.40)'
        ];

            // Performance-aware sphere spawning (limit count and prefer CSS animations)
        // MAX spheres should be heavily constrained by EFFECT_LEVEL
        const EFFECT_LEVEL = parseInt(document.documentElement.dataset.effectLevel || '1');
        let MAX_ACTIVE_SPHERES = 0;
        if (EFFECT_LEVEL >= 3) MAX_ACTIVE_SPHERES = Math.max(4, Math.min(10, Math.floor((navigator.deviceMemory || 8) / 2)));
        else if (EFFECT_LEVEL === 2) MAX_ACTIVE_SPHERES = Math.max(2, Math.min(6, Math.floor((navigator.deviceMemory || 4) / 2)));
        else if (EFFECT_LEVEL === 1) MAX_ACTIVE_SPHERES = 1;
        else MAX_ACTIVE_SPHERES = 0; // EFFECT_LEVEL === 0 -> no spheres
            let activeSpheres = 0;

            function spawnSphere() {
                if (activeSpheres >= MAX_ACTIVE_SPHERES) return;

                const s = document.createElement('div');
                s.className = 'glow-sphere css-anim'; // use CSS-based animation

                // Random size but constrained to reasonable values
                const min = 80; // px
                const max = 360; // px
                let size = Math.round(min + Math.random() * (max - min));

                // Random position (keep inside viewport with margin)
                const x = Math.max(0, Math.min(window.innerWidth - size, Math.random() * (window.innerWidth - size)));
                const y = Math.max(0, Math.min(window.innerHeight - size, Math.random() * (window.innerHeight - size)));

                // Light-weight styling
                s.style.left = `${x}px`;
                s.style.top = `${y}px`;
                s.style.width = `${size}px`;
                s.style.height = `${size}px`;
                const color = colors[(Math.random() * colors.length) | 0];
                s.style.background = `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) 45%)`;

                container.appendChild(s);
                activeSpheres++;

                // Remove after animation end; CSS sets a generous duration
                const removeAfter = 10_000 + Math.random() * 10_000; // 10-20s
                setTimeout(() => {
                    s.remove();
                    activeSpheres--;
                }, removeAfter);
            }

            // Spawn cadence: slower on lower-memory devices
        // increase interval (spawn less often) for lower effect levels
        let baseInterval = 2200;
        if (EFFECT_LEVEL === 1) baseInterval = 6400;
        if (EFFECT_LEVEL === 0) baseInterval = 999999; // effectively never
        if (navigator.deviceMemory && navigator.deviceMemory < 4) baseInterval *= 1.5;
            function tick() {
                // 0-1 sphere per tick, favor fewer on low-end
                if (Math.random() < 0.7) spawnSphere();
                const next = baseInterval + Math.random() * baseInterval;
                setTimeout(tick, next);
            }

            // Start with a small number of spheres
            for (let i = 0; i < 1; i++) spawnSphere();
            tick();
    }
});

// Performance mode functionality
function initPerformanceMode() {
    // Check if the user has previously set a preference
    const savedPerformanceMode = localStorage.getItem('nexus-low-performance');
    // Default to low-performance mode unless the user explicitly opted out
    // savedPerformanceMode values: 'true' (explicit low-perf), 'false' (explicit enable effects), null (no choice)
    if (savedPerformanceMode !== 'false' && !document.body.classList.contains('low-performance')) {
        // If user didn't explicitly opt out, enable low-performance by default
        document.body.classList.add('low-performance');
        document.documentElement.classList.add('low-performance');
    }
    
    // Create the performance toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'performance-toggle';
    toggleButton.textContent = document.body.classList.contains('low-performance') 
        ? 'Enable Effects' 
        : 'Low Performance Mode';
    
    // Add click handler
    toggleButton.addEventListener('click', function() {
        document.body.classList.toggle('low-performance');
        document.documentElement.classList.toggle('low-performance');
        const isLowPerformance = document.body.classList.contains('low-performance');
        
        // Save the preference
        // Store explicit string values so the head inline script can read them before DOM loads
        localStorage.setItem('nexus-low-performance', isLowPerformance ? 'true' : 'false');
        
        // Update button text
        this.textContent = isLowPerformance ? 'Enable Effects' : 'Low Performance Mode';
        
        // Reinitialize effects if turning back on
        if (!isLowPerformance) {
            initDynamicBackground();
        }
    });
    
    // Add to the DOM
    document.body.appendChild(toggleButton);
    
    // Also detect hardware capabilities and suggest low performance mode
    detectHardwareCapabilities();
}

// Detect hardware capabilities and suggest low performance mode if needed
function detectHardwareCapabilities() {
    // Only suggest if not already set
    if (localStorage.getItem('nexus-low-performance-suggested') === 'true') {
        return;
    }
    
    let performanceIssues = 0;
    
    // Check for hardware acceleration
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
        // WebGL not supported, likely no hardware acceleration
        performanceIssues += 2;
    } else {
        // Check WebGL capabilities
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            // Check for software renderers or mobile GPUs
            if (renderer.includes('SwiftShader') || 
                renderer.includes('Software') || 
                renderer.includes('Intel') ||
                renderer.includes('ANGLE')) {
                performanceIssues += 1;
            }
        }
    }
    
    // Check device memory if available
    if (navigator.deviceMemory && navigator.deviceMemory < 4) {
        performanceIssues += 1;
    }
    
    // Check for mobile devices
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        performanceIssues += 1;
    }
    
    // Suggest low performance mode if enough issues detected
    if (performanceIssues >= 2) {
        // Wait a moment for page to load
        setTimeout(() => {
            if (confirm('We detected that your device might benefit from low performance mode for a smoother experience. Enable it?')) {
                document.body.classList.add('low-performance');
                localStorage.setItem('nexus-low-performance', 'true');
                
                // Update toggle button text if it exists
                const toggle = document.querySelector('.performance-toggle');
                if (toggle) {
                    toggle.textContent = 'Enable Effects';
                }
            }
            
            // Mark as suggested
            localStorage.setItem('nexus-low-performance-suggested', 'true');
        }, 1500);
    }
}
