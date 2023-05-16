import { stopSubmit } from "redux-form";
import { profileApi } from "../apiComponents/Api";
import { ProfileType, PhotosType, PostsType } from "../components/Common/Types/Types";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE-PHOTO-SUCCESS";



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

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType
            }

        default:
            return state;
    }
}

type addPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): addPostActionCreatorType => ({ type: ADD_POST, newPostText });

type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): setUserProfileType => ({ type: SET_USER_PROFILE, profile });

type setStatusType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): setStatusType => ({ type: SET_STATUS, status })

type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
export const savePhotoSuccess = (photos: PhotosType): savePhotoSuccessType => ({ type: SAVE_PHOTO_SUCCESS, photos })




export const profileContent = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getProfileContent(userId)
    dispatch(setUserProfile(data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getStatus(userId)
    dispatch(setStatus(data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    let data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileApi.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    let data = await profileApi.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(profileContent(userId))
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;