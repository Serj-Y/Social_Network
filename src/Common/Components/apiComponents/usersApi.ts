import { instance } from "./Api";
import { GetItemsType, ResponseType } from "../Types/Types";
import { AxiosPromise } from "axios";


export const usersApi = {

    requestUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
    },

    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
    },

    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`) as AxiosPromise<ResponseType>
    },

};
