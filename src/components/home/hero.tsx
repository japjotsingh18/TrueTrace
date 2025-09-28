'use client'

import { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'
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
  const [showTextModal, setShowTextModal] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const maxSize = 10 * 1024 * 1024 // 10MB
      const allowedTypes = ['text/plain', 'application/pdf', 'text/html']
      if (!allowedTypes.includes(file.type)) {
        toast.error('Please upload a valid file type (PDF, TXT, or HTML)')
        return
      }
      if (file.size > maxSize) {
        toast.error('File size must be less than 10MB')
        return
      }
      setSelectedFile(file)
      handleSubmit('file', file)
    }
  }

  const handleSubmit = async (type: 'url' | 'text' | 'file', file?: File) => {
    setIsSubmitting(true)
    try {
      let input = ''
      let inputType = type
      if (type === 'url') {
        input = inputValue.trim()
        if (!input) {
          toast.error('Please enter a valid URL')
          setIsSubmitting(false)
          return
        }
      } else if (type === 'text') {
        input = textInput.trim()
        if (!input || input.length < 50) {
          toast.error('Please enter at least 50 characters of text')
          setIsSubmitting(false)
          return
        }
      } else if (type === 'file') {
        if (!file) {
          toast.error('Please select a file to upload')
          setIsSubmitting(false)
          return
        }
        input = file.name
      }
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input,
          inputType,
          ...(file && { fileName: file.name, fileSize: file.size })
        })
      })
      if (!response.ok) throw new Error('Failed to start analysis')
      toast.success('Analysis started! Results will appear below.')
      setInputValue('')
      setTextInput('')
      setSelectedFile(null)
      setShowTextModal(false)
    } catch (error) {
      toast.error('Failed to start analysis. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
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

        {/* Input options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          {/* glass-card container replaced by bordered card below */}
            <div className="glass-card p-8 rounded-2xl border-2 border-white/20">
              {/* Tab UI */}
              <div className="flex justify-center mb-8">
                <button className="px-6 py-2 border-b-2 border-primary-500 text-white font-semibold focus:outline-none">URL</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-gray-400 font-semibold focus:outline-none">Upload</button>
                <button className="px-6 py-2 border-b-2 border-transparent text-gray-400 font-semibold focus:outline-none">Text</button>
              </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Paste URL */}
              <motion.div
                whileHover={{ scale: 1.06, rotate: 2 }}
                whileTap={{ scale: 0.98, rotate: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-black rounded-xl p-6 cursor-pointer transition-all group border border-white/20"
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
                className="bg-black rounded-xl p-6 cursor-pointer transition-all group border border-white/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 text-accent-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Upload Article</h3>
                <p className="text-gray-400 text-sm">
                  Upload PDF or text files for analysis
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.html"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </motion.div>

              {/* Enter Text */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl p-6 cursor-pointer transition-all group"
                onClick={() => setShowTextModal(true)}
              >
                <FileText className="w-8 h-8 text-primary-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-white mb-2">Enter Text</h3>
                <p className="text-gray-400 text-sm">
                  Paste article text directly for fact-checking
                </p>
              </motion.div>
      {/* Modal for text input */}
      {showTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black border border-white/20 rounded-xl p-8 w-full max-w-lg relative">
            <button onClick={() => setShowTextModal(false)} className="absolute top-3 right-3 text-gray-400 hover:text-white">✕</button>
            <h2 className="text-xl font-bold mb-4 text-white">Enter Article Text</h2>
            <textarea
              className="w-full h-40 bg-white/5 border border-white/20 rounded-xl p-3 text-white mb-4"
              placeholder="Paste the article text here..."
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              minLength={50}
              maxLength={5000}
            />
            <button
              onClick={() => handleSubmit('text')}
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 bg-primary-500 text-white hover:bg-primary-600 disabled:opacity-60"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      )}
            </div>

            {/* Quick input */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Paste a news URL or enter text to analyze..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full bg-black rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <Link
                href={`/analyze${inputValue ? `?input=${encodeURIComponent(inputValue)}` : ''}`}
                className="bg-black text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group hover:scale-105 border border-white/10"
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
