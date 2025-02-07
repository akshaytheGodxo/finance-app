import { HoverEffect } from "../globals/card-hover-effect";

export const projects = [
    {
      title: "Customer Support",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Wallet Bot",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Quick Services",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },

  ];
  
const InfoCards = () => {
    return (
<div className="bg-[#2b2b2b] w-full flex flex-col items-center px-4 py-8">
  <div className="w-full max-w-[74rem] h-px bg-white opacity-20" />

  <div className="text-center mt-[3rem] mb-[2rem]">
    <h2 className="text-white font-poppins text-3xl">Why Choose us?</h2>
  </div>

  <HoverEffect items={projects} className=""/>
</div>

    );
}

export default InfoCards;