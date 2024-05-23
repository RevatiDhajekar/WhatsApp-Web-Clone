import { Avatar, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import CreateGroup from "./CreateGroup";
import { createGroupChat } from "../../Redux/Chat/Action";

const NewGroup = ({groupMember, setIsGroup}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
    const [groupName , setGroupName] = useState();
    const [groupImage , setGroupImage] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const createNewGroup = ()=>{
      let userIds = [];

      for(let user of groupMember){
        userIds.push(user.id);
      }
      const group = {
        userIds,
        chatName: groupName,
        chatImage : groupImage
      };
      const data={data: group,token};
      dispatch(createGroupChat(data));
      setIsGroup(false);
    }
    
  const uploadToCloudinary = (pics) =>{
    setIsImageUploading(true)
    const data = new FormData();
    data.append("file" , pics);
    data.append("upload_preset" , "waw2024");
    data.append("cloud_name" , "dp38snj3j");
    fetch("https://api.cloudinary.com/v1_1/dp38snj3j/image/upload",{
      method:"POST",
      body:data
    }).then((res) => res.json())
    .then((data) => {
      setGroupImage(data.url.toString());
      console.log("imgurl => ",data.url.toString());
      setIsImageUploading(false)
  })
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white px-4 pb-4 py-10">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
        <p className="text-xl font-semibold">New Group</p>
      </div>

      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imageInput" className="relative w-[70%]">
          {/* <img
          className="h-20 w-20 rounded-full"
            src={groupImage || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"}
            alt=""
          /> */}
          <Avatar sx={{width:"15rem", height:"15rem"}} alt="group icon" 
          className="h-44 w-44"   
          src={groupImage || "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_640.png"}
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imageInput"
          className="hidden"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
        />
      </div>
      <div className="w-full flex items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          type="text"
          placeholder="Group Subject"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

     { groupName && <div className="py-10 bg-slate-200 flex items-center justify-center" >
        <Button onClick={createNewGroup}>
            <div className="bg-[#0c977d] rounded-fulln p-4" >
                <BsCheck2 className="text-white font-bold text-3xl"/>
            </div>
        </Button>
      </div>}
    </div>
  );
};

export default NewGroup;
