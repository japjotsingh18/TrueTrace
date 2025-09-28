"use client"

import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface CompareSourcesResult {
  sources: Array<{
    index: number
    url: string
    facts: string
    confidence: number | null
  }>
}

export default function CompareSourcesPage() {
  const [urls, setUrls] = useState(['', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<CompareSourcesResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleUrlChange = (idx: number, value: string) => {
    const newUrls = [...urls]
    newUrls[idx] = value
    setUrls(newUrls)
  }

  const addUrlField = () => setUrls([...urls, ''])
  const removeUrlField = (idx: number) => {
    if (urls.length <= 2) return
    setUrls(urls.filter((_, i) => i !== idx))
  }

  const handleCompare = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)
    try {
      const cleanUrls = urls.map(u => u.trim()).filter(Boolean)
      if (cleanUrls.length < 2) {
        toast.error('Please enter at least two URLs')
        setIsLoading(false)
        return
      }
      const res = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: cleanUrls })
      })
      if (!res.ok) throw new Error('Comparison failed')
      const data = await res.json()
      setResult(data)
    } catch (err: any) {
      setError(err.message || 'Comparison failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold gradient-text mb-6">Compare News Sources</h1>
      <div className="glass-card p-8 rounded-2xl mb-8">
        <label className="block text-lg font-medium mb-2 text-white">Enter URLs to compare:</label>
        {urls.map((url, idx) => (
          <div key={idx} className="flex items-center mb-3 gap-2">
            <input
              type="url"
              value={url}
              onChange={e => handleUrlChange(idx, e.target.value)}
              placeholder={`https://example.com/article${idx+1}`}
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {urls.length > 2 && (
              <button onClick={() => removeUrlField(idx)} className="text-red-400 hover:text-red-600">Remove</button>
            )}
          </div>
        ))}
        <button onClick={addUrlField} className="mt-2 mb-6 text-cyan-400 hover:text-cyan-200">+ Add another URL</button>
        <button
          onClick={handleCompare}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white neon-glow hover:scale-[1.02]"
        >
          {isLoading ? 'Comparing...' : 'Compare Sources'}
        </button>
      </div>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      {result && (
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 gradient-text">Comparison Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.sources.map((src, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="mb-2 text-cyan-400 font-semibold">Source {idx+1}</div>
                <div className="mb-1 text-white break-all"><a href={src.url} target="_blank" rel="noopener noreferrer" className="underline">{src.url}</a></div>
                <div className="mb-2 text-orange-400">Confidence: {src.confidence !== null ? `${Math.round(src.confidence*100)}%` : 'N/A'}</div>
                <div className="text-gray-200 whitespace-pre-line text-sm">{src.facts}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
