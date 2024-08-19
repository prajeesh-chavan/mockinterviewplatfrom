import React, { useState } from "react";

function DiamondBox() {
  const [activeBox, setActiveBox] = useState(null);

  const translateValues = [
    { x: "-translate-x-2", y: "-translate-y-2" },
    { x: "translate-x-2", y: "-translate-y-2" },
    { x: "-translate-x-2", y: "translate-y-2" },
    { x: "translate-x-2", y: "translate-y-2" },
  ];

  const services = [
    { id: 1, title: "Personalized Mock Interviews", desc: "Conduct mock interviews tailored to various job roles and industries. Users can select specific roles or customize scenarios to match their career goals." },
    { id: 2, title: "AI-Driven Feedback and Analysis", desc: "Receive comprehensive feedback on interview performance through advanced AI analysis. The system evaluates responses and behavior to provide actionable insights." },
    { id: 3, title: "Interactive Performance Reports", desc: "Access detailed performance reports that summarize interview strengths and areas for improvement. Reports include visual graphs and actionable recommendations." },
    { id: 4, title: "Interview Preparation Resources", desc: "Utilize a range of resources designed to help users prepare effectively for interviews. Includes sample questions, tips, and industry-specific advice." },
  ];

  const handleMouseEnter = (index) => {
    setActiveBox(index);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly gap-24 lg:gap-64 pt-24">
        <div className="flex items-center justify-center text-center">
          <div className="grid grid-cols-2 grid-rows-2 items-center rotate-45 lg:size-[450px] md:h-[300px] md:w-[300px] h-[250px] w-[250px]">
            {["green", "red", "blue", "yellow"].map((color, index) => (
              <div
                key={index}
                className={`lg:size-52 md:size-32 size-28 flex items-center justify-center border-2 box-border transition-transform duration-300 ${
                  activeBox === index
                    ? `${translateValues[index].x} ${translateValues[index].y} bg-blue-500 text-white border-blue-400`
                    : `hover:${translateValues[index].x} hover:${translateValues[index].y} bg-white text-black`
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <div className="-rotate-45 md:text-lg lg:text-3xl text-sm font-bold">
                  {services[index]?.title || "No Title"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {activeBox !== null && (
          <div className="flex self-center h-max p-2 lg:max-w-lg md:max-w-md max-w-xs border-blue-500 justify-center transition-all border-4 rounded-md lg:text-xl md:text-lg text-sm text-ellipsis">
            <p>{services[activeBox]?.desc || "No Description"}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default DiamondBox;
