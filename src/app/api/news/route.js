// Fallback news data when API is rate-limited or unavailable
const fallbackNews = [
  {
    title: "Indian Markets Rally as RBI Holds Rates Steady",
    summary: "The Reserve Bank of India maintained its key interest rate, boosting investor confidence and sending major indices higher for the third consecutive session.",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    time_published: new Date(Date.now() - 2 * 3600000).toISOString(),
    overall_sentiment: "0.65",
  },
  {
    title: "Nifty 50 ETF Sees Record Inflows from Retail Investors",
    summary: "Index-based ETFs continue to attract strong retail participation as young investors prefer passive investing strategies over direct stock picking.",
    source: "Mint",
    url: "https://livemint.com",
    time_published: new Date(Date.now() - 5 * 3600000).toISOString(),
    overall_sentiment: "0.45",
  },
  {
    title: "Gold Prices Hit All-Time High Amid Global Uncertainty",
    summary: "Gold ETFs surge as investors flock to safe-haven assets amid geopolitical tensions and inflation concerns across major economies.",
    source: "NDTV Profit",
    url: "https://ndtvprofit.com",
    time_published: new Date(Date.now() - 8 * 3600000).toISOString(),
    overall_sentiment: "0.30",
  },
  {
    title: "Banking Sector Leads Market Recovery After Quarterly Results",
    summary: "Strong Q3 results from major banks push BANKBEES ETF higher. Analysts remain bullish on the sector citing improved asset quality and loan growth.",
    source: "Business Standard",
    url: "https://business-standard.com",
    time_published: new Date(Date.now() - 12 * 3600000).toISOString(),
    overall_sentiment: "0.55",
  },
  {
    title: "Tech Stocks Under Pressure as IT Spending Outlook Weakens",
    summary: "IT ETFs decline as global technology spending forecasts are revised downward. However, experts say the dip presents a buying opportunity for long-term investors.",
    source: "Moneycontrol",
    url: "https://moneycontrol.com",
    time_published: new Date(Date.now() - 18 * 3600000).toISOString(),
    overall_sentiment: "-0.35",
  },
  {
    title: "SEBI Introduces New Rules for Mutual Fund Expense Ratios",
    summary: "The Securities and Exchange Board of India unveiled updated regulations aimed at reducing costs for retail investors in mutual funds and ETFs.",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    time_published: new Date(Date.now() - 24 * 3600000).toISOString(),
    overall_sentiment: "0.40",
  },
  {
    title: "Infrastructure ETFs Gain Momentum on Government Spending Push",
    summary: "Infrastructure-focused ETFs see increased interest as the government accelerates capital expenditure on roads, railways, and urban development projects.",
    source: "Mint",
    url: "https://livemint.com",
    time_published: new Date(Date.now() - 36 * 3600000).toISOString(),
    overall_sentiment: "0.50",
  },
  {
    title: "Why Teens Should Start Investing Early: Expert Insights",
    summary: "Financial advisors emphasize the power of compound growth, urging young investors to start with small SIPs in diversified ETFs to build long-term wealth.",
    source: "Forbes India",
    url: "https://forbesindia.com",
    time_published: new Date(Date.now() - 48 * 3600000).toISOString(),
    overall_sentiment: "0.70",
  },
]

export async function GET() {
  const API_KEY = '0P1SB21J5IHVN2ZN'

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`,
      { next: { revalidate: 300 } } // Cache for 5 minutes
    )

    if (!response.ok) {
      throw new Error('Failed to fetch news')
    }

    const data = await response.json()

    // Alpha Vantage returns a "Note" or "Information" field when rate-limited
    if (data.Note || data.Information || !data.feed || data.feed.length === 0) {
      console.warn('Alpha Vantage rate-limited or empty, using fallback news')
      return Response.json({
        success: true,
        data: fallbackNews,
        source: 'fallback',
        timestamp: new Date().toISOString(),
      })
    }

    // Format live news data
    const newsItems = data.feed.slice(0, 12).map((article) => ({
      title: article.title,
      summary: article.summary,
      source: article.source,
      url: article.url,
      time_published: article.time_published,
      overall_sentiment: article.overall_sentiment_score,
    }))

    return Response.json({
      success: true,
      data: newsItems,
      source: 'live',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('News API Error:', error)
    // Return fallback data instead of an error
    return Response.json({
      success: true,
      data: fallbackNews,
      source: 'fallback',
      timestamp: new Date().toISOString(),
    })
  }
}
