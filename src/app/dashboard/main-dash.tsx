'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "../_components/globals/input";
import { fetchStockData } from "../api/fetch-stocks/actions";

interface CompanyData {
  name: string;
  symbol: string;
  icon: string;
  price: number;
  change: number;
  marketCap: string;
  volume: string;
  currency: string;
  exchange: string;
  color: string;
}

export default function MainDashboard() {
  const [symbol, setSymbol] = useState("");
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompanyData = async (stockSymbol: string) => {
    setLoading(true);
    setError("");
    setCompanyData(null);

    try {
      const data = await fetchStockData(stockSymbol);
      if (!data || !data.price) {
        setError("No data found for this company.");
        setLoading(false);
        return;
      }
      setCompanyData(data);
    } catch (err) {
      setError("Failed to fetch stock data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim() === "") {
      setError("Please enter a valid company symbol.");
      return;
    }
    await fetchCompanyData(symbol.toUpperCase());
  };

  const formatCurrency = (num: number) =>
    num.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

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
        <Card className="w-full max-w-lg mx-auto bg-[#121212] text-white border-none shadow-lg p-6">
          <CardHeader className="flex items-center gap-4">
            <span className="text-4xl">{companyData.icon || "📈"}</span>
            <div>
              <h2 className="text-2xl font-bold">{companyData.name} ({companyData.symbol})</h2>
              <p className="text-sm text-gray-400">{companyData.exchange} | {companyData.currency}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-3xl font-bold">{formatCurrency(companyData.price)}</p>
            <p className={companyData.change >= 0 ? "text-green-400" : "text-red-400"}>
              {companyData.change >= 0 ? "▲" : "▼"} {companyData.change.toFixed(2)}%
            </p>
            <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">
              <div>
                <p className="text-gray-500">Market Cap</p>
                <p>{companyData.marketCap}</p>
              </div>
              <div>
                <p className="text-gray-500">Trading Volume</p>
                <p>{companyData.volume}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
