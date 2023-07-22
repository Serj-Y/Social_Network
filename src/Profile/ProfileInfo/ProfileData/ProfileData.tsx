import React from "react";
import styles from "../ProfileInfo.module.scss"
import { ContactsObjectType, ProfileType } from "../../../Common/Components/Types/Types";
import { Btn } from "../../../Common/Components/styles/button/Button";


type PropsType = {
    profile: ProfileType
     isOwner: boolean
    goToEditMode: () => void
}

const ProfileData: React.FC<PropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div className={styles.profileData} >
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
                <b>Contacts</b>: {Object
                .keys(profile.contacts)
                .map((key) => {
                return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsObjectType]} />})}
            </div>
            {isOwner &&  <div><Btn Href={goToEditMode} ButtonText={"edit"} /></div>}
        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string 
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div className={styles.contacts}><b>{contactTitle}</b>: {contactValue} </div>
    )
}

export default ProfileData