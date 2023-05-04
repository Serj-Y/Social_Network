

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: '', likesCount: 13 },
        { id: 2, message: '', likesCount: 24 },
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
        { id: 1, message: '' },
        { id: 2, message: 't' },
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

  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },
}