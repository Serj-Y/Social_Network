import { instance } from "./Api";

type GetCaptchaUrlResponseType = {
  url: string;
};

export const securityApi = {
  getCaptcha() {
    return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`);
  },
};
