const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  dialogs: [
    { id: 1, name: 'Serhii' },
    { id: 2, name: 'Anatolii' },
    { id: 3, name: 'Petro' },
    { id: 4, name: 'Iliia' },
    { id: 5, name: 'Aurel' },
  ],
  messages: [
    { id: 1, message: 'Sho ti' },
    { id: 2, message: 'Zdorova zaibal' },
    { id: 3, message: 'Hi' },
    { id: 4, message: '(;' },
    { id: 5, message: '):' },
  ],
  newMessageBody: '',
};

const dialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body
      };
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [ ...state.messages, { id: 98, message: body }]
      };
    default:
      return state;
  }
}

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, body: body });

export default dialogReducer;