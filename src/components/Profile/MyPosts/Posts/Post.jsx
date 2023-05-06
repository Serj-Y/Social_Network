import React from "react";
import s from './Post.module.css'

const Post = React.memo(props => {
    return (
        <div className={s.item}>
            <img
                src='https://static.thenounproject.com/png/4314581-200.png' alt="" />
            <div>
                <span>{props.message}</span>
            </div>
            <div>
                <span>Like {props.likesCount}</span>
            </div>
        </div>
    )
})
export default Post