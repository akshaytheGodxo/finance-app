'use client';
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button"
import { ChevronDown, TrendingUp, TrendingDown } from "lucide-react"
import { Input } from "../_components/globals/input";
import { Search } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/app/_components/ui/dropdown-menu"
import ImprovedStockCard from "../_components/ui/stock-card";
interface CompanyData {
  name: string
  symbol: string
  icon: string
  price: number
  change: number
  marketCap: number
  color: string
}

export default async function MainDashboard() {
  const [timeframe, setTimeframe] = useState("Today")

  const totalMarketCap = 9842000000000 // $9.842 trillion
  const marketGrowth = 2.3 // 2.3% growth

  const companies: CompanyData[] = [
    {
      name: "Apple",
      symbol: "AAPL",
      icon: "🍎",
      price: 187.68,
      change: 1.2,
      marketCap: 2940000000000, // $2.94 trillion
      color: "bg-[#F8C48B]",
    },
    {
      name: "Microsoft",
      symbol: "MSFT",
      icon: "🪟",
      price: 415.32,
      change: 0.8,
      marketCap: 2780000000000, // $2.78 trillion
      color: "bg-[#5ECCC6]",
    },
    {
      name: "Nvidia",
      symbol: "NVDA",
      icon: "🖥️",
      price: 942.89,
      change: 3.5,
      marketCap: 2320000000000, // $2.32 trillion
      color: "bg-[#F8A88B]",
    },
    {
      name: "Amazon",
      symbol: "AMZN",
      icon: "📦",
      price: 178.75,
      change: -0.7,
      marketCap: 1860000000000, // $1.86 trillion
      color: "bg-[#C48BF8]",
    },
  ]
  const teslaData = {
    name: "Tesla Inc.",
    symbol: "TSLA",
    currentPrice: 175.34,
    previousClose: 182.63,
    percentageChange: -3.99,
    volume: 98_765_432,
    dayLow: 174.21,
    dayHigh: 183.45,
    marketCap: 557_000_000_000,
    pe: 47.8,
    trendData: [
      { price: 182.63, time: "9:30 AM" },
      { price: 181.45, time: "10:00 AM" },
      { price: 179.89, time: "10:30 AM" },
      { price: 178.12, time: "11:00 AM" },
      { price: 176.78, time: "11:30 AM" },
      { price: 175.25, time: "12:00 PM" },
      { price: 174.56, time: "12:30 PM" },
      { price: 175.34, time: "1:00 PM" },
    ],
  }
  const formatCurrency = (num: number) => {
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatMarketCap = (num: number) => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`
    } else {
      return `$${(num / 1000000).toFixed(2)}M`
    }
  }

  const getPercentageOfTotal = (marketCap: number) => {
    return (marketCap / totalMarketCap) * 100
  }

  return (
    <div className="p-6 space-y-6 bg-[#1a1a1a] min-h-screen w-[100%]">

<div className="flex flex-col gap-4">
<Card  className="shadow-lg  bg-[#121212] border-none transition-all duration-300 
              w-full ">
    <CardHeader>
      <CardTitle className="text-3xl font-extrabold text-white/90 tracking-wide">
        Welcome, Akshay
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-blue-200/80 text-lg font-light italic">
        Stay updated with the latest stock trends and market insights.
      </p>


    </CardContent>
  </Card>
    <div className="flex flex-row gap-2">
    <Input  className="border-none shadow-lg bg-[#121212] my-auto text-white" placeholder="Search for your company"/>
    <Button className="bg-[#121212]"><Search></Search></Button>
    </div>
    </div>
      {/* Stock Chart */}

    <div className="flex flex-row space-x-4">

      <Card className="w-full max-w-3xl bg-[#121212] text-white border-none">
      <CardContent className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Top Companies</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="bg-[#222222] bg-[#121212] text-white hover:bg-[#121212] hover:text-white flex items-center gap-2 px-4 py-2 rounded-full"
              >
                {timeframe}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#222222] bg-[#121212] text-white">
              <DropdownMenuItem onClick={() => setTimeframe("Today")}>Today</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe("This Week")}>This Week</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe("This Month")}>This Month</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe("This Year")}>This Year</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 mb-2">
          <h1 className="text-5xl font-bold">{formatMarketCap(totalMarketCap)}</h1>
          <div className={`flex items-center gap-1 ${marketGrowth >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
            {marketGrowth >= 0 ? <TrendingUp className="h-6 w-6" /> : <TrendingDown className="h-6 w-6" />}
            <span className="text-2xl font-bold">{marketGrowth}%</span>
          </div>
        </div>

        <p className="text-[#888888] mb-8">total market cap</p>

        <div className="space-y-6">
          {companies.map((company) => (
            <div key={company.name} className="flex items-center">
              <div className="w-8 text-xl mr-3">{company.icon}</div>
              <div className="w-32 text-lg">{company.name}</div>
              <div className="flex-1 mx-4">
                <div className="h-2 bg-[#121212] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${company.color} rounded-full`}
                    style={{ width: `${getPercentageOfTotal(company.marketCap) * 2}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-lg font-medium">{formatCurrency(company.price)}</div>
                <div className={`text-sm ${company.change >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {company.change >= 0 ? "+" : ""}
                  {company.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
    <ImprovedStockCard {...teslaData}/>
    </div>
      {/* </div>
      </div> */}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Top Gainers */}
        <Card className="bg-[#121212] text-white border-l-4 border-green-500 shadow-lg shadow-black/40">
          <CardHeader>
            <CardTitle>📈 Top Gainer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Tesla (TSLA)</p>
            <p className="text-green-400 font-bold">+7.2%</p>
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card className="bg-[#121212] text-white border-l-4 border-red-500 shadow-lg shadow-black/40">
          <CardHeader>
            <CardTitle>📉 Top Loser</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Amazon (AMZN)</p>
            <p className="text-red-400 font-bold">-4.5%</p>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <Card className="bg-[#121212] text-white border-l-4 border-blue-500 shadow-lg shadow-black/40">
          <CardHeader>
            <CardTitle>📊 Market Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">S&P 500: <span className="text-blue-400">+1.3%</span></p>
            <p>NASDAQ: <span className="text-green-400">+2.1%</span></p>
          </CardContent>
        </Card>
        </div>

      
      

      

        {/* Stock News (Demo) */}
        <div>
      <Card className="bg-[#121212] text-white shadow-xl shadow-black/30">
        <CardHeader>
          <CardTitle>📢 Latest Stock News</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="border-b border-gray-600 pb-2">
              <p className="font-semibold">📌 Apple announces new AI-driven financial services.</p>
              <p className="text-gray-400 text-sm">2 hours ago</p>
            </li>
            <li className="border-b border-gray-600 pb-2">
              <p className="font-semibold">📌 Microsoft reports record-breaking revenue in Q1.</p>
              <p className="text-gray-400 text-sm">5 hours ago</p>
            </li>
            <li>
              <p className="font-semibold">📌 Crypto market sees sudden volatility after Bitcoin surge.</p>
              <p className="text-gray-400 text-sm">1 day ago</p>
            </li>
          </ul>
        </CardContent>
      </Card>
      </div>
      </div>
    
  );
}



