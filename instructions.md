# NexusSite — Implementation Guide

This document reflects the current site architecture, styling system, and maintenance tips after the background/animation and layout fixes.

## Overview
- Pages: `index.html` (Home), `plans.html` (Plans), `about.html` (About)
- Shared assets: `styles.css`, `scripts.js`, icons/images in `assets/`
- Background: fixed, clipped layers (aurora, diagonal lines, noise, glow spheres) that do not affect layout or scroll.
- Theme: dark black/purple with subtle moving diagonal lines and ambient glow pulses.

## Page structure (all pages)
```html
<body class="home|plans|about">
  <div class="aurora-container"></div>
  <div class="pattern-container">
    <div class="noise-pattern"></div>
    <div class="glow-spheres"></div>
    <div class="diagonal-lines"></div>
  </div>
  <nav class="top-nav">…</nav>
  <main>
    <div class="container">…</div>
  </main>
  <footer class="site-footer">…</footer>
</body>
```

- Background containers are position: fixed; inset: 0; overflow: hidden; contain: paint; clip-path: inset(0). They must remain before main content.
- Only the aurora layer is parallaxed in JS. Lines/noise/spheres are CSS-only.

## Key decisions
- Comparison table lives on Home (index) under the features grid.
- About "Who we are" card uses the global `.card` and is full-width like the comparison block.
- Headers and top spacing are unified site‑wide: h1 = 44px; `.container` padding/margins consistent.
- Scroll stability: html uses `overflow-y: auto`, `scrollbar-gutter: stable`, and background layers are GPU‑isolated to avoid phantom scroll.

## CSS highlights (`styles.css`)
- `.aurora-container`: fixed, blurred radial gradients; animated via `auroraMove`; clipped to viewport; parallax transform in JS only.
- `.pattern-container`: fixed; contains `.noise-pattern`, `.glow-spheres`, `.diagonal-lines` with `translateZ(0)` and `contain`.
- `.diagonal-lines`: three subtle layers (`::before`, `::after`) with independent background-position animations: `moveLines`, `moveLinesAlt`, `moveLinesAlt2`, plus `linesFade` opacity cycle.
- `.glow-spheres`: container for dynamic ambient pulses created by JS; each sphere is a blurred radial gradient with a timed fade.
- Global helpers: `.card`, `.comparison-section`, `.small` for reusable block styling.
- Final overrides ensure About and Plans match Index header sizes and top spacing.

## JS highlights (`scripts.js`)
- `initDynamicBackground()` adds a gentle parallax to `.aurora-container` only (requestAnimationFrame on scroll). No transforms on lines/noise.
- Dynamic glow spheres spawn in `.glow-spheres` with randomized size, position, duration, and color; nodes are removed after animation.
- Respects `prefers-reduced-motion` to disable animations.

## Content placement
- Home: hero + features + Host Comparison (card).
- About: hero + "Who we are" (card), link back to Home. Comparison is not duplicated here.
- Plans: two-column grouped plan cards, storage note, compact buy buttons.

## Performance tips
- Keep animations to background-position, opacity, and transform only.
- Avoid large background-size values that cause visible seams.
- Don't animate transforms on `.pattern-container` or `.diagonal-lines`.
- Optimize images; prefer local assets with remote fallbacks if needed.

## Adding/editing a page
1) Copy the base structure shown above.
2) Keep the background containers and nav/footer intact.
3) Use `.container` and `.card` for consistent padding and borders.
4) For new animated visuals, prefer CSS keyframes and keep them off layout-affecting properties.

## Troubleshooting
- Idle scroll/phantom scrollbar: ensure all background layers are fixed, clipped, and have `overflow: hidden` with `contain: paint`. Verify JS isn't touching `.pattern-container` or `.diagonal-lines`.
- Lines not visible: raise `.diagonal-lines` opacity slightly (0.18–0.24), or increase contrast in repeating-linear-gradient stops.
- Spheres too strong: reduce per-sphere rgba alpha or container filter blur.

## Recent Changes (September 2025)

### 1. Fixed Phantom Scrollbar / Idle Scrolling
- Problem: The page would scroll by itself even when idle, and showed phantom scrollbars
- Solution: Background layers isolated with:
  - `position: fixed` on all background containers
  - `inset: 0` (instead of top/left/right/bottom properties)
  - `overflow: hidden` to prevent content overflow
  - `contain: paint` to control paint boundaries
  - `clip-path: inset(0)` to clip to viewport
  - `translateZ(0)` for GPU compositing
  - `backface-visibility: hidden`
  
