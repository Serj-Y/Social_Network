import { stopSubmit } from "redux-form";
import { authApi } from "../apiComponents/Api";

const SET_USER_DATA = 'samurai-network/auth/SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) =>
    ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });

export const authData = () => async (dispatch) => {
    let data = await authApi.getLoginData()

    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe) => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe)

    if (data.resultCode === 0) {
        dispatch(authData())
    }
    else {
        dispatch(stopSubmit("login", { _error: data?.messages }))
    }
}

export const logout = () => async (dispatch) => {
    let data = await authApi.logOut()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;
