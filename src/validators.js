import fs from 'fs';
import path from 'path';
import { animationTypes } from './config.js';

export function validateInputs(config) {
  const errors = [];

  // Validate files
  config.files.forEach(file => {
    if (!file.toLowerCase().endsWith('.svg')) {
      errors.push(`File ${file} is not an SVG file`);
    }
    if (!fs.existsSync(file)) {
      errors.push(`File ${file} does not exist`);
    }
  });

  // Validate numeric inputs
  if (config.fps <= 0 || config.fps > 120) {
    errors.push('Frame rate must be between 1 and 120');
  }
  if (config.duration <= 0) {
    errors.push('Duration must be greater than 0');
  }
  if (config.quality < 1 || config.quality > 100) {
    errors.push('Quality must be between 1 and 100');
  }

  // Validate animation type
  if (!animationTypes.includes(config.animation)) {
    errors.push(`Invalid animation type. Must be one of: ${animationTypes.join(', ')}`);
  }

  // Validate dimensions if provided
  if (config.width && (isNaN(config.width) || config.width <= 0)) {
    errors.push('Width must be a positive number');
  }
  if (config.height && (isNaN(config.height) || config.height <= 0)) {
    errors.push('Height must be a positive number');
  }

  // Validate output directory
  try {
    fs.mkdirSync(config.output, { recursive: true });
  } catch (error) {
    errors.push(`Cannot create output directory: ${error.message}`);
  }

  return errors;
}