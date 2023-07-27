import React, { useState } from "react";
import { Btn } from "../../Common/Components/styles/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../Common/Components/Redux/chatReducer";
import styles from "./AddMessageForm.module.scss"
import { AppStateType } from "../../Common/Components/Redux/reduxStore";

export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessage(message))
        setMessage("")
    }

    return (
        <div className={styles.messageForm} >
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
            <Btn Disabled={status !== "ready"} Click={() => sendMessageHandler()} ButtonText={"Send"} />
        </div>
    );
};
