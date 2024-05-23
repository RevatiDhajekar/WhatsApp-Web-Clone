import { BASE_API_URL } from "../../config/Api"
import { CREATE_CHAT, CREATE_GROUP, GET_ALL_CHATS_OF_USER } from "./ActionType";

//action creater functions

export const createChat =(chatData)=> async(dispatch) =>{
    try {
        const response = await fetch(`${BASE_API_URL}/api/chats/single` , {
            method:"POST",
            headers :{
                "Content-Type":"application/json",
                Authorization:`Bearer ${chatData.token}`
            },
            body:JSON.stringify(chatData)  //send data to server in string format
        }) //fetch end

        const data = await response.json();
        console.log("create chat=> ",data);
        dispatch({type:CREATE_CHAT,payload:data}) //dispatching json to redux store
    } catch (error) {
        console.log(error);
    }
}

export const createGroupChat =(groupChatData)=> async(dispatch) =>{
    try {
        const response = await fetch(`${BASE_API_URL}/api/chats/group` , {
            method:"POST",
            headers :{
                "Content-Type":"application/json",
                Authorization:`Bearer ${groupChatData.token}`
            },
            body:JSON.stringify(groupChatData.data)  //send data to server in string format
        }) //fetch end

        const data = await response.json();   //converting response to json object
        console.log("create group chat=> ",data);
        dispatch({type:CREATE_GROUP,payload:data}) //dispatching json to redux store
    } catch (error) {
        console.log(error);
    }
}

export const getAllChatsOfUser =(chatData)=> async(dispatch) =>{
    try {
        const response = await fetch(`${BASE_API_URL}/api/chats/getAllChats` , {
            headers :{
                method:"GET",
                "Content-Type":"application/json",
                Authorization:`Bearer ${chatData}`
            }
        }) //fetch end

        const data = await response.json();   //converting response to json object
        console.log("get All chats of Users => ",data);
        dispatch({type:GET_ALL_CHATS_OF_USER,payload:data}) //dispatching json to redux store
    } catch (error) {
        console.log(error);
    }
}