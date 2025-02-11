import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY; // Store in .env.local

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ error: "Stock symbol is required" });

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query`,
      {
        params: {
          function: "TIME_SERIES_INTRADAY",
          symbol,
          interval: "5min",
          apikey: ALPHA_VANTAGE_API_KEY
        }
      }
    );

    const timeSeries = response.data["Time Series (5min)"];
    if (!timeSeries) return res.status(500).json({ error: "Invalid API response" });

    const stockData = Object.entries(timeSeries).map(([time, values]) => ({
      time,
      price: parseFloat(values["1. open"])
    }));

    res.status(200).json(stockData);
  } catch (error) {
    console.error("Stock API Error:", error);
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
