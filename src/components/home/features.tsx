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
    title: 'AI-Powered Insights',
    description: 'Smart AI agents analyze patterns, check credibility, and flag misinformation with unmatched accuracy.',
    color: 'text-primary-500'
  },
  {
    icon: Zap,
    title: 'Real-Time Processing',
    description: 'Get instant results in under 7 seconds with our optimized agentic AI pipeline that works around the clock.',
    color: 'text-accent-500'
  },
  {
    icon: Search,
    title: 'Smart Source Checking',
    description: 'AI agents cross-check claims against trusted databases & news outlets to separate fact from fiction instantly.',
    color: 'text-primary-400'
  },
  {
    icon: Shield,
    title: 'Credibility Scoring',
    description: 'Comprehensive credibility assessment using publisher reputation, author expertise, and content quality — giving you instant clarity.',
    color: 'text-accent-400'
  },
  {
    icon: Globe,
    title: 'Multi-Platform Support',
    description: 'From URLs to PDFs to social media posts — our AI analyzes news across platforms seamlessly.',
    color: 'text-primary-300'
  },
  {
    icon: BarChart3,
    title: 'Detailed Reports',
    description: 'Every analysis comes with citations, reasoning, and evidence so you know exactly why something is flagged.',
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
            <span className="gradient-text">Next-Gen Features</span> for
            <br />
            <span className="text-white">Lightning-Fast Truth Detection</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Agentic AI fuses speed, precision, and trust — combining multiple verification layers to deliver unmatched accuracy in spotting misinformation.
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
              <h3 className="text-2xl font-bold text-white">Built on Clarity, Powered by Integrity</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Nothing Hidden</h4>
                <p className="text-gray-400 text-sm">
                  Our methodology is open, transparent, and rooted in globally accepted journalistic standards.
                </p>
              </div>
              
              <div>
                <Shield className="w-8 h-8 text-primary-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Your Data, Your Control</h4>
                <p className="text-gray-400 text-sm">
                  We process securely — no misuse. Your privacy comes first.
                </p>
              </div>
              
              <div>
                <BarChart3 className="w-8 h-8 text-accent-500 mx-auto mb-4" />
                <h4 className="font-semibold text-white mb-2">Always Getting Smarter</h4>
                <p className="text-gray-400 text-sm">
                  Our AI evolves daily with the latest fact-checking techniques, staying ahead of misinformation trends.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
