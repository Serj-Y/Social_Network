const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogs: [
    { id: 1, name: "Serhii" },
    { id: 2, name: "Anatolii" },
    { id: 3, name: "Petro" },
    { id: 4, name: "Iliia" },
    { id: 5, name: "Aurel" },
  ],
  messages: [
    { id: 1, message: "Its alive" },
    { id: 2, message: "Nice" },
    { id: 3, message: "Hi" },
    { id: 4, message: "(;" },
    { id: 5, message: "):" },
  ],
};

const dialogReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody });
export default dialogReducer;