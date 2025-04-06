import InfiniteMovingLogos from "../globals/infinite-moving-cards";

const LogoScroll = () => {
    return (
        <div className="bg-[#1a1a1a] h-[44rem] w-full px-6 sm:px-12">
            {/* Separator Line */}
            <div className="w-full sm:w-[74rem] h-px bg-white ml-auto mr-auto opacity-20" />

            {/* Tab Component */}
            <div className="w-full sm:w-[67.5rem] h-[32rem] bg-[#FDF5DF] rounded-2xl mt-32 ml-auto mr-auto flex justify-center">
                <img src={"/dashboard.svg"} className="mt-auto max-w-full max-h-full object-contain" />
            </div>
        </div>
    );
}

export default LogoScroll;
