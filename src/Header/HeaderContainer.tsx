import React from "react";
import Header from "./Header";
import { logout } from "../Common/Components/Redux/authReducer"
import { connect } from "react-redux";
import { compose } from "redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";


type PropsType = {
    isAuth: boolean
    login: string| null
    logout: () => void
}

const  HeaderContainer: React.FC<PropsType>  = (props) => {

        return <Header {...props} />
};


let mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose<React.ComponentType>(
    connect(
        mapStateToProps,
        { logout })

)(HeaderContainer);