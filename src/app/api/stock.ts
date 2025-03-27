import { NextRequest, NextResponse } from "next/server";

export async function FETCH(req: NextRequest) {
    try {
        if (!req.body) {
            console.error("Error: body is empty");
            return NextResponse.json({ error: "Request body is missing" }, { status: 400 });
        }

        let body;
        try {
            body = await req.json();
        } catch (error) {
            console.error("Error: JSON is invalid");
            return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const { company } = body;
        if (!company) {
            return NextResponse.json({ error: "Company symbol is required" }, { status: 400 });
        }

        const API_KEY = "F0T25A7G1TAAFPVW";
        const response = await fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${company}&interval=5min&apikey=${API_KEY}`
        );

        if (!response.ok) {
            console.error("Error fetching stock data:", response.statusText);
            return NextResponse.json({ error: "Failed to fetch stock data" }, { status: response.status });
        }

        const data = await response.json();

        if (!data["Time Series (5min)"]) {
            return NextResponse.json({ error: "Invalid response from API" }, { status: 500 });
        }

        const formattedData = Object.entries(data["Time Series (5min)"]).map(
            ([time, values]) => ({
                time,
                price: parseFloat((values as { "1. open": string })["1. open"]),
            })
        );

        return NextResponse.json({ stockData: formattedData.reverse() }, { status: 200 });

    } catch (e) {
        console.error("Server error:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
