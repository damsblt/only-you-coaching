'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Play, Users, Award, TrendingUp, Clock, Star, Calendar, Target } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { ROUTES, SUBSCRIPTION_PLANS } from '@/lib/constants'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push(ROUTES.auth.signin)
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-800 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-primary-600 dark:text-primary-300">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock user data
  const user = {
    name: 'Marie Dupont',
    email: 'marie@example.com',
    plan: 'premium',
    joinDate: '2024-01-15',
    progress: 75,
    streak: 12,
    totalWorkouts: 45,
    totalMinutes: 1350,
  }

  const currentPlan = SUBSCRIPTION_PLANS.find(plan => plan.id === user.plan)

  const stats = [
    {
      title: 'Séances cette semaine',
      value: '4',
      change: '+1',
      icon: Calendar,
      color: 'text-plan-starter'
    },
    {
      title: 'Série en cours',
      value: '12 jours',
      change: '+2',
      icon: Target,
      color: 'text-plan-pro'
    },
    {
      title: 'Minutes totales',
      value: '1,350',
      change: '+45',
      icon: Clock,
      color: 'text-plan-expert'
    },
    {
      title: 'Niveau atteint',
      value: 'Intermédiaire',
      change: 'Progression',
      icon: Award,
      color: 'text-plan-essentiel'
    }
  ]

  const recentWorkouts = [
    {
      title: 'Renforcement du Core',
      duration: '30 min',
      difficulty: 'Intermédiaire',
      date: 'Aujourd\'hui',
      completed: true
    },
    {
      title: 'Flexibilité & Étirements',
      duration: '25 min',
      difficulty: 'Débutant',
      date: 'Hier',
      completed: true
    },
    {
      title: 'Pilates Avancé',
      duration: '45 min',
      difficulty: 'Avancé',
      date: 'Il y a 2 jours',
      completed: false
    }
  ]

  const upcomingSessions = [
    {
      title: 'Session de coaching',
      time: '14:00',
      date: 'Demain',
      type: 'Coaching individuel',
      with: 'Marie-Line'
    },
    {
      title: 'Programme personnalisé',
      time: '10:00',
      date: 'Vendredi',
      type: 'Suivi personnalisé',
      with: 'Marie-Line'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-dark-background dark:to-dark-surface">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b dark:border-dark-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary-800 dark:text-primary-200">
                Bonjour, {user.name} 👋
              </h1>
              <p className="text-primary-600 dark:text-primary-300 mt-1">
                Prêt(e) pour votre séance d'aujourd'hui ?
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className={`${currentPlan?.id === 'premium' ? 'bg-plan-premium' : 'bg-plan-starter'} text-white`}>
                Plan {currentPlan?.name}
              </Badge>
              <CurvedButton variant="plan" glow>
                <Play className="mr-2 h-4 w-4" />
                Commencer
              </CurvedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <CurvedCard key={index} variant="glass" className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary-600 dark:text-primary-300 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-primary-800 dark:text-primary-200">{stat.value}</p>
                      <p className="text-xs text-green-600 dark:text-green-400">{stat.change}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-200/20 dark:to-primary-300/20 flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CurvedCard>
              ))}
            </div>

            {/* Recent Workouts */}
            <CurvedCard variant="glass" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-primary-800 dark:text-primary-200">
                  Séances récentes
                </h2>
                <CurvedButton variant="outline" size="sm">
                  Voir tout
                </CurvedButton>
              </div>
              <div className="space-y-4">
                {recentWorkouts.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-dark-card/50 rounded-curved">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        workout.completed ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                      }`}>
                        <Play className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary-800 dark:text-primary-200">{workout.title}</h3>
                        <p className="text-sm text-primary-600 dark:text-primary-300">
                          {workout.duration} • {workout.difficulty} • {workout.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {workout.completed ? (
                        <Badge className="bg-green-500 text-white">Terminé</Badge>
                      ) : (
                        <CurvedButton size="sm" variant="outline">
                          Reprendre
                        </CurvedButton>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CurvedCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
                Votre progression
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-primary-600 dark:text-primary-300 mb-2">
                    <span>Objectif mensuel</span>
                    <span>{user.progress}%</span>
                  </div>
                  <div className="w-full bg-primary-200 dark:bg-primary-800 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${user.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-800 dark:text-primary-200">{user.streak}</div>
                  <div className="text-sm text-primary-600 dark:text-primary-300">jours de série</div>
                </div>
              </div>
            </CurvedCard>

            {/* Upcoming Sessions */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
                Prochaines sessions
              </h3>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 bg-white/50 dark:bg-dark-card/50 rounded-curved">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-primary-800 dark:text-primary-200">{session.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {session.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-primary-600 dark:text-primary-300 mb-1">
                      {session.date} à {session.time}
                    </p>
                    <p className="text-xs text-primary-500 dark:text-primary-400">
                      avec {session.with}
                    </p>
                  </div>
                ))}
              </div>
            </CurvedCard>

            {/* Quick Actions */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 dark:text-primary-200 mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <CurvedButton variant="plan" className="w-full" glow>
                  <Play className="mr-2 h-4 w-4" />
                  Nouvelle séance
                </CurvedButton>
                <CurvedButton variant="outline" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Planifier
                </CurvedButton>
                <CurvedButton variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Objectifs
                </CurvedButton>
              </div>
            </CurvedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
