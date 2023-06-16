import React from "react";
import s from './Post.module.css'

type PropsType ={
    message: string
    likesCount: number
}


const Post: React.FC<PropsType>  = ({ message, likesCount}) => {
    return (
        <div className={s.item}>
            <img
                src='https://static.thenounproject.com/png/4314581-200.png' alt="" />
            <div>
                <span>{message}</span>
            </div>
            <div>
                <span>Like {likesCount}</span>
            </div>
        </div>
    )
}

const MemoPost = React.memo(Post)

export default MemoPost