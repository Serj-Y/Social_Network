import React, { ChangeEvent, ChangeEventHandler } from "react";
import style from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatusWidthHook from "./ProfileData/ProfileStatusWithHook";
import userPhotoDefault from "../../../assets/img/4314581-200.png"
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";
import { ProfileType } from "../../Common/Types/Types";


type PropsType = {
profile: ProfileType | null
status: string
isOwner: boolean
updateStatus: (status: string) => void
savePhoto: (file: File) => void
saveProfile: (profile:ProfileType) => Promise<any>
}


const ProfileInfo: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
     props.saveProfile(formData)
     .then(() => {
              setEditMode(false);
     })
  
    }

    return (
        <div className={style.descriptionBlock}>
            <img src={props.profile.photos.large  ||  userPhotoDefault} />
            <div>{props.isOwner &&  <input  type="file" onChange={onMainPhotoSelected} />}</div>
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