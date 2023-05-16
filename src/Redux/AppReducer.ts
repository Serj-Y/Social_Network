import { authData } from "./authReducer";




const INITIALIZED_SUCCESS = "INITIALIZED-SUCCESS";

export type initialStateType = {
    initialized: boolean
}

const initialState: initialStateType = {
    initialized: false,
};

const appReducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}
 type initializedSuccessActionSuccess = {
    type: typeof INITIALIZED_SUCCESS
 }

export const initializedSuccess = (): initializedSuccessActionSuccess => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authData());
    Promise.all([promise]).then(() => {
        dispatch(initializedSuccess());
    });
}

export default appReducer;
