export async function GET() {
  const API_KEY = '0P1SB21J5IHVN2ZN'

  try {
    // Fetch news from Alpha Vantage News API
    const response = await fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await response.json()

    // Format news data
    const newsItems = data.feed?.slice(0, 12).map((article) => ({
      title: article.title,
      summary: article.summary,
      source: article.source,
      url: article.url,
      time_published: article.time_published,
      overall_sentiment: article.overall_sentiment_score,
    })) || []

    return Response.json({
      success: true,
      data: newsItems,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('News API Error:', error)
    return Response.json(
      {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
