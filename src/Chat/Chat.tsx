import React, { useEffect, useState } from "react";
import { AddMessageForm } from "./ChatMessage/AddMessageForm";
import { Messages } from "./ChatMessage/Messages";


export const Chat: React.FC = () => {

    const [wsChannel, setWsChanel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        const closeHandler = () => {
            console.log("WebSocket Is Close")
            setTimeout(createChanel, 3000)
        }

        function createChanel() {
                ws?.removeEventListener("close", closeHandler)
                ws?.close()
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.addEventListener("close", closeHandler)
            setWsChanel(ws)
        }
    
        createChanel()

        return () => {
            ws.removeEventListener("close", closeHandler)
            ws.close()
        }

    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessageForm wsChannel={wsChannel} />
        </div>
    );
};
