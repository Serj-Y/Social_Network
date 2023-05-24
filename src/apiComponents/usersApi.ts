import { instance } from "./Api";
import { GetItemsType } from "../components/Common/Types/Types";


export const usersApi = {
    requestUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },

};
