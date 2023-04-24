import React from 'react';
import Header from './Header';
import *  as axios from 'axios'
import { setAuthUserData } from '../../Redux/authReducer'
import { connect } from 'react-redux';
import { getLoginData } from '../../apiComponents/Api';

class HeaderContainer extends React.Component {
    componentDidMount() {
        getLoginData()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    this.props.setAuthUserData(id, email, login);
                }
            });
    }
    render() {
        return <Header {...this.props} />
    }
};
let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default connect(mapStateToProps, { setAuthUserData })(HeaderContainer);