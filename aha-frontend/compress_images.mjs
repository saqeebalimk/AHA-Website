#!/usr/bin/env node
// compress_images.mjs - Converts heavy images to WebP using sharp
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const publicDir = '/home/adminpc/ahawebsite/AHA-Website/aha-frontend/public';

const images = readdirSync(publicDir).filter(f => {
  const ext = extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

let totalSaved = 0;

for (const img of images) {
  const inputPath = join(publicDir, img);
  const outputName = basename(img, extname(img)) + '.webp';
  const outputPath = join(publicDir, outputName);

  // Skip if already converted
  if (existsSync(outputPath)) {
    console.log(`⏭️  Skipping (already exists): ${outputName}`);
    continue;
  }

  const originalSize = statSync(inputPath).size;
  try {
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);

    const newSize = statSync(outputPath).size;
    const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
    totalSaved += (originalSize - newSize);
    console.log(`✅ ${img} → ${outputName} (${saved}% smaller)`);
  } catch (e) {
    console.error(`❌ Failed: ${img} — ${e.message}`);
  }
}

console.log(`\n🎉 Total space saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
