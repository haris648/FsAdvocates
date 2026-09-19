// The source photo turned out to ALREADY be a proper alpha cutout — its
// "white background" was only ever a PNG previewer's default matte over
// genuine alpha=0 pixels (confirmed: ~91% of the source is alpha 0 with
// RGB already zeroed at those pixels). The original version of this script
// assumed a flat white JPEG-style photo and ran a white-key extraction on
// top of already-transparent data, which reintroduced opaque black wherever
// the source was transparent (that background color happened to be (0,0,0),
// which a "distance from white" key classifies as fully opaque). That
// opaque-black-under-real-transparency is what caused the rotated black
// parallelogram bug — nothing to do with CSS filters, GSAP, force3D, or
// Next/Image; a bare `transform:rotate()` on that file reproduced it in a
// plain static HTML page with zero app code involved.
//
// So: no chroma-key here. Just pass the existing alpha through and trim the
// transparent margins for a tight crop.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../../fsadvocates-design-source/pen-01.png");
const OUT = path.join(__dirname, "../public/pen.png");

await sharp(SRC)
  .ensureAlpha()
  .trim({ threshold: 8 })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const final = await sharp(OUT).metadata();
console.log("Wrote", OUT, final.width, "x", final.height);
