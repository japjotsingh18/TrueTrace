import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FakeNews Detector | AI-Powered Fact Checking',
  description: 'Spot fake news in seconds with advanced AI technology. Verify articles, check sources, and get credibility scores instantly.',
  keywords: 'fake news, fact check, AI, verification, news analysis, credibility',
  authors: [{ name: 'FakeNews Detector Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'FakeNews Detector | AI-Powered Fact Checking',
    description: 'Spot fake news in seconds with advanced AI technology',
    type: 'website',
    url: 'https://fakenews-detector.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FakeNews Detector | AI-Powered Fact Checking',
    description: 'Spot fake news in seconds with advanced AI technology',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-navy-900 text-white min-h-screen`}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#fff',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
