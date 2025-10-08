# Only You Coaching V2 - Application Pilates

> Plateforme de coaching Pilates en ligne avec Marie-Line

## 🚀 Statut du Projet

✅ **Phase 1 Complétée** (Setup Initial)
- [x] Projet Next.js 15 créé avec TypeScript
- [x] Tailwind CSS v4 configuré avec design system
- [x] Dark mode intégré (next-themes)
- [x] Variables d'environnement configurées
- [x] Bibliothèques installées (Auth, DB, Stripe, S3)
- [x] Composants de base créés (Header, Footer, ThemeToggle)
- [x] Page d'accueil design

## 🎨 Design System

### Couleurs
- **Primary** : `#F5E6E0` (Beige/Crème)
- **Burgundy** : `#A65959` (Bordeaux)
- **Accent** : `#D4888C` (Rose corail)
- **Secondary** : `#C8A0A0` (Rose poudré)
- **Footer** : `slate-700/800` (Bleu-gris harmonieux)

### Features
- ✅ Dark mode avec toggle Sun/Moon
- ✅ Courbes élégantes (Header/Footer)
- ✅ Classes personnalisées (`.curved-card`, `.curved-button`)
- ✅ Responsive design
- ✅ Footer optimisé avec cartes glassmorphism
- ✅ Animations Framer Motion fluides

## 🛠️ Stack Technique

- **Framework** : Next.js 15.5.4
- **Language** : TypeScript
- **Styling** : Tailwind CSS v4
- **UI Components** : shadcn/ui
- **Database** : Supabase (PostgreSQL)
- **Auth** : NextAuth.js
- **Payments** : Stripe
- **Storage** : AWS S3
- **Dark Mode** : next-themes
- **Icons** : Lucide React

## 🎨 Composants UI & Courbures

### shadcn/ui Integration
L'application utilise **shadcn/ui** pour les composants de base et les effets visuels :

- **Courbures Header/Footer** : Implémentées avec des classes CSS personnalisées utilisant `border-radius` et `clip-path`
- **Composants** : Button, Card, Input, etc. via shadcn/ui
- **Thème** : Intégration parfaite avec le design system personnalisé
- **Responsive** : Courbures adaptatives selon la taille d'écran

### Classes CSS Personnalisées
```css
.curved-header {
  border-radius: 0 0 2rem 2rem;
  clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}

.curved-footer {
  border-radius: 2rem 2rem 0 0;
  clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
}
```

## 🔧 Installation & Démarrage

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
# .env.local est déjà configuré avec :
# - Supabase (OK)
# - NextAuth Secret (OK)
# - AWS S3 (OK)
# - Stripe (à configurer)

# Lancer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

## 📝 Variables d'Environnement

### ✅ Configurées
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET` (généré)
- `AWS_REGION`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_S3_BUCKET_NAME`

### ⚠️ À Configurer
- `STRIPE_PUBLISHABLE_KEY` - Obtenir sur https://dashboard.stripe.com/test/apikeys
- `STRIPE_SECRET_KEY` - Obtenir sur https://dashboard.stripe.com/test/apikeys
- `STRIPE_WEBHOOK_SECRET` - À générer après création webhook
- Stripe Price IDs (6 plans) - À créer dans Stripe Dashboard

## 📋 Prochaines Étapes

### Phase 2 : Base de Données (En cours)
- [ ] Créer tables Supabase (users, videos, subscriptions, etc.)
- [ ] Tester connexion Supabase
- [ ] Créer scripts de migration

### Phase 3 : Authentication
- [ ] Configurer NextAuth avec Supabase
- [ ] Créer pages signin/signup
- [ ] Middleware de protection routes
- [ ] Gestion sessions

### Phase 4 : Stripe & Abonnements
- [ ] Créer 6 produits dans Stripe Dashboard :
  - Essentiel (69 CHF/mois)
  - Avancé (109 CHF/mois)
  - Premium (149 CHF/mois)
  - Starter (35 CHF/mois, 2 mois)
  - Pro (30 CHF/mois, 4 mois)
  - Expert (25 CHF/mois, 6 mois)
- [ ] API checkout
- [ ] Webhooks Stripe
- [ ] Page subscriptions

### Phase 5 : Vidéos & Streaming
- [ ] Player vidéo personnalisé
- [ ] Pages vidéos (liste, détail)
- [ ] API streaming S3
- [ ] Upload & gestion vidéos

### Phase 6 : Features Avancées
- [ ] Programmes prédéfinis
- [ ] Méditations & audios
- [ ] Dashboard admin
- [ ] Profil utilisateur
- [ ] Progression tracking

## 📚 Documentation

Consultez le dossier **"Only You V2"** pour :
- `BRIEF_V2.md` - Documentation technique complète
- `CREATE_FROM_SCRATCH.md` - Guide étape par étape (25 jours)
- `QUICK_START_V2.md` - Setup rapide
- `STRIPE_SETUP.md` - Configuration Stripe (6 plans)
- `INDEX_DOCUMENTATION.md` - Navigation dans la doc

## 🎯 Plans d'Abonnement

### Plans avec Accompagnement
- **Essentiel** - 69 CHF/mois - Vidéos + 3 programmes perso + coaching
- **Avancé** - 109 CHF/mois - Essentiel + Audios + Nutrition
- **Premium** - 149 CHF/mois - Avancé + Visite à domicile

### Plans en Autonomie
- **Starter** - 35 CHF/mois (2 mois) - Vidéos + Audios + Recettes
- **Pro** - 30 CHF/mois (4 mois) - Starter + Programmes
- **Expert** - 25 CHF/mois (6 mois) - Accès complet

## 🔗 Liens Utiles

- **Supabase Dashboard** : https://supabase.com/dashboard/project/otqyrsmxdtcvhueriwzp
- **Stripe Dashboard** : https://dashboard.stripe.com
- **Next.js Docs** : https://nextjs.org/docs
- **Tailwind v4 Docs** : https://tailwindcss.com/docs

## 🚀 Commandes

```bash
npm run dev          # Développement (avec Turbopack)
npm run build        # Build production
npm run start        # Démarrer en production
npm run lint         # ESLint
```

## ✅ Checklist Technique

### Setup Initial
- [x] Next.js 15 + TypeScript
- [x] Tailwind CSS v4
- [x] Dark mode (next-themes)
- [x] Variables d'env
- [x] Design system
- [x] Header/Footer
- [x] Page d'accueil

### À Faire
- [ ] Base de données Supabase
- [ ] Authentication NextAuth
- [ ] Stripe (6 plans)
- [ ] Vidéos & S3
- [ ] Dashboard admin
- [ ] Tests
- [ ] Déploiement

---

**🎉 Only You Coaching V2 - Phase 1 Terminée !**

Projet créé le : 6 octobre 2025  
Dernière mise à jour : 6 octobre 2025
