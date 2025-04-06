'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "../_components/globals/input";
import { set } from "zod";
interface CompanyData {
  search_metadata: {
    id: string;
    status: string;
    json_endpoint: string;
    created_at: string;
    processed_at: string;
    google_finance_url: string;
    raw_html_file: string;
    total_time_taken: number;
  };
  search_parameters: {
    engine: string;
    q: string;
    hl: string;
  };
  markets: {
    us: any[];
    europe: any[];
    asia: any[];
    currencies: any[];
    crypto: any[];
    futures: any[];
    top_news: {
      link: string;
      snippet: string;
      source: string;
      date: string;
    };
  };
  futures_chain: {
    stock: string;
    serpapi_link: string;
    link: string;
    date: string;
    price: string;
    extracted_price: number;
    currency: string;
    price_movement: any;
  }[];
  discover_more: {
    title: string;
    items: any[];
  }[];
}


export default function MainDashboard() {
  const [symbol, setSymbol] = useState("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim() === "") {
      setError("Please enter a valid company symbol.");
      return;
    }

    try {
      setLoading(true)
      const res = await fetch("/api/fetch-stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symbol }),
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      setCompanyData(data);
      setError("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong.");
      setCompanyData(null);
    } finally {
      setLoading(false);
    }



  };

  const formatCurrency = (num?: number) =>
    typeof num === "number"
      ? num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 })
      : "N/A";
  

  return (
    <div className="p-6 space-y-6 bg-[#1a1a1a] min-h-screen w-full">
      <Card className="shadow-lg bg-[#121212] border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold text-white/90">Welcome, Akshay</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-200/80 text-lg font-light italic">
            Search for company stocks and track market trends.
          </p>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <form className="flex gap-2" onSubmit={handleSearch}>
        <Input
          className="border-none shadow-lg bg-[#121212] text-white"
          placeholder="Enter stock symbol (e.g., TSLA, AAPL, GOOG)"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-500">
          <Search />
        </Button>
      </form>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      {/* Stock Data Display */}
      {companyData && (
  <Card className="w-full max-w-5xl mx-auto bg-[#121212] text-white border-none shadow-lg p-6 space-y-6">
    <CardHeader>
      <CardTitle className="text-2xl">📊 {symbol.toUpperCase()} Stock Overview</CardTitle>
    </CardHeader>
    <CardContent className="space-y-8">
      
      {/* Futures Chain Info */}
      <div>
        <h2 className="text-xl mb-2 text-blue-300 font-semibold">Global Listings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {companyData.futures_chain.map((item: any, index: number) => (
            <Card key={index} className="text-white bg-[#1e1e1e] p-4 border border-gray-800 shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold">{item.stock}</h3>
                <span className="text-gray-400 text-sm">{item.date}</span>
              </div>
              <p className="text-xl font-semibold">{item.price}</p>
              <a href={item.link} target="_blank" className="text-blue-400 text-sm hover:underline">
                View on Google Finance
              </a>
            </Card>
          ))}
        </div>
      </div>

      {/* Top News */}
      <div>
        <h2 className="text-xl mb-2 text-blue-300 font-semibold">📰 Latest News</h2>
        <div className="bg-[#1e1e1e] p-4 rounded-lg">
          <p className="text-md italic text-gray-300">"{companyData.markets.top_news.snippet}"</p>
          <div className="mt-2 flex justify-between text-sm text-gray-400">
            <span>{companyData.markets.top_news.source}</span>
            <span>{companyData.markets.top_news.date}</span>
          </div>
          <a href={companyData.markets.top_news.link} target="_blank" className="text-blue-400 text-sm hover:underline block mt-2">
            Read more
          </a>
        </div>
      </div>

      {/* Metadata */}
      <div>
        <h2 className="text-xl mb-2 text-blue-300 font-semibold">🔧 API Metadata</h2>
        <div className="text-sm text-gray-400 space-y-1">
          <p><strong>Status:</strong> {companyData.search_metadata.status}</p>
          <p><strong>Processed at:</strong> {companyData.search_metadata.processed_at}</p>
          <p><strong>Google Finance URL:</strong> <a href={companyData.search_metadata.google_finance_url} target="_blank" className="text-blue-400 hover:underline">{companyData.search_metadata.google_finance_url}</a></p>
        </div>
      </div>
    </CardContent>
  </Card>
)}

    </div>
  );
}
