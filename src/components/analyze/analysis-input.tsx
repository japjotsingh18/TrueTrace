'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Link as LinkIcon, 
  Upload, 
  FileText, 
  Search,
  X,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface AnalysisInputProps {
  onAnalysisStart: (id: string) => void
}

type InputType = 'url' | 'text' | 'file'

export function AnalysisInput({ onAnalysisStart }: AnalysisInputProps) {
  const [activeTab, setActiveTab] = useState<InputType>('url')
  const [urlInput, setUrlInput] = useState('')
  const [textInput, setTextInput] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const tabs = [
    { id: 'url', label: 'URL', icon: LinkIcon, description: 'Paste a news article link' },
    { id: 'text', label: 'Text', icon: FileText, description: 'Enter article text directly' },
    { id: 'file', label: 'File', icon: Upload, description: 'Upload PDF or text file' }
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type and size
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
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      let input = ''
      let inputType = activeTab

      switch (activeTab) {
        case 'url':
          if (!urlInput.trim()) {
            toast.error('Please enter a valid URL')
            return
          }
          // Basic URL validation
          try {
            new URL(urlInput)
          } catch {
            toast.error('Please enter a valid URL')
            return
          }
          input = urlInput.trim()
          break
        
        case 'text':
          if (!textInput.trim() || textInput.trim().length < 50) {
            toast.error('Please enter at least 50 characters of text')
            return
          }
          input = textInput.trim()
          break
        
        case 'file':
          if (!selectedFile) {
            toast.error('Please select a file to upload')
            return
          }
          // For demo purposes, we'll just use the filename
          input = selectedFile.name
          break
      }

      // Call API to start analysis
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input,
          inputType,
          ...(selectedFile && { fileName: selectedFile.name, fileSize: selectedFile.size })
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to start analysis')
      }

      const data = await response.json()
      
      toast.success('Analysis started! Results will appear below.')
      onAnalysisStart(data.analysisId)
      
      // Clear inputs
      setUrlInput('')
      setTextInput('')
      setSelectedFile(null)
      
    } catch (error) {
      console.error('Analysis error:', error)
      toast.error('Failed to start analysis. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    switch (activeTab) {
      case 'url':
        return urlInput.trim().length > 0
      case 'text':
        return textInput.trim().length >= 50
      case 'file':
        return selectedFile !== null
      default:
        return false
    }
  }

  return (
    <div className="glass-card p-8 rounded-2xl">
      {/* Tab headers */}
      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as InputType)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <p className="text-gray-400 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.description}
            </p>

            {activeTab === 'url' && (
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://example.com/news-article"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <LinkIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            )}

            {activeTab === 'text' && (
              <div className="relative">
                <textarea
                  placeholder="Paste the article text here..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  rows={8}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                  {textInput.length}/5000
                </div>
              </div>
            )}

            {activeTab === 'file' && (
              <div>
                {!selectedFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/20 hover:border-primary-500 rounded-xl p-8 text-center cursor-pointer transition-colors"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-300 mb-2">Click to upload or drag and drop</p>
                    <p className="text-gray-500 text-sm">PDF, TXT, or HTML files up to 10MB</p>
                  </div>
                ) : (
                  <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                      <div>
                        <p className="text-white font-medium">{selectedFile.name}</p>
                        <p className="text-gray-400 text-sm">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.html"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Submit button */}
          <motion.button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
              isFormValid() && !isSubmitting
                ? 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white neon-glow hover:scale-[1.02]'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                <span>Start Analysis</span>
              </>
            )}
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
