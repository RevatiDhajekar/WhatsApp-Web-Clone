import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const SelectedMember = ({removeMember, member}) => {
  return (
    <div className="flex items-center bg-slate-300 rounded-full">
      <img
        className="w-7 h-7 rounded-full"
        src="https://cdn.pixabay.com/photo/2024/02/28/14/01/woman-8602128_640.png"
        alt=""
      />
      <p className="px-2">username</p>
      <AiOutlineClose onClick={removeMember} className="pr-1 cursor-pointer" />
    </div>
  );
};

export default SelectedMember;
