#!/usr/bin/env node

/**
 * Script pour convertir les balises <img> en <picture> avec WebP
 */

const fs = require('fs');

const htmlFile = './index.html';
let content = fs.readFileSync(htmlFile, 'utf8');

// Mappings des images
const imageMappings = [
    { original: 'img/post_all-not-split.jpg', webp: 'img/post_all-not-split.webp' },
    { original: 'img/post_split-03.jpg', webp: 'img/post_split-03.webp' },
    { original: 'img/IMG_7941.JPG', webp: 'img/IMG_7941.webp' },
    { original: 'img/IMG_7996.jpg', webp: 'img/IMG_7996.webp' },
    { original: 'img/IMG_8022.jpg', webp: 'img/IMG_8022.webp' },
    { original: 'img/IMG_8053-2.jpg', webp: 'img/IMG_8053-2.webp' },
    { original: 'img/IMG_0806.png', webp: 'img/IMG_0806.webp' }
];

// Fonction pour convertir une image
function convertImageToPicture(originalSrc, webpSrc) {
    const regex = new RegExp(
        `<img src="${originalSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
        'g'
    );

    content = content.replace(regex, (match) => {
        // Extraire les attributs de l'image
        const altMatch = match.match(/alt="([^"]*)"/);
        const classMatch = match.match(/class="([^"]*)"/);
        const loadingMatch = match.match(/loading="([^"]*)"/);
        const decodingMatch = match.match(/decoding="([^"]*)"/);
        const fetchpriorityMatch = match.match(/fetchpriority="([^"]*)"/);

        const alt = altMatch ? altMatch[1] : '';
        const className = classMatch ? classMatch[1] : '';
        const loading = loadingMatch ? loadingMatch[1] : 'lazy';
        const decoding = decodingMatch ? decodingMatch[1] : 'async';
        const fetchpriority = fetchpriorityMatch ? fetchpriorityMatch[1] : 'low';

        return `<picture>
                            <source srcset="${webpSrc}" type="image/webp">
                            <img src="${originalSrc}" alt="${alt}"
                                class="${className}" loading="${loading}" decoding="${decoding}" fetchpriority="${fetchpriority}">
                        </picture>`;
    });
}

// Convertir toutes les images
imageMappings.forEach(({ original, webp }) => {
    convertImageToPicture(original, webp);
});

// Sauvegarder le fichier modifié
fs.writeFileSync(htmlFile, content);

console.log('✅ HTML converti avec succès !');
console.log('📋 Images converties :');
imageMappings.forEach(({ original, webp }) => {
    console.log(`  - ${original} → ${webp}`);
});
console.log('\n🎯 N\'oubliez pas de :');
console.log('1. Convertir vos images en WebP');
console.log('2. Tester le site');
console.log('3. Vérifier que les images WebP se chargent');
