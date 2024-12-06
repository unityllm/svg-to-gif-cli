import { expect, test, describe } from 'vitest';
import fs from 'fs';
import path from 'path';
import { convert } from '../converter.js';

describe('SVG to GIF converter', () => {
  test('converts single SVG file', async () => {
    const config = {
      files: ['test.svg'],
      output: './test-output',
      fps: 30,
      duration: 1,
      animation: 'fade',
      quality: 85,
      verbose: false
    };

    // Create test SVG
    const testSvg = '<svg width="100" height="100"><circle cx="50" cy="50" r="40"/></svg>';
    fs.writeFileSync('test.svg', testSvg);

    await convert(config);

    const outputFile = path.join('./test-output', 'test_fade.gif');
    expect(fs.existsSync(outputFile)).toBe(true);

    // Cleanup
    fs.unlinkSync('test.svg');
    fs.rmSync('./test-output', { recursive: true });
  });
});