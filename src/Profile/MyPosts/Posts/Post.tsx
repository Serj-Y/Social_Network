import React, { useState } from "react";
import styles from "./Post.module.scss"
import { Btn } from "../../../Common/Components/styles/button/Button";
import { useSelector } from "react-redux";
import { AppStateType } from "../../../Common/Components/Redux/reduxStore";
import DefaultPhoto from "../../../Common/assets/img/4314581-200.png"
type PropsType = {
    message: string
    likesCount: number

}


const Post: React.FC<PropsType> = (props) => {

    const [count, setCount] = useState(props.likesCount);
    const profilePhoto = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small)

    return (
        <div className={styles.item}>
            <div className={styles.postPhoto} >
                <img src={profilePhoto || DefaultPhoto} alt="Post Photo" />
            </div>
            <div className={styles.postMessage}>
                <h4>{props.message}</h4>
                <div className={styles.likeBtn} >
                    <Btn Href={() => setCount(count + 1)} ButtonText={`Like ${count}`} />
                </div>
            </div>
        </div>
    )
}

const MemoPost = React.memo(Post)

export default MemoPost