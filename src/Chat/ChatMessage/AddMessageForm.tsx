import React, { useState } from "react";
import { Btn } from "../../Common/Components/styles/button/Button";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../Common/Components/Redux/chatReducer";
import styles from "./AddMessageForm.module.scss"

export const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

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
            <Btn Click={() => sendMessageHandler()} ButtonText={"Send"} />
        </div>
    );
};
