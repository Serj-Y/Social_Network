import { stopSubmit } from "redux-form";
import { authApi, securityApi } from "../apiComponents/Api";

const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET- CAPTCHA-URL-SUCCESS"


let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });

export const setCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});




export const authData = () => async (dispatch) => {
    let data = await authApi.getLoginData()

    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha)
    if (data.resultCode === 0) {
        dispatch(authData(getCaptcha()))
    }
    else {
        if (data.resultCode === 10) {
            dispatch(getCaptcha())
        }
    }
    dispatch(stopSubmit("login", { _error: data?.messages }))
}

export const getCaptcha = () => async (dispatch) => {
    let data = await securityApi.getCaptcha()
    const captchaUrl = data.url;
    dispatch(setCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => {
    let data = await authApi.logOut()

    if (data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}


export default authReducer;