### 2. Comparison Table Relocation
- Moved the provider comparison table from About page to Home page
- Placed under the features grid in a card container
- Added fallbacks for missing logos with `onerror` handlers

### 3. Unified Layout Across Pages
- Made About and Plans pages match the Index page layout:
  - Consistent h1 size (44px) on all pages
  - Matching container padding/margins (28px 32px)
  - Eliminated top spacing gap on About/Plans
  - Added !important rules in end-of-file overrides for guaranteed consistency

### 4. About Page "Who we are" Card
- Expanded to full width (max-width: 100%) to match comparison card style
- Applied the shared .card style for consistent borders/shadows

### 5. Background Animation Improvements
- Diagonal lines layer optimized (moveLines animations)
- Fixed animations to only affect background-position (not transform)
- Glow spheres set to clean up after themselves via setTimeout

### 6. Icon and Asset Consistency
- All pages now use nexuslogo.png as favicon

## Common Tasks

### Adding a New Page
1. Create new HTML file in `src/`
2. Copy base template structure from existing page
3. Update meta tags and title
4. Add page-specific content
5. Link page in navigation

## Changing Image Location
- Move images to new location
- Update all files that contain references to images, like index, plans, etc.

### Styling Guidelines
- Use CSS variables for colors and themes
- Follow existing class naming conventions
- Maintain responsive design patterns
- Keep animations performant

### Critical Layout Requirements
1. Root Variables
   - Must define `--page-height` and `--viewport-height`
   - Use these for consistent height calculations

2. HTML/Body Structure
   ```html
   <html>
     <body class="[page-class]">
       <div class="aurora-container"></div>
       <div class="pattern-container">
         <div class="diagonal-lines"></div>
         <div class="noise-pattern"></div>
       </div>
       <!-- content -->
     </body>
   </html>
   ```

3. Layer System
   - Aurora (-3): Ambient color pools
   - Pattern (-2): Base gradient + diagonal lines
   - Noise (-1): Texture overlay
   - Main Content (1)
   - Navigation (60)

4. GPU Acceleration Requirements
   - Use `transform: translate3d(0,0,0)`
   - Set `backface-visibility: hidden`
   - Add `will-change` for animations
   - Enable `transform-style: preserve-3d`

5. Container Specifications
   - Pattern Container:
     ```css
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     ```
   - Diagonal Lines:
     ```css
     position: absolute;
     top: -150%;
     left: -150%;
     width: 400%;
     height: 400%;
     ```

6. Overflow Control
   - HTML: `overflow-x: hidden`
   - Body: `overflow-x: hidden`
   - Fixed height calculation using CSS vars

8. Critical Don'ts
   - Never use viewport units directly for full-height elements
   - Don't use multiple scrollable containers
   - Avoid fixed positioning except for background layers
   - Don't modify the layer z-index system

### Navigation Structure
- Top navigation with logo
- Center links (Home, Plans, About)
- Footer navigation with contact links

## Common Issues & Solutions

### Background Issues
- Ensure pattern-container has correct z-index
- Check diagonal-lines animation timing
- Verify gradient positions and transitions

### Responsive Design
- Mobile breakpoint: 600px
- Tablet breakpoint: 900px
- Desktop: 900px+

## Development Workflow
1. Make changes in `src/` directory
2. Test across different themes
3. Verify responsive behavior
4. Check performance and animations
5. Validate links and navigation

## Performance & Animation Guidelines

### Critical Performance Rules
1. GPU Acceleration Requirements
   ```css
   {
     transform: translate3d(0,0,0);
     backface-visibility: hidden;
     will-change: transform;
     transform-style: preserve-3d;
   }
   ```
2. Animation Best Practices
   - Use cubic-bezier timing functions
   - Keep animations under 300ms
   - Only animate transform and opacity
   - Use requestAnimationFrame for JS animations

3. Memory Management
   - Clean up event listeners
   - Optimize and compress images
   - Implement lazy loading
   - Use appropriate image formats (WebP with fallbacks)

### Component Specifications

1. Card Components
   ```css
   .card {
     background: var(--card-bg);
     border: 1px solid rgba(255,255,255,0.03);
     border-radius: 12px;
     padding: 20px;
     box-shadow: 0 12px 36px rgba(2,6,23,0.28);
   }
   ```

2. Button System
   ```css
   .btn {
     display: inline-flex;
     align-items: center;
     gap: 10px;
     padding: 10px 16px;
     border-radius: 12px;
     background: linear-gradient(90deg,var(--accent-cyan),var(--accent-pink));
     transition: transform .18s ease, box-shadow .18s ease;
   }
   ```

