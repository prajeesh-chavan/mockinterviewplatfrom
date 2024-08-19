import React from "react";
import logo from "../assets/logos/logo.png";

function Navbar() {
  return (
    <div className="flex justify-center">
      <div className="flex w-11/12 lg:w-5/6 h-[70px] lg:h-[85px] items-center justify-between px-4 sm:px-[25px] bg-[#0073e6a8] rounded-[5px] overflow-hidden border border-solid border-black fixed z-50">
        <div className="flex items-center gap-2">
          <img className="w-[72px] sm:w-[96px]" alt="Element" src={logo} />
          <div className="hidden sm:flex items-center h-[48px] sm:h-[72px] font-family['Jomhuria-Regular',Helvetica] font-bold text-white text-4xl lg:text-5xl">
            Mock Interv
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 sm:gap-[43px]">
          <div className="hidden lg:flex gap-4 sm:gap-6">
            <a href="#about" className="font-family['Kumbh_Sans-Regular',Helvetica] font-normal text-white text-base sm:text-lg hover:border-b-2">About</a>
            <a href="#contact" className="font-family['Kumbh_Sans-Regular',Helvetica] font-normal text-white text-base sm:text-lg hover:border-b-2">Contact</a>
            <a href="#report" className="font-family['Kumbh_Sans-Regular',Helvetica] font-normal text-white text-base sm:text-lg hover:border-b-2">Report</a>
          </div>

          <button className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 font-medium flex gap-2 text-white border-white rounded-lg hover:border-slate-800 hover:text-slate-900 hover:shadow transition duration-150">
            <img
              className="w-4 sm:w-6 h-4 sm:h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-sm sm:text-base">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
