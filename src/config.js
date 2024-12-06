export const defaultConfig = {
  fps: 30,
  duration: 3,
  animation: 'fade',
  loop: 0,
  quality: 85,
  output: './output',
  easing: 'linear',
  verbose: false,
  preview: false
};

export const animationTypes = ['fade', 'zoom', 'rotate', 'bounce'];

export const easingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
};