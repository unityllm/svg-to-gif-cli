import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import GIFEncoder from 'gif-encoder-2';
import ora from 'ora';
import { easingFunctions } from './config.js';

export async function convert(config) {
  const spinner = ora('Processing SVG files...').start();
  const totalFiles = config.files.length;
  let processedFiles = 0;

  for (const file of config.files) {
    try {
      spinner.text = `Converting ${path.basename(file)} (${processedFiles + 1}/${totalFiles})`;
      
      const outputPath = path.join(config.output, 
        `${path.basename(file, '.svg')}_${config.animation}.gif`);
      
      await convertSingleFile(file, outputPath, config);
      
      processedFiles++;
      spinner.succeed(`Converted ${path.basename(file)}`);
      
      if (processedFiles < totalFiles) {
        spinner.start();
      }
    } catch (error) {
      spinner.fail(`Failed to convert ${path.basename(file)}: ${error.message}`);
      if (config.verbose) {
        console.error(error);
      }
    }
  }

  spinner.succeed(`Converted ${processedFiles} of ${totalFiles} files`);
}

async function convertSingleFile(inputFile, outputPath, config) {
  // Read SVG file
  const svg = await fs.promises.readFile(inputFile);
  
  // Get SVG dimensions
  const metadata = await sharp(svg).metadata();
  const width = config.width || metadata.width || 800;
  const height = config.height || metadata.height || 600;

  // Create encoder
  const encoder = new GIFEncoder(width, height);
  const stream = fs.createWriteStream(outputPath);
  
  encoder.createReadStream().pipe(stream);
  encoder.start();
  encoder.setFrameRate(config.fps);
  encoder.setQuality(10); // Lower is better quality
  encoder.setRepeat(config.loop);

  // Generate frames
  const frameCount = config.fps * config.duration;

  for (let i = 0; i < frameCount; i++) {
    const progress = i / frameCount;
    const easedProgress = easingFunctions[config.easing](progress);
    
    // Create frame using Sharp
    const frame = await createFrame(svg, width, height, easedProgress, config);
    
    // Add frame to GIF
    encoder.addFrame(frame);
  }

  encoder.finish();
  return new Promise((resolve) => stream.on('finish', resolve));
}

async function createFrame(svg, width, height, progress, config) {
  let transform = sharp(svg);

  switch (config.animation) {
    case 'fade':
      // Apply fade effect using composite
      transform = transform.composite([{
        input: Buffer.from([255, 255, 255, Math.floor(progress * 255)]),
        raw: {
          width: 1,
          height: 1,
          channels: 4
        },
        tile: true,
        blend: 'dest-in'
      }]);
      break;
    case 'zoom':
      // Apply zoom effect
      const scale = 0.5 + progress * 0.5;
      const scaledWidth = Math.round(width * scale);
      const scaledHeight = Math.round(height * scale);
      transform = transform.resize(scaledWidth, scaledHeight, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
      break;
    case 'rotate':
      // Apply rotation
      transform = transform.rotate(progress * 360);
      break;
    case 'bounce':
      // Apply bounce effect
      const offset = Math.round(Math.sin(progress * Math.PI) * 50);
      transform = transform.extend({
        top: Math.max(0, offset),
        bottom: Math.max(0, -offset),
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      });
      break;
  }

  // Ensure final output is correctly sized and in raw pixel format
  const buffer = await transform
    .resize(width, height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .raw()
    .toBuffer();

  return new Uint8Array(buffer);
}