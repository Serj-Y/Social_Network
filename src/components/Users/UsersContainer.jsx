import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unFollow, setCurrentPage, toggleFollowingInProgress, getUsers } from "../../Redux/usersReducer";
import Preloader from "../../components/Common/Preloader/Preloader"
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

class UsersApiComponent extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ?
                <Preloader /> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }

};

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
    }
};

let authRedirectComponent = withAuthRedirect(UsersApiComponent);

export default connect(mapStateToProps, {
    getUsers,
    follow,
    unFollow,
    setCurrentPage,
    toggleFollowingInProgress,
})(authRedirectComponent);