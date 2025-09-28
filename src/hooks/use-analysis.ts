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

    // Poll for analysis results
    const pollAnalysis = async () => {
      try {
        const response = await fetch(`/api/analyze?id=${analysisId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const analysisData = await response.json()
        
        if (analysisData.status === 'COMPLETED') {
          setAnalysis(analysisData)
          setIsLoading(false)
        } else if (analysisData.status === 'FAILED') {
          setError(analysisData.error || 'Analysis failed')
          setIsLoading(false)
        } else {
          // Still pending or in progress, continue polling
          setTimeout(pollAnalysis, 2000) // Poll every 2 seconds
        }
        
      } catch (error) {
        console.error('Error polling analysis:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch analysis')
        setIsLoading(false)
      }
    }

    // Start polling
    pollAnalysis()
  }, [analysisId])

  return { analysis, isLoading, error }
}
