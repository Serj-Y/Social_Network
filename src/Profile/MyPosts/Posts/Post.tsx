import React, { FC, useState } from "react";
import s from './Post.module.css'

type PropsType ={
    message: string
    likesCount: number

}



const Post: React.FC<PropsType>  = (props) => {

    const [count, setCount] = useState(props.likesCount);

    return (
        <div className={s.item}>
            <img
                src='https://static.thenounproject.com/png/4314581-200.png' alt="" />
            <div>
                <span>{props.message}</span>
            </div>
            <div>
                <span><a onClick={() => setCount(count + 1)}>Like{count}</a> </span>
            </div>
        </div>
    )
}

const MemoPost = React.memo(Post)

export default MemoPost