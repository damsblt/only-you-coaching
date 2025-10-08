'use client'

import * as React from 'react'
import { Check, Star, Crown, Zap, Heart, Diamond } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { SubscriptionPlan, PLAN_FEATURES } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PlanCardProps {
  plan: SubscriptionPlan
  isPopular?: boolean
  isCurrentPlan?: boolean
  onSelect?: (plan: SubscriptionPlan) => void
  className?: string
}

const planIcons = {
  starter: '🌱',
  pro: '🌿',
  expert: '🌳',
  essentiel: '💎',
  avance: '🚀',
  premium: '👑',
}

const planColors = {
  starter: 'plan-starter',
  pro: 'plan-pro',
  expert: 'plan-expert',
  essentiel: 'plan-essentiel',
  avance: 'plan-avance',
  premium: 'plan-premium',
}

export function PlanCard({ 
  plan, 
  isPopular = false, 
  isCurrentPlan = false, 
  onSelect,
  className 
}: PlanCardProps) {
  const planFeatures = PLAN_FEATURES[plan.id as keyof typeof PLAN_FEATURES]
  const isAccompaniment = ['essentiel', 'avance', 'premium'].includes(plan.id)
  const isAutonomy = ['starter', 'pro', 'expert'].includes(plan.id)

  return (
    <CurvedCard 
      variant="plan" 
      planType={plan.id as any}
      className={cn(
        "relative p-8 transition-all duration-300",
        isPopular && "ring-2 ring-primary-400 scale-105",
        isCurrentPlan && "ring-2 ring-green-400",
        className
      )}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full">
            <Star className="w-3 h-3 mr-1" />
            Le plus populaire
          </Badge>
        </div>
      )}

      {/* Current Plan Badge */}
      {isCurrentPlan && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-green-500 text-white px-4 py-1 rounded-full">
            <Check className="w-3 h-3 mr-1" />
            Plan actuel
          </Badge>
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">
          {planIcons[plan.id as keyof typeof planIcons]}
        </div>
        <h3 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-2">
          {plan.name}
        </h3>
        <p className="text-primary-600 dark:text-primary-300 text-sm mb-4">
          {plan.description}
        </p>
        
        {/* Price */}
        <div className="mb-4">
          <span className="text-4xl font-bold text-primary-800 dark:text-primary-200">
            {plan.price} {plan.currency}
          </span>
          <span className="text-primary-600 dark:text-primary-300 ml-2">
            /{plan.interval === 'month' ? 'mois' : 'an'}
          </span>
          {plan.intervalCount > 1 && (
            <div className="text-xs text-primary-500 dark:text-primary-400 mt-1">
              Engagement de {plan.intervalCount} {plan.interval === 'month' ? 'mois' : 'ans'}
            </div>
          )}
        </div>

        {/* Plan Type Badge */}
        <Badge 
          variant="outline" 
          className={cn(
            "text-xs",
            isAccompaniment && "border-plan-essentiel text-plan-essentiel",
            isAutonomy && "border-plan-starter text-plan-starter"
          )}
        >
          {isAccompaniment ? 'Avec Accompagnement' : 'En Autonomie'}
        </Badge>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-3">
          Ce qui est inclus :
        </h4>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-primary-700 dark:text-primary-300">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Access Level Details */}
        <div className="mt-6 p-4 bg-white/20 dark:bg-white/5 rounded-curved">
          <h5 className="font-semibold text-primary-800 dark:text-primary-200 mb-2 text-sm">
            Accès aux contenus :
          </h5>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {plan.accessLevel.videos && (
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-500 dark:text-green-400" />
                <span className="text-primary-700 dark:text-primary-300">Vidéos</span>
              </div>
            )}
            {plan.accessLevel.audios && (
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-500 dark:text-green-400" />
                <span className="text-primary-700 dark:text-primary-300">Audios</span>
              </div>
            )}
            {plan.accessLevel.recipes && (
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-500 dark:text-green-400" />
                <span className="text-primary-700 dark:text-primary-300">Recettes</span>
              </div>
            )}
            {plan.accessLevel.programs && (
              <div className="flex items-center space-x-1">
                <Check className="w-3 h-3 text-green-500 dark:text-green-400" />
                <span className="text-primary-700 dark:text-primary-300">Programmes</span>
              </div>
            )}
            {plan.accessLevel.personalPrograms > 0 && (
              <div className="flex items-center space-x-1">
                <Diamond className="w-3 h-3 text-blue-500 dark:text-blue-400" />
                <span className="text-primary-700 dark:text-primary-300">{plan.accessLevel.personalPrograms} Programmes perso</span>
              </div>
            )}
            {plan.accessLevel.coaching && (
              <div className="flex items-center space-x-1">
                <Heart className="w-3 h-3 text-red-500 dark:text-red-400" />
                <span className="text-primary-700 dark:text-primary-300">Coaching</span>
              </div>
            )}
            {plan.accessLevel.nutrition && (
              <div className="flex items-center space-x-1">
                <Zap className="w-3 h-3 text-yellow-500 dark:text-yellow-400" />
                <span className="text-primary-700 dark:text-primary-300">Nutrition</span>
              </div>
            )}
            {plan.accessLevel.homeVisit && (
              <div className="flex items-center space-x-1">
                <Crown className="w-3 h-3 text-purple-500 dark:text-purple-400" />
                <span className="text-primary-700 dark:text-primary-300">Visite domicile</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <CurvedButton
        variant="plan"
        className="w-full"
        glow
        onClick={() => onSelect?.(plan)}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? 'Plan actuel' : 'Choisir ce plan'}
      </CurvedButton>
    </CurvedCard>
  )
}
