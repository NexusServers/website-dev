// Aurora enhancement
document.addEventListener('DOMContentLoaded', function() {
  // Skip if low performance mode is enabled
  if (document.documentElement.classList.contains('low-performance') ||
      document.body.classList.contains('low-performance') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Make the diagonal/line decorations stronger site-wide when effects are enabled
  // This adds a class which CSS uses to amplify opacity/contrast/scale of lines.
  document.documentElement.classList.add('lines-strong');

  // Subtle color shift for aurora bands over time (kept but light-weight)
  const auroraBands = document.querySelectorAll('.aurora-band');

  function applyRandomColorShift() {
    auroraBands.forEach((band) => {
      const hueShift = (Math.random() * 30 - 15).toFixed(1); // -15 to +15 degrees (stronger)
      const saturationBoost = (1 + (Math.random() * 0.18 - 0.09)).toFixed(2); // ~0.91 - 1.09
      // Use CSS variables where possible to avoid heavy filter chaining
      band.style.filter = `hue-rotate(${hueShift}deg) saturate(${saturationBoost})`;
    });
  }

  // Initial application and gentle periodic updates (long interval)
  applyRandomColorShift();
  setInterval(applyRandomColorShift, 12_000);
});