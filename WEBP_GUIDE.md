# 🚀 Guide Complet - Conversion WebP pour Bastdons

## 📋 Processus en 3 Étapes

### 1️⃣ **Conversion des Images**
```bash
# Installer les dépendances
npm install

# Convertir toutes les images en WebP
npm run optimize
```

### 2️⃣ **Conversion du HTML**
```bash
# Mettre à jour le HTML avec les balises <picture>
npm run convert-html
```

### 3️⃣ **Tout en Une**
```bash
# Faire les deux étapes d'un coup
npm run full-optimize
```

## 🔍 **Ce qui se passe**

### **Script d'optimisation (`optimize-images.js`)**
- Convertit toutes les images JPG/PNG en WebP
- Qualité optimisée à 85%
- Affiche les gains de taille
- Exemple : `background.jpg` (500KB) → `background.webp` (150KB)

### **Script de conversion HTML (`convert-html.js`)**
- Remplace `<img>` par `<picture>` avec fallback
- Compatibilité totale avec tous les navigateurs
- Structure finale :

```html
<!-- Avant -->
<img src="img/background.jpg" alt="Background">

<!-- Après -->
<picture>
    <source srcset="img/background.webp" type="image/webp">
    <img src="img/background.jpg" alt="Background">
</picture>
```

## 📊 **Images Concernées**

| Image Originale | Image WebP | Gain Estimé |
|----------------|------------|-------------|
| `background.jpg` | `background.webp` | -70% |
| `DSCF3524-CR.jpg` | `DSCF3524-CR.webp` | -75% |
| `IMG_7941.JPG` | `IMG_7941.webp` | -70% |
| `IMG_7996.jpg` | `IMG_7996.webp` | -70% |
| `IMG_8022.jpg` | `IMG_8022.webp` | -70% |
| `IMG_8053-2.jpg` | `IMG_8053-2.webp` | -70% |
| `post_all-not-split.jpg` | `post_all-not-split.webp` | -70% |
| `post_split-03.jpg` | `post_split-03.webp` | -70% |
| `IMG_0806.png` | `IMG_0806.webp` | -80% |

## ✅ **Vérification**

Après conversion, vérifiez :

1. **Images WebP créées** dans le dossier `img/`
2. **HTML modifié** avec balises `<picture>`
3. **Site fonctionnel** (fallback sur images originales)
4. **Performance améliorée** (devtools Network)

## 🎯 **Résultats Attendus**

- **Temps de chargement** : -60% à -80%
- **Taille totale** : ~3MB → ~800KB
- **Score PageSpeed** : +20-30 points
- **Expérience mobile** : Significativement améliorée

## 🔧 **Dépannage**

### Problème : "Sharp non installé"
```bash
npm install sharp
```

### Problème : Images WebP ne se chargent pas
- Vérifiez que les fichiers `.webp` existent
- Testez dans différents navigateurs
- Les anciennes images servent de fallback

### Problème : Erreur de conversion
- Vérifiez les permissions du dossier `img/`
- Assurez-vous que les images originales existent

## 🚀 **Déploiement**

1. ✅ Images converties en WebP
2. ✅ HTML mis à jour
3. ✅ Tests locaux OK
4. 🚀 Déployez en production !

Le site sera **beaucoup plus rapide** ! 🎉
