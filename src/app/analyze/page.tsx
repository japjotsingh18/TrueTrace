'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnalysisInput } from '@/components/analyze/analysis-input'
import { AgentWorkflow } from '@/components/analyze/agent-workflow'
import { AnalysisResults } from '@/components/analyze/analysis-results'
import { useAnalysis } from '@/hooks/use-analysis'
import { toast } from 'react-hot-toast'

export default function AnalyzePage() {
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const { analysis, isLoading, error } = useAnalysis(analysisId)
  const searchParams = useSearchParams()

  const handleStartAnalysis = (id: string) => {
    setAnalysisId(id)
  }

  // Auto-start analysis if URL parameter is provided, or load existing analysis
  useEffect(() => {
    const inputFromUrl = searchParams.get('input')
    const idFromUrl = searchParams.get('id')
    
    if (idFromUrl && !analysisId) {
      // Load existing analysis
      setAnalysisId(idFromUrl)
    } else if (inputFromUrl && !analysisId) {
      // Automatically start new analysis
      startAnalysisFromUrl(inputFromUrl)
    }
  }, [searchParams, analysisId])

  const startAnalysisFromUrl = async (input: string) => {
    try {
      // Determine input type
      let inputType: 'url' | 'text' = 'text'
      try {
        new URL(input)
        inputType = 'url'
      } catch {
        inputType = 'text'
      }

      // Validate input
      if (inputType === 'url') {
        if (!input.trim()) {
          toast.error('Please enter a valid URL')
          return
        }
      } else if (inputType === 'text') {
        if (!input.trim() || input.length < 10) {
          toast.error('Please enter at least 10 characters of text')
          return
        }
      }

      // Start analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: input.trim(),
          inputType
        })
      })

      if (!response.ok) throw new Error('Failed to start analysis')
      
      const result = await response.json()
      setAnalysisId(result.analysisId)
      toast.success('Analysis started automatically!')
      
    } catch (error) {
      console.error('Auto-analysis failed:', error)
      toast.error('Failed to start automatic analysis. Please try manually.')
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">AI Fact-Checker</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Enter a URL, upload an article, or paste text to verify its authenticity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main analysis area */}
          <div className="lg:col-span-2 space-y-8">
            <AnalysisInput onAnalysisStart={handleStartAnalysis} />
            {analysisId && <AnalysisResults analysis={analysis} isLoading={isLoading} error={error} />}
          </div>

          {/* Agent workflow sidebar */}
          <div className="lg:col-span-1">
            <AgentWorkflow analysisId={analysisId} />
          </div>
        </div>
      </div>
    </div>
  )
}
