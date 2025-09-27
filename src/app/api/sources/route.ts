import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const analysisId = searchParams.get('analysisId')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  if (!analysisId) {
    return NextResponse.json(
      { error: 'Analysis ID is required' },
      { status: 400 }
    )
  }

  // Mock sources data
  const mockSources = [
    {
      id: '1',
      analysisId,
      url: 'https://reuters.com/article/climate-change-study',
      title: 'Reuters: Climate Study Confirms Record Temperature Increases',
      publisher: 'Reuters',
      credibilityScore: 95,
      excerpt: 'According to the latest comprehensive study, global temperatures have reached unprecedented levels...',
      publishedAt: '2024-03-14T12:00:00Z',
      authorCredibility: 92,
      factCheckStatus: 'VERIFIED'
    },
    {
      id: '2',
      analysisId,
      url: 'https://apnews.com/article/climate-research-2024',
      title: 'Associated Press: New Climate Data Shows Accelerating Trends',
      publisher: 'Associated Press',
      credibilityScore: 93,
      excerpt: 'Independent research institutions have corroborated the findings of recent climate studies...',
      publishedAt: '2024-03-14T10:30:00Z',
      authorCredibility: 90,
      factCheckStatus: 'VERIFIED'
    },
    {
      id: '3',
      analysisId,
      url: 'https://bbc.com/news/science-climate-update',
      title: 'BBC Science: Climate Scientists Warn of Rapid Changes',
      publisher: 'BBC News',
      credibilityScore: 91,
      excerpt: 'Leading climate scientists from around the world have expressed concerns about the pace of change...',
      publishedAt: '2024-03-13T16:45:00Z',
      authorCredibility: 89,
      factCheckStatus: 'VERIFIED'
    },
    {
      id: '4',
      analysisId,
      url: 'https://nature.com/articles/climate-study-2024',
      title: 'Nature: Peer-Reviewed Climate Research Findings',
      publisher: 'Nature',
      credibilityScore: 98,
      excerpt: 'This peer-reviewed study presents compelling evidence for accelerated climate change patterns...',
      publishedAt: '2024-03-12T14:20:00Z',
      authorCredibility: 96,
      factCheckStatus: 'PEER_REVIEWED'
    },
    {
      id: '5',
      analysisId,
      url: 'https://guardian.com/environment/climate-analysis',
      title: 'The Guardian: Environmental Analysis of Climate Data',
      publisher: 'The Guardian',
      credibilityScore: 87,
      excerpt: 'Environmental experts analyze the implications of the latest climate research...',
      publishedAt: '2024-03-12T09:15:00Z',
      authorCredibility: 85,
      factCheckStatus: 'VERIFIED'
    }
  ]

  // Apply pagination
  const startIndex = (page - 1) * limit
  const paginatedSources = mockSources.slice(startIndex, startIndex + limit)

  // Calculate aggregate statistics
  const avgCredibilityScore = mockSources.reduce((sum, source) => sum + source.credibilityScore, 0) / mockSources.length
  const verifiedCount = mockSources.filter(source => source.factCheckStatus === 'VERIFIED' || source.factCheckStatus === 'PEER_REVIEWED').length

  return NextResponse.json({
    sources: paginatedSources,
    pagination: {
      page,
      limit,
      total: mockSources.length,
      pages: Math.ceil(mockSources.length / limit)
    },
    statistics: {
      totalSources: mockSources.length,
      averageCredibilityScore: Math.round(avgCredibilityScore * 100) / 100,
      verifiedSources: verifiedCount,
      verificationRate: Math.round((verifiedCount / mockSources.length) * 100)
    }
  })
}
