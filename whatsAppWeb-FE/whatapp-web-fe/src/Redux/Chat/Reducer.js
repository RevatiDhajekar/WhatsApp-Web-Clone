import { CREATE_CHAT, CREATE_GROUP, GET_ALL_CHATS_OF_USER } from "./ActionType";

const initialState = {
  createdChats:null,
  createdGroup: null,
  chats: []
};

export const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_CHAT:
        return {...state, createdChats:payload}
    case CREATE_GROUP:
        return {...state, createdGroup:payload}
    case GET_ALL_CHATS_OF_USER:
        return {...state, chats:payload}
    default:
        return state;
  }
};
