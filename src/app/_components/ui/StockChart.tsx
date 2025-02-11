"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface StockData {
  time: string;
  price: number;
}

const StockChart = ({ symbol }: { symbol: string }) => {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`/api/stock?symbol=${symbol}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, [symbol]);

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-md text-white w-full max-w-lg">
      <h2 className="text-lg font-bold mb-2">Stock Price: {symbol.toUpperCase()}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" tick={{ fill: "#fff" }} />
          <YAxis domain={["auto", "auto"]} tick={{ fill: "#fff" }} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#00c7ff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;
