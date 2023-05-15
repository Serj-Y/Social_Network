import React from "react"
import style from "../ProfileInfo.module.css"
import { CreateFields, Input, Textarea } from "../../../Common/FormsControls/FormsControls"
import { reduxForm } from "redux-form";
import s from "../../../Common/FormsControls/FormsControls.module.css"



const ProfileDataForm = ({ profile, handleSubmit, error, ...props }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <button >Save Changes</button>
                {error && <div className={s.formSummaryError} >
                    {error}</div>}
            </div>
            <div>
                <b> Full Name</b>: {CreateFields("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>About Me</b>: {CreateFields("About Me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b> Looking for a Job?</b>:
                {CreateFields("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                <b>Looking a Job</b>:
                {CreateFields("My professional skills", "lookingForAJobDescription", [], Textarea)}
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

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)


export default ProfileDataReduxForm

