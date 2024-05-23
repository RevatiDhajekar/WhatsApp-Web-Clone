import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import ChatCard from "./ChatCard";
import MessageCard from "./MessageCard/MessageCard";
import "../css/HomePage.css";
import Profile from "./Profile/Profile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout, searchUser } from "../Redux/Auth/Action";
import { createChat, getAllChatsOfUser } from "../Redux/Chat/Action";
import { getAllMessages, sendNewMessage } from "../Redux/Messages/Action";

const HomePage = () => {
  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState(null);
  const [isProfile, setIsProfile] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isGroup, setIsGroup] = useState(false);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth); 
  const chat = useSelector((store) => store.chat);
  const message = useSelector((store) => store.message); 
  const token = localStorage.getItem("token");
  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword: keyword, token: token }));
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatcard = (userId) => {
    setCurrentChat(true);
    setQueries("");
    dispatch(createChat({ userId: userId, token: token }));
  };

  const handleCurrentChat = (item) =>{
    setCurrentChat(item);
  }

  console.log("current chat = ",currentChat);

  const handleCreateNewMessage = () => {
    dispatch(sendNewMessage({token, data:{chatId:currentChat.id , content:content} }))
  };

  const handleNavigates = () => {
    // navigate("/profile");
    setIsProfile(true);
  };

  const handleProfileOpenClose = () => {
    setIsProfile(false);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signup");
  };

  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signup");
    }
  }, [auth?.reqUser]);

  useEffect(() => {
    dispatch(currentUser(token));
  }, [token,auth.reqUser?.fullName]);

  useEffect(() => {
    dispatch(getAllChatsOfUser(token)); //getting all users chat for right side
  }, [chat.createChat, chat.CreateGroup]); //whenever new chat or group created , it will dispatch action getAllChatsOfUser

  useEffect(()=>{
    if(currentChat?.id)
    dispatch(getAllMessages({token,chatId:currentChat.id}))
  }, [currentChat,message.newMessage])


  return (
    <div className="relative bg-slate-500">
      <div className="w-full py-14 bg-[#00a884] "> </div>
      <div className="flex bg-[#f0f2f5] h-[91vh] absolute top-[5vh] left-[2vw] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* Profile */}
          {isGroup && <CreateGroup setIsGroup={setIsGroup}/>}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleProfileOpenClose={handleProfileOpenClose} />
            </div>
          )}
          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* Home */}
              <div className="flex items-center justify-between p-1 ">
                <div
                  onClick={handleNavigates}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src={auth.reqUser?.profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                    alt=""
                  />
                  <p>{auth.reqUser?.fullName}</p>
                </div>
                <div className="space-x-3 text-2xl flex ">
                  <TbCircleDashed
                    className="cursor-pointer"
                    onClick={() => {
                      navigate("/status");
                    }}
                  />
                  <BiCommentDetail className="cursor-pointer" />
                  <div>
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      id="demo-positioned-button"
                      aria-controls={open ? "demo-positioned-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Button />
                    <Menu
                      id="demo-positioned-menu"
                      aria-labelledby="demo-positioned-button"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>

              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="search or start new chat"
                  onChange={(e) => {
                    setQueries(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={queries}
                />
                <AiOutlineSearch className="absolute left-6 top-7" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* all users */}
              <div className="bg-white overflow-y-scroll h-[72vh] px-3 scrollbar-hide">
                {/* if any searches */}
                {queries &&
                  auth.searchUser?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleClickOnChatcard(item.id)}
                    >
                      {" "}
                      <hr />
                      <ChatCard
                        name={item.fullName}
                        userImg={item.profileImage}
                      />{" "}
                    </div>
                  ))}
                {/* on loading */}
                {chat.chats.length > 0 &&
                  !queries &&
                  chat.chats?.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleCurrentChat(item)}
                    >
                      {" "}
                      <hr />
                      {item.isGroup ? (
                        //for group
                        <ChatCard
                          name={item.chatName}
                          userImg={item.chatImage || ""}
                        />
                      ) : (
                        //if single chat
                        <ChatCard
                          name={
                            item.users && item.users.length >= 2
                            ? auth.reqUser?.id !== item.users[0].id
                                ? item.users[0].fullName
                                : item.users[1].fullName
                            : "Unknown"
                          }
                          userImg={
                            item.users && item.users.length >= 2
                            ? auth.reqUser?.id !== item.users[0]?.id
                              ? item.users[0].profileImage
                              : item.users[1].profileImage
                              :""
                          }
                        />
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* default whatapp page */}

        {!currentChat && (
          <div className="w-[70%] flex flex-col items-center justify-center h-full">
            <div className="w-full text-center">
              <img
                className="w-[30%] mx-auto fixed-image"
                src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-mobile-software-icon-png-image_6315991.png"
                alt=""
              />
              <br />
              <br />
              <h1 className="text-4xl text-gray-600">Whats App Web</h1>
              <p className="my-9">
                Send and receive message without keeping your phone online. Use
                WhatsApp on up to 4 Linked devices and 1 phone at the same time.
              </p>
            </div>
          </div>
        )}

        {/* message part */}
        {currentChat && (
          <div className="w-[70%] relative">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between ">
                <div className="py-3 space-x-4 flex items-center px-3 ">
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer"
                    src={currentChat.isGroup ?
                      currentChat.chatImage :
                      currentChat && auth.reqUser?.id===currentChat.users[0].id ? currentChat.users[1]?.profileImage : currentChat.users[0]?.profileImage
                  }
                    alt=""
                  />
                  <p>{currentChat.isGroup ?
                    currentChat.chatName :
                    currentChat && auth.reqUser?.id===currentChat.users[0].id ? currentChat.users[1]?.fullName : currentChat.users[0]?.fullName
                }</p>
                  
                </div>
                <div className="py-3 space-x-4 items-center px-3 flex">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll bg-blue-200 scrollbar-hide">
              <div className="space-y-1 flex flex-col justify-center mt-20 py-2">
                {message.messages.length>0 && message.messages?.map((item, i) => (
                  <MessageCard
                    isReqUserMsg={item.user.id!==auth.reqUser.id}
                    content={item.content}
                  />
                ))}
              </div>
            </div>

            {/* footer/search part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment className="cursor-pointer" />
                <input
                  className="py-2 outline-none border-none bg-whitepl-4 rounded-md w-[85%]"
                  type="text"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder=" Type message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage();
                      setContent("");
                    }
                  }}
                />
                <BsMicFill />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
