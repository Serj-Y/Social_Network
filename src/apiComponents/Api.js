import * as axios from 'axios';


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
});

export const usersApi = {
    requestUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    unFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    },
}

export const authApi = {
    getLoginData() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
    login(email, password, rememberMe) {
        return instance.post(`auth/login`,{email, password, rememberMe})
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
    getProfileContent(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    },

    getProfileContent(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    },

    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
        .then(response => {
            return response.data;
        })
    },

    updateStatus(status) {
        return instance.put(`profile/status/`, {status: status})
        .then(response => {
            return response.data;
        })
    },

}




