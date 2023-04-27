import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { setUserProfile, profileContent} from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class ProfileContainer extends React.Component {
    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 2;
        }
        this.props.profileContent(userId)
    }
    render() {
        if (!this.props.isAuth) return <Redirect to={"/Login"} />;
        return (
            <Profile profile={this.props.profile} />
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);


export default connect(mapStateToProps, { 
    setUserProfile,
    profileContent,
 })(WithUrlDataContainerComponent);