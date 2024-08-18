import React from "react";
import Interview from "./Pages/Interview";
import Home from "./Pages/Home";
import BgAnim from "./Components/BgAnim";
import Services from "./Pages/Services";
import  Toaster  from "./Components/ui/toaster";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ExtractedText, FileUpload } from "./Pages/Resume";


const App = () => {
  return (
    <>
        <Navbar />
      <BgAnim />
      <Toaster />
      <div className="flex flex-col h-full w-full justify-center items-center pt-5">
        <Home />

        <Services />
         <Interview />
        
        
      </div>
        {/* <Footer /> */}
    </>
  );
};

export default App;
