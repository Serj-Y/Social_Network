import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWidthHook from "./ProfileStatusWithHook";
import userPhotoDefault from "../../../assets/img/4314581-200.png"

const ProfileInfo = React.memo(props => {
    if (!props.profile) {
        return <Preloader />
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }
    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large != null ? props.profile.photos.small : userPhotoDefault} />
            <div>{props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}</div>
            <ProfileStatusWidthHook status={props.status} updateStatus={props.updateStatus} />
            <div>About Me: {props.profile.aboutMe}</div>
            <div>{props.profile.contacts.github}</div>
            <div>Full Name: {props.profile.fullName}</div>
            <div>Looking A Job: {props.profile.lookingForAJobDescription}</div>
        </div>
    </div>
})
export default ProfileInfo