import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const muscleGroup = searchParams.get('muscleGroup')
  const programme = searchParams.get('programme')
  const difficulty = searchParams.get('difficulty')
  const search = searchParams.get('search')
  const videoType = searchParams.get('videoType')

  // Build filter conditions (Prisma)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    isPublished: true
  }

  if (videoType === 'muscle-groups') {
    where.videoType = 'MUSCLE_GROUPS'
  } else if (videoType === 'programmes') {
    where.videoType = 'PROGRAMMES'
  }

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
      where.region = muscleGroupMap[muscleGroup]
    }
  }

  if (programme && programme !== 'all') {
    where.region = programme
  }

  if (difficulty && difficulty !== 'all') {
    where.difficulty = { in: [difficulty] }
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { startingPosition: { contains: search, mode: 'insensitive' } },
      { movement: { contains: search, mode: 'insensitive' } },
      { theme: { contains: search, mode: 'insensitive' } }
    ]
  }

  // First attempt: Prisma with timeout
  try {
    // Cast to any to avoid Prisma type resolution issues during serverless builds
    const prismaQuery = (prisma as any).videosNew.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    const withTimeout = Promise.race([
      prismaQuery,
      new Promise((_, reject) => setTimeout(() => reject(new Error('PRISMA_TIMEOUT')), 5000))
    ])

    const videos = (await withTimeout) as unknown
    return NextResponse.json(videos)
  } catch (error) {
    console.warn('Prisma query failed, falling back to Supabase REST. Error:', error instanceof Error ? error.message : String(error))
  }

  // Fallback: Supabase REST query (server-side)
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('Supabase fallback missing envs: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
      return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    })

    let query = supabase.from('videos_new').select('*').order('createdAt', { ascending: false })

    // Apply filters equivalent to Prisma where
    query = query.eq('isPublished', true)

    if (where.videoType) {
      query = query.eq('videoType', where.videoType)
    }

    if (where.region) {
      query = query.eq('region', where.region)
    }

    if (difficulty && difficulty !== 'all') {
      // difficulty is enum; simple equality
      query = query.eq('difficulty', difficulty)
    }

    if (search) {
      // Use ilike across multiple columns via or() filter
      const ilike = (col: string) => `${col}.ilike.%${search}%`
      query = query.or(
        [
          ilike('title'),
          ilike('description'),
          ilike('startingPosition'),
          ilike('movement'),
          ilike('theme')
        ].join(',')
      )
    }

    const { data, error } = await query
    if (error) {
      console.error('Supabase fallback error:', error)
      return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
    }

    return NextResponse.json(data ?? [])
  } catch (error) {
    console.error('Supabase fallback threw:', error)
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 })
  }
}
