import { ResponseType } from "../Types/Types";
import { instance } from "./Api";

export type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseType = {
  userId: number;
};

export const authApi = {
  getLoginData() {
    return instance.get<ResponseType<MeResponseDataType>>(`auth/me`);
  },

  login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: null | string = null
  ) {
    return instance.post<ResponseType<LoginResponseType>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    });
  },

  logOut() {
    return instance.delete(`auth/login`);
  },
};
