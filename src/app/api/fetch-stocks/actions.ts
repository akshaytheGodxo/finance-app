"use server"

export async function fetchStockData(symbol: string) {
  try {
    // Validate input
    if (!symbol || symbol.trim() === "") {
      throw new Error("Please enter a valid stock symbol")
    }

    // Make sure SERPAPI_KEY is set in your environment variables
    const apiKey = process.env.SERPAPI_KEY

    if (!apiKey) {
      throw new Error("API key is not configured")
    }

    // Construct the SerpAPI URL
    const url = new URL("https://serpapi.com/search.json")
    url.searchParams.append("engine", "google_finance")
    url.searchParams.append("q", symbol)
    url.searchParams.append("api_key", apiKey)

    // Use fetch API instead of the SerpAPI library
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API request failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching stock data:", error)
    throw error
  }
}

