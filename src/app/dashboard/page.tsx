'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Calendar,
  Activity
} from 'lucide-react'

const mockStats = {
  totalAnalyses: 1247,
  accuracyRate: 99.2,
  avgResponseTime: 2.8,
  activeUsers: 342
}

const mockChartData = [
  { name: 'Jan', analyses: 65, accuracy: 98.1 },
  { name: 'Feb', analyses: 89, accuracy: 98.7 },
  { name: 'Mar', analyses: 145, accuracy: 99.2 },
  { name: 'Apr', analyses: 198, accuracy: 99.1 },
  { name: 'May', analyses: 234, accuracy: 99.4 },
  { name: 'Jun', analyses: 267, accuracy: 99.2 }
]

const mockRecentActivity = [
  { id: '1', type: 'analysis', title: 'Climate study verified as true', time: '2 minutes ago', verdict: 'TRUE' },
  { id: '2', type: 'analysis', title: 'Social media post flagged as false', time: '5 minutes ago', verdict: 'FALSE' },
  { id: '3', type: 'analysis', title: 'News article marked as mixed accuracy', time: '12 minutes ago', verdict: 'MIXED' },
  { id: '4', type: 'user', title: 'New user registration', time: '18 minutes ago', verdict: null },
  { id: '5', type: 'analysis', title: 'Government announcement unverified', time: '25 minutes ago', verdict: 'UNVERIFIED' }
]

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState('30d')

  const getVerdictColor = (verdict: string | null) => {
    switch (verdict) {
      case 'TRUE':
        return 'text-green-500'
      case 'FALSE':
        return 'text-red-500'
      case 'MIXED':
        return 'text-yellow-500'
      case 'UNVERIFIED':
        return 'text-gray-500'
      default:
        return 'text-blue-500'
    }
  }

  return (
    <div className="min-h-screen bg-navy-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Monitor system performance and user activity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary-500/20 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-primary-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {mockStats.totalAnalyses.toLocaleString()}
            </div>
            <div className="text-gray-400 text-sm">Total Analyses</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {mockStats.accuracyRate}%
            </div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-accent-500/20 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-accent-500" />
              </div>
              <Activity className="w-5 h-5 text-accent-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {mockStats.avgResponseTime}s
            </div>
            <div className="text-gray-400 text-sm">Avg Response Time</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              {mockStats.activeUsers}
            </div>
            <div className="text-gray-400 text-sm">Active Users</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Analysis Trends</h3>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>

              <div className="h-64 flex items-end space-x-2">
                {mockChartData.map((data, index) => (
                  <motion.div
                    key={data.name}
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.analyses / 300) * 100}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-primary-500 to-accent-500 rounded-t-lg relative group"
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-navy-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.analyses}
                    </div>
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-gray-400 text-xs">
                      {data.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
              
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`w-2 h-2 rounded-full mt-2 ${getVerdictColor(activity.verdict)} bg-current`} />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-1">
                        {activity.title}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
