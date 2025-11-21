# CentraNo2 Font Kit

A complete CSS font kit for the CentraNo2 typeface, providing easy integration for web projects.

## Features

- **Complete Weight Range**: Includes 9 font weights (100-900)
- **Italic Support**: Both normal and italic styles for all weights
- **Web Optimized**: WOFF2 and WOFF formats for optimal performance
- **Easy Integration**: Simple CSS import for third-party applications

## Font Weights

| Weight         | Value | Style           |
| -------------- | ----- | --------------- |
| Hairline       | 100   | Normal & Italic |
| Thin           | 200   | Normal & Italic |
| Light          | 300   | Normal & Italic |
| Book (Regular) | 400   | Normal & Italic |
| Medium         | 500   | Normal & Italic |
| Bold           | 700   | Normal & Italic |
| Extra Bold     | 800   | Normal & Italic |
| Black          | 900   | Normal          |

## Installation

### Third-Party Application Integration (Optimized)

For optimal performance, add preconnect and the stylesheet link to your HTML `<head>` section:

```html
<!-- Preconnect to font domain for faster DNS resolution -->
<link rel="preconnect" href="https://fonts.mnavasardian.com" />
<link rel="dns-prefetch" href="https://fonts.mnavasardian.com" />

<!-- Load the font stylesheet -->
<link
  rel="stylesheet"
  href="https://fonts.mnavasardian.com/CentraNo2/kit.css"
/>
```

### Basic Integration (Without Optimization)

If you prefer a simpler integration:

```html
<link
  rel="stylesheet"
  href="https://fonts.mnavasardian.com/CentraNo2/kit.css"
/>
```

### Alternative: CSS Import

You can also import the stylesheet in your CSS file:

```css
@import url("https://fonts.mnavasardian.com/CentraNo2/kit.css");
```

## Usage

### Basic Usage

Apply the font to any element using the CSS class:

```html
<div class="gap-ui-kit_font-centra-no2">Your content here</div>
```

### Custom CSS

Apply the font family directly in your CSS:

```css
.your-element {
  font-family: "CentraNo2", Arial, Helvetica, sans-serif;
}
```

### Font Weight Examples

```css
/* Hairline (100) */
.hairline {
  font-family: "CentraNo2", sans-serif;
  font-weight: 100;
}

/* Thin (200) */
.thin {
  font-family: "CentraNo2", sans-serif;
  font-weight: 200;
}

/* Light (300) */
.light {
  font-family: "CentraNo2", sans-serif;
  font-weight: 300;
}

/* Book/Regular (400) */
.regular {
  font-family: "CentraNo2", sans-serif;
  font-weight: 400;
}

/* Medium (500) */
.medium {
  font-family: "CentraNo2", sans-serif;
  font-weight: 500;
}

/* Bold (700) */
.bold {
  font-family: "CentraNo2", sans-serif;
  font-weight: 700;
}

/* Extra Bold (800) */
.extra-bold {
  font-family: "CentraNo2", sans-serif;
  font-weight: 800;
}

/* Black (900) */
.black {
  font-family: "CentraNo2", sans-serif;
  font-weight: 900;
}

/* Italic */
.italic {
  font-family: "CentraNo2", sans-serif;
  font-style: italic;
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CentraNo2 Font Demo</title>

    <!-- Performance optimization -->
    <link rel="preconnect" href="https://fonts.mnavasardian.com" />
    <link rel="dns-prefetch" href="https://fonts.mnavasardian.com" />

    <!-- Font stylesheet -->
    <link
      rel="stylesheet"
      href="https://fonts.mnavasardian.com/CentraNo2/kit.css"
    />

    <style>
      body {
        font-family: "CentraNo2", Arial, Helvetica, sans-serif;
      }
    </style>
  </head>
  <body>
    <h1 style="font-weight: 700;">Bold Heading</h1>
    <p style="font-weight: 400;">Regular paragraph text</p>
    <p style="font-weight: 300; font-style: italic;">Light italic text</p>
  </body>
</html>
```

## Best Practices

### 1. Use Preconnect for Performance

Always include `preconnect` and `dns-prefetch` to establish early connections to the font server:

```html
<link rel="preconnect" href="https://fonts.mnavasardian.com" />
<link rel="dns-prefetch" href="https://fonts.mnavasardian.com" />
```

**Why?** This reduces latency by initiating DNS lookup, TCP handshake, and TLS negotiation before the browser requests the font files.

