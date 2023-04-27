import { usersApi } from "../apiComponents/Api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
    posts: [
        { id: 1, message: 'Hi', likesCount: 13 },
        { id: 2, message: 'Hello World', likesCount: 24 },
        { id: 3, message: 'post', likesCount: 83 },
        { id: 4, message: '(;', likesCount: 39 },
        { id: 5, message: '):', likesCount: 45 },
    ],
    newPostText: '',
    profile: null,

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: '',
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText,
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile

            }
        }
        default:
            return state;
    }
}
export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});


export const profileContent = (userId) => {
    return (dispatch) => {
        usersApi.getProfileContent(userId)
        .then(data => {
            dispatch(setUserProfile(data));
        });
    }
}


export default profileReducer;