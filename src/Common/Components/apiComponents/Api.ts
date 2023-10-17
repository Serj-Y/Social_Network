import axios from "axios";

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    "API-KEY": "31f10052-8cc2-4be1-afe8-f96301072f41",
  },
});
