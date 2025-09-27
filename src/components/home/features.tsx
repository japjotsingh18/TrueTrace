'use client'

import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Brain, 
  Search, 
  CheckCircle, 
  Globe,
  BarChart3,
  Eye
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced machine learning algorithms analyze content patterns, source credibility, and fact patterns to detect misinformation.',
    color: 'text-primary-500'
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Get instant results in under 3 seconds with our optimized agentic AI pipeline that works around the clock.',
    color: 'text-accent-500'
  },
  {
    icon: Search,
    title: 'Source Verification',
    description: 'Cross-references multiple trusted news sources and fact-checking databases to verify claims and statements.',
    color: 'text-primary-400'
  },
  {
    icon: Shield,
    title: 'Credibility Scoring',
    description: 'Comprehensive credibility assessment based on publisher reputation, author expertise, and content quality metrics.',
    color: 'text-accent-400'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'Analyze news from any platform - URLs, text, PDFs, and social media posts from major platforms.',
    color: 'text-primary-300'
  },
  {
    icon: BarChart3,
    title: 'Detailed Reports',
    description: 'Get comprehensive analysis reports with evidence, source citations, and reasoning behind every verdict.',
    color: 'text-accent-300'
  }
]

export function Features() {
  return (
    <section className="py-24 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span> for
            <br />
            <span className="text-white">Accurate Fact-Checking</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our advanced AI technology combines multiple verification methods to provide 
            the most accurate and reliable fact-checking results available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 group"
            >
              <div className={`${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-10 h-10" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-primary-500 mr-3" />
              <h3 className="text-2xl font-bold text-white">Transparency & Trust</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Open Source Methods</h4>
                <p className="text-gray-400 text-sm">
                  Our fact-checking methodology is transparent and based on established journalistic standards.
                </p>
              </div>
              
              <div>
                <Shield className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Privacy Protected</h4>
                <p className="text-gray-400 text-sm">
                  Your data is processed securely and never stored permanently without your consent.
                </p>
              </div>
              
              <div>
                <BarChart3 className="w-8 h-8 text-accent-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Continuous Improvement</h4>
                <p className="text-gray-400 text-sm">
                  Our AI models are constantly updated with the latest fact-checking standards and techniques.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
