import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Common/Components/Redux/authReducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import styles from "./Login.module.scss"
import { LoginFormValuesType, LoginReduxForm } from "./LoginForm";


export const Login = () => {

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)

    const dispatch = useDispatch()

    const onSubmit = (FormData: LoginFormValuesType) => {
        dispatch(login(FormData.email, FormData.password, FormData.rememberMe, FormData.captcha));
    }
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div className={styles.loginBlock} >
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl} />
        </div>
    )
}



