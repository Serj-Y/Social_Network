
import axios from "axios";
import { ProfileType} from "../components/Common/Types/Types";


export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
});

export const authApi = {
    getLoginData() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
            .then(response => {
                return response.data;
            })
    },
    logOut() {
        return instance.delete(`auth/login`)
            .then(response => {
                return response.data;
            })
    },
}

export const profileApi = {
    getProfileContent(userId: number) {
        return instance.get(`profile/` + userId)
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },

    updateStatus(status: string) {
        return instance.put(`profile/status/`, { status: status })
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put(`profile`, profile)
    },
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,

}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


export type MeResponseType = {
    url: any
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodeEnum
    messages: Array<string>
    profile: ProfileType

}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const securityApi = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    },

}
