import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const muscleGroup = searchParams.get('muscleGroup')
    const programme = searchParams.get('programme')
    const difficulty = searchParams.get('difficulty')
    const search = searchParams.get('search')
    const videoType = searchParams.get('videoType')


    // Build filter conditions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      isPublished: true
    }

      // Filter by video type using the videoType column
      if (videoType === 'muscle-groups') {
        where.videoType = 'MUSCLE_GROUPS'
      } else if (videoType === 'programmes') {
        where.videoType = 'PROGRAMMES'
      }

    // Filter by muscle group (folder) for muscle groups videos
    if (muscleGroup && muscleGroup !== 'all') {
      const muscleGroupMap: { [key: string]: string } = {
        'Abdos': 'abdos',
        'Bande': 'bande',
        'Biceps': 'biceps',
        'Cardio': 'cardio',
        'Dos': 'dos',
        'Fessiers et jambes': 'fessiers-jambes',
        'Streching': 'streching',
        'Triceps': 'triceps'
      }
      
      if (muscleGroupMap[muscleGroup]) {
        where.folder = { contains: `groupes-musculaires/${muscleGroupMap[muscleGroup]}` }
      }
    }

    // Filter by programme (folder) for programmes videos
    if (programme && programme !== 'all') {
      where.folder = { contains: `programmes-predefinis/${programme}` }
    }

    if (difficulty && difficulty !== 'all') {
      where.difficulty = { in: [difficulty] }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { muscleGroups: { has: search } }
      ]
    }

    // Fetch videos from database
    const videos = await prisma.video.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(videos)
  } catch (error) {
    console.error('Error fetching videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
  }
}
