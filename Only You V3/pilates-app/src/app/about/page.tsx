'use client'

import * as React from 'react'
import Image from 'next/image'
import { Heart, Award, Users, Target, CheckCircle, Star } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { APP_CONFIG, ROUTES } from '@/lib/constants'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Une passion authentique pour le bien-être et la transformation personnelle'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Un engagement constant vers l\'excellence dans chaque séance'
    },
    {
      icon: Users,
      title: 'Accompagnement',
      description: 'Un suivi personnalisé adapté à vos besoins et objectifs'
    },
    {
      icon: Award,
      title: 'Expertise',
      description: 'Plus de 5 ans d\'expérience dans le Pilates et la rééducation'
    }
  ]

  const achievements = [
    {
      number: '500+',
      label: 'Membres transformés',
      description: 'Plus de 500 personnes ont déjà transformé leur vie avec nous'
    },
    {
      number: '200+',
      label: 'Vidéos créées',
      description: 'Une bibliothèque complète de plus de 200 vidéos HD'
    },
    {
      number: '98%',
      label: 'Satisfaction client',
      description: 'Un taux de satisfaction exceptionnel de 98%'
    },
    {
      number: '5 ans',
      label: 'D\'expérience',
      description: 'Plus de 5 ans d\'expertise dans le Pilates'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Membre Premium',
      content: 'Marie-Line a transformé ma vie. Grâce à ses programmes personnalisés, j\'ai retrouvé confiance en moi et une forme physique que je pensais impossible.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Claire L.',
      role: 'Membre Pro',
      content: 'Les vidéos sont d\'une qualité exceptionnelle et les explications très claires. Je progresse à mon rythme et je vois des résultats dès la première semaine.',
      rating: 5,
      image: '/api/placeholder/60/60'
    },
    {
      name: 'Emma R.',
      role: 'Membre Avancé',
      content: 'L\'accompagnement de Marie-Line est incroyable. Elle s\'adapte à mes besoins et m\'aide à dépasser mes limites en toute sécurité.',
      rating: 5,
      image: '/api/placeholder/60/60'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-900 dark:to-slate-800 text-primary-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary-200 dark:bg-primary-200/20 text-primary-800 dark:text-primary-200 px-4 py-2 rounded-full">
                  <Heart className="w-3 h-3 mr-1" />
                  Depuis 2019
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
                  Rencontrez{' '}
                  <span className="text-gradient-accent">Marie-Line</span>
                </h1>
                <p className="text-xl text-primary-200 dark:text-primary-300 leading-relaxed">
                  Fondatrice de Only You Coaching, Marie-Line vous accompagne dans votre 
                  transformation personnelle grâce à une approche unique du Pilates, 
                  alliant expertise technique et bienveillance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <CurvedButton size="lg" variant="plan" glow>
                  Découvrir mon histoire
                </CurvedButton>
                <CurvedButton size="lg" variant="outline" className="text-primary-50 dark:text-primary-100 border-primary-200 dark:border-primary-300 hover:bg-primary-200 dark:hover:bg-primary-300/20 hover:text-primary-800 dark:hover:text-primary-100">
                  Voir mes certifications
                </CurvedButton>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="/api/placeholder/500/600"
                  alt="Marie-Line - Fondatrice Only You Coaching"
                  fill
                  className="object-cover rounded-curved"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200/20 dark:bg-primary-200/10 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-200/10 dark:bg-primary-200/5 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-8">
              Mon parcours
            </h2>
            <div className="prose prose-lg mx-auto text-primary-600 dark:text-primary-300">
              <p className="text-xl leading-relaxed mb-6">
                Diplômée en kinésithérapie et certifiée Pilates, Marie-Line a découvert 
                sa passion pour le bien-être lors de ses études. Après plusieurs années 
                d'expérience en cabinet, elle a décidé de créer Only You Coaching pour 
                rendre le Pilates accessible à tous, partout.
              </p>
              <p className="text-lg leading-relaxed">
                Sa mission : vous accompagner dans votre transformation personnelle grâce 
                à une approche holistique qui combine mouvement, respiration et bien-être. 
                Chaque programme est conçu avec amour et expertise pour vous aider à 
                atteindre vos objectifs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Mes valeurs
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300 max-w-3xl mx-auto">
              Les principes qui guident mon approche et ma relation avec chaque membre
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <CurvedCard key={index} variant="glass" className="p-6 text-center hover-lift">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-200/20 dark:to-primary-300/20 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-3">
                  {value.title}
                </h3>
                <p className="text-primary-600 dark:text-primary-300">
                  {value.description}
                </p>
              </CurvedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white dark:bg-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Nos réalisations
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300">
              Des chiffres qui parlent d'eux-mêmes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <CurvedCard key={index} variant="glass" className="p-6 text-center">
                <div className="text-4xl font-bold text-primary-800 dark:text-primary-200 mb-2">
                  {achievement.number}
                </div>
                <div className="text-lg font-semibold text-primary-600 dark:text-primary-300 mb-2">
                  {achievement.label}
                </div>
                <div className="text-sm text-primary-500 dark:text-primary-400">
                  {achievement.description}
                </div>
              </CurvedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
              Ce que disent nos membres
            </h2>
            <p className="text-xl text-primary-600 dark:text-primary-300">
              Des témoignages authentiques de transformation
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
                <p className="text-primary-700 dark:text-primary-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-primary-200 dark:bg-primary-200/20 flex items-center justify-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-primary-800 dark:text-primary-200">{testimonial.name}</div>
                    <div className="text-sm text-primary-600 dark:text-primary-300">{testimonial.role}</div>
                  </div>
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
            Rejoignez la communauté
          </h2>
          <p className="text-xl text-primary-200 dark:text-primary-300 mb-8 max-w-2xl mx-auto">
            Découvrez comment Marie-Line peut vous accompagner dans votre transformation personnelle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CurvedButton size="lg" variant="plan" glow>
              Commencer maintenant
            </CurvedButton>
            <CurvedButton size="lg" variant="outline" className="text-primary-50 dark:text-primary-100 border-primary-200 dark:border-primary-300 hover:bg-primary-200 dark:hover:bg-primary-300/20 hover:text-primary-800 dark:hover:text-primary-100">
              Voir les tarifs
            </CurvedButton>
          </div>
        </div>
      </section>
    </div>
  )
}
