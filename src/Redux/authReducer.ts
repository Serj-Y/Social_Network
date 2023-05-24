import { stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../components/Common/Types/Types";
import { securityApi } from "../apiComponents/securityApi";
import { authApi } from "../apiComponents/authApi";

const SET_USER_DATA = "samurai-network/auth/SET-USER-DATA";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET- CAPTCHA-URL-SUCCESS"

export type initialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: string | null,
}

type setAuthUserDataPayloadType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA,
    payload: setAuthUserDataPayloadType
}

type setCaptchaUrlSuccessType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

let initialState: initialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,

};

const authReducer = (state = initialState, action: any): initialStateType => {
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

export const setAuthUserData =
    (userId: number | null, email: string | null, login: string | null, isAuth: boolean)
        : setAuthUserDataActionType => ({
            type: SET_USER_DATA,
            payload: { userId, email, login, isAuth }
        });

export const setCaptchaUrlSuccess =
    (captchaUrl: string): setCaptchaUrlSuccessType => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    });

export const authData = () => async (dispatch: any) => {
    let response = await authApi.getLoginData()

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login =
    (email: string, password: string, rememberMe: boolean, captcha: string) =>
        async (dispatch: any) => {
            let response = await authApi.login(email, password, rememberMe, captcha)
            if (response.data.resultCode === 0) {
                dispatch(authData())
            }
            else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptcha())
                }
            }
            dispatch(stopSubmit("login", { _error: response.data?.messages }))
        }

export const getCaptcha = () => async (dispatch: any) => {
    let response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    let response = await authApi.logOut()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
