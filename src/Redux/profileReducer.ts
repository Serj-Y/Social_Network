import { stopSubmit } from "redux-form";
import { profileApi } from "../apiComponents/profileApi";
import { ProfileType, PhotosType, PostsType, CommonThunkType } from "../components/Common/Types/Types";
import { InferActionsTypes } from "./reduxStore";


let initialState = {
    posts: [
        { id: 1, message: "Hi", likesCount: 13 },
        { id: 2, message: "Hello World", likesCount: 24 },
        { id: 3, message: "post", likesCount: 83 },
        { id: 4, message: "(;", likesCount: 39 },
        { id: 5, message: "):", likesCount: 45 },
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: "",
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case "ADD-POST": {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: "",
            };
        }
        case "SET-USER-PROFILE": {
            return {
                ...state,
                profile: action.profile
            };
        }
        case "SET-STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "SAVE-PHOTO-SUCCESS":
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }

        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: "ADD-POST", newPostText } as const),
    setUserProfile: (profile: ProfileType) => ({ type: "SET-USER-PROFILE", profile } as const),
    setStatus: (status: string) => ({ type: "SET-STATUS", status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: "SAVE-PHOTO-SUCCESS", photos } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

export const profileContent = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileApi.getProfileContent(userId)
    dispatch(actions.setUserProfile(response.data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let response = await profileApi.getStatus(userId)
    dispatch(actions.setStatus(response.statusText));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
};

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileApi.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(profileContent(userId))
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }))
        return Promise.reject(response.data.messages[0])
    }
}

export default profileReducer;