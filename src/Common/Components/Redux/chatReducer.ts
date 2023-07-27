
import { CommonThunkType } from "../Types/Types";
import { ChatApi, ChatMessageType } from "../apiComponents/chatApi";
import { Dispatch } from "redux";
import { InferActionsTypes } from "./reduxStore";


let initialState = {
    messages: [] as ChatMessageType[]
};

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({
        type: "MESSAGES_RECEIVED",
        payload: { messages }
    } as const),
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = CommonThunkType<ActionsTypes>

const ChatReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case "MESSAGES_RECEIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }
        default:
            return state;
    }
}
let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessagesHandler === null) {
        _newMessagesHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessagesHandler
}


export const startMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.start()
    ChatApi.subscribe(newMessagesHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    ChatApi.unSubscribe(newMessagesHandlerCreator(dispatch))
    ChatApi.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    ChatApi.sendMessage(message)
}


export default ChatReducer;