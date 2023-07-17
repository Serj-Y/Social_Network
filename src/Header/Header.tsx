import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { logout } from "../Common/Components/Redux/authReducer";


export const Header = () => {
    const login = useSelector((state: AppStateType) => state.auth.login)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(logout())
    }

    return <header className={s.header}>
        <img src="https://png.pngtree.com/png-vector/20190328/ourmid/pngtree-simple-mountain-logo-designs-png-image_878392.jpg" alt=""  ></img>
        <div className={s.loginBlock} >
            {isAuth
                ? <div>{login} - <button onClick={LogOut} >LogOut</button></div>
                : <NavLink to={"/login"} >Login</NavLink>
            }
        </div>
    </header>
}


