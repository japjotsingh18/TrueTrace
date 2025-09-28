'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Search, 
  Shield, 
  Zap, 
  ArrowRight,
  Sparkles
} from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none"></div>
      {/* Animated floating icons - more visible and more icons */}
      <motion.div
        initial={{ y: -40 }}
        animate={{ opacity: 1, y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 text-cyan-400 drop-shadow-lg z-0"
      >
        <Search className="w-16 h-16" />
      </motion.div>
      <motion.div
        initial={{ y: 40 }}
        animate={{ opacity: 1, y: [0, 30, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-16 text-orange-400 drop-shadow-lg z-0"
      >
        <Shield className="w-14 h-14" />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ opacity: 1, y: [0, -25, 0], x: [0, 20, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-32 left-1/4 text-white drop-shadow-lg z-0"
      >
        {/* Glasses icon using Lucide's Zap as a placeholder for glasses */}
        <Zap className="w-14 h-14" />
      </motion.div>
      {/* Extra animated icons for more effect */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ opacity: 1, y: [0, 20, 0], x: [0, -15, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-20 right-1/4 text-cyan-300 drop-shadow-lg z-0"
      >
        <Search className="w-10 h-10" />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ opacity: 1, y: [0, -18, 0], x: [0, 12, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/4 left-1/3 text-orange-300 drop-shadow-lg z-0"
      >
        <Shield className="w-10 h-10" />
      </motion.div>
      <motion.div
        initial={{ y: 0 }}
        animate={{ opacity: 1, y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-10 right-1/3 text-white drop-shadow-lg z-0"
      >
        <Zap className="w-10 h-10" />
      </motion.div>
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

          {/* Main headline with animated gradient shimmer */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              className="gradient-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Spot Fake News
            </motion.span>
            <br />
            <motion.span
              className="text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              in Seconds
            </motion.span>
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Advanced AI agents analyze articles, cross-reference sources, and provide 
            credibility scores to help you identify misinformation instantly.
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
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary-500 to-accent-500 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary-500/25 group"
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
