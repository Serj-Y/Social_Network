import React from "react";
import style from "../ProfileInfo.module.css"

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
        {isOwner &&  <div><button onClick={goToEditMode} >edit</button></div>}
            <div>
                <b> Full Name</b>: {profile.fullName}
            </div>
            <div>
                <b>About Me</b>:   {profile.aboutMe}
            </div>
            <div>
                <b> Looking for a Job</b>: {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {profile.lookingForAJob &&
            <div>
                <b>Looking a Job</b>: {profile.lookingForAJobDescription}
            </div>
}
            <div>
                <b>Contacts</b>: {Object.keys(profile.contacts).map(key =>
                    <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key]} />)}
            </div>
        </div>
    )
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contacts}><b>{contactTitle}</b>: {contactValue} </div>
    )
}

export default ProfileData