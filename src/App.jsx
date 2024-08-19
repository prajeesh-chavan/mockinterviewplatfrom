import React from "react";
import Interview from "./Pages/Interview";
import Home from "./Pages/Home";
import BgAnim from "./Components/BgAnim";
import Services from "./Pages/Services";
import Toaster from "./Components/ui/toaster";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ExtractedText, FileUpload } from "./Pages/Resume";
import SpeechToText from "./Components/SpeechtoText";

const App = () => {
  return (
    <>
      <Toaster />
      <BgAnim />
      <div className="flex flex-col min-h-screen w-full justify-center items-center pt-5">
      <Navbar />
        <Home />
        <Services />
        <Interview />
        <SpeechToText />
      </div>
      
      {/* <Footer /> */}
    </>
  );
};

export default App;
