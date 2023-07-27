import React, { useEffect, useRef, useState } from "react";
import { Message } from "./Message/Message";
import { useSelector } from "react-redux";
import { AppStateType } from "../../Common/Components/Redux/reduxStore";
import styles from "./Messages.module.scss"

export const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const onScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {

        const element = e.currentTarget
        if (Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({ behavior: "smooth" })
        }

    }, [messages])
    return (
        <div className={styles.messagesContainer} onScroll={onScrollHandler}  >
            {messages.map((m, index) => <Message key={m.id} message={m} />)}
            <div ref={messagesAnchorRef} />
        </div>
    );
};
