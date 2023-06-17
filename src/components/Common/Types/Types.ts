import { AppStateType } from "../../../Redux/reduxStore"
import { Action } from "redux"
import { ThunkAction } from "redux-thunk"


export type PostsType = {
   
    id: string
    message: string
    likesCount: number
}

export type ContactsObjectType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsObjectType
    photos: PhotosType
    status: string 
}

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type GetItemsType = {
    items: Array<UsersType>;
    totalCount: number;
    error: string | null;
}; export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D;
    messages: Array<string>;
    resultCode: RC;
};
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
export type CommonThunkType<
    A extends Action, R = Promise<void>> =
    ThunkAction<R, AppStateType, unknown, A>;

