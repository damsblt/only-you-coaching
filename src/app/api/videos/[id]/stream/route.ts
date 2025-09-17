import { NextRequest, NextResponse } from 'next/server'
import { getPublicUrl } from '@/lib/s3'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await params

    // Get video from database
    const video = await prisma.video.findUnique({
      where: { id: videoId }
    })

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // Extract S3 key from video URL
    const videoUrl = new URL(video.videoUrl)
    const s3Key = videoUrl.pathname.substring(1) // Remove leading slash

    // Generate public URL since videos are now publicly accessible
    const publicUrl = getPublicUrl(s3Key)

    // Redirect to public URL
    return NextResponse.redirect(publicUrl)
  } catch (error) {
    console.error('Error streaming video:', error)
    return NextResponse.json(
      { error: 'Failed to stream video' },
      { status: 500 }
    )
  }
}
