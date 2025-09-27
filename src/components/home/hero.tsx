'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Shield, 
  Zap, 
  FileText, 
  Link as LinkIcon,
  Upload,
  ArrowRight,
  Sparkles
} from 'lucide-react'

export function Hero() {
  const [inputValue, setInputValue] = useState('')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 text-primary-500/30"
        >
          <Shield className="w-8 h-8" />
        </motion.div>
        
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute top-40 right-20 text-accent-500/30"
        >
          <Zap className="w-6 h-6" />
        </motion.div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-40 left-20 text-primary-400/20"
        >
          <Search className="w-10 h-10" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">AI-Powered Fact Checking</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Spot Misinformation</span>
            <br />
            <span className="text-white">in Seconds</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Advanced AI agents analyze articles, cross-reference sources, and provide 
            credibility scores to help you identify misinformation instantly.
          </p>
        </motion.div>

        {/* Input options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="glass-card p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Paste URL */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-6 cursor-pointer transition-all group"
              >
                <LinkIcon className="w-8 h-8 text-primary-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Paste URL</h3>
                <p className="text-gray-400 text-sm">
                  Enter a news article link for instant verification
                </p>
              </motion.div>

              {/* Upload File */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-6 cursor-pointer transition-all group"
              >
                <Upload className="w-8 h-8 text-accent-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Upload Article</h3>
                <p className="text-gray-400 text-sm">
                  Upload PDF or text files for analysis
                </p>
              </motion.div>

              {/* Enter Text */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-6 cursor-pointer transition-all group"
              >
                <FileText className="w-8 h-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Enter Text</h3>
                <p className="text-gray-400 text-sm">
                  Paste article text directly for fact-checking
                </p>
              </motion.div>
            </div>

            {/* Quick input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Paste a news URL or enter text to analyze..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Link
                href={`/analyze${inputValue ? `?input=${encodeURIComponent(inputValue)}` : ''}`}
                className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group neon-glow hover:scale-105"
              >
                Analyze Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-2">99.2%</div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-500 mb-2">&lt;3s</div>
            <div className="text-gray-400 text-sm">Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-400 mb-2">100K+</div>
            <div className="text-gray-400 text-sm">Articles Checked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-400 mb-2">50+</div>
            <div className="text-gray-400 text-sm">News Sources</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
