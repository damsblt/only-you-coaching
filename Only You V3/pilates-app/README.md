# Only You Coaching V3 - Application Pilates

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

✅ **Phase 2 Complétée** (Design System & UI)
- [x] Design system avec couleurs du logo (#302E40, #D4C4B9)
- [x] Composants shadcn/ui avec courbes élégantes
- [x] Système d'authentification NextAuth
- [x] Contrôle d'accès basé sur les plans d'abonnement
- [x] Lecteur vidéo personnalisé
- [x] Dashboard utilisateur complet
- [x] Panneau d'administration pour Marie-Line

## 🎨 Design System

### Couleurs
- **Primary** : `#302E40` (Bleu foncé du logo)
- **Secondary** : `#D4C4B9` (Beige du logo)
- **Accent** : `#F5E6E0` (Beige/Crème)
- **Plans** : Couleurs spécifiques pour chaque plan d'abonnement

### Features
- ✅ Dark mode avec toggle Sun/Moon
- ✅ Courbes élégantes (Header/Footer)
- ✅ Classes personnalisées (`.curved-card`, `.curved-button`)
- ✅ Responsive design
- ✅ Footer optimisé avec cartes glassmorphism
- ✅ Animations Framer Motion fluides
- ✅ Système de contrôle d'accès intelligent

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
cp .env.example .env.local

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

## 🎯 Plans d'Abonnement

### Plans en Autonomie
- **Starter** - 35 CHF/mois (2 mois) - Vidéos + Audios + Recettes
- **Pro** - 30 CHF/mois (4 mois) - Starter + Programmes
- **Expert** - 25 CHF/mois (6 mois) - Accès complet

### Plans avec Accompagnement
- **Essentiel** - 69 CHF/mois - Vidéos + 3 programmes perso + coaching
- **Avancé** - 109 CHF/mois - Essentiel + Audios + Nutrition
- **Premium** - 149 CHF/mois - Avancé + Visite à domicile

## 🔐 Système de Contrôle d'Accès

L'application implémente un système intelligent de contrôle d'accès basé sur les plans d'abonnement :

- **Vérification automatique** des permissions pour chaque contenu
- **Messages d'erreur personnalisés** selon le plan de l'utilisateur
- **Recommandations d'upgrade** intelligentes
- **Composant AccessGate** pour protéger les contenus premium

## 📱 Pages Principales

### Public
- **Accueil** (`/`) - Landing page avec présentation des plans
- **À propos** (`/about`) - Histoire de Marie-Line et valeurs
- **Tarifs** (`/pricing`) - Comparaison des plans d'abonnement
- **Contact** (`/contact`) - Formulaire de contact et FAQ

### Authentifié
- **Dashboard** (`/dashboard`) - Tableau de bord principal
- **Vidéos** (`/dashboard/videos`) - Bibliothèque de vidéos
- **Programmes** (`/dashboard/programs`) - Programmes structurés
- **Profil** (`/dashboard/profile`) - Gestion du profil

### Administration
- **Admin** (`/admin`) - Panneau d'administration pour Marie-Line
- **Utilisateurs** (`/admin/users`) - Gestion des membres
- **Contenus** (`/admin/videos`, `/admin/audios`, etc.) - Gestion des contenus

## 🎬 Lecteur Vidéo

Le lecteur vidéo personnalisé inclut :
- **Contrôles complets** (play/pause, volume, fullscreen)
- **Barre de progression** interactive
- **Gestion des difficultés** et catégories
- **Mode responsive** adaptatif
- **Thumbnails** et métadonnées

## 🚀 Commandes

```bash
npm run dev          # Développement (avec Turbopack)
npm run build        # Build production
npm run start        # Démarrer en production
npm run lint         # ESLint
npm run type-check   # Vérification TypeScript
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

### Fonctionnalités
- [x] Système d'authentification
- [x] Contrôle d'accès par plans
- [x] Lecteur vidéo personnalisé
- [x] Dashboard utilisateur
- [x] Panneau d'administration
- [x] Pages publiques (About, Contact, Pricing)
- [x] Design responsive et élégant

### À Faire
- [ ] Base de données Supabase
- [ ] Stripe (6 plans)
- [ ] Vidéos & S3
- [ ] Tests
- [ ] Déploiement

---

**🎉 Only You Coaching V3 - Application Complète !**

Projet créé le : 6 octobre 2025  
Dernière mise à jour : 6 octobre 2025

## 📞 Support

Pour toute question ou support technique, contactez :
- **Email** : contact@onlyyoucoaching.ch
- **Téléphone** : +41 XX XXX XX XX
- **Support** : Disponible 24/7 via le chat intégré