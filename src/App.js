import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './components/Profile/Profile'
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Header from './components/Header/Header';
import Nav from './components/Nav/Nav';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
const App = (props) => {
  return (
    <div className='app-wrapper' >
      <Header />
      <Nav />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path='/messages' element={<DialogsContainer />} />
          <Route path='/users' element={<UsersContainer/>} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;