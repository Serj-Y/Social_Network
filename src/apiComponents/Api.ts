import axios from "axios";
import { ProfileType } from "../components/Common/Types/Types";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
});

export const usersApi = {
    requestUsers(currentPage: number, pageSize: number) {
        return instance.get<MeResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
}

export const authApi = {
    getLoginData() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response =>  response.data )
    },
    login(email: string, password: string, rememberMe: boolean = false , captcha: null | string = null) {
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha})
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
        return instance.get<MeResponseType>(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    },

    getStatus(userId: number) {
        return instance.get<MeResponseType>(`profile/status/` + userId)
            .then(response => {
                return response.data;
            })
    },

    updateStatus(status: string) {
        return instance.put(`profile/status/`, { status: status })
            .then(response => {
                return response.data;
            })
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
            .then(response => {
                return response.data;
            })
    },
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10

}


type MeResponseType ={
    data: {id: number,  email: string, login: string}
    resultCode: ResultCodeEnum
    messages: Array<string>
    url: string
}

type LoginResponseType = {
    data: {userId: number}
    resultCode: ResultCodeEnum
    messages: Array<string>
}

export const securityApi = {
    getCaptcha() {
        return instance.get<MeResponseType>(`security/get-captcha-url`)
            .then(response => {
                return response.data;
            })
    },

}
