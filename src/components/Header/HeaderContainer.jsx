import React from 'react';
import Header from './Header';
import { authData } from '../../Redux/authReducer'
import { connect } from 'react-redux';
import { compose } from 'redux';


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.authData();
    }
    render() {
        return <Header {...this.props} />
    }
};
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose(
    connect(mapStateToProps, { authData }),

)(HeaderContainer);