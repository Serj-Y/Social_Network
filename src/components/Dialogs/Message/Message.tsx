import React from "react";
import s from "./../Dialogs.module.css";


type PropsType = {
message: string
id: number
}

const Message: React.FC<PropsType> = (props) => {
    return <div className={s.messages}>
    {props.message}
    </div>
}

export default Message;