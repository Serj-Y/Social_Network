import React from "react";
import s from "./Header.module.css";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { logout } from "../Common/Components/Redux/authReducer";
import { Btn, NavBtn } from "../Common/Components/styles/button/Button";



export const Header = () => {
    const login = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(logout())
    }

    return (
        <header className={s.header}>
            Social_Network / {login} 
            <div className={s.loginBlock} >
                {isAuth
                    ? <Btn Href={LogOut} ButtonText="Logout" />
                    : <NavBtn Href="/login" ButtonText="Login" />
                }
            </div>
        </header>
    )

}


