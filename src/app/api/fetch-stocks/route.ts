// app/api/fetch-stock/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    console.log("API called")

    const { symbol } = await req.json()

    if (!symbol || symbol.trim() === "") {
      return NextResponse.json({ error: "Invalid symbol" }, { status: 400 })
    }

    const apiKey = process.env.SERPAPI_KEY
    const url = new URL("https://serpapi.com/search.json")
    url.searchParams.append("engine", "google_finance")
    url.searchParams.append("q", symbol)
    url.searchParams.append("api_key", apiKey || "")

    const res = await fetch(url.toString())
    const data = await res.json()
    console.log("Data fetched:", data)
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
