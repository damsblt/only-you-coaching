// Constantes pour l'application Only You Coaching

export const APP_CONFIG = {
  name: 'Only You Coaching',
  description: 'Plateforme de coaching Pilates en ligne avec Marie-Line',
  url: 'https://onlyyoucoaching.ch',
  logo: '/logo-oyc.png',
  author: 'Marie-Line',
  version: '3.0.0',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  pricing: '/pricing',
  contact: '/contact',
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    callback: '/auth/callback',
  },
  dashboard: {
    home: '/dashboard',
    videos: '/dashboard/videos',
    audios: '/dashboard/audios',
    recipes: '/dashboard/recipes',
    programs: '/dashboard/programs',
    profile: '/dashboard/profile',
    subscription: '/dashboard/subscription',
  },
  admin: {
    home: '/admin',
    users: '/admin/users',
    videos: '/admin/videos',
    audios: '/admin/audios',
    recipes: '/admin/recipes',
    programs: '/admin/programs',
    subscriptions: '/admin/subscriptions',
    analytics: '/admin/analytics',
  },
} as const;

export const VIDEO_CATEGORIES = [
  {
    id: 'beginner',
    name: 'Débutant',
    description: 'Exercices adaptés aux débutants',
    icon: '🌱',
    color: 'plan-starter',
  },
  {
    id: 'intermediate',
    name: 'Intermédiaire',
    description: 'Exercices pour niveau intermédiaire',
    icon: '🌿',
    color: 'plan-pro',
  },
  {
    id: 'advanced',
    name: 'Avancé',
    description: 'Exercices pour niveau avancé',
    icon: '🌳',
    color: 'plan-expert',
  },
  {
    id: 'core',
    name: 'Renforcement',
    description: 'Exercices de renforcement du core',
    icon: '💪',
    color: 'plan-essentiel',
  },
  {
    id: 'flexibility',
    name: 'Flexibilité',
    description: 'Exercices d\'étirement et de flexibilité',
    icon: '🧘',
    color: 'plan-avance',
  },
  {
    id: 'rehabilitation',
    name: 'Rééducation',
    description: 'Exercices de rééducation et prévention',
    icon: '🏥',
    color: 'plan-premium',
  },
] as const;

export const AUDIO_TYPES = [
  {
    id: 'meditation',
    name: 'Méditation',
    description: 'Séances de méditation guidée',
    icon: '🧘‍♀️',
    color: 'plan-essentiel',
  },
  {
    id: 'guidance',
    name: 'Guidance',
    description: 'Guidance personnalisée',
    icon: '🎯',
    color: 'plan-avance',
  },
  {
    id: 'relaxation',
    name: 'Relaxation',
    description: 'Séances de relaxation profonde',
    icon: '😌',
    color: 'plan-premium',
  },
] as const;

export const DIFFICULTY_LEVELS = [
  {
    id: 'beginner',
    name: 'Débutant',
    description: 'Niveau débutant',
    color: 'plan-starter',
  },
  {
    id: 'intermediate',
    name: 'Intermédiaire',
    description: 'Niveau intermédiaire',
    color: 'plan-pro',
  },
  {
    id: 'advanced',
    name: 'Avancé',
    description: 'Niveau avancé',
    color: 'plan-expert',
  },
] as const;

export const PLAN_FEATURES = {
  starter: {
    color: 'plan-starter',
    gradient: 'gradient-starter',
    icon: '🌱',
    highlights: ['Vidéos', 'Audios', 'Recettes'],
  },
  pro: {
    color: 'plan-pro',
    gradient: 'gradient-pro',
    icon: '🌿',
    highlights: ['Tout Starter', 'Programmes', 'Suivi'],
  },
  expert: {
    color: 'plan-expert',
    gradient: 'gradient-expert',
    icon: '🌳',
    highlights: ['Tout Pro', 'Exclusif', 'Premium'],
  },
  essentiel: {
    color: 'plan-essentiel',
    gradient: 'gradient-essentiel',
    icon: '💎',
    highlights: ['Coaching', 'Personnalisé', '3 Programmes'],
  },
  avance: {
    color: 'plan-avance',
    gradient: 'gradient-avance',
    icon: '🚀',
    highlights: ['Tout Essentiel', 'Nutrition', 'Suivi'],
  },
  premium: {
    color: 'plan-premium',
    gradient: 'gradient-premium',
    icon: '👑',
    highlights: ['Tout Avancé', 'Domicile', 'VIP'],
  },
} as const;

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/onlyyoucoaching',
  facebook: 'https://facebook.com/onlyyoucoaching',
  youtube: 'https://youtube.com/onlyyoucoaching',
  tiktok: 'https://tiktok.com/@onlyyoucoaching',
} as const;

export const CONTACT_INFO = {
  email: 'contact@onlyyoucoaching.ch',
  phone: '+41 XX XXX XX XX',
  address: 'Suisse',
  hours: 'Lun-Ven: 9h-18h',
} as const;

export const LEGAL_PAGES = [
  {
    title: 'Conditions d\'utilisation',
    href: '/terms',
    description: 'Conditions générales d\'utilisation de la plateforme',
  },
  {
    title: 'Politique de confidentialité',
    href: '/privacy',
    description: 'Comment nous protégeons vos données personnelles',
  },
  {
    title: 'Politique de remboursement',
    href: '/refund',
    description: 'Conditions de remboursement des abonnements',
  },
] as const;

export const META_TAGS = {
  home: {
    title: 'Only You Coaching - Pilates en ligne avec Marie-Line',
    description: 'Découvrez le Pilates en ligne avec Marie-Line. Programmes personnalisés, vidéos HD, coaching individuel. Transformez votre corps et votre esprit.',
    keywords: 'pilates, coaching, marie-line, exercice, bien-être, santé, fitness, en ligne',
  },
  pricing: {
    title: 'Tarifs - Only You Coaching',
    description: 'Choisissez le plan qui vous convient. De l\'autonomie complète à l\'accompagnement personnalisé avec Marie-Line.',
    keywords: 'tarifs, abonnement, pilates, coaching, prix, plans',
  },
  dashboard: {
    title: 'Tableau de bord - Only You Coaching',
    description: 'Accédez à vos contenus personnalisés, programmes et suivi de progression.',
    keywords: 'tableau de bord, dashboard, progression, programmes, vidéos',
  },
} as const;
