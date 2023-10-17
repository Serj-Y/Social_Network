import React, { useState } from "react";
import styles from "./Post.module.scss";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../Common/Components/Redux/reduxStore";
import DefaultPhoto from "../../../Common/assets/img/DefaultPhoto.png";
import { SolidHeart } from "../../../Common/Components/styles/button/HeartBtn/HeartSolidBtn";
import { RegularHeart } from "../../../Common/Components/styles/button/HeartBtn/HeartRegular";

type PropsType = {
  message: string;
  likesCount: number;
};

const Post: React.FC<PropsType> = (props) => {
  const profilePhoto = useSelector(
    (state: AppStateType) => state.profilePage.profile?.photos.small
  );
  const [count, setCount] = useState(props.likesCount);
  const [like, setLike] = useState(false);

  const onChangeLikeHandler = () => {
    setCount((prevCount) => prevCount + (like ? -1 : 1));
    setLike((prevIsLike) => !prevIsLike);
  };

  return (
    <div className={styles.item}>
      <div className={styles.postPhoto}>
        <img src={profilePhoto || DefaultPhoto} alt="ProfileImg" />
      </div>
      <div className={styles.postMessage}>
        <h4>{props.message}</h4>
        <div>
          <button
            className={styles.likeButton}
            onClick={() => onChangeLikeHandler()}
          >
            {count} {like ? <SolidHeart /> : <RegularHeart />}
          </button>
        </div>
      </div>
    </div>
  );
};

const MemoPost = React.memo(Post);

export default MemoPost;
