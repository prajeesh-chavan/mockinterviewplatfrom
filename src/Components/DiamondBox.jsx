import React, { useState } from "react";

function DiamondBox() {
  const [activeBox, setActiveBox] = useState(1);

  // Define different translate values for each box
  const translateValues = [
    { x: "-translate-x-2", y: "-translate-y-2" },
    { x: "translate-x-2", y: "-translate-y-2" },
    { x: "-translate-x-2", y: "translate-y-2" },
    { x: "translate-x-2", y: "translate-y-2" },
  ];

  const services = [
    {
      id: 1,
      title: "Personalized Mock Interviews",
      desc: "Conduct mock interviews tailored to various job roles and industries. Users can select specific roles or customize scenarios to match their career goals.",
    },
    {
      id: 2,
      title: "AI-Driven Feedback and Analysis",
      desc: "Receive comprehensive feedback on interview performance through advanced AI analysis. The system evaluates responses and behavior to provide actionable insights.",
    },
    {
      id: 3,
      title: "Interactive Performance Reports",
      desc: "Access detailed performance reports that summarize interview strengths and areas for improvement. Reports include visual graphs and actionable recommendations.",
    },
    {
      id: 4,
      title: "Interview Preparation Resources",
      desc: "Utilize a range of resources designed to help users prepare effectively for interviews. Includes sample questions, tips, and industry-specific advice.",
    },
  ];

  const handleMouseEnter = (index) => {
    setActiveBox(index);
  };

  return (
    <>
      <div className="flex items-center justify-center h-[800px] w-[800px] text-center">
        <div className="grid grid-cols-2 grid-rows-2 items-center gap-5 rotate-45">
          {["green", "red", "blue", "yellow"].map((color, index) => (
            <div
              key={index}
              className={`w-64 h-64 flex items-center justify-center border-2 box-border transition-transform duration-300 ${
                activeBox === index
                  ? `${translateValues[index].x} ${translateValues[index].y} bg-blue-500 text-white border-blue-400`
                  : `hover:${translateValues[index].x} hover:${translateValues[index].y} bg-white text-black`
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
            >
              <div className="-rotate-45 text-3xl font-bold">
                {services[index].title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeBox !== null && (
        <div className="h-auto p-5 max-w-2xl border-blue-500 justify-center transition-all border-2  rounded-md text-4xl text-pretty text-left">
          <p>{services[activeBox].desc}</p>
        </div>
      )}
    </>
  );
}

export default DiamondBox;
