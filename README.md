# SVG to GIF Converter CLI

A powerful command-line tool for converting SVG files into animated GIFs with various animation effects and customization options.

## Features

- Convert single or multiple SVG files to animated GIFs
- Multiple animation styles:
  - Fade
  - Zoom
  - Rotate
  - Bounce
- Customizable settings:
  - Frame rate (FPS)
  - Animation duration
  - Loop count
  - Output quality
  - Custom dimensions
- Progress tracking with status indicators
- Batch processing capability
- Comprehensive error handling
- Support for transparent backgrounds
- Preview option before saving

## Installation

### Global Installation
```bash
# Install globally
npm install -g svg-to-gif-cli

# Or run directly with npx
npx svg-to-gif-cli
```

### Running from Source

1. Clone the repository:
```bash
git clone <repository-url>
cd svg-to-gif-cli
```

2. Install dependencies:
```bash
npm install
```

3. Run the CLI directly:
```bash
# Using node
node src/index.js input.svg

# Or create a symlink for development
npm link
svg2gif input.svg
```

## Usage

Basic usage:
```bash
svg2gif input.svg
```

Convert multiple files:
```bash
svg2gif file1.svg file2.svg file3.svg
```

### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| --output | -o | Output directory | ./output |
| --fps | -f | Frame rate | 30 |
| --duration | -d | Animation duration (seconds) | 3 |
| --animation | -a | Animation style (fade/zoom/rotate/bounce) | fade |
| --loop | -l | Loop count (0 for infinite) | 0 |
| --quality | -q | Output quality (1-100) | 85 |
| --width | -w | Output width (pixels) | Original |
| --height | -h | Output height (pixels) | Original |
| --verbose | -v | Verbose output | false |
| --preview | -p | Preview animation before saving | false |

### Examples

Convert with custom settings:
```bash
svg2gif input.svg --fps 60 --duration 5 --animation zoom --quality 90
```

Batch process with custom output directory:
```bash
svg2gif *.svg -o converted-gifs --animation rotate
```

Preview before saving:
```bash
svg2gif logo.svg --preview --animation bounce
```

## Development

### Project Structure

```
src/
├── index.js        # CLI entry point
├── converter.js    # Core conversion logic
├── config.js       # Default configuration
├── validators.js   # Input validation
└── tests/         # Test files
```

### Development Workflow

1. Make code changes
2. Run tests:
```bash
npm test
```

3. Test CLI locally:
```bash
# Run directly
node src/index.js test.svg

# Or use npm link for global testing
npm link
svg2gif test.svg
```

### Adding New Features

1. Animation Styles
- Add new animation type to `animationTypes` in `config.js`
- Implement animation logic in `createFrame()` in `converter.js`
- Add tests in `tests/converter.test.js`

2. Configuration Options
- Add new option to `program` in `index.js`
- Update `defaultConfig` in `config.js`
- Add validation in `validators.js`

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## Animation Styles

1. **Fade**: Smooth opacity transition from 0 to 100%
2. **Zoom**: Scale animation from 50% to 100%
3. **Rotate**: 360-degree rotation animation
4. **Bounce**: Bouncing motion effect

## Error Handling

The tool provides clear error messages for common issues:
- Invalid SVG files
- Missing input files
- Invalid animation parameters
- Output directory access problems

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation
- Use meaningful commit messages
- Keep changes focused and atomic

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Sharp for image processing
- GIFEncoder for GIF creation
- Commander.js for CLI interface