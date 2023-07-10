import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../Common/Components/Types/Types";
import styles from "./Profile.module.css";

type PropsType = {
    isOwner: boolean
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = ({ isOwner, profile, status, updateStatus, savePhoto, saveProfile }) => {
    return <div className={styles.Profile} >
        <ProfileInfo
            isOwner={isOwner}
            profile={profile}
            status={status}
            updateStatus={updateStatus}
            savePhoto={savePhoto}
            saveProfile={saveProfile} />
        <MyPostsContainer />
    </div>
}
export default Profile