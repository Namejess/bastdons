#!/usr/bin/env node

/**
 * Script d'optimisation des images pour Bastdons
 * Convertit toutes les images en WebP avec fallback
 */

const fs = require('fs');
const path = require('path');

// Configuration
const IMG_DIR = './img/';
const QUALITY = 85; // Qualité WebP (0-100)
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// Fonction pour vérifier si Sharp est disponible
async function checkSharp() {
    try {
        require('sharp');
        return true;
    } catch (error) {
        console.log('❌ Sharp non installé. Installation...');
        console.log('📦 Exécutez: npm install sharp');
        return false;
    }
}

// Fonction de conversion
async function convertToWebP(inputPath, outputPath) {
    const sharp = require('sharp');

    try {
        await sharp(inputPath)
            .webp({ quality: QUALITY })
            .toFile(outputPath);

        const inputSize = fs.statSync(inputPath).size;
        const outputSize = fs.statSync(outputPath).size;
        const reduction = ((inputSize - outputSize) / inputSize * 100).toFixed(1);

        console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (-${reduction}%)`);
    } catch (error) {
        console.error(`❌ Erreur conversion ${inputPath}:`, error.message);
    }
}

// Fonction principale
async function optimizeImages() {
    console.log('🚀 Optimisation des images Bastdons...\n');

    if (!await checkSharp()) {
        console.log('\n📋 Instructions:');
        console.log('1. npm install sharp');
        console.log('2. node optimize-images.js');
        return;
    }

    const files = fs.readdirSync(IMG_DIR);
    const imagesToConvert = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_FORMATS.includes(ext) && !file.endsWith('.webp');
    });

    if (imagesToConvert.length === 0) {
        console.log('✅ Aucune image à convertir.');
        return;
    }

    console.log(`📸 ${imagesToConvert.length} images trouvées\n`);

    for (const file of imagesToConvert) {
        const inputPath = path.join(IMG_DIR, file);
        const outputPath = path.join(IMG_DIR, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));

        await convertToWebP(inputPath, outputPath);
    }

    console.log('\n🎉 Conversion terminée !');
    console.log('\n📋 Prochaines étapes:');
    console.log('1. Vérifiez les nouvelles images .webp');
    console.log('2. Mettez à jour index.html avec les nouveaux chemins');
    console.log('3. Supprimez les anciennes images si tout fonctionne');
}

// Exécution
optimizeImages().catch(console.error);
