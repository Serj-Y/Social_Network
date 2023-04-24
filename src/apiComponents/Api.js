import * as axios from 'axios';



const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
});



export const getUsers = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then(response => {
            return response.data;
        })
};

export const getFollow = (u) => {
    return instance.delete(`follow/${u.id}`)
        .then(response => {
            return response.data;
        })
};

export const getUnfolow = (u) => {
    return instance.post(`follow/${u.id}`)
        .then(response => {
            return response.data;
        })
};

export const getLoginData = () => {
    return instance.get(`auth/me`)
        .then(response => {
            return response.data;
        })
};

export const getProfileContent = (userId) => {
    return instance.get(`profile/` + userId)
    .then(response => {
        return response.data;
    })
 }




