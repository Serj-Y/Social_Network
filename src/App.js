import React, { PureComponent } from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import Music from "./components/Music/Music";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Nav from "./components/Nav/Nav";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { initializeApp } from "./Redux/AppReducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { compose } from "redux";
import Preloader from "./components/Common/Preloader/Preloader";
import { widthSuspense } from "./hoc/withSuspense";

const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))
const UsersContainer = React.lazy(() => import("./components/Users/UsersContainer"))

class App extends PureComponent {
  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className="app-wrapper" >
        <HeaderContainer />
        <Nav />
        <div className="app-wrapper-content">
          <Route path="/profile/:userId?" render={widthSuspense(ProfileContainer)} />
          <Route path="/messages" render={widthSuspense(DialogsContainer)} />
          <Route path="/users" render={widthSuspense(UsersContainer)} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,

})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);