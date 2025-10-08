// Types pour l'application Only You Coaching

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription?: Subscription;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'inactive' | 'cancelled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'CHF';
  interval: 'month' | 'year';
  intervalCount: number;
  features: string[];
  accessLevel: AccessLevel;
  stripePriceId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccessLevel {
  // Plans Autonomie (Starter, Pro, Expert)
  videos: boolean;
  audios: boolean;
  recipes: boolean;
  programs: boolean;
  
  // Plans avec Accompagnement (Essentiel, Avancé, Premium)
  personalPrograms: number; // Nombre de programmes personnalisés
  coaching: boolean;
  nutrition: boolean;
  homeVisit: boolean; // Visite à domicile pour Premium
  
  // Accès aux contenus selon les plans
  videoLibrary: boolean;
  audioLibrary: boolean;
  recipeLibrary: boolean;
  programLibrary: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number; // en secondes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: VideoCategory;
  tags: string[];
  accessLevel: AccessLevel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Audio {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number; // en secondes
  type: 'meditation' | 'guidance' | 'relaxation';
  accessLevel: AccessLevel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number; // en minutes
  cookTime: number; // en minutes
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  accessLevel: AccessLevel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Program {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number; // en semaines
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  videos: Video[];
  audios: Audio[];
  recipes: Recipe[];
  accessLevel: AccessLevel;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalProgram {
  id: string;
  userId: string;
  title: string;
  description: string;
  videos: Video[];
  audios: Audio[];
  recipes: Recipe[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Plans d'abonnement prédéfinis
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  // Plans Autonomie
  {
    id: 'starter',
    name: 'Starter',
    description: 'Parfait pour débuter votre parcours Pilates',
    price: 35,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 2,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès à la bibliothèque d\'audios guidés',
      'Accès à "mes recettes"'
    ],
    accessLevel: {
      videos: true,
      audios: true,
      recipes: true,
      programs: false,
      personalPrograms: 0,
      coaching: false,
      nutrition: false,
      homeVisit: false,
      videoLibrary: true,
      audioLibrary: true,
      recipeLibrary: true,
      programLibrary: false
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour ceux qui veulent aller plus loin',
    price: 30,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 4,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès aux programmes prédéfinis',
      'Accès à la bibliothèque d\'audios guidés',
      'Accès à "mes recettes"'
    ],
    accessLevel: {
      videos: true,
      audios: true,
      recipes: true,
      programs: true,
      personalPrograms: 0,
      coaching: false,
      nutrition: false,
      homeVisit: false,
      videoLibrary: true,
      audioLibrary: true,
      recipeLibrary: true,
      programLibrary: true
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'Accès complet en autonomie',
    price: 25,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 6,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès aux programmes prédéfinis',
      'Accès à la bibliothèque d\'audios guidés',
      'Accès à "mes recettes"'
    ],
    accessLevel: {
      videos: true,
      audios: true,
      recipes: true,
      programs: true,
      personalPrograms: 0,
      coaching: false,
      nutrition: false,
      homeVisit: false,
      videoLibrary: true,
      audioLibrary: true,
      recipeLibrary: true,
      programLibrary: true
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Plans avec Accompagnement
  {
    id: 'essentiel',
    name: 'Essentiel',
    description: 'Accompagnement personnalisé avec Marie-Line',
    price: 69,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 3,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès à "mes recettes"',
      'Accès aux programmes prédéfinis',
      '3 Programmes d\'entraînement personnalisés',
      '1 appel de coaching par mois de 30 mn',
      'Vidéo des exercices et explicatif envoyé par mail',
      'Assistance Messagerie Sms – mail 5 jours/semaine'
    ],
    accessLevel: {
      videos: true,
      audios: false,
      recipes: true,
      programs: true,
      personalPrograms: 3,
      coaching: true,
      nutrition: false,
      homeVisit: false,
      videoLibrary: true,
      audioLibrary: false,
      recipeLibrary: true,
      programLibrary: true
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'avance',
    name: 'Avancé',
    description: 'Accompagnement ESSENTIEL plus nutrition et suivi',
    price: 109,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 3,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès à "mes recettes"',
      'Accès aux programmes prédéfinis',
      '3 Programmes d\'entraînement personnalisés',
      '1 appel de coaching par mois de 30 mn',
      'Vidéo des exercices et explicatif envoyé par mail',
      'Assistance Messagerie Sms – mail 5 jours/semaine',
      'Accès à la bibliothèque d\'audios guidés',
      'Surveillance et conseil nutritionnel continue',
      'Suivi des progrès'
    ],
    accessLevel: {
      videos: true,
      audios: true,
      recipes: true,
      programs: true,
      personalPrograms: 3,
      coaching: true,
      nutrition: true,
      homeVisit: false,
      videoLibrary: true,
      audioLibrary: true,
      recipeLibrary: true,
      programLibrary: true
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Accompagnement AVANCÉ plus visite à domicile',
    price: 149,
    currency: 'CHF',
    interval: 'month',
    intervalCount: 3,
    features: [
      'Accès à la bibliothèque de vidéos d\'exercices',
      'Accès à "mes recettes"',
      'Accès aux programmes prédéfinis',
      '3 Programmes d\'entraînement personnalisés',
      '1 appel de coaching par mois de 30 mn',
      'Vidéo des exercices et explicatif envoyé par mail',
      'Assistance Messagerie Sms – mail 5 jours/semaine',
      'Accès à la bibliothèque d\'audios guidés',
      'Surveillance et conseil nutritionnel continue',
      'Suivi des progrès',
      '1 Visite à domicile de présentation du programme'
    ],
    accessLevel: {
      videos: true,
      audios: true,
      recipes: true,
      programs: true,
      personalPrograms: 3,
      coaching: true,
      nutrition: true,
      homeVisit: true,
      videoLibrary: true,
      audioLibrary: true,
      recipeLibrary: true,
      programLibrary: true
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Fonction utilitaire pour vérifier l'accès
export function hasAccess(userAccess: AccessLevel, requiredAccess: Partial<AccessLevel>): boolean {
  return Object.entries(requiredAccess).every(([key, value]) => {
    const userValue = userAccess[key as keyof AccessLevel];
    if (typeof value === 'boolean') {
      return userValue === value;
    }
    if (typeof value === 'number') {
      return (userValue as number) >= value;
    }
    return true;
  });
}

// Fonction pour obtenir le plan par ID
export function getPlanById(planId: string): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find(plan => plan.id === planId);
}

// Fonction pour obtenir les plans par catégorie
export function getPlansByCategory(category: 'autonomie' | 'accompagnement'): SubscriptionPlan[] {
  if (category === 'autonomie') {
    return SUBSCRIPTION_PLANS.filter(plan => ['starter', 'pro', 'expert'].includes(plan.id));
  }
  return SUBSCRIPTION_PLANS.filter(plan => ['essentiel', 'avance', 'premium'].includes(plan.id));
}
