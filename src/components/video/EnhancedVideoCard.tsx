"use client"

import { useState } from "react"
import { Play, Clock, Users, Target, Zap, Tag } from "lucide-react"
import { formatDuration, getDifficultyColor, getDifficultyLabel } from "@/lib/utils"

interface EnhancedVideo {
  id: string
  title: string
  description: string
  detailedDescription?: string
  thumbnail: string
  videoUrl: string
  duration: number
  difficulty: string
  category: string
  region?: string
  muscleGroups: string[]
  startingPosition?: string
  movement?: string
  intensity?: string
  theme?: string
  series?: string
  constraints?: string
  tags: string[]
  isPublished: boolean
}

interface EnhancedVideoCardProps {
  video: EnhancedVideo
  onPlay: (video: EnhancedVideo) => void
}

export default function EnhancedVideoCard({ video, onPlay }: EnhancedVideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="curved-card bg-white shadow-organic hover:shadow-floating transition-all cursor-pointer group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail with Play Button */}
      <div className="relative aspect-video bg-neutral-200 overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/20 transition-all duration-300 flex items-center justify-center">
          <button onClick={() => onPlay(video)} className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-floating">
            <Play className="w-6 h-6 text-secondary-500 ml-1" />
          </button>
        </div>
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 bg-accent-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 curved-button flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {formatDuration(video.duration)}
        </div>

        {/* Difficulty Badge */}
        <div className={`absolute top-3 left-3 px-3 py-1.5 curved-button text-xs font-medium bg-white/90 backdrop-blur-sm ${getDifficultyColor(video.difficulty)}`}>
          {getDifficultyLabel(video.difficulty)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="font-semibold text-accent-500 mb-3 line-clamp-2 group-hover:text-secondary-500 transition-colors">
          {video.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-accent-600 mb-4 line-clamp-2">
          {video.description}
        </p>

        {/* Simple Metadata */}
        <div className="space-y-2 mb-4">
          {/* Category */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs text-accent-600 bg-primary-100 px-3 py-1.5 curved-button">
              {video.category || 'Exercice'}
            </span>
          </div>

          {/* Region/Muscle Group */}
          {video.region && (
            <div className="text-sm text-gray-600">
              <Target className="w-4 h-4 inline mr-1" />
              {video.region}
            </div>
          )}

          {/* Muscle Groups - Show only first 3 */}
          {video.muscleGroups.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {video.muscleGroups.slice(0, 3).map((muscle, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-secondary-50 text-secondary-600 rounded-full text-xs font-medium"
                >
                  {muscle}
                </span>
              ))}
              {video.muscleGroups.length > 3 && (
                <span className="text-accent-500 text-xs px-2 py-1">
                  +{video.muscleGroups.length - 3} autres
                </span>
              )}
            </div>
          )}

          {/* Series */}
          {video.series && (
            <div className="text-sm text-gray-600">
              <Zap className="w-4 h-4 inline mr-1" />
              {video.series}
            </div>
          )}

          {/* Starting Position */}
          {video.startingPosition && (
            <div className="text-sm text-gray-600">
              <Users className="w-4 h-4 inline mr-1" />
              {video.startingPosition}
            </div>
          )}

          {/* Movement */}
          {video.movement && (
            <div className="text-sm text-gray-600">
              <Tag className="w-4 h-4 inline mr-1" />
              {video.movement}
            </div>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => onPlay(video)}
          className="w-full curved-button bg-gradient-to-r from-secondary-500 to-accent-500 text-white font-semibold py-3 px-6 text-center block hover:shadow-floating transition-all flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          Regarder
        </button>
      </div>
    </div>
  )
}
