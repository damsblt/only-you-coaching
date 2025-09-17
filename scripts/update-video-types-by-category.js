#!/usr/bin/env node

/**
 * Update videoType based on category for existing rows
 * - category = 'Predefined Programs'  => videoType = 'PROGRAMMES'
 * - category = 'Muscle Groups'        => videoType = 'MUSCLE_GROUPS'
 */

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function run() {
  console.log('🔄 Updating videoType from category...')

  try {
    const updateProgrammes = await prisma.video.updateMany({
      where: { category: 'Predefined Programs' },
      data: { videoType: 'PROGRAMMES' }
    })

    const updateMuscleGroups = await prisma.video.updateMany({
      where: { category: 'Muscle Groups' },
      data: { videoType: 'MUSCLE_GROUPS' }
    })

    const counts = {
      programmes: await prisma.video.count({ where: { videoType: 'PROGRAMMES' } }),
      muscle: await prisma.video.count({ where: { videoType: 'MUSCLE_GROUPS' } })
    }

    console.log(`✅ Set PROGRAMMES from category: ${updateProgrammes.count}`)
    console.log(`✅ Set MUSCLE_GROUPS from category: ${updateMuscleGroups.count}`)
    console.log(`📈 Totals -> PROGRAMMES: ${counts.programmes}, MUSCLE_GROUPS: ${counts.muscle}`)
  } catch (err) {
    console.error('❌ Error:', err)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

if (require.main === module) run()


