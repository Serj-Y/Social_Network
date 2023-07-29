import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { GetStringKeys, Input } from "../Common/Components/FormsControls/FormsControls";
import { required } from "../Common/Components/Validators/Validators";
import stylesForm from "../Common/Components/FormsControls/FormsControls.module.scss";
import { CreateFields } from "../Common/Components/FormsControls/FormsControls";
import { Btn } from "../Common/Components/styles/button/Button";
import styles from "./LoginForm.module.scss"
type LoginFormOwnProps = {
    captchaUrl: string | null;
};
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ captchaUrl, error, handleSubmit }) => {
    return (
        <div className={styles.formContainer} >
            <div className={styles.descriptionForLogin} >
                <h4>For Login Use</h4>
                <h5>Login: free@samuraijs.com</h5>
                <h5>Password: free</h5>
            </div>
            <form onSubmit={handleSubmit}>
                {CreateFields<LoginFormValueTypeKeys>("Email", "email", [required], Input)}
                {CreateFields<LoginFormValueTypeKeys>("Password", "password", [required], Input, { type: "password" })}
                {CreateFields<LoginFormValueTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox"}, "Remember me?")}
                {captchaUrl && <img alt="captchaUrl" src={captchaUrl} />}
                {captchaUrl && CreateFields<LoginFormValueTypeKeys>("Symbols from", "captcha", [required], Input, {})}

                <div className={stylesForm.formSummaryError}>
                    {error}
                </div>
                <div>
                    <Btn PropBtnStyle={styles.propBtnStyle} ButtonText={"Login"} />
                </div>
            </form>
        </div>

    );
};
export const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "login" })(LoginForm);



export type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};
type LoginFormValueTypeKeys = GetStringKeys<LoginFormValuesType>;
