import React, { useState } from "react";
import { BsArrowLeft, BsCheck, BsPencil } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Profile = ({handleProfileOpenClose}) => {
  const navigate = useNavigate();
const [flag , setFlag] = useState(false);
const [username , setUsername] = useState(null);

  const handleName = () => {
    setFlag(true);

  }

  const handleCheck = () => {
    setFlag(false);

  }

  const handleChange = (e) => {
    setUsername(e.target.value);
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
            <img className="rounded-full w-[15vw] h-[15vw] cursor-pointer" src="data:image/jpeg;base64,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" alt="" />
        </label>
        <input type="file" id="imageInput" className="hidden"/>
     </div>

     {/* name section */}
     <div className="bg-white px-3">
        <p className="py-3">Your Name</p>
       
        {!flag && <div className="w-full flex justify-between items-center">
            <p className="py-3">{username ||  "username"}</p>
            <BsPencil onClick={handleName} className="cursor-pointer"/>
        </div>}

        {
            flag && <div className="flex w-full justify-between items-center py-2">
                    <input onChange={handleChange} className="w-[80%] outline-none border-b-2 border-blue-900 p-2" type="text" placeholder="Enter your name" />
                    <BsCheck onClick={handleCheck} className="cursor-pointer text-3xl"/>
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
