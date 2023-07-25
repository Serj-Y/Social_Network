import React from "react";
import styles from "./Music.module.scss"

const Music = React.memo(props => {
    return (
        <div className={styles.Music}>
            <h1>Music</h1>
        </div>
    )
})

export default Music

