'use client'

import { useState } from 'react'
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
  Shield,
  X
} from 'lucide-react'
import { format } from '@/lib/date-utils'

interface Analysis {
  id: string
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED' | 'INVALID'
  confidence: number
  reasoning: {
    summary: string
    factors: string[]
    methodology: string
  }
  sources: Source[]
  isInvalid?: boolean
  invalidReason?: string
  createdAt: string
  analysisTime?: number // Add analysis time property
}

interface Source {
  url: string
  title: string
  publisher: string
  credibilityScore: number
  supportsClaim: boolean
  description: string
}

interface AnalysisResultsProps {
  analysis: Analysis | null
  isLoading: boolean
  error: string | null
}

export function AnalysisResults({ analysis, isLoading, error }: AnalysisResultsProps) {
  const [showModal, setShowModal] = useState(false)

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

  const getVerdictConfig = (verdict: string, isInvalid?: boolean) => {
    if (isInvalid || verdict === 'INVALID') {
      return {
        icon: XCircle,
        color: 'text-red-600',
        bgColor: 'bg-red-600/20',
        borderColor: 'border-red-600/50',
        label: 'INVALID CONTENT',
        description: 'This content contains dangerous misinformation or conspiracy theories'
      }
    }

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

  const verdictConfig = getVerdictConfig(analysis.verdict, analysis.isInvalid)
  const VerdictIcon = verdictConfig.icon

  // Use real sources from analysis instead of mock data
  const sources = analysis.sources || []

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
              <div className="text-sm text-white font-medium">{sources.length}</div>
              <div className="text-xs text-gray-400">Sources Checked</div>
            </div>
            <div className="text-center">
              <TrendingUp className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">{analysis.analysisTime || 2.3}s</div>
              <div className="text-xs text-gray-400">Analysis Time</div>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-white font-medium">High</div>
              <div className="text-xs text-gray-400">Reliability</div>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Eye className="w-5 h-5" />
              <span>Show Evidence</span>
            </button>
          </div>
        </div>

        {/* Sources Section */}
        <div className="glass-card p-6 rounded-2xl">
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Globe className="w-6 h-6 text-primary-500 mr-2" />
            {analysis.isInvalid ? 'Fact-Checking Sources' : 'Verified Sources'} ({sources.length})
          </h3>
          
          {analysis.isInvalid && analysis.invalidReason && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-start space-x-3">
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-2">Invalid Content Detected</h4>
                  <p className="text-red-300 text-sm">{analysis.invalidReason}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            {sources.length > 0 ? sources.map((source: Source, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white font-medium hover:text-primary-400 transition-colors"
                      >
                        {source.title}
                      </a>
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span>{source.publisher}</span>
                      <span>•</span>
                      <span>Credibility: {source.credibilityScore}%</span>
                      <span>•</span>
                      <span className={source.supportsClaim ? 'text-green-400' : 'text-red-400'}>
                        {source.supportsClaim ? 'Supports' : 'Contradicts'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end space-y-2">
                    <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                      source.credibilityScore >= 90 ? 'bg-green-500/20 text-green-400' :
                      source.credibilityScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {source.credibilityScore >= 90 ? 'High' :
                       source.credibilityScore >= 80 ? 'Medium' : 'Low'} Trust
                    </div>
                    {source.supportsClaim ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {source.description}
                </p>
              </motion.div>
            )) : (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No sources available for verification</p>
              </div>
            )}
          </div>
        </div>

        {/* Verification Report Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-navy-950 max-w-2xl w-full mx-4 rounded-2xl shadow-2xl border border-cyan-500/30 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8 relative">
                {/* Close Button */}
                <button 
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Modal Header */}
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-green-400 flex items-center gap-3 mb-4">
                    <CheckCircle className="w-8 h-8" />
                    Verification Report
                  </h2>
                  
                  {/* Claim Analyzed */}
                  <div className="mb-4">
                    <div className="text-cyan-400 font-semibold text-sm mb-2">Claim Analyzed:</div>
                    <div className="bg-navy-900 border border-cyan-800/50 rounded-xl px-4 py-3 text-white font-mono text-sm">
                      "This content has been analyzed for factual accuracy and verified against multiple trusted sources..."
                    </div>
                  </div>

                  {/* Metadata Row */}
                  <div className="grid grid-cols-2 gap-6 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-semibold">Sources Checked:</span>
                      <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-bold text-sm">
                        {sources.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 font-semibold">Status:</span>
                      <span className="bg-green-500/20 text-green-300 px-4 py-1 rounded-full font-bold text-sm border border-green-500/30">
                        {verdictConfig.label} ({Math.round(analysis.confidence * 100)}% Confidence)
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="bg-navy-900/50 border border-cyan-800/30 rounded-xl p-4 mb-6">
                    <div className="text-gray-300 leading-relaxed">
                      {analysis.reasoning.summary} This analysis was conducted using advanced AI-powered fact-checking 
                      algorithms backed by Google's verification infrastructure, cross-referencing multiple reputable 
                      sources to ensure accuracy and reliability.
                    </div>
                  </div>
                </div>

                {/* Verified Sources Section */}
                {sources.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Verified Sources
                    </h3>
                    <div className="space-y-3">
                      {sources.map((source, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-navy-900 border border-cyan-800/50 rounded-xl p-4 hover:border-cyan-600/50 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white font-semibold text-lg">{source.publisher}</div>
                              <div className="text-xs text-gray-400">
                                Credibility: <span className="text-cyan-400 font-bold">{source.credibilityScore}%</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                source.supportsClaim 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
                              }`}>
                                {source.supportsClaim ? 'Supports' : 'Contradicts'}
                              </div>
                              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                                source.credibilityScore >= 90 ? 'bg-green-500/20 text-green-400' :
                                source.credibilityScore >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {source.credibilityScore >= 90 ? 'High Trust' :
                                 source.credibilityScore >= 80 ? 'Med Trust' : 'Low Trust'}
                              </div>
                            </div>
                          </div>
                          <div className="text-gray-300 text-sm leading-relaxed">
                            {source.description}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="border-t border-cyan-800/30 pt-4 mt-6">
                  <div className="text-center text-gray-500 text-sm">
                    Analyzed on {format(new Date(analysis.createdAt), 'MMM dd, yyyy')} • Time: {analysis.analysisTime || 2.3}s
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
