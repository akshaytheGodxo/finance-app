
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { auth } from "~/server/auth";
import StockChart from "../_components/ui/StockCharts";



export default async function MainDashboard() {
  const session = await auth();
  const userName = session?.user.name;

  return (
    <div className="p-6 space-y-6 bg-[#2b2b2b] min-h-screen">
      {/* Welcome Card */}
      <Card className="bg-[#333333] text-white shadow-xl shadow-black/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome, {userName} 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">Stay updated with the latest stock trends and market insights.</p>
        </CardContent>
      </Card>

      {/* Stock Chart */}
      <Card className="bg-[#333333] text-white shadow-xl shadow-black/30">
        <CardHeader>
          <CardTitle>Stock Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <StockChart symbol="AAPL" />
        </CardContent>
      </Card>
      {/* </div>
      </div> */}

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Top Gainers */}
        <Card className="bg-[#333333] text-white border-l-4 border-green-500 shadow-lg shadow-black/40">
          <CardHeader>
            <CardTitle>📈 Top Gainer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Tesla (TSLA)</p>
            <p className="text-green-400 font-bold">+7.2%</p>
          </CardContent>
        </Card>

        {/* Top Losers */}
        <Card className="bg-[#333333] text-white border-l-4 border-red-500 shadow-lg shadow-black/40">
          <CardHeader>
            <CardTitle>📉 Top Loser</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold">Amazon (AMZN)</p>
            <p className="text-red-400 font-bold">-4.5%</p>
          </CardContent>
        </Card>

        {/* Market Summary */}
        <Card className="bg-[#333333] text-white border-l-4 border-blue-500 shadow-lg shadow-black/40">
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
      <Card className="bg-[#333333] text-white shadow-xl shadow-black/30">
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



