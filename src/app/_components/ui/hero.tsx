import { PieChart } from "recharts";
import { PinContainer } from "./3d-pin";
import Donut from "./donut";
const Header = () => {
    return (
        <div className="bg-[#2b2b2b] h-[75vh] flex flex-row pb-[39rem] ">
            <div className="flex flex-col">
            {/* main template */}
            <div className="ml-24 mt-20 mr-4">
                <h1 className="font-poppins text-7xl text-white font-semibold">
                    <span className="block">Best Trends</span>
                    <span className="block mt-6">Easy Learning</span>
                </h1>
            </div>

            {/* secondary text */}
            <div className="mt-6 h-16 ml-24 mr-4">
                <h4 className="font-poppins opacity-40 text-white max-w-xl">
                    Experience the thrill of the stock and crypto markets through an interactive, game-based approach. Learn, trade, and compete while making smarter investment decisions—because finance should be fun!
                </h4>
            </div>
            {/* get started button */}
            <div className="mt-16 ml-24 ">
                <button className="font-poppins bg-[#F8D57E] h-12 rounded-lg w-44">Get started</button>
            </div>
            </div>

            <div className="mt-20 ml-48">
                <PinContainer title="Users who tried the bot" href="/smthing.com" className="bg-[#333333]">
                    <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] font-poppins">
                        <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                            Wallet Bot
                        </h3>
                        <div className="text-base !m-0 !p-0 font-normal">
                            <span className="text-slate-500 ">
                            Got questions? Need insights? Our AI chatbot is here to help!
                            </span>
                        </div>
                        <Donut/>
                    </div>
                </PinContainer>
            </div>


            {/* divider */}
            
        </div>
    );
}

export default Header;
