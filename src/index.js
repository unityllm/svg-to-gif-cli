#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { convert } from './converter.js';
import { validateInputs } from './validators.js';
import { defaultConfig } from './config.js';

const program = new Command();

program
  .name('svg2gif')
  .description('Convert SVG files to animated GIFs')
  .version('1.0.0')
  .argument('<files...>', 'SVG file(s) to convert')
  .option('-o, --output <dir>', 'output directory', './output')
  .option('-f, --fps <number>', 'frame rate', '30')
  .option('-d, --duration <seconds>', 'animation duration in seconds', '3')
  .option('-a, --animation <type>', 'animation style (fade/zoom/rotate/bounce)', 'fade')
  .option('-l, --loop <count>', 'loop count (0 for infinite)', '0')
  .option('-q, --quality <number>', 'output quality (1-100)', '85')
  .option('-w, --width <pixels>', 'output width')
  .option('-h, --height <pixels>', 'output height')
  .option('-v, --verbose', 'verbose output')
  .option('-p, --preview', 'preview animation before saving')
  .action(async (files, options) => {
    try {
      const config = {
        ...defaultConfig,
        ...options,
        files: files
      };

      if (options.verbose) {
        console.log(chalk.blue('Configuration:'), config);
      }

      const validationErrors = validateInputs(config);
      if (validationErrors.length > 0) {
        console.error(chalk.red('Validation errors:'));
        validationErrors.forEach(error => console.error(chalk.red(`- ${error}`)));
        process.exit(1);
      }

      await convert(config);
    } catch (error) {
      console.error(chalk.red('Error:'), error.message);
      if (options.verbose) {
        console.error(chalk.red('Stack trace:'), error.stack);
      }
      process.exit(1);
    }
  });

program.parse();