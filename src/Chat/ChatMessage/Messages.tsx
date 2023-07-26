import React, { useEffect, useState } from "react";
import { ChatMessageType, Message } from "./Message/Message";






export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])


    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }

        wsChannel?.addEventListener("message", messageHandler)

        return () => {
            wsChannel?.removeEventListener("message", messageHandler)
        }

    }, [wsChannel])

    return (
        <div style={{ height: "100vh", overflowY: "auto" }} >
            {messages.map((m, index) => <Message key={index} message={m} />)}
        </div>
    );
};
