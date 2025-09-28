'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  ArrowRight,
  Sparkles
} from 'lucide-react'

export function Hero() {
  const texts = [
    "We bust fake news before it busts you",
    "Claim traced, Source verified",
    "Where lies get exposed",
    "Unmask Fake News Instantly"
  ]
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length)
    }, 3000) // Change text every 3 seconds
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
      
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

          {/* Main headline with rolling animation */}
          <div className="text-4xl md:text-6xl font-bold mb-6 leading-tight min-h-[150px] flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTextIndex}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ 
                  duration: 0.6,
                  ease: "easeInOut"
                }}
                className="gradient-text text-center"
              >
                {texts[currentTextIndex]}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            AI agents scan articles, trace claims to trusted sources, and deliver clear credibility scores. No more guesswork! No more misinformation!
          </p>
        </motion.div>

        {/* Call-to-action button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <Link
            href="/analyze"
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-cyan-500 to-white text-gray-900 px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 group"
          >
            Start Analysis
            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
          </Link>
          
          <p className="text-center text-gray-400 text-sm mt-4">
            Analyze URLs, upload files, or paste text content
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-500 mb-2">90.2%</div>
            <div className="text-gray-400 text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-500 mb-2">&lt;7s</div>
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
