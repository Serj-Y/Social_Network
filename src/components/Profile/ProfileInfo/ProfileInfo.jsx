import React from "react";
import style from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWidthHook from "./ProfileData/ProfileStatusWithHook";
import userPhotoDefault from "../../../assets/img/4314581-200.png"
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";

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

    const onSubmit = (formData) => {
     props.saveProfile(formData)
     .then(() => {
              setEditMode(false);
     })
  
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
                    initialValues={props.profile}
                    onSubmit={onSubmit}
                    profile={props.profile}
                    error={props.error}

                />
                : <ProfileData
                    profile={props.profile}
                    isOwner={props.isOwner}
                    goToEditMode={() => { setEditMode(true) }}
                />
            }
        </div>
    )
}


export default ProfileInfo