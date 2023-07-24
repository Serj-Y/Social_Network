import React from "react";
import styles from "./Header.module.scss";
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
        <header className={styles.header}>
            <div className={styles.burger}>
BBB
            </div>
            <div className={styles.title} >
                <div>Social_Network/{login} </div>
            </div>
            
            <div className={styles.loginBlock} >
                {isAuth
                    ? <Btn PropBtnStyle={styles.propBtn} Href={LogOut} ButtonText="Logout" />
                    : <NavBtn PropBtnStyle={styles.propBtn} Href="/login" ButtonText="Login" />
                }
            </div>
        </header>
    )

}


