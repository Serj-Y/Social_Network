import React from "react";
import styles from "./../Dialogs.module.scss";


type PropsType = {
message: string
id: string
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={styles.messages}>
    {props.message}
    </div>
}

export default Message;