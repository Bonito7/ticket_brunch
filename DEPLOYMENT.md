# 🚀 Guide de Déploiement sur Vercel

Ce guide vous accompagne étape par étape pour déployer votre application **ticket_brunch** sur Vercel.

## 📋 Prérequis

- ✅ MongoDB Atlas configuré et accessible
- ✅ Code fonctionnel en local
- ✅ Compte Git (GitHub, GitLab, ou Bitbucket)

---

## 🔧 Étape 1: Préparer le Code

### 1.1 Tester le Build Localement

Avant de déployer, vérifiez que votre application se compile correctement:

```bash
npm run build
```

Si le build réussit, vous verrez un message de succès et un dossier `.next/` sera créé.

### 1.2 Initialiser Git (si pas déjà fait)

```bash
git init
git add .
git commit -m "Initial commit - ready for deployment"
```

### 1.3 Pousser sur GitHub/GitLab

**Option A: Nouveau repository GitHub**

```bash
# Créez un nouveau repo sur github.com, puis:
git remote add origin https://github.com/votre-username/ticket_brunch.git
git branch -M main
git push -u origin main
```

**Option B: Repository existant**

```bash
git push
```

---

## 🌐 Étape 2: Déployer sur Vercel

### 2.1 Créer un Compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"**
3. Connectez-vous avec votre compte GitHub/GitLab/Bitbucket

### 2.2 Importer le Projet

1. Sur le dashboard Vercel, cliquez sur **"Add New Project"**
2. Sélectionnez votre repository **ticket_brunch**
3. Cliquez sur **"Import"**

### 2.3 Configurer le Projet

Vercel détectera automatiquement Next.js. Vous verrez:

- **Framework Preset:** Next.js ✅
- **Build Command:** `next build` ✅
- **Output Directory:** `.next` ✅

**Ne changez rien**, ces valeurs sont correctes.

### 2.4 Ajouter les Variables d'Environnement

**IMPORTANT:** Avant de déployer, ajoutez votre variable d'environnement:

1. Déroulez la section **"Environment Variables"**
2. Ajoutez:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://bonito070393_db_user:D5oqh2MqF7w0lvLF@cluster0.h9mehrt.mongodb.net/ticket_brunch`
3. Sélectionnez **"Production"**, **"Preview"**, et **"Development"**

### 2.5 Déployer

1. Cliquez sur **"Deploy"**
2. Attendez 1-2 minutes pendant que Vercel build et déploie votre application
3. Une fois terminé, vous verrez 🎉 **"Congratulations!"**

---

## ✅ Étape 3: Vérifier le Déploiement

Vercel vous donnera une URL comme: `https://ticket-brunch.vercel.app`

### 3.1 Tester l'API

Visitez: `https://votre-app.vercel.app/api/register`

**Résultat attendu:** `[]` (tableau vide) ou liste des participants en JSON

### 3.2 Tester la Page d'Accueil

Visitez: `https://votre-app.vercel.app/`

**Vérifiez:**

- ✅ Le formulaire s'affiche correctement
- ✅ Vous pouvez remplir et soumettre le formulaire
- ✅ Le ticket PDF se génère

### 3.3 Tester la Page Admin

Visitez: `https://votre-app.vercel.app/admin`

**Vérifiez:**

- ✅ Le prompt de mot de passe apparaît (utilisez `admin123`)
- ✅ La liste des participants s'affiche
- ✅ L'export CSV fonctionne
- ✅ Vous pouvez voir les tickets

---

## 🔄 Mises à Jour Futures

Chaque fois que vous poussez du code sur votre branche `main`, Vercel redéploiera automatiquement:

```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel détectera le push et déploiera automatiquement en ~1 minute.

---

## 🛠️ Configuration Avancée (Optionnel)

### Domaine Personnalisé

1. Dans le dashboard Vercel, allez dans **Settings > Domains**
2. Ajoutez votre domaine personnalisé
3. Suivez les instructions pour configurer les DNS

### Sécurité MongoDB Atlas

Pour plus de sécurité, dans MongoDB Atlas:

1. Allez dans **Network Access**
2. Vérifiez que l'IP de Vercel est autorisée (ou utilisez `0.0.0.0/0` pour autoriser toutes les IPs)

---

## 🆘 Dépannage

### Erreur 500 après déploiement

**Cause:** Variable d'environnement `MONGODB_URI` manquante ou incorrecte

**Solution:**

1. Allez dans **Settings > Environment Variables** sur Vercel
2. Vérifiez que `MONGODB_URI` est bien configurée
3. Redéployez: **Deployments > ... > Redeploy**

### Build Failed

**Cause:** Erreur de compilation

**Solution:**

1. Vérifiez les logs de build sur Vercel
2. Testez `npm run build` localement
3. Corrigez les erreurs et poussez à nouveau

### MongoDB Connection Timeout

**Cause:** MongoDB Atlas bloque la connexion

**Solution:**

1. Dans MongoDB Atlas, allez dans **Network Access**
2. Ajoutez `0.0.0.0/0` pour autoriser toutes les IPs
3. Redéployez sur Vercel

---

## 📞 Support

- **Documentation Vercel:** [vercel.com/docs](https://vercel.com/docs)
- **Documentation Next.js:** [nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Atlas:** [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

**Votre application est maintenant en ligne! 🎉**
