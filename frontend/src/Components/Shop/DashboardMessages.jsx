import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${server}/conversation/get-all-conversations-seller/${seller._id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded">
      {!open && (
        <>
          <h1 className="text-center text-[30px] py-3 font-Poppins ">
            {" "}
            All Messages{" "}
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
              />
            ))}
        </>
      )}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(1);
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) => setActive(index) || handleClick(data._id)}
    >
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

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocK9PpZOSCaG8vz02fpgPGxBb9-6Ksdm-aD2DALUgV5P05Ap-03c=s360-c-no"
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">Zulkifal</h1>
            <h1>Active Now</h1>
          </div>
        </div>
        <AiOutlineArrowRight
          size={20}
          className="cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages */}
      <div className="px-3 h-[65vh] py-3 overflow-y-scroll">
        <div className="flex w-full my-2">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocK9PpZOSCaG8vz02fpgPGxBb9-6Ksdm-aD2DALUgV5P05Ap-03c=s360-c-no"
            alt=""
            className="w-[40px] h-[40px] rounded-full mr-3 "
          />
          <div className="w-max p-2 rounded text-[#fff] h-min bg-[#38c776]">
            <p>Hello</p>
          </div>
        </div>
         <div className="flex w-full justify-end my-2">
          <div className="w-max p-2 rounded text-[#fff] h-min bg-[#38c776]">
            <p>Hello there!</p>
          </div>
        </div>
      </div>

      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        // onSubmit={sendMessageHandler}
      >
        <div className="w-[30px]">
          <input
            type="file"
            name=""
            id="image"
            className="hidden"
            // onChange={handleImageUpload}
          />
          <label htmlFor="image">
            <TfiGallery className="cursor-pointer" size={20} />
          </label>
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            placeholder="Enter your message..."
            // value={newMessage}
            // onChange={(e) => setNewMessage(e.target.value)}
            className={`${styles.input}`}
          />
          <input type="submit" value="Send" className="hidden" id="send" />
          <label htmlFor="send">
            <AiOutlineSend
              size={20}
              className="absolute right-4 top-5 cursor-pointer"
            />
          </label>
        </div>
      </form>
    </div>
  );
};
export default DashboardMessages;
