import { authData } from "./authReducer";
import { InferActionsTypes } from "./reduxStore";


const initialState = {
    initialized: false,
};

const actions = {
    initializedSuccess: () => ({ type: "INITIALIZED-SUCCESS" }) as const
}

export type initialStateType = typeof initialState


type ActionType = InferActionsTypes<typeof actions>


const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}




export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(authData());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    });
}

export default appReducer;
