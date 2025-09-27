'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  HelpCircle,
  ExternalLink,
  Eye,
  BarChart3,
  FileText,
  Calendar,
  User,
  Globe,
  TrendingUp,
  Shield
} from 'lucide-react'
import { format } from '@/lib/date-utils'

interface Analysis {
  id: string
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  reasoning: any
  sources: Source[]
  createdAt: string
}

interface Source {
  id: string
  url: string
  title: string
  publisher: string
  credibilityScore: number
  excerpt: string
}

interface AnalysisResultsProps {
  analysis: Analysis | null
  isLoading: boolean
  error: string | null
}

export function AnalysisResults({ analysis, isLoading, error }: AnalysisResultsProps) {
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl border border-red-500/30"
      >
        <div className="text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Analysis Failed</h3>
          <p className="text-gray-300">{error}</p>
        </div>
      </motion.div>
    )
  }

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-2xl"
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-white mb-2">Analyzing Content...</h3>
          <p className="text-gray-300">Our AI agents are working to verify this content</p>
        </div>
      </motion.div>
    )
  }

  if (!analysis) {
    return null
  }

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'TRUE':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          label: 'Verified True',
          description: 'This content appears to be factually accurate'
        }
      case 'FALSE':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: 'Likely False',
          description: 'This content contains misleading or false information'
        }
      case 'MIXED':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: 'Mixed Accuracy',
          description: 'This content contains both accurate and inaccurate information'
        }
      case 'UNVERIFIED':
      default:
        return {
          icon: HelpCircle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          label: 'Unverified',
          description: 'Unable to verify this content with available sources'
        }
    }
  }

  const verdictConfig = getVerdictConfig(analysis.verdict)
  const VerdictIcon = verdictConfig.icon

  // Mock data for demonstration
  const mockSources = [
    {
      id: '1',
      url: 'https://reuters.com/article/example',
      title: 'Reuters confirms key facts in the article',
      publisher: 'Reuters',
      credibilityScore: 95,
      excerpt: 'According to our investigation, the main claims presented in the article are supported by official sources...'
    },
    {
      id: '2',
      url: 'https://apnews.com/article/example',
      title: 'AP News provides additional context',
      publisher: 'Associated Press',
      credibilityScore: 93,
      excerpt: 'Further analysis reveals that while the core facts are accurate, some context may be missing...'
    },
    {
      id: '3',
      url: 'https://bbc.com/news/example',
      title: 'BBC News corroborates timeline',
      publisher: 'BBC News',
      credibilityScore: 91,
      excerpt: 'The timeline of events matches our independent reporting on this subject matter...'
    }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="space-y-6"
      >
        {/* Main Verdict Card */}
        <div className={`glass-card p-8 rounded-2xl ${verdictConfig.borderColor} border`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`${verdictConfig.bgColor} p-3 rounded-xl`}>
                <VerdictIcon className={`w-8 h-8 ${verdictConfig.color}`} />
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${verdictConfig.color} mb-1`}>
                  {verdictConfig.label}
                </h2>
                <p className="text-gray-300">
                  {verdictConfig.description}
                </p>
              </div>
            </div>
            
            {/* Confidence Score */}
            <div className="text-right">
              <div className="text-3xl font-bold text-white mb-1">
                {Math.round(analysis.confidence * 100)}%
              </div>
              <div className="text-gray-400 text-sm">Confidence</div>
              <div className="w-20 bg-gray-700 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${analysis.confidence * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-2 rounded-full ${
                    analysis.confidence >= 0.8 ? 'bg-green-500' :
                    analysis.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Analysis Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-white/5 rounded-xl">
            <div className="text-center">
              <Calendar className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">
                {format(new Date(analysis.createdAt), 'MMM dd, yyyy')}
              </div>
              <div className="text-xs text-gray-400">Analyzed</div>
            </div>
            <div className="text-center">
              <Globe className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">{mockSources.length}</div>
              <div className="text-xs text-gray-400">Sources Checked</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">2.3s</div>
              <div className="text-xs text-gray-400">Analysis Time</div>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">High</div>
              <div className="text-xs text-gray-400">Reliability</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              <span>Show Evidence</span>
            </button>
            <button className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4" />
              <span>Compare Sources</span>
            </button>
            <button className="flex items-center space-x-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors">
              <FileText className="w-4 h-4" />
              <span>Full Report</span>
            </button>
          </div>
        </div>

        {/* Sources Section */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 text-primary-500 mr-2" />
            Verified Sources ({mockSources.length})
          </h3>
          
          <div className="space-y-4">
            {mockSources.map((source, index) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-medium">{source.title}</h4>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span>{source.publisher}</span>
                      <span>•</span>
                      <span>Credibility: {source.credibilityScore}%</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      source.credibilityScore >= 90 ? 'bg-green-500/20 text-green-400' :
                      source.credibilityScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {source.credibilityScore >= 90 ? 'High' :
                       source.credibilityScore >= 80 ? 'Medium' : 'Low'} Trust
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {source.excerpt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
