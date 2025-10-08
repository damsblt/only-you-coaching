'use client'

import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Play, Clock, Star, Filter, Search, Grid, List } from 'lucide-react'
import { CurvedCard } from '@/components/ui/curved-card'
import { CurvedButton } from '@/components/ui/curved-button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { VideoPlayer } from '@/components/video/video-player'
import { AccessGate } from '@/components/ui/access-gate'
import { VIDEO_CATEGORIES, DIFFICULTY_LEVELS } from '@/lib/constants'

export default function VideosPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')

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

  // Mock videos data
  const videos = [
    {
      id: '1',
      title: 'Renforcement du Core - Niveau Débutant',
      description: 'Exercices de base pour renforcer votre sangle abdominale',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: '/api/placeholder/video.mp4',
      duration: 1800, // 30 minutes
      difficulty: 'beginner' as const,
      category: 'core',
      tags: ['core', 'débutant', 'renforcement'],
      isCompleted: false,
      progress: 0,
    },
    {
      id: '2',
      title: 'Flexibilité & Étirements',
      description: 'Séance complète d\'étirements pour améliorer votre flexibilité',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: '/api/placeholder/video.mp4',
      duration: 1500, // 25 minutes
      difficulty: 'intermediate' as const,
      category: 'flexibility',
      tags: ['flexibilité', 'étirements', 'relaxation'],
      isCompleted: true,
      progress: 100,
    },
    {
      id: '3',
      title: 'Pilates Avancé - Flow Complet',
      description: 'Séquence avancée combinant force et fluidité',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: '/api/placeholder/video.mp4',
      duration: 2700, // 45 minutes
      difficulty: 'advanced' as const,
      category: 'advanced',
      tags: ['avancé', 'flow', 'complet'],
      isCompleted: false,
      progress: 25,
    },
    {
      id: '4',
      title: 'Rééducation Posturale',
      description: 'Exercices pour corriger les déséquilibres posturaux',
      thumbnail: '/api/placeholder/400/225',
      videoUrl: '/api/placeholder/video.mp4',
      duration: 2100, // 35 minutes
      difficulty: 'beginner' as const,
      category: 'rehabilitation',
      tags: ['rééducation', 'posture', 'santé'],
      isCompleted: false,
      progress: 0,
    },
  ]

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || video.difficulty === selectedDifficulty
    
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes} min`
  }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary-800">
                Bibliothèque de vidéos
              </h1>
              <p className="text-primary-600 mt-1">
                Plus de 200 vidéos de qualité professionnelle
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <CurvedButton variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtres
              </CurvedButton>
              <CurvedButton variant="plan" glow>
                <Play className="mr-2 h-4 w-4" />
                Nouvelle séance
              </CurvedButton>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-400" />
              <Input
                placeholder="Rechercher une vidéo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 curved-input"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <CurvedButton
                variant={viewMode === 'grid' ? 'plan' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </CurvedButton>
              <CurvedButton
                variant={viewMode === 'list' ? 'plan' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </CurvedButton>
            </div>
          </div>

          {/* Category and Difficulty Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-primary-800">Catégorie:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-curved border border-primary-200 focus:border-primary-800 focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">Toutes les catégories</option>
                {VIDEO_CATEGORIES.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-primary-800">Niveau:</span>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 rounded-curved border border-primary-200 focus:border-primary-800 focus:ring-2 focus:ring-primary-200"
              >
                <option value="all">Tous les niveaux</option>
                {DIFFICULTY_LEVELS.map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Videos Grid/List */}
        <AccessGate userPlan={userPlan} requiredFeature="videos">
          <div className={cn(
            "grid gap-6",
            viewMode === 'grid' 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
              : "grid-cols-1"
          )}>
            {filteredVideos.map((video) => (
              <CurvedCard key={video.id} variant="glass" className="overflow-hidden hover-lift">
                {viewMode === 'grid' ? (
                  // Grid View
                  <>
                    <div className="relative">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 flex space-x-2">
                        <Badge className={`${getDifficultyColor(video.difficulty)} text-white`}>
                          {getDifficultyLabel(video.difficulty)}
                        </Badge>
                        <Badge variant="outline" className="text-white border-white/50">
                          {formatDuration(video.duration)}
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <CurvedButton variant="plan" size="lg" className="w-16 h-16 rounded-full">
                          <Play className="h-6 w-6 ml-1" />
                        </CurvedButton>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-bold text-primary-800 mb-2 line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-sm text-primary-600 mb-3 line-clamp-2">
                        {video.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {video.isCompleted ? (
                            <Badge className="bg-green-500 text-white">Terminé</Badge>
                          ) : video.progress > 0 ? (
                            <Badge variant="outline">En cours</Badge>
                          ) : (
                            <Badge variant="outline">Nouveau</Badge>
                          )}
                        </div>
                        <CurvedButton variant="outline" size="sm">
                          <Play className="mr-1 h-3 w-3" />
                          Regarder
                        </CurvedButton>
                      </div>
                    </div>
                  </>
                ) : (
                  // List View
                  <div className="flex p-4">
                    <div className="relative w-32 h-20 flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover rounded-curved"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <CurvedButton variant="plan" size="sm" className="w-8 h-8 rounded-full">
                          <Play className="h-3 w-3 ml-0.5" />
                        </CurvedButton>
                      </div>
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-heading font-bold text-primary-800 mb-1">
                            {video.title}
                          </h3>
                          <p className="text-sm text-primary-600 mb-2 line-clamp-2">
                            {video.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-primary-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(video.duration)}
                            </span>
                            <span>{getDifficultyLabel(video.difficulty)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {video.isCompleted ? (
                            <Badge className="bg-green-500 text-white">Terminé</Badge>
                          ) : video.progress > 0 ? (
                            <Badge variant="outline">En cours</Badge>
                          ) : (
                            <Badge variant="outline">Nouveau</Badge>
                          )}
                          <CurvedButton variant="outline" size="sm">
                            <Play className="mr-1 h-3 w-3" />
                            Regarder
                          </CurvedButton>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CurvedCard>
            ))}
          </div>
        </AccessGate>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-200 flex items-center justify-center">
              <Search className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-heading font-bold text-primary-800 mb-2">
              Aucune vidéo trouvée
            </h3>
            <p className="text-primary-600 mb-4">
              Essayez de modifier vos critères de recherche
            </p>
            <CurvedButton variant="outline" onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
              setSelectedDifficulty('all')
            }}>
              Réinitialiser les filtres
            </CurvedButton>
          </div>
        )}
      </div>
    </div>
  )
}
