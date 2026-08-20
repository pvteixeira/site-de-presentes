const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        try {
          const stats = fs.statSync(fullPath);
          const initialSize = stats.size;

          // If file is very small (< 40KB), skip or handle carefully
          if (initialSize < 40 * 1024 && entry.name.includes('LOGO')) {
            console.log(`Skipping small/logo file: ${entry.name}`);
            continue;
          }

          const tempPath = fullPath + '.tmp';
          const image = sharp(fullPath);
          const metadata = await image.metadata();

          let pipeline = sharp(fullPath).rotate(); // auto-rotate based on EXIF

          const maxDim = dirPath.includes('Galeria') ? 1600 : 1000;

          if ((metadata.width && metadata.width > maxDim) || (metadata.height && metadata.height > maxDim)) {
            pipeline = pipeline.resize({
              width: metadata.width >= metadata.height ? maxDim : undefined,
              height: metadata.height > metadata.width ? maxDim : undefined,
              withoutEnlargement: true,
              fit: 'inside'
            });
          }

          if (ext === '.png') {
            // Check if image has transparency
            const isTransparent = metadata.hasAlpha;
            if (!isTransparent) {
              // Non-transparent PNG can be optimized as high-quality PNG
              pipeline = pipeline.png({
                quality: 80,
                compressionLevel: 9,
                palette: true,
                effort: 7
              });
            } else {
              pipeline = pipeline.png({
                quality: 85,
                compressionLevel: 9,
                effort: 7
              });
            }
          } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({
              quality: 82,
              mozjpeg: true
            });
          }

          await pipeline.toFile(tempPath);
          const newStats = fs.statSync(tempPath);

          if (newStats.size < initialSize) {
            fs.unlinkSync(fullPath);
            fs.renameSync(tempPath, fullPath);
            const savedMB = ((initialSize - newStats.size) / (1024 * 1024)).toFixed(2);
            const percent = (((initialSize - newStats.size) / initialSize) * 100).toFixed(1);
            console.log(`Optimized ${entry.name}: ${(initialSize / 1024 / 1024).toFixed(2)}MB -> ${(newStats.size / 1024 / 1024).toFixed(2)}MB (-${savedMB}MB / -${percent}%)`);
          } else {
            fs.unlinkSync(tempPath);
            console.log(`Kept original ${entry.name} (already optimal)`);
          }
        } catch (err) {
          console.error(`Error optimizing ${entry.name}:`, err.message);
        }
      }
    }
  }
}

async function main() {
  const publicImg = path.join(__dirname, '..', 'public', 'img');
  console.log(`Optimizing images in ${publicImg}...`);
  await processDirectory(publicImg);
  console.log('Finished optimizing images.');
}

main();
