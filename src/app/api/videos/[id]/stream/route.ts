import { NextRequest, NextResponse } from 'next/server'
// S3 helpers not needed with direct redirect
// import { getPublicUrl, getSignedVideoUrl, objectExistsInS3 } from '@/lib/s3'
import { createClient } from '@supabase/supabase-js'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: videoId } = params
    console.log('[stream] incoming id:', videoId)

    // Get video from database via Supabase (server-side)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!supabaseUrl || !serviceRoleKey) {
      console.error('[stream] missing envs:', { supabaseUrl: !!supabaseUrl, serviceRoleKey: !!serviceRoleKey })
      return NextResponse.json({ error: 'Missing Supabase envs' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false }
    })

    // Fetch strictly from videos_new (single source of truth)
    const { data: video, error } = await supabase
      .from('videos_new')
      .select('videoUrl')
      .eq('id', videoId)
      .maybeSingle()

    if (!video || error) {
      console.error('[stream] video not found or error:', error?.message, 'for id:', videoId)
      return NextResponse.json({ error: 'Video not found' }, { status: 404 })
    }

    console.log('[stream] found video URL:', video.videoUrl)

    // Simple approach: redirect directly to the S3 URL from database
    // The videoUrl should already be a valid S3 URL
    return NextResponse.redirect(video.videoUrl)
  } catch (error) {
    console.error('[stream] unexpected error:', error)
    return NextResponse.json(
      { error: 'Failed to stream video' },
      { status: 500 }
    )
  }
}
