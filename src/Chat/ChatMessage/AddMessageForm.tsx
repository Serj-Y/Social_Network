import React, { useEffect, useState } from "react";
import { Btn } from "../../Common/Components/styles/button/Button";



export const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [message, setMessage] = useState("")
    const [readyStatus, setReadyStatus] = useState<"pending" | "ready">("pending")

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus("ready")
        }

        wsChannel?.addEventListener("open", openHandler)
return ()=>{
    wsChannel?.removeEventListener("open", openHandler)
}

    }, [wsChannel])

    const sendMessage = () => {
        if (!message) {
            return;
        }
        wsChannel?.send(message)
        setMessage("")
    }

    return (
        <div>
            <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message} ></textarea>
            <Btn Disabled={wsChannel == null || readyStatus !== "ready"} Click={() => sendMessage()} ButtonText={"Send"} />
        </div>
    );
};
