
type MessagesReceivedSubscriberType = (messages: ChatMessageType[]) => void;
type StatusChangedSubscriberType = (status: StatusType ) => void;

export type ChatMessageType = {
    message: string;
    userName: string;
    photo: string | undefined;
    userId: number
}

export type StatusType = "pending" | "ready" | "error"

type EventNamesType = "messages-received" | "status-changed" 


const subscribers =  {
    "messages-received": [] as MessagesReceivedSubscriberType[],
    "status-changed" : [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null

const cleanUp = () => {
    ws?.removeEventListener("close", closeHandler)
    ws?.removeEventListener("message", messageHandler)
    ws?.removeEventListener("open", openHandler)
    ws?.removeEventListener("error", errorHandler)
}


const closeHandler = () => {
notifySubscribesAboutStatus("pending")
    setTimeout(createChanel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers["messages-received"].forEach(s => s(newMessages))
}

const openHandler = () => {
notifySubscribesAboutStatus("ready")
}

const errorHandler = () => {
    notifySubscribesAboutStatus("error")
    console.error("REFRESH PAGE")
    }

const notifySubscribesAboutStatus = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status))
}

function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
notifySubscribesAboutStatus("pending")
    ws.addEventListener("close", closeHandler)
    ws.addEventListener("message", messageHandler)
    ws.addEventListener("open", openHandler)
    ws.addEventListener("error", errorHandler)
}

export const ChatApi = {
    start() {
        createChanel()
    },
    stop() {
        subscribers["messages-received"]= []
        subscribers["status-changed"]= []
        cleanUp()
        ws?.close()
    },

    subscribe( eventName: EventNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
       // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
                   // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },

    unSubscribe(eventName: EventNamesType,callback: MessagesReceivedSubscriberType| StatusChangedSubscriberType) {
               // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },

    sendMessage(message: string) {
        ws?.send(message)
    }

}


