'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Calendar, 
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  HelpCircle,
  FileText,
  ExternalLink
} from 'lucide-react'

interface Report {
  id: string
  title: string
  url?: string
  verdict: 'TRUE' | 'FALSE' | 'MIXED' | 'UNVERIFIED'
  confidence: number
  createdAt: string
  sourcesCount: number
}

const mockReports: Report[] = [
  {
    id: '1',
    title: 'Climate Change Study Shows Record Temperature Increases',
    url: 'https://example.com/climate-study',
  verdict: 'TRUE',
  confidence: 1.0,
    createdAt: '2024-03-15T10:30:00Z',
    sourcesCount: 8
  },
  {
    id: '2',
    title: 'New COVID-19 Variant Spreads Rapidly Across Europe',
    verdict: 'MIXED',
    confidence: 0.76,
    createdAt: '2024-03-14T15:45:00Z',
    sourcesCount: 5
  },
  {
    id: '3',
    title: 'Celebrity Death Hoax Circulates on Social Media',
    url: 'https://example.com/celebrity-hoax',
    verdict: 'FALSE',
    confidence: 0.95,
    createdAt: '2024-03-13T08:20:00Z',
    sourcesCount: 3
  },
  {
    id: '4',
    title: 'Economic Policy Changes Announced by Government',
    verdict: 'UNVERIFIED',
    confidence: 0.45,
    createdAt: '2024-03-12T14:15:00Z',
    sourcesCount: 2
  }
]

export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVerdict, setSelectedVerdict] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'date' | 'confidence'>('date')
  const [modalReport, setModalReport] = useState<Report | null>(null)

  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'TRUE':
        return {
          icon: CheckCircle,
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/30',
          label: 'Verified True'
        }
      case 'FALSE':
        return {
          icon: XCircle,
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          label: 'Likely False'
        }
      case 'MIXED':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
          borderColor: 'border-yellow-500/30',
          label: 'Mixed Accuracy'
        }
      default:
        return {
          icon: HelpCircle,
          color: 'text-gray-500',
          bgColor: 'bg-gray-500/10',
          borderColor: 'border-gray-500/30',
          label: 'Unverified'
        }
    }
  }

  const filteredReports = mockReports
    .filter(report => 
      (selectedVerdict === 'all' || report.verdict === selectedVerdict) &&
      (searchTerm === '' || report.title.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      return b.confidence - a.confidence
    })

  return (
    <div className="min-h-screen bg-navy-900 py-8">
      <VerificationReportModal open={!!modalReport} onClose={() => setModalReport(null)} report={modalReport} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Saved Reports</span>
          </h1>
          <p className="text-gray-300 text-lg">
            View and manage your analysis history
          </p>
        </div>
        {/* Filters */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* Verdict Filter */}
            <select
              value={selectedVerdict}
              onChange={(e) => setSelectedVerdict(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Verdicts</option>
              <option value="TRUE">Verified True</option>
              <option value="FALSE">Likely False</option>
              <option value="MIXED">Mixed Accuracy</option>
              <option value="UNVERIFIED">Unverified</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'confidence')}
              className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="confidence">Sort by Confidence</option>
            </select>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-6">
          {filteredReports.length === 0 ? (
            <div className="glass-card p-12 rounded-2xl text-center">
              <FileText className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Reports Found</h3>
              <p className="text-gray-400 mb-6">
                {searchTerm || selectedVerdict !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'Start analyzing content to see your reports here'
                }
              </p>
            </div>
          ) : (
            filteredReports.map((report, index) => {
              const config = getVerdictConfig(report.verdict)
              const VerdictIcon = config.icon
              
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`${config.bgColor} p-2 rounded-lg`}>
                          <VerdictIcon className={`w-6 h-6 ${config.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary-400 transition-colors">
                            {report.title}
                          </h3>
                          
                          {report.url && (
                            <div className="flex items-center space-x-2 text-gray-400 mb-2">
                              <ExternalLink className="w-4 h-4" />
                              <span className="text-sm truncate">{report.url}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div>{report.sourcesCount} sources</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
                            {config.label}
                          </div>
                          <div className="text-gray-400">
                            {report.verdict === 'TRUE' ? '100' : Math.round(report.confidence * 100)}% confidence
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            className="flex items-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onClick={() => setModalReport(report)}
                          >
                            <Eye className="w-5 h-5" />
                            <span>Show Evidence</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// Modal component for showing the verification report
function VerificationReportModal({ open, onClose, report }: { open: boolean, onClose: () => void, report: Report | null }) {
  if (!open || !report) return null;
  // Placeholder data for sources (simulate Google API response)
  const sources = [
    {
      name: 'AP News',
      credibility: 93,
      supports: true,
    },
    {
      name: 'BBC News',
      credibility: 91,
      supports: true,
    },
  ];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-navy-950 max-w-lg w-full rounded-2xl shadow-2xl p-8 relative border border-cyan-900">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-lg font-bold">×</button>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-green-400 flex items-center gap-2 mb-2">
            <CheckCircle className="w-6 h-6 text-green-400" /> Verification Report
          </h2>
          <div className="text-gray-300 text-sm mb-2">Claim Analyzed:</div>
          <div className="bg-navy-900 rounded-lg px-4 py-2 text-white text-base mb-4 font-mono">{report.title.slice(0, 60)}...</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-cyan-400 font-semibold">Sources Checked:</span>
            <span className="text-white">{sources.length}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-400 font-semibold">Status:</span>
            <span className="bg-green-500/10 text-green-300 px-3 py-1 rounded-full font-bold text-sm border border-green-500/30 shadow">Verified True (100% Confidence)</span>
          </div>
          <div className="text-gray-300 mb-6">
            This content was verified as factually accurate by cross-referencing multiple reputable sources using Google-backed AI. The claim matches evidence from trusted news organizations and meets high editorial standards. (This is a placeholder summary.)
          </div>
        </div>
        <div className="mb-6">
          <div className="text-cyan-400 font-semibold mb-2">Verified Sources</div>
          <div className="grid gap-3">
            {sources.map((src, i) => (
              <div key={i} className="bg-navy-900 rounded-xl p-4 flex items-center justify-between border border-cyan-800 shadow hover:shadow-cyan-700/30 transition-shadow">
                <div>
                  <div className="text-white font-semibold">{src.name}</div>
                  <div className="text-xs text-gray-400">Credibility: <span className="text-cyan-400 font-bold">{src.credibility}%</span></div>
                </div>
                <div className={src.supports ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>
                  {src.supports ? 'Supports' : 'Contradicts'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-gray-500 text-xs text-center border-t border-cyan-900 pt-4 mt-4">
          Analyzed on Sep 28, 2025 • Time: 2.3s
        </div>
      </div>
    </div>
  );
}
