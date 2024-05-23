import React, { useState } from "react";
import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../../Redux/Auth/Action";

const Profile = ({handleProfileOpenClose}) => {
  const navigate = useNavigate();
const [flag , setFlag] = useState(false);
const [username , setUsername] = useState("");
const reqUser = useSelector((store) => store.auth.reqUser);
const dispatch = useDispatch();
const [tempPicture , setTempPicture] = useState(null);

  const handleName = () => {
    setFlag(true);

  }

  // const handleCheck = () => {
  //   setFlag(false);

  // }
  const updateName= (e)=>{
    console.log("name",username)
    setFlag(false);
    const dataa = {
      token: localStorage.getItem("token"),
      data : {fullName : username}
    };
    dispatch(updateUser(dataa));
  }

  const uploadToCloudinary = (pics) =>{
    const data = new FormData();
    data.append("file" , pics);
    data.append("upload_preset" , "waw2024");
    data.append("cloud_name" , "dp38snj3j");
    fetch("https://api.cloudinary.com/v1_1/dp38snj3j/image/upload",{
      method:"POST",
      body:data
    }).then((res) => res.json())
    .then((data) => {
      setTempPicture(data.url.toString());
      console.log("imgurl => ",data.url.toString());
      const dataa = {
        token: localStorage.getItem("token"),
        data : {profileImage : data.url.toString()}
      };
      dispatch(updateUser(dataa));
    })
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 pb-5">
        <BsArrowLeft onClick={handleProfileOpenClose} className="cursor-pointer text-2xl font-bold"/>
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

     {/* update profile pic */}
     <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imageInput">
            <img className="rounded-full w-[15vw] h-[15vw] cursor-pointer"
             src={reqUser?.profileImage  || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
        </label>
        <input onChange={(e)=>uploadToCloudinary(e.target.files[0])} type="file" id="imageInput" className="hidden"/>
     </div>

     
     {/* name section */}
     <div className="bg-white px-3">
        <p className="py-3">Your Name</p>       
        {!flag && <div className="w-full flex justify-between items-center">
            <p className="py-3" >{reqUser?.fullName || "username"} </p>
            <BsPencil onClick={handleName} className="cursor-pointer"/>
        </div>}

        {
            flag && <div className="flex w-full justify-between items-center py-2">
                    <input  onChange={(e)=>{setUsername(e.target.value); console.log(username)}} className="w-[80%] outline-none border-b-2 border-blue-900 p-2" type="text" placeholder="Enter your name" />
                    <BsCheck onClick={(e)=>updateName(e)} className="cursor-pointer text-3xl"/>
                </div>
        }
     </div>


     <div className="px-3 my-5">
        <p className="py-10">This is not your username , this name will be visible to your whatsapp contacts.</p>
     </div>
    </div>
  );
};

export default Profile;