### 2. Load Only What You Need

If you're only using specific font weights, consider hosting the font locally or creating a custom subset to reduce bandwidth.

### 3. Use font-display Property

Control how fonts are displayed during loading. Add this to your CSS:

```css
@supports (font-display: swap) {
  @font-face {
    font-display: swap; /* Shows fallback font immediately, swaps when loaded */
  }
}

/* Or use 'optional' for better performance on slow connections */
body {
  font-family: "CentraNo2", Arial, Helvetica, sans-serif;
}
```

**font-display values:**

- `swap`: Show fallback immediately, swap when custom font loads (recommended)
- `optional`: Browser decides whether to use the font based on connection speed
- `fallback`: Brief block period, then shows fallback if font isn't loaded
- `block`: Hide text until font loads (can cause FOIT - Flash of Invisible Text)

### 4. Specify Fallback Fonts

Always include fallback fonts similar to CentraNo2:

```css
.your-element {
  font-family: "CentraNo2", -apple-system, BlinkMacSystemFont, "Segoe UI", Arial,
    Helvetica, sans-serif;
}
```

### 5. Use Specific Font Weights

Explicitly define font weights instead of relying on browser rendering:

```css
/* Good ✓ */
h1 {
  font-family: "CentraNo2", sans-serif;
  font-weight: 700; /* Explicitly use Bold */
}

/* Avoid ✗ */
h1 {
  font-family: "CentraNo2", sans-serif;
  font-weight: bold; /* Generic, may cause synthetic bold */
}
```

### 6. Optimize for Critical Rendering Path

Place font loading in the `<head>` but consider async loading for non-critical text:

```html
<!-- Critical text fonts -->
<link rel="preconnect" href="https://fonts.mnavasardian.com" />
<link
  rel="stylesheet"
  href="https://fonts.mnavasardian.com/CentraNo2/kit.css"
/>

<!-- For non-critical sections, use media="print" then switch with JavaScript -->
<link
  rel="stylesheet"
  href="https://fonts.mnavasardian.com/CentraNo2/kit.css"
  media="print"
  onload="this.media='all'"
/>
```

### 7. Enable Text Rendering Optimization

Add these CSS properties for better text rendering:

```css
body {
  font-family: "CentraNo2", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
```

### 8. Cache Strategy

Ensure your server sets appropriate cache headers for font files:

- Cache font files for at least 1 year
- Use immutable cache-control directive if possible

### 9. Subset Fonts (Advanced)

For production applications, consider subsetting fonts to include only the characters you need:

- Reduces file size by 50-90%
- Improves loading performance
- Tools: `glyphanger`, `pyftsubset`, or online services

### 10. Monitor Font Loading

Use the Font Loading API to handle loading states:

```javascript
// Check if font is loaded
document.fonts.ready.then(function () {
  console.log("CentraNo2 font loaded");
});

// Or load specific font weight
const font = new FontFace(
  "CentraNo2",
  "url(https://fonts.mnavasardian.com/CentraNo2/assets/CentraNo2Book/font.woff2)",
  { weight: "400" }
);

font.load().then(function (loadedFont) {
  document.fonts.add(loadedFont);
  document.body.style.fontFamily = "CentraNo2, sans-serif";
});
```

## Browser Support

- Chrome/Edge (modern versions)
- Firefox (modern versions)
- Safari (modern versions)
- Opera (modern versions)

WOFF2 and WOFF formats ensure broad compatibility across all modern browsers.

## Performance Tips Summary

| Optimization              | Impact | Difficulty    |
| ------------------------- | ------ | ------------- |
| Use preconnect            | High   | Easy          |
| Set font-display: swap    | High   | Easy          |
| Specify fallback fonts    | Medium | Easy          |
| Load fonts asynchronously | Medium | Medium        |
| Subset fonts              | High   | Advanced      |
| Use specific font weights | Low    | Easy          |
| Enable browser caching    | Medium | Server config |

### Technical Details

- **WOFF2 format**: ~30% smaller than WOFF, supported by all modern browsers
- **WOFF format**: Fallback for older browsers
- **Loading**: Fonts are loaded on-demand based on usage
- **Preconnect saves**: ~100-500ms on initial connection
- **font-display: swap**: Prevents invisible text during font loading

## License

Please ensure you have the appropriate license for using CentraNo2 font in your projects.

---

For issues or questions, please contact the font administrator.
