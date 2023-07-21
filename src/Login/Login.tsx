import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input } from "../Common/Components/FormsControls/FormsControls";
import { required } from "../Common/Components/Validators/Validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Common/Components/Redux/authReducer";
import { Redirect } from "react-router-dom";
import stylesForm from "../Common/Components/FormsControls/FormsControls.module.css"
import { CreateFields } from "../Common/Components/FormsControls/FormsControls";
import { AppStateType } from "../Common/Components/Redux/reduxStore";



type LoginFormOwnProps = {
    captchaUrl: string | null;
}



const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({ captchaUrl, error, handleSubmit }) => {
        return (
            <form onSubmit={handleSubmit}>
                {CreateFields<LoginFormValueTypeKeys>("Email", "email", [required], Input)}
                {CreateFields<LoginFormValueTypeKeys>("Password", "password", [required], Input, { type: "password" })}
                {CreateFields<LoginFormValueTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "remember me")}
                {captchaUrl && <img alt="captchaUrl" src={captchaUrl} />}
                {captchaUrl && CreateFields<LoginFormValueTypeKeys>("Symbols from", "captcha", [required], Input, {})}

                <div className={stylesForm.formSummaryError}>
                    {error}
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    }

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);



export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValueTypeKeys = GetStringKeys<LoginFormValuesType>



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
        <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl} />
        </div>
    )
}



