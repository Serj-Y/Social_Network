import React from "react"
import style from "../ProfileInfo.module.css"
import { CreateFields, Input, Textarea } from "../../../Common/FormsControls/FormsControls"
import { reduxForm } from "redux-form"
import { required, maxLengthCreator, minLengthCreator } from "../../../Common/Validators/Validators";

const maxLengthForInputArea = maxLengthCreator(30);
const maxLength = maxLengthCreator(100);
const minLength = minLengthCreator(2);


const ProfileDataForm = ({ profile, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} >
            <div>
                <div><button >Save Changes</button></div>
                <div>
                    <b> Full Name</b>: {CreateFields("Full name", "fullName", [required, minLength, maxLengthForInputArea], Input)}
                </div>
                <div>
                    <b>About Me</b>: {CreateFields("About Me", "aboutMe", [required, minLength, maxLength], Textarea)}
                </div>
                <div>
                    <b> Looking for a Job?</b>:
                    {CreateFields("", "lookingForAJob", [required, minLength, maxLength], Input, { type: "checkbox" })}
                </div>
                <div>
                    <b>Looking a Job</b>:
                    {CreateFields("My professional skills", "lookingForAJobDescription", [required, minLength, maxLength], Textarea)}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>
                        <Contact
                            key={key}
                            contactTitle={key}
                            contactValue={profile.contacts[key]} />)}
                </div>
            </div>
        </form>
    )
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contacts}><b>{contactTitle}</b>: {contactValue} </div>
    )
}
const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(ProfileDataForm)


export default ProfileDataReduxForm

