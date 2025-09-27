import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create demo users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@fakenews-detector.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@fakenews-detector.com',
      role: 'ADMIN'
    }
  })

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@fakenews-detector.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@fakenews-detector.com',
      role: 'USER'
    }
  })

  console.log('👤 Created users:', { adminUser, demoUser })

  // Create sample analyses
  const analysis1 = await prisma.analysis.create({
    data: {
      userId: demoUser.id,
      inputType: 'URL',
      inputText: null,
      inputUrl: 'https://example.com/climate-study',
      inputHash: 'hash_climate_study_2024',
      status: 'COMPLETED',
      verdict: 'TRUE',
      confidence: 0.92,
      reasoning: {
        summary: 'Climate study verified through multiple credible sources',
        factors: [
          'Source credibility confirmed',
          'Data cross-referenced with peer-reviewed studies',
          'No contradictory evidence found'
        ],
        methodology: 'Multi-source verification with AI-powered fact-checking'
      }
    }
  })

  const analysis2 = await prisma.analysis.create({
    data: {
      userId: demoUser.id,
      inputType: 'TEXT',
      inputText: 'Celebrity death hoax spreading on social media claiming famous actor died in car crash',
      inputUrl: null,
      inputHash: 'hash_celebrity_hoax_2024',
      status: 'COMPLETED',
      verdict: 'FALSE',
      confidence: 0.95,
      reasoning: {
        summary: 'Celebrity death hoax debunked by official sources',
        factors: [
          'No credible news sources reporting the incident',
          'Celebrity\'s official social media accounts active',
          'Previous similar hoaxes identified'
        ],
        methodology: 'Social media verification and official source checking'
      }
    }
  })

  const analysis3 = await prisma.analysis.create({
    data: {
      userId: demoUser.id,
      inputType: 'URL',
      inputText: null,
      inputUrl: 'https://example.com/covid-variant-news',
      inputHash: 'hash_covid_variant_2024',
      status: 'COMPLETED',
      verdict: 'MIXED',
      confidence: 0.76,
      reasoning: {
        summary: 'COVID variant report contains both accurate and speculative information',
        factors: [
          'Core facts about variant existence confirmed',
          'Transmission rate claims lack sufficient evidence',
          'Some statistics appear to be outdated'
        ],
        methodology: 'Medical source verification and data validation'
      }
    }
  })

  console.log('📊 Created analyses:', { analysis1, analysis2, analysis3 })

  // Create analysis steps for the first analysis
  const steps = [
    { step: 'CONTENT_EXTRACTION' as const, status: 'COMPLETED' as const },
    { step: 'SOURCE_DISCOVERY' as const, status: 'COMPLETED' as const },
    { step: 'FACT_CHECKING' as const, status: 'COMPLETED' as const },
    { step: 'CREDIBILITY_SCORING' as const, status: 'COMPLETED' as const },
    { step: 'VERDICT_GENERATION' as const, status: 'COMPLETED' as const }
  ]

  for (const stepData of steps) {
    await prisma.analysisStep.create({
      data: {
        analysisId: analysis1.id,
        step: stepData.step,
        status: stepData.status,
        details: {
          duration: Math.random() * 2000 + 500,
          processed: true,
          notes: `${stepData.step} completed successfully`
        },
        startedAt: new Date(Date.now() - Math.random() * 10000),
        finishedAt: new Date()
      }
    })
  }

  // Create sources for analyses
  const sources = [
    {
      analysisId: analysis1.id,
      url: 'https://reuters.com/climate-study',
      title: 'Reuters: Climate Study Confirms Temperature Increases',
      publisher: 'Reuters',
      credibilityScore: 95.0,
      excerpt: 'Independent climate research confirms record temperature increases...',
      citation: { type: 'news_article', date: '2024-03-14', verified: true }
    },
    {
      analysisId: analysis1.id,
      url: 'https://nature.com/climate-research',
      title: 'Nature: Peer-Reviewed Climate Analysis',
      publisher: 'Nature',
      credibilityScore: 98.0,
      excerpt: 'Comprehensive peer-reviewed study on global temperature trends...',
      citation: { type: 'scientific_journal', date: '2024-03-12', peer_reviewed: true }
    },
    {
      analysisId: analysis2.id,
      url: 'https://snopes.com/celebrity-death-hoax',
      title: 'Snopes: Celebrity Death Hoax Debunked',
      publisher: 'Snopes',
      credibilityScore: 92.0,
      excerpt: 'Fact-checking reveals this celebrity death claim is false...',
      citation: { type: 'fact_check', date: '2024-03-13', verified: false }
    }
  ]

  for (const sourceData of sources) {
    await prisma.source.create({ data: sourceData })
  }

  console.log('🔍 Created sources')

  // Create sample reports
  await prisma.report.create({
    data: {
      analysisId: analysis2.id,
      userId: demoUser.id,
      reason: 'Potentially harmful misinformation',
      details: 'This hoax could cause distress to fans and family members',
      status: 'PENDING'
    }
  })

  console.log('📝 Created reports')

  console.log('✅ Database seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
