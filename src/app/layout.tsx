import './globals.css'
import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-heading' })

export const metadata: Metadata = {
  title: 'TrueTrace | AI-Powered Fact Checking',
  description: 'Spot misinformation in seconds with advanced AI technology. Verify articles, check sources, and get credibility scores instantly.',
  keywords: 'misinformation, fact check, AI, verification, news analysis, credibility',
  authors: [{ name: 'TrueTrace Team' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'TrueTrace | AI-Powered Fact Checking',
  description: 'Spot misinformation in seconds with advanced AI technology',
    type: 'website',
    url: 'https://truetrace.vercel.app',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueTrace | AI-Powered Fact Checking',
  description: 'Spot misinformation in seconds with advanced AI technology',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${montserrat.variable}`}> 
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
