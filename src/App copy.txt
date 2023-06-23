import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter, BrowserRouter, Switch } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import { initializeApp } from "./Redux/AppReducer";
import Preloader from "./components/Common/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import Music from "./components/Music/Music";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import { widthSuspense } from "./hoc/withSuspense";
import store, { AppStateType } from "./Redux/reduxStore";
import { Provider } from "react-redux"; 




const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = widthSuspense(DialogsContainer)
const SuspendedProfile = widthSuspense(ProfileContainer)


class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (PromiseRejectionEvent: any) => {
    alert(PromiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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
          <Switch>
          <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
          <Route path="/profile/:userId?" render={() =><SuspendedProfile/>} />
          <Route path="/messages" render={() => <SuspendedDialogs/>} />
          <Route path="/users" render={() => <UsersContainer pageNumber={0} pageTitle={""}  />} />
          <Route path="/login" render={() => <Login />} />
          <Route path="/news" render={() => <News />} />
          <Route path="/music" render={() => <Music />} />
          <Route path="/settings" render={() => <Settings />} />
          </Switch>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,

})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const MyApp: React.FC = () => {
  return <BrowserRouter>
      <Provider store={store}>
          <AppContainer/>
      </Provider>
  </BrowserRouter>
}

export default MyApp;

