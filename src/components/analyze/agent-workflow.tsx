'use client'

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
  // Mock data for demonstration - in real app, this would come from API
  const mockSteps = analysisId ? [
    { id: 'CONTENT_EXTRACTION', status: 'COMPLETED', startedAt: new Date(Date.now() - 8000), finishedAt: new Date(Date.now() - 7000) },
    { id: 'SOURCE_DISCOVERY', status: 'COMPLETED', startedAt: new Date(Date.now() - 7000), finishedAt: new Date(Date.now() - 5000) },
    { id: 'FACT_CHECKING', status: 'IN_PROGRESS', startedAt: new Date(Date.now() - 5000) },
    { id: 'CREDIBILITY_SCORING', status: 'PENDING' },
    { id: 'VERDICT_GENERATION', status: 'PENDING' }
  ] : []

  const getStepStatus = (stepId: string) => {
    return mockSteps.find(step => step.id === stepId)?.status || 'PENDING'
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
            const mockStep = mockSteps.find(s => s.id === step.id)
            
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
                      {step.description}
                    </p>
                    
                    {mockStep && (
                      <div className="text-xs text-gray-500">
                        {status === 'COMPLETED' && mockStep.finishedAt && (
                          <div>
                            Completed in {Math.round((mockStep.finishedAt.getTime() - mockStep.startedAt!.getTime()) / 1000)}s
                          </div>
                        )}
                        {status === 'IN_PROGRESS' && (
                          <div>
                            Running for {Math.round((Date.now() - mockStep.startedAt!.getTime()) / 1000)}s
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
              {mockSteps.filter(s => s.status === 'COMPLETED').length} / {workflowSteps.length}
            </div>
            <div className="text-gray-400 text-sm">Steps Completed</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
