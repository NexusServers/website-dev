// Theme toggle logic
// Dynamic background effect
function initDynamicBackground() {
    // Skip effects if reduced motion is preferred or low-performance mode is active
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || 
        document.documentElement.classList.contains('low-performance') ||
        document.body.classList.contains('low-performance')) return;

    const aurora = document.querySelector('.aurora-container');
    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateBackground(scrollY) {
        const translateY = scrollY * 0.1;
        
        // Smooth parallax effect for aurora only
        aurora.style.transform = `translate3d(0, ${translateY * 0.6}px, 0)`;
    }

    // Initial position
    updateBackground(window.scrollY);

    // Scroll handler with requestAnimationFrame
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateBackground(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
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

        function spawnSphere() {
            const s = document.createElement('div');
            s.className = 'glow-sphere';

            // Random size (vw) mapped to px once rendered; cap extremes
            const min = 120; // px
            const max = 520; // px
            let size = Math.round(min + Math.random() * (max - min));
            // Rarely spawn a very large ambient sphere
            if (Math.random() < 0.12) size = Math.round(560 + Math.random() * 420); // up to ~980px

            // Random position (keep inside viewport with margin)
            const margin = 40; // px
            const x = Math.max(0, Math.min(window.innerWidth - size, Math.random() * (window.innerWidth - size)));
            const y = Math.max(0, Math.min(window.innerHeight - size, Math.random() * (window.innerHeight - size)));

            // Random duration and stagger
            const duration = Math.round(9000 + Math.random() * 13000); // 9s - 22s
            const delay = Math.round(Math.random() * 4000); // up to 4s

            // Color
            const color = colors[(Math.random() * colors.length) | 0];

            s.style.left = `${x}px`;
            s.style.top = `${y}px`;
            s.style.width = `${size}px`;
            s.style.height = `${size}px`;
            const innerStop = (20 + Math.random() * 18).toFixed(0); // 20-38%
            const outerStop = (50 + Math.random() * 14).toFixed(0); // 50-64%
            s.style.background = `radial-gradient(circle, ${color} 0%, rgba(0,0,0,0) ${innerStop}%), radial-gradient(circle, ${color.replace('0.', '0.')} 0%, rgba(0,0,0,0) ${outerStop}%)`;
            s.style.animationDuration = `${duration}ms`;
            s.style.animationDelay = `${delay}ms`;

            // Occasionally add drift
            if (Math.random() < 0.6) {
                s.animate(
                    [
                        { transform: 'translate(0,0)' },
                        { transform: `translate(${(Math.random()*20-10).toFixed(1)}px, ${(Math.random()*20-10).toFixed(1)}px)` }
                    ],
                    { duration: duration, direction: 'alternate', iterations: 1, easing: 'ease-in-out' }
                );
            }

            container.appendChild(s);

            // Cleanup after animation
            const total = duration + delay + 400; // buffer
            setTimeout(() => {
                s.remove();
            }, total);
        }

        // Spawn cadence: modest to avoid overload
        function tick() {
            // Randomly spawn 0-2 spheres per tick
            const count = (Math.random() < 0.6) ? 1 : 2;
            for (let i = 0; i < count; i++) spawnSphere();
            // 2-4 seconds between ticks
            const next = 2000 + Math.random() * 2000;
            setTimeout(tick, next);
        }

        // Start with a few initial spheres
        for (let i = 0; i < 3; i++) spawnSphere();
        tick();
    }
});

// Performance mode functionality
function initPerformanceMode() {
    // Check if the user has previously set a preference
    const savedPerformanceMode = localStorage.getItem('nexus-low-performance');
    // Only enable low-performance mode when the user explicitly set it to 'true'.
    // This preserves full styles/nav for users who have not chosen low-performance.
    if (savedPerformanceMode === 'true' && !document.body.classList.contains('low-performance')) {
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
