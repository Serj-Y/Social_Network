import React from "react";
import s from "./ProfileInfo.module.css"
import Preloader from "../../Common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWidthHook from "./ProfileStatusWithHook";
const ProfileInfo = (props) => {
if (!props.profile) {
    return <Preloader/>
}
    return <div>
        <div className={s.descriptionBlock}>
            <img src={props.profile.photos.large}/>
            <ProfileStatusWidthHook status={props.status} updateStatus={props.updateStatus}/>
            </div>
    </div>
}
export default ProfileInfo