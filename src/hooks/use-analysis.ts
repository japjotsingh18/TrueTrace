'use client'

import { useState, useEffect } from 'react'

interface Analysis {
  id: string
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  reasoning: any
  sources: any[]
  createdAt: string
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
}

export function useAnalysis(analysisId: string | null) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!analysisId) {
      setAnalysis(null)
      setIsLoading(false)
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    // Mock API call - simulate analysis completion
    const mockAnalysis = () => {
      setTimeout(() => {
        // Simulate random results for demo
        const verdicts: Array<'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'> = ['TRUE', 'FALSE', 'MIXED', 'UNVERIFIED']
        const randomVerdict = verdicts[Math.floor(Math.random() * verdicts.length)]
        const randomConfidence = Math.random() * 0.4 + 0.6 // Between 0.6 and 1.0

        const mockResult: Analysis = {
          id: analysisId,
          verdict: randomVerdict,
          confidence: randomConfidence,
          reasoning: {
            summary: 'AI analysis completed successfully',
            factors: ['Source credibility', 'Content consistency', 'Historical accuracy']
          },
          sources: [],
          createdAt: new Date().toISOString(),
          status: 'COMPLETED'
        }

        setAnalysis(mockResult)
        setIsLoading(false)
      }, 3000) // Simulate 3 second analysis time
    }

    mockAnalysis()
  }, [analysisId])

  return { analysis, isLoading, error }
}
