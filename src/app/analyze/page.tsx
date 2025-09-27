'use client'

import { useState } from 'react'
import { AnalysisInput } from '@/components/analyze/analysis-input'
import { AgentWorkflow } from '@/components/analyze/agent-workflow'
import { AnalysisResults } from '@/components/analyze/analysis-results'
import { useAnalysis } from '@/hooks/use-analysis'

export default function AnalyzePage() {
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const { analysis, isLoading, error } = useAnalysis(analysisId)

  const handleStartAnalysis = (id: string) => {
    setAnalysisId(id)
  }

  return (
    <div className="min-h-screen bg-navy-900 py-8">
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
