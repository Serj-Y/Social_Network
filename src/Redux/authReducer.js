import { authApi } from "../apiComponents/Api";

const SET_USER_DATA = 'SET-USER-DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }

        default:
            return state;
    }
}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });

export const authData = () => {
    return (dispatch) => {
        authApi.getLoginData()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
    }
}

export const login = (email, password, rememberMe) => (dispatch) => {
    authApi.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(authData())
            }
        });
}

export const logout = () => (dispatch) => {
    authApi.logOut()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        });
}


export default authReducer;
