'use client'

import * as React from 'react'
import { Lock, Crown, Star, ArrowRight } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { getAccessDeniedMessage, getRecommendedPlanForFeature } from '@/lib/access-control'
import { SUBSCRIPTION_PLANS } from '@/lib/types'
import { ROUTES } from '@/lib/constants'

interface AccessGateProps {
  userPlan: string
  requiredFeature: string
  children: React.ReactNode
  fallback?: React.ReactNode
  showUpgrade?: boolean
}

export function AccessGate({ 
  userPlan, 
  requiredFeature, 
  children, 
  fallback,
  showUpgrade = true 
}: AccessGateProps) {
  const [hasAccess, setHasAccess] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Simulate access check
    const checkAccess = async () => {
      setIsLoading(true)
      
      // Mock access logic based on plan and feature
      const accessMap: Record<string, Record<string, boolean>> = {
        'starter': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': false,
          'personalPrograms': false,
          'coaching': false,
          'nutrition': false,
          'homeVisit': false,
        },
        'pro': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': true,
          'personalPrograms': false,
          'coaching': false,
          'nutrition': false,
          'homeVisit': false,
        },
        'expert': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': true,
          'personalPrograms': false,
          'coaching': false,
          'nutrition': false,
          'homeVisit': false,
        },
        'essentiel': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': true,
          'personalPrograms': true,
          'coaching': true,
          'nutrition': false,
          'homeVisit': false,
        },
        'avance': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': true,
          'personalPrograms': true,
          'coaching': true,
          'nutrition': true,
          'homeVisit': false,
        },
        'premium': {
          'videos': true,
          'audios': true,
          'recipes': true,
          'programs': true,
          'personalPrograms': true,
          'coaching': true,
          'nutrition': true,
          'homeVisit': true,
        },
      }

      const userAccess = accessMap[userPlan] || {}
      const hasFeatureAccess = userAccess[requiredFeature] || false
      
      setHasAccess(hasFeatureAccess)
      setIsLoading(false)
    }

    checkAccess()
  }, [userPlan, requiredFeature])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-800"></div>
      </div>
    )
  }

  if (hasAccess) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === userPlan)
  const recommendedPlanId = getRecommendedPlanForFeature(requiredFeature)
  const recommendedPlan = recommendedPlanId ? SUBSCRIPTION_PLANS.find(plan => plan.id === recommendedPlanId) : null

  return (
    <CurvedCard variant="glass" className="p-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center">
          <Lock className="w-8 h-8 text-primary-600" />
        </div>
        
        <h3 className="text-xl font-heading font-bold text-primary-800 mb-2">
          Accès restreint
        </h3>
        
        <p className="text-primary-600 mb-6">
          {getAccessDeniedMessage(userPlan, requiredFeature)}
        </p>

        {currentPlan && (
          <div className="mb-6 p-4 bg-primary-50 rounded-curved">
            <p className="text-sm text-primary-600 mb-2">Votre plan actuel :</p>
            <Badge className="bg-primary-800 text-white">
              {currentPlan.name} - {currentPlan.price} {currentPlan.currency}/mois
            </Badge>
          </div>
        )}

        {showUpgrade && recommendedPlan && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-primary-100 to-primary-200 rounded-curved">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold text-primary-800">Plan recommandé</span>
              </div>
              <div className="text-lg font-bold text-primary-800">
                {recommendedPlan.name}
              </div>
              <div className="text-sm text-primary-600">
                {recommendedPlan.price} {recommendedPlan.currency}/mois
              </div>
            </div>

            <div className="space-y-3">
              <CurvedButton 
                variant="plan" 
                className="w-full" 
                glow
                onClick={() => {
                  // Handle upgrade
                  window.location.href = `${ROUTES.pricing}?plan=${recommendedPlan.id}`
                }}
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgradez vers {recommendedPlan.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </CurvedButton>
              
              <CurvedButton 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  window.location.href = ROUTES.pricing
                }}
              >
                Voir tous les plans
              </CurvedButton>
            </div>
          </div>
        )}
      </div>
    </CurvedCard>
  )
}
