import React, { useState } from "react";
import styles from "./Post.module.scss"
import { Btn } from "../../../Common/Components/styles/button/Button";

type PropsType = {
    message: string
    likesCount: number

}


const Post: React.FC<PropsType> = (props) => {

    const [count, setCount] = useState(props.likesCount);

    return (
        <div className={styles.item}>
            <img
                src='https://static.thenounproject.com/png/4314581-200.png' alt="" />
            <div>
                <h4>{props.message}</h4>
            </div>
            <div>
                <Btn Href={() => setCount(count + 1)} ButtonText={`Like ${count}`} />
            </div>
        </div>
    )
}

const MemoPost = React.memo(Post)

export default MemoPost