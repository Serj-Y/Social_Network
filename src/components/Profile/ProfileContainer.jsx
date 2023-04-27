import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile, profileContent } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

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

let authRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
})

let WithUrlDataContainerComponent = withRouter(authRedirectComponent);


export default connect(mapStateToProps,  {
    setUserProfile,
    profileContent,
})(WithUrlDataContainerComponent);