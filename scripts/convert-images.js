/**
 * Конвертирует JPG/PNG в WebP
 * Запуск: npm run images
 * Запускается автоматически перед npm run build
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const imagesDir = path.resolve(__dirname, '../public/assets/images');

const QUALITY = 82;

const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

if (files.length === 0) {
    console.log('Нет изображений для конвертации.');
    process.exit(0);
}

let converted = 0;
let skipped = 0;

for (const file of files) {
    const src = path.join(imagesDir, file);
    const dest = path.join(imagesDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

    if (fs.existsSync(dest)) {
        skipped++;
        continue;
    }

    try {
        await sharp(src).webp({ quality: QUALITY }).toFile(dest);
        console.log(`  ✓ ${file} → ${path.basename(dest)}`);
        converted++;
    } catch (err) {
        console.error(`  ✗ ${file}: ${err.message}`);
    }
}

console.log(`\nГотово: конвертировано ${converted}, пропущено (уже есть) ${skipped}`);
