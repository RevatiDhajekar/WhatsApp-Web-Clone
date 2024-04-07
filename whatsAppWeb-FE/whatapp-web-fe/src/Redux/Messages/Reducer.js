import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType";

const initialState = {
  newMessage: null,
  messages: [],
};

export const messageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_MESSAGE:
      return { ...state, newMessage: payload };
    case GET_ALL_MESSAGES:
      return { ...state, messages: payload };
    default:
      return state;
  }
};
