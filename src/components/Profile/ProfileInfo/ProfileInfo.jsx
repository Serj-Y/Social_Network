import React from "react";
import style from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWidthHook from "./ProfileStatusWithHook";
import userPhotoDefault from "../../../assets/img/4314581-200.png"
import { useEffect, useState } from "react";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);


    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return (
        <div className={style.descriptionBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhotoDefault} />
            <div>{props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}</div>
            <div>
                <ProfileStatusWidthHook
                    status={props.status}
                    updateStatus={props.updateStatus} />
            </div>
            {editMode
                ? <ProfileDataReduxForm 
                profile={props.profile}  
                isOwner={props.isOwner}
              />
                : <ProfileData 
                profile={props.profile} 
                isOwner={props.isOwner}
                goToEditMode={() => {setEditMode(true)}} 
           />
            }
        </div>
    )
}

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


export default ProfileInfo