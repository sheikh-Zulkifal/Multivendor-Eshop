import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import styles from "../../styles/styles";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import getImageUrl from "../../utils/getImageUrl";

const ENDPOINT = "http://localhost:7000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [images, setImages] = useState();

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    // arrivalMessage has senderId property
    if (!arrivalMessage) return;
    const senderId = arrivalMessage.senderId;
    if (
      currentChat &&
      currentChat.members &&
      currentChat.members.includes(senderId)
    ) {
      setMessages((prev) => [...(prev || []), arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

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

  useEffect(() => {
    if (seller) {
      const sellerId = seller?._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // create message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      senderId: seller._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    if (!currentChat) return;
    // members may be array of ids; pick the other member as receiver
    const recieverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    // emit via socket with correct sender id
    socketId.emit("sendMessage", {
      senderId: seller._id,
      recieverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        const res = await axios.post(
          `${server}/message/create-new-message`,
          message,
          { withCredentials: true }
        );
        if (res.data && res.data.message) {
          setMessages((prev) => [...(prev || []), res.data.message]);
          updateLastMessage();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: seller._id,
      })
      .then((res) => {
        console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                setCurrentChat={setCurrentChat}
                me={seller._id}
                setUserData={setUserData}
                userData={userData}
              />
            ))}
        </>
      )}

      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          sellerId={seller._id}
          userData={userData}
        />
      )}
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  userData,
}) => {
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(1);
  useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`);
        setUserData(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);
  return (
    <div
      className={`w-full flex p-3 px-3 ${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      }  cursor-pointer`}
      onClick={(e) =>
        setActive(index) || handleClick(data._id) || setCurrentChat(data)
      }
    >
      <div className="relative">
        <img
          src={getImageUrl(userData?.avatar)}
          alt=""
          className="w-[50px] h-[50px] rounded-full "
        />

        <div className="w-[12px] h-[12px] rounded-full bg-green-400 absolute top-[2px] right-[2px]" />
      </div>

      <div className="pl-3">
        <h1 className="text-[18px]">{userData?.name}</h1>
        <p className="text-[16px] text-[#000c] ">
          {" "}
          {data.lastMessageId !== userData?._id
            ? "You: "
            : userData.name.split("")[0] + ":"}{" "}
          {data.lastMessage}
        </p>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData = { userData },
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="w-full flex p-3 items-center justify-between bg-slate-200">
        <div className="flex">
          <img
            src={getImageUrl(userData?.avatar)}
            alt=""
            className="w-[60px] h-[60px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-[600]">{userData?.name}</h1>
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
        {messages &&
          messages.map((item, index) => (
            <div
              className={`flex w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender !== sellerId && (
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocK9PpZOSCaG8vz02fpgPGxBb9-6Ksdm-aD2DALUgV5P05Ap-03c=s360-c-no"
                  alt=""
                  className="w-[40px] h-[40px] rounded-full mr-3 "
                />
              )}

              <div>
                <div className="w-max p-2 rounded text-[#fff] h-min bg-[#38c776]">
                  <p>{item.text}</p>
                </div>
                <p className="text-[12px] text[#000] pt-1">
                  {format(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
      {/* send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between items-center"
        onSubmit={sendMessageHandler}
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
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
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
