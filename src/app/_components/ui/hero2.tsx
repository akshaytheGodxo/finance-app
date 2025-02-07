import InfiniteMovingLogos from "../globals/infinite-moving-cards";



const LogoScroll = () => {
    return (
        <div className="bg-[#2b2b2b] h-[44rem] w-full ">
            <div className="w-[74rem] h-px bg-white ml-auto mr-auto opacity-20" />
            

            {/* tab component */}
            <div className="w-[67.5rem] h-[32rem] bg-[#FDF5DF] rounded-2xl mt-24 ml-auto mr-auto flex">
                <img src={"/dashboard.svg"} className="mt-auto"/>
            </div>
        </div>
    );
}

export default LogoScroll