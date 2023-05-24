import { instance, MeResponseType } from "./Api";


export const usersApi = {
    requestUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },

};
