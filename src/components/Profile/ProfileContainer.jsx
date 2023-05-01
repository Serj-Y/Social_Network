import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile, profileContent, getStatus, updateStatus } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 1079;
        }
        this.props.profileContent(userId);
        this.props.getStatus(userId);
    }
   
    render() {

        return (
            <Profile
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
});

export default compose(
    connect(mapStateToProps, { setUserProfile, profileContent, updateStatus, getStatus }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);