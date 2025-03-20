"use client"

import { Card, CardContent } from "~/components/ui/card"
import { ArrowDown, ArrowUp, ExternalLink, Info } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts"
import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"

interface StockCardProps {
  name: string
  symbol: string
  currentPrice: number
  previousClose: number
  percentageChange: number
  trendData: { price: number; time: string }[] // Array for mini line chart
  volume: number
  dayLow: number
  dayHigh: number
  marketCap?: number
  pe?: number
}

export default function ImprovedStockCard({
  name,
  symbol,
  currentPrice,
  previousClose,
  percentageChange,
  trendData,
  volume,
  dayLow,
  dayHigh,
  marketCap,
  pe,
}: StockCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isPositive = percentageChange >= 0

  // Determine sentiment based on percentage change
  const getSentiment = (change: number) => {
    if (change >= 5) return "Very Bullish"
    if (change >= 2) return "Bullish"
    if (change >= 0) return "Slightly Bullish"
    if (change >= -2) return "Slightly Bearish"
    if (change >= -5) return "Bearish"
    return "Very Bearish"
  }

  const sentiment = getSentiment(percentageChange)
  const sentimentColor = isPositive ? "text-green-500" : "text-red-500"

  // Format large numbers
  const formatNumber = (num: number) => {
    if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`
    } else if (num >= 1_000) {
      return `${(num / 1_000).toFixed(2)}K`
    }
    return num.toString()
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1a1a] p-2 border border-[#333] rounded text-xs">
          <p className="text-white">${payload[0].value.toFixed(2)}</p>
          <p className="text-gray-400">{payload[0].payload.time}</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card
      className={`bg-gradient-to-b from-[#121212] to-[#1a1a1a] shadow-lg border-[#333] transition-all duration-300 ${isHovered ? "shadow-xl border-[#444]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          {/* Left Side: Stock Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">{name}</h2>
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-[#1a1a1a] border-[#333] text-white">
                    <p>Market Cap: {marketCap ? `$${formatNumber(marketCap)}` : "N/A"}</p>
                    <p>P/E Ratio: {pe ? pe.toFixed(2) : "N/A"}</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
            <p className="text-gray-400 font-medium">{symbol}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-white text-2xl font-bold">${currentPrice.toFixed(2)}</p>
              <div className="flex items-center">
                {isPositive ? (
                  <ArrowUp className="text-green-500 w-4 h-4" />
                ) : (
                  <ArrowDown className="text-red-500 w-4 h-4" />
                )}
                <span className={`ml-1 ${sentimentColor} text-sm font-medium`}>
                  {Math.abs(percentageChange).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs mt-2">
              <div className="text-gray-400">Previous Close:</div>
              <div className="text-white font-medium">${previousClose.toFixed(2)}</div>

              <div className="text-gray-400">Day Range:</div>
              <div className="text-white font-medium">
                ${dayLow.toFixed(2)} - ${dayHigh.toFixed(2)}
              </div>

              <div className="text-gray-400">Volume:</div>
              <div className="text-white font-medium">{formatNumber(volume)}</div>
            </div>
          </div>

          {/* Right Side: Chart & Sentiment */}
          <div className="flex flex-col items-end">
            {/* Mini Line Chart */}
            <div className="w-36 h-20 bg-[#1a1a1a]/30 rounded p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <YAxis domain={["dataMin", "dataMax"]} hide />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#22c55e" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: isPositive ? "#22c55e" : "#ef4444" }}
                    fill={isPositive ? "url(#colorUp)" : "url(#colorDown)"}
                    fillOpacity={0.2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sentiment Label */}
            <div
              className={`mt-2 px-2 py-1 rounded-full text-xs font-medium ${sentimentColor} bg-opacity-10 ${isPositive ? "bg-green-500" : "bg-red-500"}`}
            >
              {sentiment}
            </div>

            {/* View Details Button */}
            <Button variant="ghost" size="sm" className="mt-3 text-xs text-gray-400 hover:text-white hover:bg-[#333]">
              View Details <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

