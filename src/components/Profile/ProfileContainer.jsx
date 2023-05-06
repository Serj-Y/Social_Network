import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile, profileContent, getStatus, updateStatus } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.PureComponent {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.AuthUserId;
            if(!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.profileContent(userId);
        this.props.getStatus(userId);
    }
   
    render() {   
        return (
            <Profile {...this.props}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                 />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    AuthUserId: state.auth.id,
});
export default compose(
    connect(mapStateToProps, { setUserProfile, profileContent, updateStatus, getStatus }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);