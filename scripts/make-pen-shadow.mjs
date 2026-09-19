// CSS filter:drop-shadow() combined with an ancestor CSS transform (rotation)
// rasterizes this cutout's transparent regions as opaque black in some
// Chromium rendering paths (reproduced in headless Playwright; likely a
// software-rasterizer alpha bug, not something to depend on being fixed
// everywhere). Baking the shadow into its own blurred PNG sidesteps the
// runtime filter entirely — cheaper during scroll-scrub too.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "../public/pen.png");
const OUT = path.join(__dirname, "../public/pen-shadow.png");

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

// shadow color: navy-deep, alpha scaled down from source alpha
const [SR, SG, SB] = [8, 14, 30];
const STRENGTH = 0.55;

for (let i = 0; i < width * height; i++) {
  const o = i * channels;
  const a = data[o + 3];
  const oo = i * 4;
  out[oo] = SR;
  out[oo + 1] = SG;
  out[oo + 2] = SB;
  out[oo + 3] = Math.round(a * STRENGTH);
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .blur(10)
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log("Wrote", OUT);
