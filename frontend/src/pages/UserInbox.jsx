import React, { useEffect, useState } from "react";
import Header from "../Components/layout/Header";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";
import { AiOutlineArrowRight, AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../utils/getImageUrl";
import { server } from "../server";

const ENDPOINT = "http://localhost:7000";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
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
        sender: data.sender || data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    // arrivalMessage now has `sender` property
    if (!arrivalMessage) return;
    const sender = arrivalMessage.sender;
    if (currentChat && currentChat.members && currentChat.members.includes(sender)) {
      setMessages((prev) => [...(prev || []), arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversations-user/${user?._id}`,
          {
            withCredentials: true,
          }
        );

        setConversations(response.data.conversations);
      } catch (error) {
        // console.log(error);
      }
    };
    getConversation();
  }, [user, messages]);

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
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
      senderId: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    if (!currentChat) return;
    // members may be array of ids; pick the other member as receiver
    const recieverId = currentChat.members.find(
      (member) => member !== user?._id
    );

    // emit via socket with correct sender id
    socketId.emit("sendMessage", {
      senderId: user?._id,
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
      lastMessageId: user._id,
    });
    await axios
      .put(`${server}/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: newMessage,
        lastMessageId: user._id,
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
    <div className="w-full">
      {!open && (
        <>
          <Header />
          <h1 className="text-center text-[30px] py-3 font-Poppins">
            All Messages
          </h1>
          {/* All messages list */}
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                key={index}
                data={item}
                index={index}
                setOpen={setOpen}
                setCurrentChat={setCurrentChat}
                me={user?._id}
                setUserData={setUserData}
                userData={userData}
                online={onlineCheck(item)}
                setActiveStatus={setActiveStatus}
              />
            ))}
        </>
      )}

      {open && (
        <UserChat
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          meId={user._id}
          userData={userData}
          activeStatus={activeStatus}
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
  online,
  setActiveStatus,
}) => {
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActiveStatus(online ? true : false);
    const userId = data.members.find((user) => user !== me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`);
        // backend returns { success: true, shop }
        setUser(res.data.shop);
        // also inform parent about selected user/shop data
        setUserData(res.data.shop);
  
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
        setActive(index) ||
        handleClick(data._id) ||
        setCurrentChat(data) ||
        setUserData(user) ||
        setActiveStatus(online)
      }
    >
      <div className="relative">
        <img
          src={getImageUrl(userData?.avatar)}
          alt=""
          className="w-[50px] h-[50px] rounded-full "
        />

        {online ? (
          <div className="w-[12px] h-[12px] bg-green-400 rounded-full absolute top-[2px] right-[2px]" />
        ) : (
          <div className="w-[12px] h-[12px] bg-[#c7b9b9] rounded-full absolute top-[2px] right-[2px]" />
        )}
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

const UserChat = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  userData = { userData },
  activeStatus,

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
            <h1>{activeStatus ? "Active Now" : ""}</h1>
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

export default UserInbox;
