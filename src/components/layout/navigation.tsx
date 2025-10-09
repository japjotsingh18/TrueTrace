'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signIn, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings,
  Shield,
  BarChart3
} from 'lucide-react'

export function Navigation() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyze' },
    { href: '/reports', label: 'Saved Reports' },
  ];

  return (
    <nav className="sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl">
          <div className="px-6 sm:px-8 lg:px-10">
            <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
              <Shield className="w-6 h-6 text-white group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500" />
            </div>
            <span className="font-bold text-xl gradient-text font-abak group-hover:drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] transition-all duration-500 group-hover:scale-105">
              TrueTrace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-gray-300 hover:text-white transition-all duration-500 group px-4 py-2 rounded-xl backdrop-blur-sm border border-transparent hover:border-white/30 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-orange-500/10 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105 hover:-translate-y-1"
              >
                <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                  {item.label}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>
              </Link>
            ))}
          </div>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="relative flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-orange-500/20 border border-white/10 hover:border-cyan-400/50 px-4 py-2 rounded-xl transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-1 group"
                >
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full group-hover:ring-2 group-hover:ring-cyan-400/50 group-hover:ring-offset-2 group-hover:ring-offset-black transition-all duration-500"
                    />
                  ) : (
                    <User className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500" />
                  )}
                  <span className="hidden sm:block group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-500">{session.user?.name}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl py-2"
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-orange-500/20 transition-all duration-500 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <BarChart3 className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-500">Dashboard</span>
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-orange-500/20 transition-all duration-500 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-500">Settings</span>
                      </Link>
                      <hr className="border-white/20 my-2" />
                      <button
                        onClick={() => signOut()}
                        className="flex items-center space-x-2 px-4 py-2 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-red-600/20 transition-all duration-500 text-red-400 hover:text-red-300 w-full text-left rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 group"
                      >
                        <LogOut className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] transition-all duration-500" />
                        <span className="group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] transition-all duration-500">Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="relative bg-white/10 backdrop-blur-sm hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-orange-500/30 text-white border border-white/20 hover:border-cyan-400/50 px-6 py-2 rounded-xl font-medium transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-1 group"
              >
                <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">Sign In</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm group-hover:blur-none"></div>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-xl hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-orange-500/20 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-500 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/30 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover:rotate-90" /> : 
                <Menu className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all duration-500 group-hover:scale-110" />
              }
            </button>
          </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/20 px-6 py-4 rounded-b-2xl"
              >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 px-4 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-orange-500/20 rounded-xl transition-all duration-500 backdrop-blur-sm border border-transparent hover:border-cyan-400/30 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] transition-all duration-500">
                    {item.label}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>
    </nav>
  )
}
