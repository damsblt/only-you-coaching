import { AccessLevel, hasAccess, getPlanById } from './types'

// Fonction pour vérifier l'accès à un contenu spécifique
export function checkContentAccess(
  userAccess: AccessLevel,
  contentRequirements: Partial<AccessLevel>
): boolean {
  return hasAccess(userAccess, contentRequirements)
}

// Fonction pour obtenir les restrictions d'accès selon le plan
export function getAccessRestrictions(planId: string): {
  canAccessVideos: boolean
  canAccessAudios: boolean
  canAccessRecipes: boolean
  canAccessPrograms: boolean
  canAccessPersonalPrograms: boolean
  canAccessCoaching: boolean
  canAccessNutrition: boolean
  canAccessHomeVisit: boolean
  maxPersonalPrograms: number
} {
  const plan = getPlanById(planId)
  
  if (!plan) {
    return {
      canAccessVideos: false,
      canAccessAudios: false,
      canAccessRecipes: false,
      canAccessPrograms: false,
      canAccessPersonalPrograms: false,
      canAccessCoaching: false,
      canAccessNutrition: false,
      canAccessHomeVisit: false,
      maxPersonalPrograms: 0,
    }
  }

  return {
    canAccessVideos: plan.accessLevel.videos,
    canAccessAudios: plan.accessLevel.audios,
    canAccessRecipes: plan.accessLevel.recipes,
    canAccessPrograms: plan.accessLevel.programs,
    canAccessPersonalPrograms: plan.accessLevel.personalPrograms > 0,
    canAccessCoaching: plan.accessLevel.coaching,
    canAccessNutrition: plan.accessLevel.nutrition,
    canAccessHomeVisit: plan.accessLevel.homeVisit,
    maxPersonalPrograms: plan.accessLevel.personalPrograms,
  }
}

// Fonction pour obtenir le message d'erreur d'accès
export function getAccessDeniedMessage(planId: string, feature: string): string {
  const plan = getPlanById(planId)
  const planName = plan?.name || 'votre plan actuel'
  
  const messages: Record<string, string> = {
    videos: `L'accès aux vidéos n'est pas inclus dans ${planName}. Upgradez votre plan pour accéder à la bibliothèque de vidéos.`,
    audios: `L'accès aux audios de méditation n'est pas inclus dans ${planName}. Upgradez votre plan pour accéder aux séances de relaxation.`,
    recipes: `L'accès aux recettes nutritionnelles n'est pas inclus dans ${planName}. Upgradez votre plan pour accéder aux recettes saines.`,
    programs: `L'accès aux programmes prédéfinis n'est pas inclus dans ${planName}. Upgradez votre plan pour accéder aux programmes structurés.`,
    personalPrograms: `Les programmes personnalisés ne sont pas inclus dans ${planName}. Upgradez vers un plan avec accompagnement pour des programmes sur mesure.`,
    coaching: `Le coaching individuel n'est pas inclus dans ${planName}. Upgradez vers un plan avec accompagnement pour un suivi personnalisé.`,
    nutrition: `La guidance nutritionnelle n'est pas incluse dans ${planName}. Upgradez vers un plan Avancé ou Premium pour des conseils nutritionnels.`,
    homeVisit: `Les visites à domicile ne sont pas incluses dans ${planName}. Upgradez vers le plan Premium pour des sessions privées à domicile.`,
  }

  return messages[feature] || `Cette fonctionnalité n'est pas disponible avec ${planName}.`
}

// Fonction pour obtenir les plans qui incluent une fonctionnalité
export function getPlansWithFeature(feature: keyof AccessLevel): string[] {
  const plans = [
    'starter', 'pro', 'expert', 'essentiel', 'avance', 'premium'
  ]

  return plans.filter(planId => {
    const plan = getPlanById(planId)
    if (!plan) return false

    const access = plan.accessLevel[feature]
    if (typeof access === 'boolean') {
      return access
    }
    if (typeof access === 'number') {
      return access > 0
    }
    return false
  })
}

// Fonction pour vérifier si un utilisateur peut upgrader
export function canUpgrade(currentPlanId: string, targetPlanId: string): boolean {
  const currentPlan = getPlanById(currentPlanId)
  const targetPlan = getPlanById(targetPlanId)
  
  if (!currentPlan || !targetPlan) return false
  
  // L'utilisateur peut toujours upgrader vers un plan plus cher
  return targetPlan.price > currentPlan.price
}

// Fonction pour obtenir les fonctionnalités manquantes
export function getMissingFeatures(currentPlanId: string): string[] {
  const currentPlan = getPlanById(currentPlanId)
  if (!currentPlan) return []

  const allFeatures = [
    { key: 'videos', name: 'Vidéos HD' },
    { key: 'audios', name: 'Audios de méditation' },
    { key: 'recipes', name: 'Recettes nutritionnelles' },
    { key: 'programs', name: 'Programmes prédéfinis' },
    { key: 'personalPrograms', name: 'Programmes personnalisés' },
    { key: 'coaching', name: 'Coaching individuel' },
    { key: 'nutrition', name: 'Guidance nutritionnelle' },
    { key: 'homeVisit', name: 'Visites à domicile' },
  ]

  return allFeatures
    .filter(feature => {
      const access = currentPlan.accessLevel[feature.key as keyof AccessLevel]
      if (typeof access === 'boolean') {
        return !access
      }
      if (typeof access === 'number') {
        return access === 0
      }
      return false
    })
    .map(feature => feature.name)
}

// Fonction pour obtenir le plan recommandé pour une fonctionnalité
export function getRecommendedPlanForFeature(feature: string): string | null {
  const featureMap: Record<string, string> = {
    'videos': 'starter',
    'audios': 'starter',
    'recipes': 'starter',
    'programs': 'pro',
    'personalPrograms': 'essentiel',
    'coaching': 'essentiel',
    'nutrition': 'avance',
    'homeVisit': 'premium',
  }

  return featureMap[feature] || null
}
