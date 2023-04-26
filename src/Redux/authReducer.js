import { socialNetworkApi } from "../apiComponents/Api";

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
                isAuth: true,
            }

        default:
            return state;
    }
}
export const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: { id, email, login } });

export const authData = () => {
    return (dispatch) => {
        socialNetworkApi.getLoginData()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUserData(id, email, login));
                }
            });
    }
}

export default authReducer;
