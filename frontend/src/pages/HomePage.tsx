import React from "react";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  return (
    <div>
      <div className="flex items-center justify-center pt-20 md:px-4 ">
        <div className="flex  rounded-lg overflow-auto shadow-cl w-full  h-[calc(100vh-10rem)] md:h-[calc(100vh-15rem)] ">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
