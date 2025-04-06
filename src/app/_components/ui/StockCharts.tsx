"use client";
import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const StockChart = ({ symbol }: { symbol: string }) => {
  const [chartData, setChartData] = useState<{ time: string; price: number }[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      const API_KEY = "F0T25A7G1TAAFPVW";
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data["Time Series (5min)"]) {
        const formattedData = Object.entries(data["Time Series (5min)"]).map(
          ([time, values]) => ({
            time,
            price: parseFloat((values as { "1. open": string })["1. open"]),
          })
        );
        setChartData(formattedData.reverse()); // Reverse for chronological order
      }
    };

    fetchStockData();
  }, [symbol]);

  return (
    <Card className="p-2 bg-[#121212] border-none md:ml-6">
      <CardHeader>
        <CardTitle className="text-white font-poppins">{symbol} Stock Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" hide />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StockChart;
