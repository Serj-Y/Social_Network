import React, { ChangeEvent } from "react";
import styles from "./ProfileInfo.module.scss";
import Preloader from "../../Common/Components/Preloader/Preloader";
import ProfileStatusWidthHook from "./ProfileData/ProfileStatusWithHook";
import userPhotoDefault from "../../Common/assets/img/DefaultPhoto.png";
import { useState } from "react";
import ProfileDataReduxForm from "./ProfileData/ProfileDataForm";
import ProfileData from "./ProfileData/ProfileData";
import { ProfileType } from "../../Common/Components/Types/Types";
import { InputBtn } from "../../Common/Components/styles/button/InputBtn/InputBtn";

type PropsType = {
  profile: ProfileType | null;
  status: string;
  isOwner: boolean;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (formData: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }
  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };
  return (
    <div className={styles.descriptionBlock}>
      <div className={styles.profilePhoto}>
        <img
          alt="userPhoto"
          src={props.profile.photos.large || userPhotoDefault}
        />
        {props.isOwner && <InputBtn OnChange={onMainPhotoSelected} />}
      </div>
      {editMode ? (
        <ProfileDataReduxForm
          initialValues={props.profile}
          onSubmit={onSubmit}
          profile={props.profile}
        />
      ) : (
        <div>
          <ProfileStatusWidthHook
            status={props.status}
            updateStatus={props.updateStatus}
          />
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            goToEditMode={() => {
              setEditMode(true);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
