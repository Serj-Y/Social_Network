import React from "react"
import style from "./ProfileInfo.module.css"
import { CreateFields, Input, Textarea } from "../../Common/FormsControls/FormsControls"
import { reduxForm } from "redux-form"


const ProfileDataForm = ({ profile, isOwner }) => {
    return (
        <form>
            <div>
                {isOwner && <div><button >Save Changes</button></div>}
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

