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

    const profilePhoto = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small)
    const [count, setCount] = useState(props.likesCount);
    const [like, setLike] = useState(false)
const [style, setStyle] =useState("")



    const LikerDisLiker = () => {
        if (!like) {
            setCount(count + 1)
            setLike(true)
            setStyle(styles.likeActive)
        } else {
            setCount(count - 1)
            setLike(false)
            setStyle("")
        }
    }


    return (
        <div className={styles.item}>
            <div className={styles.postPhoto} >
                <img src={profilePhoto || DefaultPhoto} alt="Post Photo" />
            </div>
            <div className={styles.postMessage}>
                <h4>{props.message}</h4>
                <div >
                    <Btn Click={() => LikerDisLiker()} PropBtnStyle={style} ButtonText={`Like ${count}`} />
                </div>
            </div>
        </div>
    )
}

const MemoPost = React.memo(Post)

export default MemoPost