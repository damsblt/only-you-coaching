import { NextRequest, NextResponse } from 'next/server'
import { getPublicUrl, getSignedVideoUrl, objectExistsInS3 } from '@/lib/s3'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await params

    // Get video from database
    const video = await prisma.videosNew.findUnique({
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
    // Pathname is percent-encoded; decode to get the exact S3 key string
    let s3KeyEncoded = videoUrl.pathname.substring(1) // Remove leading slash
    let s3Key = decodeURIComponent(s3KeyEncoded)
    
    // The key from the database URL should be used as-is since it's already the correct path
    // No need to decode/re-encode as it might cause double-encoding issues
    console.log('Original S3 key from database:', s3Key)
    
    // If the key ends with .mp4 and does not exist, try -mp4 variant
    let effectiveKey = s3Key
    if (s3Key.endsWith('.mp4')) {
      const exists = await objectExistsInS3(s3Key)
      if (!exists) {
        const fallbackKey = s3Key.replace(/\.mp4$/, '-mp4')
        const fallbackExists = await objectExistsInS3(fallbackKey)
        if (fallbackExists) {
          effectiveKey = fallbackKey
        }
      }
    } else if (s3Key.endsWith('-mp4')) {
      // If the key ends with -mp4 and does not exist, try .mp4 variant
      const exists = await objectExistsInS3(s3Key)
      if (!exists) {
        const fallbackKey = s3Key.replace(/-mp4$/, '.mp4')
        const fallbackExists = await objectExistsInS3(fallbackKey)
        if (fallbackExists) {
          effectiveKey = fallbackKey
        }
      }
    }

    // Try to get a signed URL first (for private videos)
    const signedUrlResult = await getSignedVideoUrl(effectiveKey, 3600) // 1 hour expiry
    if (signedUrlResult.success) {
      return NextResponse.redirect(signedUrlResult.url)
    }

    // Fallback to public URL (must re-encode for URL)
    const encodedKey = encodeURIComponent(effectiveKey).replace(/%2F/g, '/')
    const publicUrl = getPublicUrl(encodedKey)
    return NextResponse.redirect(publicUrl)
  } catch (error) {
    console.error('Error streaming video:', error)
    return NextResponse.json(
      { error: 'Failed to stream video' },
      { status: 500 }
    )
  }
}
