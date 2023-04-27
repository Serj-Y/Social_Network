import * as axios from 'axios';


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
});


export const usersApi = {
    getUsers(currentPage, pageSize) {
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
  
    getProfileContent(userId) {
        return instance.get(`profile/` + userId)
            .then(response => {
                return response.data;
            })
    }

}

export const authApi = {
      getLoginData() {
        return instance.get(`auth/me`)
            .then(response => {
                return response.data;
            })
    },
}




