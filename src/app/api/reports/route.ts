import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const reportSchema = z.object({
  analysisId: z.string(),
  reason: z.string().min(1, 'Reason is required'),
  details: z.string().optional()
})

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const filter = searchParams.get('filter') || 'all'

  // Mock reports data
  const mockReports = [
    {
      id: '1',
      title: 'Climate Change Study Analysis',
      verdict: 'TRUE',
      confidence: 0.92,
      createdAt: '2024-03-15T10:30:00Z',
      sourcesCount: 8,
      url: 'https://example.com/climate-study'
    },
    {
      id: '2',
      title: 'COVID-19 Variant News Report',
      verdict: 'MIXED',
      confidence: 0.76,
      createdAt: '2024-03-14T15:45:00Z',
      sourcesCount: 5
    },
    {
      id: '3',
      title: 'Celebrity Death Hoax Investigation',
      verdict: 'FALSE',
      confidence: 0.95,
      createdAt: '2024-03-13T08:20:00Z',
      sourcesCount: 3,
      url: 'https://example.com/celebrity-hoax'
    }
  ]

  // Apply filtering
  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.verdict === filter)

  // Apply pagination
  const startIndex = (page - 1) * limit
  const paginatedReports = filteredReports.slice(startIndex, startIndex + limit)

  return NextResponse.json({
    reports: paginatedReports,
    pagination: {
      page,
      limit,
      total: filteredReports.length,
      pages: Math.ceil(filteredReports.length / limit)
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { analysisId, reason, details } = reportSchema.parse(body)

    // In a real application, you would:
    // 1. Validate the user is authenticated
    // 2. Check if the analysis exists
    // 3. Store the report in the database
    // 4. Send notification to admins

    const reportId = crypto.randomUUID()

    const mockReport = {
      id: reportId,
      analysisId,
      reason,
      details,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      message: 'Report submitted successfully'
    }

    return NextResponse.json(mockReport, { status: 201 })

  } catch (error) {
    console.error('Report API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
