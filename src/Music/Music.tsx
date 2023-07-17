import React from "react";
import s from "./Music.module.scss"

const Music = React.memo(props => {
    return (
        <div className={s.Music}>
            <h1>Music</h1>
        </div>
    )
})

export default Music