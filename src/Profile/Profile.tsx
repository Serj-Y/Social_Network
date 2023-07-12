import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../Common/Components/Types/Types";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { savePhoto, updateStatus } from "../Common/Components/Redux/profileReducer";



type PropsType = {
    isOwner: boolean,
    saveProfile: (profile: ProfileType) => Promise<any>
}

const Profile: React.FC<PropsType> = ({ isOwner, saveProfile }) => {

    const profile = useSelector((state: AppStateType) => state.profilePage.profile)
    const status = useSelector((state: AppStateType) => state.profilePage.status)

    const dispatch = useDispatch()

    const UpdateStatus = (status: string) => {
        dispatch(updateStatus(status))
    }

    const SavePhoto = (file: File) => {
        dispatch(savePhoto(file))
    }

    return <div className={styles.Profile} >
        <ProfileInfo
            profile={profile}
            status={status}
            updateStatus={UpdateStatus}
            savePhoto={SavePhoto}
            isOwner={isOwner}
            saveProfile={saveProfile}
        />
        <MyPostsContainer />
    </div>
}
export default Profile 