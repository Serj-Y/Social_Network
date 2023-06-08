import axios from "axios";


export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers:     {
        "API-KEY": "c45350d0-e2fd-4a10-9287-8f3cf738a929"
    }
    
  
});
