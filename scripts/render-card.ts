import sharp from "sharp";

// Rasterise our own editable vector before handing it to Astro's social-card
// pipeline. The course's fixed Astro config need not enable SVG processing.
await sharp("src/assets/images/course-card.svg")
  .png()
  .toFile("src/assets/images/course-card.png");
console.log("Rendered the course-specific 1200x630 social card.");
