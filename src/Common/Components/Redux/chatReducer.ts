import { CommonThunkType } from "../Types/Types";
import { ChatApi, ChatMessageType, StatusType } from "../apiComponents/chatApi";
import { Dispatch } from "redux";
import { InferActionsTypes } from "./reduxStore";
import { v1 } from "uuid";

type ChatMessageOwnType = ChatMessageType & { id: string };

let initialState = {
  messages: [] as ChatMessageOwnType[],
  status: "pending" as StatusType,
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "MESSAGES_RECEIVED",
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: "STATUS_CHANGE",
      payload: { status },
    } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = CommonThunkType<ActionsTypes>;

const ChatReducer = (state = initialState, action: ActionsTypes) => {
  switch (action.type) {
    case "MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map((m) => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    case "STATUS_CHANGE":
      return {
        ...state,
        status: action.payload.status,
      };
    default:
      return state;
  }
};
let _newMessagesHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagesHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  ChatApi.start();
  ChatApi.subscribe("messages-received", newMessagesHandlerCreator(dispatch));
  ChatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  ChatApi.unSubscribe("messages-received", newMessagesHandlerCreator(dispatch));
  ChatApi.unSubscribe("status-changed", statusChangedHandlerCreator(dispatch));
  ChatApi.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    ChatApi.sendMessage(message);
  };

export default ChatReducer;
