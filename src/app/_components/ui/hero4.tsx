import { ExpandableCardDemo } from "./review-cards";

const ReviewSection = () => {
  return (
    <div className="bg-[#0f172a] py-16 px-6 flex flex-col items-center">
      <div className="w-full max-w-[74rem] h-px bg-white opacity-20 mb-8" />
      
      <h2 className="text-white font-poppins text-4xl font-semibold text-center">
        Our Customer Reviews
      </h2>

      <p className="text-white opacity-60 max-w-2xl text-center mt-4">
        See what our customers have to say about their experience with us.
      </p>

      <div className="mt-12 w-full flex justify-center">
        <ExpandableCardDemo />
      </div>
    </div>
  );
};

export default ReviewSection;
