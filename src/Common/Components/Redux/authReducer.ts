import { stopSubmit } from "redux-form";
import { securityApi } from "../apiComponents/securityApi";
import { authApi } from "../apiComponents/authApi";
import { CommonThunkType } from "../Types/Types";
import { InferActionsTypes } from "./reduxStore";

export type initialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

const initialState: initialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
  ) =>
    ({
      type: "SET-USER-DATA",
      payload: { userId, email, login, isAuth },
    } as const),

  setCaptchaUrlSuccess: (captchaUrl: string) =>
    ({
      type: "GET-CAPTCHA-URL-SUCCESS",
      payload: { captchaUrl },
    } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;

const myErrorMessage =
  "Sorry but Api on this website not support iOS devices and Safari on macOS. (This Api deprecated for Apple.) Ps: on other devices with android or other browser for macOS everything works.";

const authReducer = (
  state = initialState,
  action: ActionsTypes
): initialStateType => {
  switch (action.type) {
    case "SET-USER-DATA":
    case "GET-CAPTCHA-URL-SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const authData = (): ThunkType => async (dispatch: any) => {
  const response = await authApi.getLoginData();
  if (response.data.resultCode === 0) {
    let { id, email, login } = response.data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  } else {
    if (response.data.resultCode === 1) {
      dispatch(stopSubmit("login", { _error: myErrorMessage }));
    }
  }
};

export const login =
  (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
    ownMessage?: any
  ): ThunkType =>
  async (dispatch: any) => {
    let response = await authApi.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
      dispatch(authData());
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptcha());
      }
    }
    dispatch(stopSubmit("login", { _error: response.data?.messages }));
  };

export const getCaptcha = (): ThunkType => async (dispatch) => {
  let response = await securityApi.getCaptcha();

  const captchaUrl = response.data.url;
  dispatch(actions.setCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch) => {
  let response = await authApi.logOut();

  if (response.data.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
