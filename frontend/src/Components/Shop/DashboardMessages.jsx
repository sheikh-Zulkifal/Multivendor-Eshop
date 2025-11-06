import React from "react";

const DashboardMessages = () => {
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      <h1 className="text-center text-[30px] py-3 font-Poppins ">
        {" "}
        All Messages{" "}
      </h1>
      <MessageList />
      <MessageList />
    </div>
  );
};

const MessageList = () => {
  return (
    <div className="w-full flex p-3 px-3 bg-[#00000010] cursor-pointer">
      <div className="relative">
        <img
          src="https://lh3.googleusercontent.com/a/ACg8ocK9PpZOSCaG8vz02fpgPGxBb9-6Ksdm-aD2DALUgV5P05Ap-03c=s360-c-no"
          alt=""
          className="w-[50px] h-[50px] rounded-full "
        />

        <div className="w-[12px] h-[12px] rounded-full bg-green-400 absolute top-[2px] right-[2px]" />
</div>

        
        <div className="pl-3">
          <h1 className="text-[18px]">Zulkifal</h1>
          <p className="text-[16px] text-[#000c] "> You: Yeah I am good!</p>
        </div>
      
    </div>
  );
};

export default DashboardMessages;
