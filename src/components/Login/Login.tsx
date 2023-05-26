import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { required } from "../Common/Validators/Validators";
import { connect } from "react-redux";
import { login } from "../../Redux/authReducer";
import { Redirect } from "react-router-dom";
import style from "../Common/FormsControls/FormsControls.module.css"
import { CreateFields } from "../Common/FormsControls/FormsControls";
import { AppStateType } from "../../Redux/reduxStore";



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
            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && CreateFields<LoginFormValueTypeKeys>("Symbols from", "captcha", [required], Input, {})}

            <div className={style.formSummaryError}>
                {error}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}


export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string 
}

type LoginFormValueTypeKeys = Extract <keyof LoginFormValuesType, string>



const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (FormData: LoginFormValuesType) => {
        props.login(
            FormData.email,
            FormData.password,
            FormData.rememberMe,
            FormData.captcha);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={props.captchaUrl} />
        </div>
    )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})


export default connect(mapStateToProps, { login }
)(Login) 