import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile, profileContent } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.profileContent(userId)
    }
    render() {

        return (
            <Profile profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
});

export default compose(
    connect(mapStateToProps, { setUserProfile, profileContent, }),
    withRouter,
    withAuthRedirect,
)(ProfileContainer);