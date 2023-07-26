import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { compose } from "redux";
import "./App.scss";
import { initializeApp } from "./Common/Components/Redux/AppReducer";
import Preloader from "./Common/Components/Preloader/Preloader";
import { Login } from "./Login/Login";
import Music from "./Music/Music";
import Nav from "./Nav/Nav";
import News from "./News/News";
import Settings from "./Settings/Settings";
import { widthSuspense } from "./Common/Components/hoc/withSuspense";
import { AppStateType } from "./Common/Components/Redux/reduxStore";
import { UsersPage } from "./Users/UsersContainer";
import { Header } from "./Header/Header";



const ProfileContainer = React.lazy(() => import("./Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./Dialogs/DialogsContainer"))
const Chat = React.lazy(() => import("./Chat/ChatPage"))


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = widthSuspense(DialogsContainer)
const SuspendedProfile = widthSuspense(ProfileContainer)
const SuspendedChat = widthSuspense(Chat)


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
        <Header />
        <Nav />
        <div className="app-wrapper-content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
            <Route path="/messages" render={() => <SuspendedDialogs />} />
            <Route path="/users" render={() => <UsersPage />} />
            <Route path="/chat" render={() => <SuspendedChat />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
            <Route path="/login" render={() => <Login />} />
          </Switch>
        </div>
      </div>
    )
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,

})

// let AppContainer = compose<React.ComponentType>(
//   withRouter,
//   connect(mapStateToProps, { initializeApp }))(App);

// const MyApp: React.FC = () => {
//   return <BrowserRouter>
//     <Provider store={store}>
//       <AppContainer />
//     </Provider>
//   </BrowserRouter>
// }

// export default MyApp;

export default compose(connect(mapStateToProps, { initializeApp }))(App);


