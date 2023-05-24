import { ProfileType } from "../components/Common/Types/Types";
import { instance } from "./Api";


export const profileApi = {
    getProfileContent(userId: number) {
        return instance.get(`profile/` + userId);
    },

    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },

    updateStatus(status: string) {
        return instance.put(`profile/status/`, { status: status });
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
        return instance.put(`profile`, profile);
    },
};
