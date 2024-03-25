import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard";
import NewGroup from "./NewGroup";

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());
  const [query, setQuery] = useState(null);

  const removeMember = (item) => {
    groupMember.delete(item);
    setGroupMember(groupMember);
  };

  const handleSearch = () => {};

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="items-center flex space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
            <BsArrowLeft className="cursor-pointer font-bold text-2xl" />
            <p className="text-2xl font-semibold">Add Group participants</p>
          </div>

          <div className="relative bg-white py-4 px-3">
            <div className="flex space-x-2 flex-wrap space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    removeMember={() => removeMember(item)}
                    member={item}
                  />
                ))}
            </div>

            <input
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
                setQuery(e.target.value)
              }}
              className="outline-none border-b border-[#8888] px-2 py-2 w-[93%]"
              placeholder="Search user"
              value={query}
            />
          </div>

          <div className="bg-white overflow-y-scroll scrollbar-hide h-[50.2vh]">
              {query && [1,1,1,1,1,1,1].map((item) => <div onClick={()=>{
                groupMember.add(item)
                setGroupMember(groupMember)
                setQuery(null)
              }}
              key={item?.id}>
                <hr />
                <ChatCard/>
              </div>)}
          </div>

          <div className="flex bottom-10 py-10 bg-slate-200 items-center justify-center">
              <div className="bg-green-600 p-4 rounded-full cursor-pointer" 
              onClick={() => {
                setNewGroup(true)
              }}>
                <BsArrowRight className="text-white font-bold  text-3xl"/>
              </div>
          </div>
        </div>
      )}
      {newGroup && <NewGroup/>}
    </div>
  );
};
export default CreateGroup;
