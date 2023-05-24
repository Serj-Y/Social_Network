import { stopSubmit } from "redux-form";
import { ResultCodeEnum, ResultCodeForCaptcha, authApi, securityApi } from "../apiComponents/Api";

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
    let data = await authApi.getLoginData()

    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}


export const login =
    (email: string, password: string, rememberMe: boolean, captcha: string) =>
        async (dispatch: any) => {
            let data = await authApi.login(email, password, rememberMe, captcha)
            if (data.resultCode === ResultCodeEnum.Success) {
                dispatch(authData())
            }
            else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptcha())
                }
            }
            dispatch(stopSubmit("login", { _error: data?.messages }))
        }

export const getCaptcha = () => async (dispatch: any) => {
    let response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url;
    dispatch(setCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch: any) => {
    let data = await authApi.logOut()
    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export default authReducer;
