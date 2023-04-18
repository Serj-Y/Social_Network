import profileReducer from './profileReducer';
import dialogReducer from './dialogsReducer';
import sidebarReducer from './sidebarReducer';

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Sho ti', likesCount: 13 },
        { id: 2, message: 'Zdorova zaibal', likesCount: 24 },
        { id: 3, message: 'post', likesCount: 83 },
        { id: 4, message: '(;', likesCount: 39 },
        { id: 5, message: '):', likesCount: 45 },
      ],
      newPostText: '',
    },
    messagesPage: {
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
        { id: 5, message: '):' }
      ],
      newMessageBody: '',
    },
    sidebar: {
    },
  },

  _callSubscriber() {
    console.log('dalbaiob');
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) { //dispatch({type ''  action ???}) !!!
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagesPage = dialogReducer(this._state.messagesPage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);
    this._callSubscriber(this._state);
  }
};



window.store = store;
