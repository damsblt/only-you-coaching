'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play, Star, Users, Award, Heart, Zap, Shield } from 'lucide-react'
import { CurvedButton } from '@/components/ui/curved-button'
import { CurvedCard } from '@/components/ui/curved-card'
import { PlanCard } from '@/components/ui/plan-card'
import { Badge } from '@/components/ui/badge'
import { SUBSCRIPTION_PLANS, getPlansByCategory } from '@/lib/types'
import { ROUTES, VIDEO_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants'

export default function HomePage() {
  const autonomyPlans = getPlansByCategory('autonomie')
  const accompanimentPlans = getPlansByCategory('accompagnement')

  const features = [
    {
      icon: Play,
      title: 'Vidéos HD',
      description: 'Plus de 200 vidéos de qualité professionnelle',
      color: 'text-plan-starter'
    },
    {
      icon: Heart,
      title: 'Coaching personnalisé',
      description: 'Accompagnement individuel avec Marie-Line',
      color: 'text-plan-essentiel'
    },
    {
      icon: Users,
      title: 'Programmes adaptés',
      description: 'Des programmes sur mesure selon vos objectifs',
      color: 'text-plan-pro'
    },
    {
      icon: Award,
      title: 'Résultats garantis',
      description: 'Transformez votre corps en 30 jours',
      color: 'text-plan-premium'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Membre depuis 6 mois',
      content: 'Marie-Line a transformé ma vie. Je me sens plus forte et confiante que jamais !',
      rating: 5,
      plan: 'Premium'
    },
    {
      name: 'Claire L.',
      role: 'Membre depuis 3 mois',
      content: 'Les programmes sont parfaits pour mon niveau. Je progresse à mon rythme.',
      rating: 5,
      plan: 'Pro'
    },
    {
      name: 'Emma R.',
      role: 'Membre depuis 1 an',
      content: 'Un accompagnement exceptionnel. Marie-Line est une coach incroyable !',
      rating: 5,
      plan: 'Avancé'
    }
  ]

  const stats = [
    { number: '500+', label: 'Membres actifs' },
    { number: '200+', label: 'Vidéos disponibles' },
    { number: '98%', label: 'Satisfaction client' },
    { number: '5 ans', label: 'D\'expérience' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="space-y-4">
                  <Badge className="bg-primary-200 dark:bg-primary-200/20 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full">
                    <Star className="w-3 h-3 mr-1" />
                    #1 Plateforme Pilates en Suisse
                  </Badge>
                  <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
                    Transformez votre corps avec{' '}
                    <span className="text-gradient-accent">Marie-Line</span>
                  </h1>
                  <p className="text-xl text-primary-200 dark:text-primary-300 leading-relaxed">
                    Découvrez le Pilates en ligne avec des programmes personnalisés, 
                    un coaching expert et des résultats garantis. Rejoignez plus de 500 membres 
                    qui ont déjà transformé leur vie.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <CurvedButton size="lg" variant="plan" glow>
                    Commencer maintenant
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </CurvedButton>
                  <CurvedButton size="lg" variant="outline" className="text-primary-50 dark:text-primary-100 border-primary-200 dark:border-primary-300 hover:bg-primary-200 dark:hover:bg-primary-300/20 hover:text-primary-800 dark:hover:text-primary-100">
                    <Play className="mr-2 h-5 w-5" />
                    Voir la démo
                  </CurvedButton>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-primary-50 dark:text-primary-100">{stat.number}</div>
                      <div className="text-sm text-primary-200 dark:text-primary-300">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src="/logo-oyc.png"
                    alt="Only You Coaching"
                    fill
                    className="object-contain animate-float"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/20 dark:bg-primary-200/10 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200/10 dark:bg-primary-200/5 rounded-full animate-pulse delay-1000"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="wave-divider-bottom"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Pourquoi choisir Only You Coaching ?
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300 max-w-3xl mx-auto">
              Une approche unique qui combine expertise technique, accompagnement personnalisé 
              et flexibilité pour s'adapter à votre rythme de vie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <CurvedCard key={index} variant="glass" className="p-6 text-center hover-lift">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-200/20 dark:to-primary-300/20 flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-200 mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-300">
                  {feature.description}
                </p>
              </CurvedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Choisissez votre plan
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300 max-w-3xl mx-auto">
              Des plans adaptés à tous les besoins, de l'autonomie complète à l'accompagnement personnalisé.
            </p>
          </div>

          {/* Autonomy Plans */}
          <div className="mb-16">
            <h3 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-8 text-center">
              Plan Autonomie en ligne
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {autonomyPlans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isPopular={plan.id === 'pro'}
                  onSelect={(selectedPlan) => {
                    // Handle plan selection - redirect to subscriptions page
                    window.location.href = '/subscriptions'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Accompaniment Plans */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-8 text-center">
              Plans avec Accompagnement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {accompanimentPlans.map((plan, index) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  isPopular={plan.id === 'avance'}
                  onSelect={(selectedPlan) => {
                    // Handle plan selection - redirect to subscriptions page
                    window.location.href = '/subscriptions'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Ce que disent nos membres
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300">
              Plus de 500 membres nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <CurvedCard key={index} variant="glass" className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-primary-700 dark:text-primary-300 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-primary-800 dark:text-primary-200">{testimonial.name}</div>
                    <div className="text-sm text-primary-600 dark:text-primary-400">{testimonial.role}</div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonial.plan}
                  </Badge>
                </div>
              </CurvedCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-heading font-bold mb-4">
            Prêt(e) à transformer votre vie ?
          </h2>
          <p className="text-xl text-primary-200 dark:text-primary-300 mb-8 max-w-2xl mx-auto">
            Rejoignez la communauté Only You Coaching et commencez votre transformation dès aujourd'hui.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CurvedButton size="lg" variant="plan" glow>
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </CurvedButton>
            <CurvedButton size="lg" variant="outline" className="text-primary-50 dark:text-primary-100 border-primary-200 dark:border-primary-300 hover:bg-primary-200 dark:hover:bg-primary-300/20 hover:text-primary-800 dark:hover:text-primary-100">
              <Play className="mr-2 h-5 w-5" />
              Essai gratuit
            </CurvedButton>
          </div>
        </div>
      </section>
    </div>
  )
}