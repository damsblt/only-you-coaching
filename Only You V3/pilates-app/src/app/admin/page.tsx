'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  Video, 
  Music, 
  BookOpen, 
  Target, 
  CreditCard, 
  BarChart3, 
  Settings,
  Plus,
  TrendingUp,
  Eye,
  Download
} from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Badge } from '@/components/ui/badge'
import { ROUTES } from '@/lib/constants'

export default function AdminPage() {
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

  // Mock admin data
  const stats = [
    {
      title: 'Membres actifs',
      value: '523',
      change: '+12%',
      icon: Users,
      color: 'text-plan-starter'
    },
    {
      title: 'Vidéos publiées',
      value: '187',
      change: '+3',
      icon: Video,
      color: 'text-plan-pro'
    },
    {
      title: 'Revenus mensuels',
      value: 'CHF 12,450',
      change: '+8%',
      icon: CreditCard,
      color: 'text-plan-essentiel'
    },
    {
      title: 'Taux de rétention',
      value: '94%',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-plan-premium'
    }
  ]

  const recentActivities = [
    {
      id: '1',
      type: 'user',
      message: 'Nouveau membre: Sarah M. (Plan Premium)',
      time: 'Il y a 2 heures',
      status: 'success'
    },
    {
      id: '2',
      type: 'video',
      message: 'Vidéo "Renforcement Core" publiée',
      time: 'Il y a 4 heures',
      status: 'info'
    },
    {
      id: '3',
      type: 'subscription',
      message: 'Renouvellement: Claire L. (Plan Pro)',
      time: 'Il y a 6 heures',
      status: 'success'
    },
    {
      id: '4',
      type: 'support',
      message: 'Nouveau message de support',
      time: 'Il y a 8 heures',
      status: 'warning'
    }
  ]

  const adminSections = [
    {
      title: 'Gestion des utilisateurs',
      description: 'Gérer les comptes et abonnements',
      icon: Users,
      href: ROUTES.admin.users,
      color: 'plan-starter',
      stats: '523 membres'
    },
    {
      title: 'Bibliothèque vidéos',
      description: 'Uploader et organiser les vidéos',
      icon: Video,
      href: ROUTES.admin.videos,
      color: 'plan-pro',
      stats: '187 vidéos'
    },
    {
      title: 'Audios & Méditations',
      description: 'Gérer les contenus audio',
      icon: Music,
      href: ROUTES.admin.audios,
      color: 'plan-expert',
      stats: '45 audios'
    },
    {
      title: 'Recettes & Nutrition',
      description: 'Base de données nutritionnelle',
      icon: BookOpen,
      href: ROUTES.admin.recipes,
      color: 'plan-essentiel',
      stats: '120 recettes'
    },
    {
      title: 'Programmes',
      description: 'Créer et gérer les programmes',
      icon: Target,
      href: ROUTES.admin.programs,
      color: 'plan-avance',
      stats: '25 programmes'
    },
    {
      title: 'Abonnements',
      description: 'Gérer les paiements et factures',
      icon: CreditCard,
      href: ROUTES.admin.subscriptions,
      color: 'plan-premium',
      stats: 'CHF 12,450'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      case 'info': return 'bg-blue-500'
      default: return 'bg-gray-500'
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
                Administration
              </h1>
              <p className="text-primary-600 mt-1">
                Gérer votre plateforme Only You Coaching
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurvedButton variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </CurvedButton>
              <CurvedButton variant="plan" glow>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau contenu
              </CurvedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <CurvedCard key={index} variant="glass" className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary-800">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CurvedCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Sections */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-heading font-bold text-primary-800 mb-6">
              Gestion de contenu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminSections.map((section, index) => (
                <CurvedCard key={index} variant="glass" className="p-6 hover-lift cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-primary-200 to-primary-300 flex items-center justify-center ${section.color}`}>
                      <section.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-bold text-primary-800 mb-2">
                        {section.title}
                      </h3>
                      <p className="text-sm text-primary-600 mb-3">
                        {section.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-500">{section.stats}</span>
                        <CurvedButton variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          Gérer
                        </CurvedButton>
                      </div>
                    </div>
                  </div>
                </CurvedCard>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 mb-4">
                Activité récente
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(activity.status)}`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-primary-800">{activity.message}</p>
                      <p className="text-xs text-primary-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CurvedCard>

            {/* Quick Actions */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <CurvedButton variant="plan" className="w-full" glow>
                  <Video className="mr-2 h-4 w-4" />
                  Uploader une vidéo
                </CurvedButton>
                <CurvedButton variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Nouveau membre
                </CurvedButton>
                <CurvedButton variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Créer un programme
                </CurvedButton>
                <CurvedButton variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Voir les analytics
                </CurvedButton>
              </div>
            </CurvedCard>

            {/* System Status */}
            <CurvedCard variant="glass" className="p-6">
              <h3 className="text-lg font-heading font-bold text-primary-800 mb-4">
                État du système
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">Serveur</span>
                  <Badge className="bg-green-500 text-white">En ligne</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">Base de données</span>
                  <Badge className="bg-green-500 text-white">Opérationnel</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">CDN</span>
                  <Badge className="bg-green-500 text-white">Actif</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary-600">Paiements</span>
                  <Badge className="bg-green-500 text-white">Fonctionnel</Badge>
                </div>
              </div>
            </CurvedCard>
          </div>
        </div>
      </div>
    </div>
  )
}
