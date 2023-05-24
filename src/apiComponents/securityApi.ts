import { instance } from "./Api";


export const securityApi = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`);
    },
};
