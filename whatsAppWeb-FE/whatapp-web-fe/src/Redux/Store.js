import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import {thunk} from 'redux-thunk';
import { authReducer } from "./Auth/Reducer";
import { chatReducer } from "./Chat/Reducer";
import { messageReducer } from "./Messages/Reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    chat : chatReducer,
    message : messageReducer
})

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
export const store = legacy_createStore(rootReducer , composeEnhancers(applyMiddleware(thunk)));
