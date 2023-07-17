import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter, BrowserRouter, Switch } from "react-router-dom";
import { compose } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { initializeApp } from "./Common/Components/Redux/AppReducer";
import Preloader from "./Common/Components/Preloader/Preloader";
import {Login} from "./Login/Login";
import Music from "./Music/Music";
import Nav from "./Nav/Nav";
import News from "./News/News";
import Settings from "./Settings/Settings";
import { widthSuspense } from "./Common/Components/hoc/withSuspense";
import store, { AppStateType } from "./Common/Components/Redux/reduxStore";
import { Provider } from "react-redux";
import { UsersPage } from "./Users/UsersContainer";
import { Head} from "./Header/Header";
import style from "./App.module.scss"
import ReactBootstrap, { Col, Container, Row } from "react-bootstrap";







const ProfileContainer = React.lazy(() => import("./Profile/ProfileContainer"))
const DialogsContainer = React.lazy(() => import("./Dialogs/DialogsContainer"))




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
  <div className={style.App} >
     <Container className={style.Container} >
      <Row lg="12" placeholder="top"  >
        <Col > <Head /></Col>

      </Row>
      <Row lg="auto">
        <Col xs={6} md={4}>
        <Nav />
        </Col>
        <Col xs={12} md={8}>
        <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
            <Route path="/profile/:userId?" render={() => <SuspendedProfile />} />
            <Route path="/messages" render={() => <SuspendedDialogs />} />
            <Route path="/users" render={() => <UsersPage />} />
            <Route path="/login" render={() => <Login />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/music" render={() => <Music />} />
            <Route path="/settings" render={() => <Settings />} />
          </Switch>
        </Col>
      </Row>
        </Container>
  </div>
    
     
     
    )
  };
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,

})

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const MyApp: React.FC = () => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default MyApp;

