import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        console.log("API called");
        
        const apiKey = process.env.SERPAPI_KEY;
        const url = new URL("https://serpapi.com/search.json");
        url.searchParams.append("engine", "google_news");
        url.searchParams.append("q", "latest financial news");
        url.searchParams.append("api_key", apiKey || "");
        url.searchParams.append("hl", "en");
        url.searchParams.append("gl", "us");

        const res = await fetch(url.toString());
        const data = await res.json();
        console.log("Data fetched:", data);
        return NextResponse.json(data);
    } catch (err) {
        console.error("Error fetching news:", err);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}