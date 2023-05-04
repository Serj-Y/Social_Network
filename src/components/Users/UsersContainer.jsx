import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unFollow, setCurrentPage, toggleFollowingInProgress, requestUsers} from "../../Redux/usersReducer";
import Preloader from "../../components/Common/Preloader/Preloader"
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersSelector } from "../../Redux/userSelectors";

class usersComponent extends React.Component {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize)
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
          users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    
    }
      
};






export default compose(
    connect(mapStateToProps, {
        requestUsers,
        follow,
        unFollow,
        setCurrentPage,
        toggleFollowingInProgress,
    }),
)(usersComponent)