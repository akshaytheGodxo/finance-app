'use client';
import { PieChart } from "recharts";
import { PinContainer } from "./3d-pin";
import Donut from "./donut";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 lg:px-24 py-8">
      
      {/* Text Section */}
      <div className="flex flex-col text-center lg:text-left lg:w-1/2">
        <div className="lg:ml-0 mt-10">
          <h1 className="font-poppins text-5xl md:text-7xl text-white font-semibold">
            <span className="block">Best Trends</span>
            <span className="block mt-6">Easy Learning</span>
          </h1>
        </div>

        <div className="mt-6 max-w-xl mx-auto lg:mx-0">
          <h4 className="font-poppins opacity-40 text-white">
            Experience the thrill of the stock and crypto markets through an interactive, game-based approach. Learn, trade, and compete while making smarter investment decisions—because finance should be fun!
          </h4>
        </div>

        <div className="mt-10">
          <button className="font-poppins bg-[#F8D57E] h-12 rounded-lg w-44" onClick={handleClick}>
            Get started
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-16 lg:mt-0 lg:ml-16 flex justify-center lg:w-1/2">
        <PinContainer title="Users who tried the bot" href="/smthing.com" className="bg-[#121212]">
          <div className="flex flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem] font-poppins">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
            Pookie Wallet Bot
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500">
                Got questions? Need insights? Our AI chatbot is here to help!
              </span>
            </div>
            <Donut />
          </div>
        </PinContainer>
      </div>
    </div>
  );
};

export default Header;
