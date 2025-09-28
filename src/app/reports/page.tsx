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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Saved Reports</span>
          </h1>
          <p className="text-gray-300 text-lg">
            View and manage your analysis history
          </p>
            verdict: 'FALSE',
            confidence: 0.1,
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
                          <button className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            <Eye className="w-4 h-4" />
                            <span>View</span>
                          </button>
                          <button className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg text-sm transition-colors">
                            <Download className="w-4 h-4" />
                            <span>Export</span>
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
