'use client'

import * as React from 'react'
import { Check, Star, ArrowRight, Zap, Heart, Crown, Diamond } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { PlanCard } from '@/components/ui/plan-card'
import { Badge } from '@/components/ui/badge'
import { SUBSCRIPTION_PLANS, getPlansByCategory } from '@/lib/types'
import { ROUTES } from '@/lib/constants'

export default function PricingPage() {
  const [selectedCategory, setSelectedCategory] = React.useState<'autonomie' | 'accompagnement'>('autonomie')
  
  const autonomyPlans = getPlansByCategory('autonomie')
  const accompanimentPlans = getPlansByCategory('accompagnement')

  const features = [
    {
      title: 'Vidéos HD',
      description: 'Plus de 200 vidéos de qualité professionnelle',
      icon: '🎥',
      available: ['starter', 'pro', 'expert', 'essentiel', 'avance', 'premium']
    },
    {
      title: 'Audios de méditation',
      description: 'Séances de relaxation et de méditation guidée',
      icon: '🧘‍♀️',
      available: ['starter', 'pro', 'expert', 'essentiel', 'avance', 'premium']
    },
    {
      title: 'Recettes nutritionnelles',
      description: 'Plus de 100 recettes saines et équilibrées',
      icon: '🥗',
      available: ['starter', 'pro', 'expert', 'essentiel', 'avance', 'premium']
    },
    {
      title: 'Programmes prédéfinis',
      description: 'Programmes structurés pour tous les niveaux',
      icon: '📋',
      available: ['pro', 'expert', 'essentiel', 'avance', 'premium']
    },
    {
      title: 'Programmes personnalisés',
      description: 'Programmes créés spécialement pour vous',
      icon: '✨',
      available: ['essentiel', 'avance', 'premium']
    },
    {
      title: 'Coaching individuel',
      description: 'Sessions de coaching personnalisées avec Marie-Line',
      icon: '💎',
      available: ['essentiel', 'avance', 'premium']
    },
    {
      title: 'Guidance nutritionnelle',
      description: 'Conseils nutritionnels personnalisés',
      icon: '🥑',
      available: ['avance', 'premium']
    },
    {
      title: 'Visite à domicile',
      description: 'Session privée à votre domicile (mensuelle)',
      icon: '🏠',
      available: ['premium']
    }
  ]

  const faqs = [
    {
      question: 'Puis-je changer de plan à tout moment ?',
      answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement.'
    },
    {
      question: 'Y a-t-il un essai gratuit ?',
      answer: 'Oui, nous offrons un essai gratuit de 7 jours pour tous nos plans. Aucune carte de crédit requise.'
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais d\'annulation.'
    },
    {
      question: 'Les vidéos sont-elles disponibles hors ligne ?',
      answer: 'Oui, vous pouvez télécharger les vidéos pour les regarder hors ligne sur l\'application mobile.'
    }
  ]

  const currentPlans = selectedCategory === 'autonomie' ? autonomyPlans : accompanimentPlans

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-heading font-bold mb-6">
              Choisissez votre plan
            </h1>
            <p className="text-xl text-primary-200 dark:text-primary-300 mb-8">
              Des plans adaptés à tous les besoins, de l'autonomie complète à l'accompagnement personnalisé avec Marie-Line.
            </p>
            
            {/* Category Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-primary-700/50 dark:bg-primary-600/30 rounded-curved p-1">
                <button
                  onClick={() => setSelectedCategory('autonomie')}
                  className={`px-6 py-3 rounded-curved transition-all duration-300 ${
                    selectedCategory === 'autonomie'
                      ? 'bg-primary-200 dark:bg-primary-300 text-primary-800 dark:text-primary-900 font-semibold'
                      : 'text-primary-200 dark:text-primary-300 hover:text-primary-50 dark:hover:text-primary-100'
                  }`}
                >
                  Plans en Autonomie
                </button>
                <button
                  onClick={() => setSelectedCategory('accompagnement')}
                  className={`px-6 py-3 rounded-curved transition-all duration-300 ${
                    selectedCategory === 'accompagnement'
                      ? 'bg-primary-200 dark:bg-primary-300 text-primary-800 dark:text-primary-900 font-semibold'
                      : 'text-primary-200 dark:text-primary-300 hover:text-primary-50 dark:hover:text-primary-100'
                  }`}
                >
                  Plans avec Accompagnement
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPlans.map((plan, index) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                isPopular={plan.id === (selectedCategory === 'autonomie' ? 'pro' : 'avance')}
                onSelect={(selectedPlan) => {
                  // Handle plan selection
                  console.log('Selected plan:', selectedPlan)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Comparaison des fonctionnalités
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300">
              Découvrez ce qui est inclus dans chaque plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-primary-200 dark:border-dark-border">
                  <th className="text-left py-4 px-6 font-semibold text-primary-800 dark:text-primary-200">
                    Fonctionnalités
                  </th>
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <th key={plan.id} className="text-center py-4 px-6 font-semibold text-primary-800 dark:text-primary-200">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-primary-100 dark:border-dark-border">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <div className="font-medium text-primary-800 dark:text-primary-200">{feature.title}</div>
                          <div className="text-sm text-primary-600 dark:text-primary-300">{feature.description}</div>
                        </div>
                      </div>
                    </td>
                    {SUBSCRIPTION_PLANS.map((plan) => (
                      <td key={plan.id} className="text-center py-4 px-6">
                        {feature.available.includes(plan.id) ? (
                          <Check className="w-5 h-5 text-green-500 dark:text-green-400 mx-auto" />
                        ) : (
                          <span className="text-primary-300 dark:text-primary-500">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300">
              Tout ce que vous devez savoir sur nos plans
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <CurvedCard key={index} variant="glass" className="p-6">
                <h3 className="text-lg font-semibold text-primary-800 dark:text-primary-200 mb-3">
                  {faq.question}
                </h3>
                <p className="text-primary-600 dark:text-primary-300">
                  {faq.answer}
                </p>
              </CurvedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Prêt(e) à commencer ?
          </h2>
          <p className="text-xl text-primary-200 dark:text-primary-300 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté Only You Coaching et transformez votre vie dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CurvedButton size="lg" variant="plan" glow>
              Commencer l'essai gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </CurvedButton>
            <CurvedButton size="lg" variant="outline" className="text-primary-50 dark:text-primary-100 border-primary-200 dark:border-primary-300 hover:bg-primary-200 dark:hover:bg-primary-300/20 hover:text-primary-800 dark:hover:text-primary-100">
              Nous contacter
            </CurvedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
