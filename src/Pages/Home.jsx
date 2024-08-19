import React from "react";
import Navbar from "../Components/Navbar";

const Home = () => {
  return (
    <>
      <div className="flex flex-col w-full h-screen items-center justify-center gap-8 sm:gap-12 mt-5">
        <div className="flex flex-col w-full max-w-[1200px] h-fit items-center justify-center gap-8 sm:gap-12 px-4">
          <div className="w-full max-w-[1000px] text-center">
            <p className="font-[Roboto_Condensed-Bold,Helvetica] font-bold text-[#0073e6] text-4xl sm:text-5xl lg:text-6xl xl:text-[77px]">
              Boost Your Interview Skills
            </p>
            <p className="font-[Roboto_Condensed-Bold,Helvetica] font-bold text-white text-4xl sm:text-5xl lg:text-6xl xl:text-[77px]">
              with AI Feedback
            </p>
          </div>
          <p className="w-full max-w-[720px] font-normal text-white text-lg sm:text-xl lg:text-2xl text-center">
            Participate in mock interviews and receive detailed feedback to
            improve your performance.
          </p>

          <div className="rounded-md shadow">
            <a
              className="w-full flex items-center justify-center px-6 py-3 text-base font-medium rounded-md text-white bg-[#0073e6] hover:bg-[#1e5da6] hover:text-white focus:ring ring-offset-2 ring-[#0073e6] focus:outline-none transition duration-150 ease-in-out sm:px-8 sm:py-4 sm:text-lg md:text-xl lg:text-2xl"
              href="#"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
