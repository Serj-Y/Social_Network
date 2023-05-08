import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { maxLengthCreator, minLengthCreator, required } from "../Common/Validators/Validators";
import { connect } from "react-redux";
import { login } from "../../Redux/authReducer";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import style from "../Common/FormsControls/FormsControls.module.css"
import { CreateFields } from "../Common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(26);
const minLength = minLengthCreator(4);

const LoginForm = React.memo(props => {
    return (
        <form onSubmit={props.handleSubmit}>
            {CreateFields("Email", "email", [required, maxLength, minLength], Input)}
            {CreateFields("Password", "password", [required, maxLength, minLength], Input, { type: "password" })}
            {CreateFields(null, "rememberMe", [], Input, { type: "checkbox" }, "Remember Me")}
            <div className={style.formSummaryError}>
                {props.error}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
})

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm);

const Login = React.memo(props => {
    const onSubmit = (FormData) => {
        props.login(
            FormData.email,
            FormData.password,
            FormData.rememberMe);
    }
    if (props.isAuth) {
        return <Redirect to={"/profile"} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
})

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})


export default connect(mapStateToProps, { login }
)(Login) 