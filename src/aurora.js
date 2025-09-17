// Aurora enhancement
document.addEventListener('DOMContentLoaded', function() {
  // Skip if low performance mode is enabled
  if (document.body.classList.contains('low-performance') || 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  
  // Subtle color shift for aurora bands over time
  const auroraBands = document.querySelectorAll('.aurora-band');
  
  function applyRandomColorShift() {
    auroraBands.forEach((band, index) => {
      // Generate subtle hue variations
      const hueShift = Math.random() * 20 - 10; // -10 to +10 degrees
      const saturationBoost = Math.random() * 0.1 + 0.95; // 0.95 to 1.05 multiplier
      
      // Apply subtle filter transform
      band.style.filter = `hue-rotate(${hueShift}deg) saturate(${saturationBoost})`;
    });
  }
  
  // Initial application
  applyRandomColorShift();
  
  // Reapply periodically (very slowly)
  setInterval(applyRandomColorShift, 8000);
});