3. Navigation Components
   ```css
   .nav-links {
     display: flex;
     gap: 12px;
     padding: 8px 12px;
     border-radius: 999px;
     backdrop-filter: blur(8px);
     background: linear-gradient(90deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
   }
   ```

## Testing & Validation Requirements

### Visual Testing
1. Theme Transitions
   - Test all theme combinations
   - Verify smooth gradient transitions
   - Check component adaptations
   - Validate text contrast ratios

2. Animation Performance
   - Monitor frame rates (target 60fps)
   - Check GPU usage
   - Validate memory consumption
   - Test on low-end devices

3. Responsive Breakpoints
   - Mobile (< 600px)
   - Tablet (600px - 900px)
   - Desktop (> 900px)
   - Ultra-wide (> 1400px)

### Technical Validation
1. CSS Validation
   - No unused variables
   - No conflicting z-indices
   - Proper vendor prefixing
   - Valid media queries

2. Performance Metrics
   - First paint < 1s
   - Interactive < 2s
   - No layout shifts
   - Smooth scrolling

3. Browser Compatibility
   - Chrome (latest 2 versions)
   - Firefox (latest 2 versions)
   - Safari (latest 2 versions)
   - Edge (latest version)

## Maintenance Guidelines

### Version Control
1. Documentation Requirements
   - Document all major changes
   - Update theme documentation
   - Maintain changelog
   - Include migration guides

2. Backup Procedures
   - Keep working versions
   - Document dependencies
   - Store configuration backups
   - Track critical changes

3. Quality Assurance
   - Run performance tests
   - Validate accessibility
   - Check cross-browser compatibility
   - Monitor error rates

### Critical Warnings
1. Never modify:
   - Layer stacking system
   - Core animation timings
   - Theme implementation
   - Container structure

2. Always maintain:
   - GPU acceleration
   - Responsive behavior
   - Theme compatibility
   - Performance optimization

## Support & Resources

### Troubleshooting Guide
1. Layout Issues
   - Check container nesting
   - Verify overflow settings
   - Validate z-index stack
   - Review media queries

2. Animation Problems
   - Verify GPU acceleration
   - Check transition timing
   - Monitor performance
   - Debug layout thrashing

3. Theme Conflicts
   - Review variable scope
   - Check inheritance
   - Test transitions
   - Validate contrast

### Contact & Support
- Technical Issues: support@nexuservers.com
- Documentation: docs.nexuservers.com
- Status Page: status.nexuservers.com
- Discord: discord.gg/ksMEH3uheK

## 4. Background Effects

The website uses a multi-layered background effect for a dynamic, parallax-style appearance.

### Layer Structure
- `.aurora-container`: The base layer with a soft, animated gradient. It has a subtle parallax effect controlled by `scripts.js`.
- `.pattern-container`: A container for the static-like overlay effects.
  - `.diagonal-lines`: Creates a pattern of moving diagonal lines. The movement is handled entirely by the `moveLines` CSS animation.
  - `.noise-pattern`: Adds a subtle noise texture over the background.

### Animation System
- **Aurora Gradient**: The `aurora-container` uses a CSS `gradientShift` animation to slowly change the background gradient colors.
- **Diagonal Lines**: The `.diagonal-lines` element uses a `moveLines` CSS animation to scroll the background texture, creating a sense of movement.

**Important**: The animation of the `.diagonal-lines` is handled *exclusively* by CSS. Do not add JavaScript-based `transform` or `scroll` effects to this element, as it will conflict with the CSS animation and cause visual glitches like black bars or stuttering.

## 8. Common Problems & Solutions

### Black Bar Appears During Scrolling
- **Cause**: This is typically caused by a conflict between the CSS `moveLines` animation and JavaScript trying to manipulate the `transform` property of the `.diagonal-lines` or `.pattern-container` elements. It can also happen if the `background-size` in the animation is too large, causing the pattern to move out of the visible area.
- **Solution**:
  1. Ensure that `scripts.js` is *not* applying any `transform` styles to `.pattern-container` or `.diagonal-lines`. Only the `.aurora-container` should have a JS-driven parallax effect.
  2. In `styles.css`, verify that the `@keyframes moveLines` animation does not contain `transform` properties. It should only animate `background-position`.
  3. Make sure the `background-size` for `.diagonal-lines` is not excessively large. `150%` is a safe value.
