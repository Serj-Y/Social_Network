
type SubscriberType = (messages: ChatMessageType[]) => void;

export type ChatMessageType = {
    message: string;
    userName: string;
    photo: string | undefined;
    userId: number
}


let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log("WebSocket Is Close")
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChanel() {
    ws?.removeEventListener("close", closeHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
}

export const ChatApi = {
    start() {
        createChanel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener("close", closeHandler)
        ws?.removeEventListener("message", messageHandler)
        ws?.close()
    },

    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },

    unSubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }

}


