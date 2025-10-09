'use client'

import { motion } from 'framer-motion'
import { 
  FileText, 
  Search, 
  Brain, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Target,
  Award
} from 'lucide-react'

const steps = [
  {
    icon: FileText,
    title: 'Submit Content',
    description: 'Paste a URL, upload a file, or enter text directly into our secure analysis portal.',
    details: ['URLs from any news site', 'PDF and text file uploads', 'Direct text input', 'Batch processing available']
  },
  {
    icon: Brain,
    title: 'AI Agent Analysis',
    description: 'Our intelligent agents extract content, discover sources, and begin comprehensive fact-checking.',
    details: ['Content extraction & parsing', 'Source discovery & mapping', 'Historical data comparison', 'Pattern recognition analysis']
  },
  {
    icon: Search,
    title: 'Cross-Reference',
    description: 'Multiple verification systems cross-reference claims against trusted databases and sources.',
    details: ['50+ trusted news sources', 'Academic databases', 'Government fact-check sites', 'Historical article archives']
  },
  {
    icon: CheckCircle2,
    title: 'Generate Report',
    description: 'Receive detailed analysis with verdict, confidence score, and supporting evidence.',
    details: ['Color-coded verdict system', 'Confidence percentage', 'Source citations', 'Evidence breakdown']
  }
]

export function HowItWorks() {
  return (
    <section className="py-12 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">How It </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our agentic AI system follows a systematic approach to ensure accurate 
            and reliable fact-checking results every time.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent transform -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step number */}
                <div className="flex justify-start mb-4 pl-4">
                  <div className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-gray-700">
                    {index + 1}
                  </div>
                </div>

                <div className="glass-card p-8 rounded-2xl h-full hover:bg-white/15 transition-all duration-300 group">
                  <div className="text-primary-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-10 h-10" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-primary-400 mr-2 mt-0.5 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-primary-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Performance metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <Clock className="w-12 h-12 text-primary-500 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">Average Analysis Time</div>
            <div className="text-4xl font-bold gradient-text mb-2">5 seconds</div>
            <div className="text-gray-400">From submission to results</div>
          </div>

          <div className="text-center">
            <Target className="w-12 h-12 text-accent-500 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">Accuracy Rate</div>
            <div className="text-4xl font-bold gradient-text mb-2">90.2%</div>
            <div className="text-gray-400">Verified by independent testing</div>
          </div>

          <div className="text-center">
            <Award className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-white mb-2">Sources Checked</div>
            <div className="text-4xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-400">Trusted news & fact-check sites</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
