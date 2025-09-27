
import Link from 'next/link'
import { Shield, Github, Twitter, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {

  return (
    <footer className="bg-navy-800/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {/* Brand */}
          <motion.div
            className="col-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-center space-x-2 mb-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.div
                className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg"
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.95, rotate: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <motion.span
                className="font-bold text-xl gradient-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                TrueTrace
              </motion.span>
            </motion.div>
            <motion.p
              className="text-gray-400 max-w-md mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Advanced AI-powered fact-checking platform that helps you verify news articles 
              and identify misinformation in seconds.
            </motion.p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="GitHub"
              >
                <motion.span
                  whileHover={{ scale: 1.2, color: '#06b6d4' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ display: 'inline-block' }}
                >
                  <Github className="w-5 h-5" />
                </motion.span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Twitter"
              >
                <motion.span
                  whileHover={{ scale: 1.2, color: '#06b6d4' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ display: 'inline-block' }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.span>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-500 transition-colors"
                aria-label="Email"
              >
                <motion.span
                  whileHover={{ scale: 1.2, color: '#06b6d4' }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ display: 'inline-block' }}
                >
                  <Mail className="w-5 h-5" />
                </motion.span>
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/analyze" className="text-gray-400 hover:text-white transition-colors">
                    Analyze News
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/reports" className="text-gray-400 hover:text-white transition-colors">
                    Saved Reports
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ scale: 1.05 }} style={{ display: 'inline-block' }}>
                  <Link href="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
                    Disclaimer
                  </Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-t border-white/10 mt-8 pt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              © 2024 TrueTrace. All rights reserved.
            </motion.p>
            <motion.p
              className="text-gray-500 text-xs mt-2 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              ⚠️ Not all AI outputs are 100% accurate — always verify with trusted sources
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
