import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { geminiFactChecker } from '@/lib/gemini'
import { fetchWebpageContent } from '@/lib/fetch_webpage'

const analyzeSchema = z.object({
  input: z.string().min(1, 'Input is required'),
  inputType: z.enum(['url', 'text', 'file']),
  fileName: z.string().optional(),
  fileSize: z.number().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
  let { input, inputType, fileName, fileSize } = analyzeSchema.parse(body)

    // Generate a unique analysis ID
    const analysisId = crypto.randomUUID()

    // Create content hash for deduplication
    const inputHash = crypto.createHash('sha256').update(input).digest('hex')

    // Store analysis in memory for demo (in production, use database)
    analysisStore[analysisId] = {
      id: analysisId,
      status: 'PENDING',
      input,
      inputType,
      createdAt: new Date().toISOString()
    }

    // Start analysis in background
    performAnalysis(analysisId, input, inputType)

    const response = {
      analysisId,
      inputHash,
      status: 'PENDING',
      message: 'Analysis started successfully'
    }

    // Simulate some basic validation
    let extractedText: string | undefined = undefined;
    if (inputType === 'url') {
      try {
        new URL(input)
        console.log('[TIMING] Starting fetchWebpageContent:', input)
        const fetchStart = Date.now();
        // Fetch and extract webpage content for analysis
        extractedText = await fetchWebpageContent(input)
        const fetchEnd = Date.now();
        console.log(`[TIMING] fetchWebpageContent took ${fetchEnd - fetchStart}ms`)
        input = extractedText
        if (!input || input.length < 50) {
          return NextResponse.json(
            { error: 'Could not extract enough content from the provided URL.' },
            { status: 400 }
          )
        }
      } catch (err) {
        console.log('[TIMING] fetchWebpageContent failed:', err)
        return NextResponse.json(
          { error: 'Invalid URL format or failed to fetch content' },
          { status: 400 }
        )
      }
    }

    if (inputType === 'text' && input.length < 50) {
      return NextResponse.json(
        { error: 'Text input must be at least 50 characters long' },
        { status: 400 }
      )
    }

    if (inputType === 'file' && fileSize && fileSize > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 10MB' },
        { status: 400 }
      )
    }

    // Include extractedText in response for debugging/display if present
    if (inputType === 'url' && extractedText) {
      return NextResponse.json({ ...response, extractedText }, { status: 201 })
    }
    return NextResponse.json(response, { status: 201 })

  } catch (error) {
    console.error('Analysis API error:', error)
    
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

// In-memory storage for demo (use database in production)
const analysisStore: Record<string, any> = {}

// Helper function to get step descriptions
function getStepDescription(stepId: string): string {
  const descriptions = {
    'CONTENT_EXTRACTION': 'Parsing and extracting article content',
    'SOURCE_DISCOVERY': 'Finding related sources and references',
    'FACT_CHECKING': 'Cross-referencing claims with databases',
    'CREDIBILITY_SCORING': 'Analyzing source credibility and reputation',
    'VERDICT_GENERATION': 'Generating final verdict and confidence score'
  }
  return descriptions[stepId as keyof typeof descriptions] || 'Processing...'
}

// Background analysis function
async function performAnalysis(analysisId: string, input: string, inputType: string) {
  try {
    console.log(`Starting analysis for ${analysisId}...`)
    
    // Initialize workflow steps
    const workflowSteps = [
      'CONTENT_EXTRACTION',
      'SOURCE_DISCOVERY', 
      'FACT_CHECKING',
      'CREDIBILITY_SCORING',
      'VERDICT_GENERATION'
    ]

    // Update status to IN_PROGRESS with workflow tracking
    analysisStore[analysisId] = {
      ...analysisStore[analysisId],
      status: 'IN_PROGRESS',
      currentStep: 'CONTENT_EXTRACTION',
      workflowSteps: workflowSteps.map(step => ({
        id: step,
        status: step === 'CONTENT_EXTRACTION' ? 'IN_PROGRESS' : 'PENDING',
        startedAt: step === 'CONTENT_EXTRACTION' ? new Date().toISOString() : null,
        finishedAt: null,
        description: getStepDescription(step)
      })),
      updatedAt: new Date().toISOString()
    }

    // Progress callback to update workflow status
    const progressCallback = (stepId: string, description: string) => {
      const steps = [...analysisStore[analysisId].workflowSteps]
      const currentStepIndex = steps.findIndex(s => s.id === stepId)
      
      if (currentStepIndex !== -1) {
        // Mark previous steps as completed
        for (let i = 0; i < currentStepIndex; i++) {
          if (steps[i].status === 'IN_PROGRESS') {
            steps[i].status = 'COMPLETED'
            steps[i].finishedAt = new Date().toISOString()
          }
        }
        
        // Mark current step as in progress
        steps[currentStepIndex].status = 'IN_PROGRESS'
        steps[currentStepIndex].startedAt = new Date().toISOString()
        steps[currentStepIndex].description = description
        
        // Update store
        analysisStore[analysisId] = {
          ...analysisStore[analysisId],
          currentStep: stepId,
          workflowSteps: steps,
          updatedAt: new Date().toISOString()
        }
      }
    }

    console.log('[TIMING] Starting Gemini analysis for', analysisId)
    const geminiStart = Date.now();
    // Perform Gemini analysis with real-time progress updates
    const analysisPromise = geminiFactChecker.analyzeContent({
      content: input,
      contentType: inputType as 'url' | 'text' | 'file',
      url: inputType === 'url' ? input : undefined,
      progressCallback
    })

    // Set a timeout for the analysis (15 seconds max to allow for all steps)
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Analysis timeout')), 15000)
    )

    const analysisResult = await Promise.race([analysisPromise, timeoutPromise]) as any
    const geminiEnd = Date.now();
    console.log(`[TIMING] Gemini analysis took ${geminiEnd - geminiStart}ms for`, analysisId)

    // Mark all workflow steps as completed
    const completedSteps = analysisStore[analysisId].workflowSteps.map((step: any) => ({
      ...step,
      status: 'COMPLETED',
      finishedAt: step.finishedAt || new Date().toISOString()
    }))

    // Store completed analysis
    analysisStore[analysisId] = {
      ...analysisStore[analysisId],
      status: 'COMPLETED',
      currentStep: 'VERDICT_GENERATION',
      workflowSteps: completedSteps,
      verdict: analysisResult.verdict,
      confidence: analysisResult.confidence,
      reasoning: analysisResult.reasoning,
      sources: analysisResult.sources || [],
      isInvalid: analysisResult.isInvalid || false,
      invalidReason: analysisResult.invalidReason || '',
      updatedAt: new Date().toISOString()
    }

    console.log(`Analysis completed for ${analysisId}:`, analysisResult.verdict, analysisResult.confidence)
    console.log('Analysis store after completion:', JSON.stringify(analysisStore[analysisId], null, 2))
    
  } catch (error) {
    console.error(`Analysis failed for ${analysisId}:`, error)
    
    // Mark current step as failed
    const failedSteps = (analysisStore[analysisId]?.workflowSteps || []).map((step: any) => {
      if (step.status === 'IN_PROGRESS') {
        return {
          ...step,
          status: 'FAILED',
          finishedAt: new Date().toISOString()
        }
      }
      return step
    })
    
    // Store failed analysis
    analysisStore[analysisId] = {
      ...analysisStore[analysisId],
      status: 'FAILED',
      workflowSteps: failedSteps,
      error: error instanceof Error ? error.message : 'Analysis failed',
      updatedAt: new Date().toISOString()
    }
  }
}

// GET method for polling analysis status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const analysisId = searchParams.get('id')

  if (!analysisId) {
    return NextResponse.json(
      { error: 'Analysis ID is required' },
      { status: 400 }
    )
  }

  // Get analysis from store
  const analysis = analysisStore[analysisId]
  
  if (!analysis) {
    console.log(`Analysis not found for ID: ${analysisId}`)
    console.log('Available analysis IDs:', Object.keys(analysisStore))
    return NextResponse.json(
      { error: 'Analysis not found' },
      { status: 404 }
    )
  }

  // Log the analysis status for debugging
  console.log(`Returning analysis for ${analysisId}:`, analysis.status)

  return NextResponse.json(analysis)
}
