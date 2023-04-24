import { combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    
});

let store = createStore(reducers);

window.store = store;

export default store