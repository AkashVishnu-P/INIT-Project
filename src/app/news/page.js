'use client'

import { useState, useEffect } from 'react'

export default function NewsPage() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/news')
      const data = await response.json()

      if (data.success) {
        setNews(data.data)
        setLastUpdated(new Date().toLocaleTimeString())
      } else {
        setError(data.error || 'Failed to fetch news')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const getSentimentColor = (sentiment) => {
    if (!sentiment) return '#9ca3af'
    const score = parseFloat(sentiment)
    if (score > 0.5) return '#22c55e' // Green - Bullish
    if (score < -0.5) return '#ef4444' // Red - Bearish
    return '#f59e0b' // Amber - Neutral
  }

  const formatTime = (timeStr) => {
    if (!timeStr) return 'Recently'
    try {
      const date = new Date(timeStr)
      const now = new Date()
      const diffMs = now - date
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 60) return `${diffMins}m ago`
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString()
    } catch {
      return 'Recently'
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Header */}
      <div className="border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Market News</h1>
              <p className="text-[#6b7280] text-sm">Real-time financial insights and market updates</p>
            </div>
            <button
              onClick={fetchNews}
              disabled={loading}
              className="bg-[#2563eb] hover:bg-[#3b82f6] active:bg-[#1d4ed8] disabled:opacity-50 px-5 py-2 rounded-lg transition duration-200 flex items-center gap-2 font-medium whitespace-nowrap"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              )}
              Refresh
            </button>
          </div>
          {lastUpdated && (
            <p className="text-xs text-[#6b7280] mt-4">Last updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 bg-[#ef4444]/5 border border-[#ef4444]/30 rounded-lg">
            <p className="text-[#fca5a5] text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && news.length === 0 ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#2563eb]/30 border-t-[#2563eb] mx-auto mb-4" />
              <p className="text-[#9ca3af]">Fetching latest news...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            {news.length > 0 && (
              <div className="mb-10">
                <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider mb-4 pb-3 border-b border-[#334155]">Featured Article</h2>
                <div className="bg-[#0f172a] border border-[#334155] rounded-lg p-6 hover:border-[#475569] transition duration-200">
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                    {news[0].title}
                  </h3>
                  <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2 leading-relaxed">
                    {news[0].summary || 'Market news update'}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#334155]">
                    <span className="text-xs text-[#6b7280]">{formatTime(news[0].time_published)}</span>
                    <span style={{ color: getSentimentColor(news[0].overall_sentiment) }} className="text-xs font-semibold">
                      {news[0].source}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* News List Section */}
            <div>
              <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider mb-4 pb-3 border-b border-[#334155]">All Updates</h2>
              <div className="space-y-3">
                {news.slice(1).map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedArticle(item)}
                    className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 hover:bg-[#1e293b] hover:border-[#475569] transition duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[#9ca3af] text-xs line-clamp-1">
                          {item.summary || 'Market news'}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span style={{ color: getSentimentColor(item.overall_sentiment) }} className="inline-block text-xs font-semibold px-2 py-1 rounded bg-current/10">
                          {item.source}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#334155] flex justify-between items-center">
                      <span className="text-[#6b7280] text-xs">{formatTime(item.time_published)}</span>
                      <span className="text-[#2563eb] text-xs font-medium">Click to view →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {news.length === 0 && !loading && (
              <div className="text-center py-16">
                <p className="text-[#9ca3af]">No news available at the moment.</p>
              </div>
            )}
          </>
        )}

        {/* Modal / Expanded View */}
        {selectedArticle && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#0f172a] border border-[#334155] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0f172a] border-b border-[#334155] px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Article Details</h2>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-[#6b7280] hover:text-[#ffffff] transition"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6 space-y-4">
                {/* Title */}
                <div>
                  <h3 className="text-xl font-bold leading-tight">
                    {selectedArticle.title}
                  </h3>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 py-3 border-y border-[#334155]">
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Source</p>
                    <p style={{ color: getSentimentColor(selectedArticle.overall_sentiment) }} className="font-semibold text-sm">
                      {selectedArticle.source}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Published</p>
                    <p className="font-semibold text-sm">{formatTime(selectedArticle.time_published)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Sentiment</p>
                    <p className="font-semibold text-sm">
                      {selectedArticle.overall_sentiment ? parseFloat(selectedArticle.overall_sentiment).toFixed(2) : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="text-sm font-semibold text-[#9ca3af] mb-2 uppercase tracking-wider">Summary</h4>
                  <p className="text-[#9ca3af] text-sm leading-relaxed">
                    {selectedArticle.summary || 'No summary available for this article.'}
                  </p>
                </div>

                {/* URL Link */}
                {selectedArticle.url && (
                  <div className="pt-4 border-t border-[#334155]">
                    <a
                      href={selectedArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#2563eb] hover:text-[#3b82f6] font-medium text-sm transition"
                    >
                      Read Full Article
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}