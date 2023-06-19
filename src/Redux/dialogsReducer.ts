import { v1 } from "uuid"
import { InferActionsTypes } from "./reduxStore"

type DialogType = {
  id: string
  name: string
}
type MessageType = {
  id: string
  message: string
}

let initialState = {
  dialogs: [
    { id: v1(), name: "Serhii" },
    { id: v1(), name: "Anatolii" },
    { id: v1(), name: "Petro" },
    { id: v1(), name: "Iliia" },
    { id: v1(), name: "Aurel" },
  ] as Array<DialogType>,
  messages: [
    { id: v1(), message: "Its alive" },
    { id: v1(), message: "Nice" },
    { id: v1(), message: "Hi" },
    { id: v1(), message: "(;" },
    { id: v1(), message: "):" },
  ] as Array<MessageType>,
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({ type: "SEND-MESSAGE", newMessageBody }) as const
}
type ActionsTypes = InferActionsTypes<typeof actions>

export type InitialStateType = typeof initialState


export const dialogReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case "SEND-MESSAGE":
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: v1(), message: body }]
      };
    default:
      return state;
  }
}

export default dialogReducer;