import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter, BrowserRouter } from "react-router-dom";
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
import store from "./Redux/reduxStore";
import { Provider } from "react-redux"; 




const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"))


class App extends PureComponent {
  catchAllUnhandledErrors = (PromiseRejectionEvent) => {
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
          <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
          <Route path="/profile/:userId?" render={widthSuspense(ProfileContainer)} />
          <Route path="/messages" render={widthSuspense(DialogsContainer)} />
          <Route path="/users" render={() => <UsersContainer pageTitle={"users"} />} />
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

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const MyApp = (props) => {
  return <BrowserRouter>
      <Provider store={store}>
          <AppContainer/>
      </Provider>
  </BrowserRouter>
}

export default MyApp;

