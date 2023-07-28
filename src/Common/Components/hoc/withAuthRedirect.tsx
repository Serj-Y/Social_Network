import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../Redux/reduxStore";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});

type PropsType = {
    isAuth: boolean
}


export const withAuthRedirect = (Component: any) => {
const RedirectComponent: React.FC<PropsType>  = (props) => {
    
            if (!props.isAuth) 
            return <Redirect to={"/Login"}/>
            return <Component {...props}/>
        
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect) (RedirectComponent);

    return ConnectedAuthRedirectComponent;
}