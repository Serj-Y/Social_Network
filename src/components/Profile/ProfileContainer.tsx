import React, { Component } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { actions, profileContent, updateStatus, savePhoto, saveProfile, getStatus } from "../../Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { AppStateType } from "../../Redux/reduxStore";
import { ProfileType } from "../Common/Types/Types";
import { RouteComponentProps } from "react-router-dom";


type MapStatePropsType = ReturnType<typeof mapStateToProps > 

type MapDispatchPropsType = {
profileContent: (userID: number) => void
getStatus: (userId: number) => void
refreshProfile: (userId: number, AuthUserId: number) => void
updateStatus: (status: string) => void
saveProfile: (profile: ProfileType) => void
savePhoto: (file: any) => void
}

type PathParamsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> 
{
    refreshProfile()  {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.AuthUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.profileContent(userId);
        this.props.getStatus(userId);
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}
                savePhoto={this.props.savePhoto}
                saveProfile={this.props.saveProfile}
            />
        )
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    isAuth: state.auth.isAuth,
    AuthUserId: state.auth.userId,
});

let setUserProfile = actions.setUserProfile


export default compose<React.ComponentType>(
    connect(mapStateToProps, { setUserProfile, profileContent, updateStatus, getStatus, savePhoto, saveProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);