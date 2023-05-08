import React, { PureComponent } from "react";
import Header from "./Header";
import { logout } from "../../Redux/authReducer"
import { connect } from "react-redux";
import { compose } from "redux";


class HeaderContainer extends PureComponent {
    render() {
        return <Header {...this.props} />
    }
};
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose(
    connect(
        mapStateToProps,
        { logout })

)(HeaderContainer);