import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { reducer as formReducer } from "redux-form";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogsReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import appReducer from "./AppReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogReducer,
    usersPage: usersReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

window.__store__ = store;

export default store