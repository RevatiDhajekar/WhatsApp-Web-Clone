import { Await } from "react-router-dom";
import { BASE_API_URL } from "../../config/Api"
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType";


//send new message
export const sendNewMessage=(messageData)=>async(dispatch)=>{
    try {
        const response = await fetch(`${BASE_API_URL}/api/messages/create`,{
            method:"POST",
            headers :{
                "Content-Type":"application/json",
                Authorization:`Bearer ${messageData.token}`
            },
            body:JSON.stringify(messageData.data) 
        }) //fetch end
        const data = await response.json();
        dispatch({type:CREATE_NEW_MESSAGE,payload:data});
    } catch (error) {
        console.log(error);
    }
}

export const getAllMessages=(reqdata)=>async(dispatch)=>{
    try {
        const response = await fetch(`${BASE_API_URL}/api/messages/chat/${reqdata.chatId}`,{
            method:"GET",
            headers :{
                "Content-Type":"application/json",
                Authorization:`Bearer ${reqdata.token}`
            },
        }) //fetch end
        const data = await response.json();
        dispatch({type:GET_ALL_MESSAGES,payload:data});
    } catch (error) {
        console.log(error);
    }
}

