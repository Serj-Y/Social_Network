

const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number
  name: string
}
type MessageType = {
  id: number
  message: string
}

let initialState = {
  dialogs: [
    { id: 1, name: "Serhii" },
    { id: 2, name: "Anatolii" },
    { id: 3, name: "Petro" },
    { id: 4, name: "Iliia" },
    { id: 5, name: "Aurel" },
  ] as Array<DialogType>  ,
  messages: [
    { id: 1, message: "Its alive" },
    { id: 2, message: "Nice" },
    { id: 3, message: "Hi" },
    { id: 4, message: "(;" },
    { id: 5, message: "):" },
  ] as Array <MessageType> ,
};

export type initialStateType = typeof initialState

const dialogReducer = (state = initialState, action: any): initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 98, message: body }]
      };
    default:
      return state;
  }
}

type sendMessageCreatorType = {
 type: typeof SEND_MESSAGE
 newMessageBody: string
}


export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({ type: SEND_MESSAGE, newMessageBody });


export default dialogReducer;