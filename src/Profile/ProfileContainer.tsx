import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  actions,
  profileContent,
  saveProfile,
  getStatus,
} from "../Common/Components/Redux/profileReducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { withAuthRedirect } from "../Common/Components/hoc/withAuthRedirect";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { ProfileType } from "../Common/Components/Types/Types";
import { RouteComponentProps } from "react-router-dom";

type MapDispatchPropsType = {
  profileContent: (userId: number | null) => void;
  getStatus: (userId: number | null) => void;
  refreshProfile: (userId: number, AuthUserId: number) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

type PathParamsType = {
  userId: string;
};

type PropsType = MapStatePropsType &
  MapDispatchPropsType &
  RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId: number | null = Number(this.props.match.params.userId);
    if (!userId) {
      userId = this.props.AuthUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.profileContent(userId);
    this.props.getStatus(userId);
  }
  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        isOwner={!this.props.match.params.userId}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  AuthUserId: state.auth.userId,
});

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

const setUserProfile = actions.setUserProfile;

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setUserProfile,
    profileContent,
    getStatus,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
