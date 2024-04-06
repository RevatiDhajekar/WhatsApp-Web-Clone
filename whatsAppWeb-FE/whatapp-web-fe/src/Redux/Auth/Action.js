import { BASE_API_URL } from "../../config/Api"
import { LOGIN, LOGOUT, REGISTER, REQ_USER, SEARCH_USER, UPDATE_USER } from "./ActionType";

export const register = (data) => async(dispatch) => {
    try {
        const resp = await fetch(`${BASE_API_URL}/auth/signup`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        const respData = await resp.json();
        if(respData.jwt){
            localStorage.setItem("token",respData.jwt);
        }
        console.log("register", respData)
        dispatch({type:REGISTER , payload:respData})
    } catch (error) {
        console.log("catch error ", error);
    }
}

export const login = (data) => async(dispatch) => {
    try {
        const resp = await fetch(`${BASE_API_URL}/auth/signin`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        const respData = await resp.json();
        if(respData.jwt){
            localStorage.setItem("token",respData.jwt);
        }
        console.log("login", respData)
        dispatch({type:LOGIN , payload:respData})
    } catch (error) {
        console.log("catch error ", error);
    }
}

export const currentUser = (token) => async(dispatch) => {
    console.log("cuurent user token => " , token);
    try {
        const resp = await fetch(`${BASE_API_URL}/api/users/profile`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        })
        const userData = await resp.json();
        console.log("currentUser", userData)
        dispatch({type:REQ_USER , payload:userData})
    } catch (error) {
        console.log("catch error ", error);
    }
}


export const searchUser = (data) => async(dispatch) => {
    try {
        const resp = await fetch(`${BASE_API_URL}/api/users/searchUser?name=${data.keyword}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        const userData = await resp.json();
        console.log("searchUser", userData)
        dispatch({type:SEARCH_USER , payload:userData})
    } catch (error) {
        console.log("catch error ", error);
    }
}

export const updateUser = (data) => async(dispatch) => {
    try {
        const resp = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        })
        const userData = await resp.json();
        console.log("register", userData)
        dispatch({type:UPDATE_USER , payload:userData})
    } catch (error) {
        console.log("catch error ", error);
    }
}

export const logout=()=>async(dispatch)=>{
    localStorage.removeItem("token");
    dispatch({type:LOGOUT , payload:null})
    dispatch({type:REQ_USER , payload:null})
}