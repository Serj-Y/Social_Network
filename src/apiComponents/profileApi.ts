import { PhotosType, ProfileType, ResponseType } from "../components/Common/Types/Types";
import { instance } from "./Api";

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileApi = {
    getProfileContent(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId);
    },

    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId);
    },

    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, { status: status });
    },

    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType>(`profile`, profile);
    },
};
