import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input } from "../Common/FormsControls/FormsControls";
import { maxLengthCreator, minLengthCreator, required } from "../Common/Validators/Validators";
import { connect } from "react-redux";
import { login } from "../../Redux/authReducer";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import style from "../Common/FormsControls/FormsControls.module.css"

const maxLength = maxLengthCreator(25);
const minLength = minLengthCreator(4);

const LoginForm = React.memo(props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    placeholder={"Email"}
                    name={"email"}
                    component={Input}
                    validate={[required, maxLength, minLength]} />
            </div>
            <div>
                <Field
                    placeholder={"Password"}
                    name={"password"}
                    type={"password"}
                    component={Input}
                    validate={[required, maxLength, minLength]} />
            </div>
            <div>
                <Field
                    type={"checkbox"}
                    name={"rememberMe"}
                    component={Input}
                /> remember me
            </div>
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