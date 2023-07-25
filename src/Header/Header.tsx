import React, { useState } from "react";
import styles from "./Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { logout } from "../Common/Components/Redux/authReducer";
import { Btn, NavBtn } from "../Common/Components/styles/button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faRightToBracket, faXmark } from "@fortawesome/free-solid-svg-icons";



export const Header = () => {
    const login = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const [burgerBtn, setBurgerBtn] = useState(false)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(logout())
    }

    return (
        <header className={styles.header} >
            <div className={styles.burgerBtn} >
                {!burgerBtn && <Btn Click={() => setBurgerBtn(true)} ButtonText={<FontAwesomeIcon icon={faBars} />} />}
            </div>
            {burgerBtn && <div className={styles.burger}>
                <nav className={styles.nav} >
                    <div className={styles.item} >
                        <NavBtn Href="/profile" OnClick={() => setBurgerBtn(false)} ButtonText="Profile" />
                        <NavBtn Href="/messages" OnClick={() => setBurgerBtn(false)} ButtonText="Message" />
                        <NavBtn Href="/users" OnClick={() => setBurgerBtn(false)} ButtonText="Users" />
                        <NavBtn Href="/music" OnClick={() => setBurgerBtn(false)} ButtonText="Music" />
                        <NavBtn Href="/news" OnClick={() => setBurgerBtn(false)} ButtonText="News" />
                        <NavBtn Href="/settings" OnClick={() => setBurgerBtn(false)} ButtonText="Settings" />
                        <Btn Click={() => setBurgerBtn(false)} ButtonText={<FontAwesomeIcon icon={faXmark} />} />
                    </div>
                </nav>
            </div>}
            <div className={styles.title} >
                <div>Social_Network/{login} </div>
            </div>
            <div className={styles.loginBlock} >
                {isAuth
                    ? <Btn PropBtnStyle={styles.propBtn} Click={LogOut} ButtonText={<FontAwesomeIcon icon={faRightFromBracket} />} />
                    : <NavBtn PropBtnStyle={styles.propBtn} Href="/login" ButtonText={<FontAwesomeIcon icon={faRightToBracket} />} />
                }
            </div>
        </header>
    )

}


