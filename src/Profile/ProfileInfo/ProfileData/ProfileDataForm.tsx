import React from "react"
import style from "../ProfileInfo.module.scss"
import { CreateFields, GetStringKeys, Input, Textarea } from "../../../Common/Components/FormsControls/FormsControls"
import { InjectedFormProps, reduxForm } from "redux-form";
import s from "../../../Common/Components/FormsControls/FormsControls.module.css"
import { ProfileType } from "../../../Common/Components/Types/Types";

type PropsType = {
    profile: ProfileType
   
}

type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType>= ({ profile, handleSubmit, error }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <button >Save Changes</button>
                {error && <div className={s.formSummaryError} >
                    {error}</div>}
            </div>
            <div>
                <b> Full Name</b>: {CreateFields<ProfileTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>About Me</b>: {CreateFields<ProfileTypeKeys>("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b> Looking for a Job?</b>:
                {CreateFields<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                <b>Looking a Job</b>:
                {CreateFields<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
                    return <div key={key} className={style.contacts}>
                        <b>{key}: {CreateFields(key, "contacts." + key, [], Input)}</b>
                    </div>
                })}
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm)


export default ProfileDataReduxForm

