import { profileApi } from "../apiComponents/Api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS"

let initialState = {
    posts: [
        { id: 1, message: "Hi", likesCount: 13 },
        { id: 2, message: "Hello World", likesCount: 24 },
        { id: 3, message: "post", likesCount: 83 },
        { id: 4, message: "(;", likesCount: 39 },
        { id: 5, message: "):", likesCount: 45 },
    ],
    profile: null,
    status: "",
};

const profileReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const profileContent = (userId) => async (dispatch) => {
    let data = await profileApi.getProfileContent(userId)
    dispatch(setUserProfile(data));
};

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileApi.getStatus(userId)
    dispatch(setStatus(data));
};

export const updateStatus = (status) => async (dispatch) => {
    let data = await profileApi.updateStatus(status)
    if (data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};

export default profileReducer;