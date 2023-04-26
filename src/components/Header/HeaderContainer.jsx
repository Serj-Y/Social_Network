import React from 'react';
import Header from './Header';
import { setAuthUserData, authData } from '../../Redux/authReducer'
import { connect } from 'react-redux';


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



export default connect(mapStateToProps, { setAuthUserData, authData })(HeaderContainer);