'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Search, 
  CheckCircle2, 
  Clock, 
  FileText,
  Globe,
  BarChart3,
  AlertTriangle,
  Loader2
} from 'lucide-react'

interface AgentWorkflowProps {
  analysisId: string | null
}

const workflowSteps = [
  {
    id: 'CONTENT_EXTRACTION',
    title: 'Content Extraction',
    description: 'Parsing and extracting article content',
    icon: FileText,
    color: 'text-blue-400'
  },
  {
    id: 'SOURCE_DISCOVERY',
    title: 'Source Discovery',
    description: 'Finding related sources and references',
    icon: Search,
    color: 'text-green-400'
  },
  {
    id: 'FACT_CHECKING',
    title: 'Fact Checking',
    description: 'Cross-referencing claims with databases',
    icon: Brain,
    color: 'text-purple-400'
  },
  {
    id: 'CREDIBILITY_SCORING',
    title: 'Credibility Analysis',
    description: 'Analyzing source credibility and reputation',
    icon: BarChart3,
    color: 'text-yellow-400'
  },
  {
    id: 'VERDICT_GENERATION',
    title: 'Final Verdict',
    description: 'Generating final verdict and confidence score',
    icon: CheckCircle2,
    color: 'text-primary-400'
  }
]

export function AgentWorkflow({ analysisId }: AgentWorkflowProps) {
  const [workflowProgress, setWorkflowProgress] = useState<any[]>([])
  const [analysisStatus, setAnalysisStatus] = useState<string>('PENDING')
  const [currentStep, setCurrentStep] = useState<string>('')

  // Poll for analysis status and update workflow accordingly
  useEffect(() => {
    if (!analysisId) {
      setWorkflowProgress([])
      setAnalysisStatus('PENDING')
      setCurrentStep('')
      return
    }

    const pollAnalysisStatus = async () => {
      try {
        const response = await fetch(`/api/analyze?id=${analysisId}`)
        if (response.ok) {
          const data = await response.json()
          setAnalysisStatus(data.status)
          setCurrentStep(data.currentStep || '')
          
          // Use real workflow steps from API if available
          if (data.workflowSteps && Array.isArray(data.workflowSteps)) {
            // Convert API timestamps to Date objects for compatibility
            const stepsWithDates = data.workflowSteps.map((step: any) => ({
              ...step,
              startedAt: step.startedAt ? new Date(step.startedAt) : null,
              finishedAt: step.finishedAt ? new Date(step.finishedAt) : null
            }))
            setWorkflowProgress(stepsWithDates)
          } else {
            // Fallback to basic workflow status if detailed steps not available
            setWorkflowProgress(workflowSteps.map(step => ({
              id: step.id,
              status: data.status === 'COMPLETED' ? 'COMPLETED' : 
                     data.status === 'FAILED' ? 'FAILED' : 'PENDING',
              description: step.description
            })))
          }
          
          // Continue polling if still in progress
          if (data.status === 'PENDING' || data.status === 'IN_PROGRESS') {
            setTimeout(pollAnalysisStatus, 1000)
          }
        }
      } catch (error) {
        console.error('Failed to poll analysis status:', error)
        // Retry polling after error
        if (analysisStatus === 'PENDING' || analysisStatus === 'IN_PROGRESS') {
          setTimeout(pollAnalysisStatus, 2000)
        }
      }
    }

    // Start polling immediately
    pollAnalysisStatus()
  }, [analysisId, analysisStatus])

  const getStepStatus = (stepId: string) => {
    return workflowProgress.find((step: any) => step.id === stepId)?.status || 'PENDING'
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return CheckCircle2
      case 'IN_PROGRESS':
        return Loader2
      case 'FAILED':
        return AlertTriangle
      default:
        return Clock
    }
  }

  const getStepIconColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-500'
      case 'IN_PROGRESS':
        return 'text-primary-500'
      case 'FAILED':
        return 'text-red-500'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className="glass-card p-6 rounded-2xl h-fit sticky top-8">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="w-6 h-6 text-primary-500" />
        <h2 className="text-xl font-semibold text-white">AI Agent Workflow</h2>
      </div>

      {!analysisId ? (
        <div className="text-center py-8">
          <Globe className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400">
            Start an analysis to see the AI agents in action
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {workflowSteps.map((step, index) => {
            const status = getStepStatus(step.id)
            const StatusIcon = getStepIcon(status)
            const workflowStep = workflowProgress.find((s: any) => s.id === step.id)
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative border rounded-xl p-4 transition-all duration-300 ${
                  status === 'COMPLETED' 
                    ? 'border-green-500/30 bg-green-500/5' 
                    : status === 'IN_PROGRESS'
                    ? 'border-primary-500/30 bg-primary-500/5'
                    : status === 'FAILED'
                    ? 'border-red-500/30 bg-red-500/5'
                    : 'border-white/20 bg-white/5'
                }`}
              >
                {/* Connection line */}
                {index < workflowSteps.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-white/20"></div>
                )}

                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${getStepIconColor(status)}`}>
                    <StatusIcon 
                      className={`w-5 h-5 ${status === 'IN_PROGRESS' ? 'animate-spin' : ''}`} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {workflowStep?.description || step.description}
                    </p>
                    
                    {workflowStep && (
                      <div className="text-xs text-gray-500">
                        {status === 'COMPLETED' && workflowStep.finishedAt && workflowStep.startedAt && (
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center space-x-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                              <span>Completed in {Math.round((workflowStep.finishedAt.getTime() - workflowStep.startedAt.getTime()) / 1000)}s</span>
                            </span>
                          </div>
                        )}
                        {status === 'IN_PROGRESS' && workflowStep.startedAt && (
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                              <span>Running for {Math.round((Date.now() - workflowStep.startedAt.getTime()) / 1000)}s</span>
                            </div>
                          </div>
                        )}
                        {status === 'PENDING' && (
                          <div className="flex items-center space-x-2">
                            <Clock className="w-3 h-3 text-gray-500" />
                            <span>Waiting to start...</span>
                          </div>
                        )}
                        {status === 'FAILED' && (
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span>Failed to complete</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {analysisId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 pt-6 border-t border-white/20"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-500 mb-1">
              {workflowProgress.filter((s: any) => s.status === 'COMPLETED').length} / {workflowSteps.length}
            </div>
            <div className="text-gray-400 text-sm">Steps Completed</div>
            
            {/* Current Step Indicator */}
            {analysisStatus === 'IN_PROGRESS' && currentStep && (
              <div className="mt-4 p-3 bg-primary-500/10 border border-primary-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="w-4 h-4 text-primary-500 animate-spin" />
                  <span className="text-primary-400 text-sm font-medium">
                    Currently: {workflowSteps.find(s => s.id === currentStep)?.title || currentStep}
                  </span>
                </div>
              </div>
            )}
            
            {/* Analysis Status */}
            {analysisStatus === 'COMPLETED' && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-green-400 text-sm font-medium">Analysis Complete!</span>
                </div>
              </div>
            )}
            
            {analysisStatus === 'FAILED' && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-red-400 text-sm font-medium">Analysis Failed</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
