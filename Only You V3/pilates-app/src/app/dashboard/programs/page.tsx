'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Play, Clock, Star, Users, Target, Calendar, CheckCircle, Lock } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { AccessGate } from '@/components/ui/access-gate'
import { cn } from '@/lib/utils'

export default function ProgramsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 mx-auto mb-4"></div>
          <p className="text-primary-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock user data
  const userPlan = 'premium' // This would come from the session

  // Mock programs data
  const programs = [
    {
      id: '1',
      title: 'Débuter le Pilates',
      description: 'Programme complet de 4 semaines pour découvrir les bases du Pilates',
      thumbnail: '/api/placeholder/400/225',
      duration: 28, // days
      difficulty: 'beginner',
      videos: 12,
      audios: 4,
      recipes: 8,
      isCompleted: false,
      progress: 25,
      isPersonal: false,
      requiredPlan: 'starter',
    },
    {
      id: '2',
      title: 'Renforcement Intensif',
      description: 'Programme de 6 semaines pour développer votre force et votre endurance',
      thumbnail: '/api/placeholder/400/225',
      duration: 42,
      difficulty: 'intermediate',
      videos: 18,
      audios: 6,
      recipes: 12,
      isCompleted: true,
      progress: 100,
      isPersonal: false,
      requiredPlan: 'pro',
    },
    {
      id: '3',
      title: 'Flexibilité & Bien-être',
      description: 'Programme personnalisé de 8 semaines pour améliorer votre flexibilité',
      thumbnail: '/api/placeholder/400/225',
      duration: 56,
      difficulty: 'intermediate',
      videos: 20,
      audios: 8,
      recipes: 15,
      isCompleted: false,
      progress: 60,
      isPersonal: true,
      requiredPlan: 'essentiel',
    },
    {
      id: '4',
      title: 'Pilates Avancé',
      description: 'Programme exigeant de 10 semaines pour les pratiquants expérimentés',
      thumbnail: '/api/placeholder/400/225',
      duration: 70,
      difficulty: 'advanced',
      videos: 25,
      audios: 10,
      recipes: 20,
      isCompleted: false,
      progress: 0,
      isPersonal: false,
      requiredPlan: 'expert',
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500'
      case 'intermediate': return 'bg-yellow-500'
      case 'advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Débutant'
      case 'intermediate': return 'Intermédiaire'
      case 'advanced': return 'Avancé'
      default: return difficulty
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter': return 'plan-starter'
      case 'pro': return 'plan-pro'
      case 'expert': return 'plan-expert'
      case 'essentiel': return 'plan-essentiel'
      case 'avance': return 'plan-avance'
      case 'premium': return 'plan-premium'
      default: return 'plan-starter'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary-800">
                Programmes
              </h1>
              <p className="text-primary-600 mt-1">
                Programmes structurés et personnalisés pour votre progression
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurvedButton variant="outline" size="sm">
                <Target className="mr-2 h-4 w-4" />
                Mes objectifs
              </CurvedButton>
              <CurvedButton variant="plan" glow>
                <Play className="mr-2 h-4 w-4" />
                Nouveau programme
              </CurvedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <CurvedCard key={program.id} variant="glass" className="overflow-hidden hover-lift">
              {/* Program Thumbnail */}
              <div className="relative">
                <img
                  src={program.thumbnail}
                  alt={program.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex space-x-2">
                  <Badge className={`${getDifficultyColor(program.difficulty)} text-white`}>
                    {getDifficultyLabel(program.difficulty)}
                  </Badge>
                  {program.isPersonal && (
                    <Badge className="bg-purple-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Personnalisé
                    </Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className={`${getPlanColor(program.requiredPlan)} text-white`}>
                    {program.requiredPlan}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <CurvedButton variant="plan" size="lg" className="w-16 h-16 rounded-full">
                    <Play className="h-6 w-6 ml-1" />
                  </CurvedButton>
                </div>
              </div>

              {/* Program Content */}
              <div className="p-6">
                <h3 className="font-heading font-bold text-primary-800 mb-2 line-clamp-2">
                  {program.title}
                </h3>
                <p className="text-sm text-primary-600 mb-4 line-clamp-2">
                  {program.description}
                </p>

                {/* Program Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-primary-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {program.duration} jours
                  </div>
                  <div className="flex items-center">
                    <Play className="h-3 w-3 mr-1" />
                    {program.videos} vidéos
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {program.audios} audios
                  </div>
                  <div className="flex items-center">
                    <Target className="h-3 w-3 mr-1" />
                    {program.recipes} recettes
                  </div>
                </div>

                {/* Progress Bar */}
                {program.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-primary-600 mb-1">
                      <span>Progression</span>
                      <span>{program.progress}%</span>
                    </div>
                    <div className="w-full bg-primary-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-600 to-primary-800 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {program.isCompleted ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Terminé
                      </Badge>
                    ) : program.progress > 0 ? (
                      <Badge variant="outline">En cours</Badge>
                    ) : (
                      <Badge variant="outline">Nouveau</Badge>
                    )}
                  </div>
                  <CurvedButton variant="outline" size="sm">
                    <Play className="mr-1 h-3 w-3" />
                    {program.progress > 0 ? 'Continuer' : 'Commencer'}
                  </CurvedButton>
                </div>
              </div>
            </CurvedCard>
          ))}
        </div>

        {/* Access Gate for Programs */}
        <AccessGate userPlan={userPlan} requiredFeature="programs">
          <div className="mt-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-200 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-heading font-bold text-primary-800 mb-2">
              Accès aux programmes
            </h3>
            <p className="text-primary-600 mb-4">
              Les programmes prédéfinis sont disponibles à partir du plan Pro (30 CHF/mois)
            </p>
            <CurvedButton variant="plan" glow>
              Voir les plans
            </CurvedButton>
          </div>
        </AccessGate>

        {/* Personal Programs Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-primary-800">
              Programmes personnalisés
            </h2>
            <CurvedButton variant="outline">
              <Star className="mr-2 h-4 w-4" />
              Créer un programme
            </CurvedButton>
          </div>

          <AccessGate userPlan={userPlan} requiredFeature="personalPrograms">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.filter(p => p.isPersonal).map((program) => (
                <CurvedCard key={program.id} variant="glass" className="overflow-hidden hover-lift">
                  <div className="relative">
                    <img
                      src={program.thumbnail}
                      alt={program.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-purple-500 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Personnalisé
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <CurvedButton variant="plan" size="lg" className="w-16 h-16 rounded-full">
                        <Play className="h-6 w-6 ml-1" />
                      </CurvedButton>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-primary-800 mb-2">
                      {program.title}
                    </h3>
                    <p className="text-sm text-primary-600 mb-4">
                      {program.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">En cours</Badge>
                      <CurvedButton variant="outline" size="sm">
                        Continuer
                      </CurvedButton>
                    </div>
                  </div>
                </CurvedCard>
              ))}
            </div>
          </AccessGate>
        </div>
      </div>
    </div>
  )
}
