import React from "react";
import { Message } from "./Message/Message";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Common/Components/Redux/reduxStore";
import styles from "./Messages.module.scss"

export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div className={styles.messagesContainer}  >
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    );
};
