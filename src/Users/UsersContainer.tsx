import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import { follow, unFollow, requestUsers, FilterType } from "../Common/Components/Redux/usersReducer";
import Preloader from "../Common/Components/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUserFilter } from "../Common/Components/Redux/userSelectors";
import { UsersType } from "../Common/Components/Types/Types";
import { AppStateType } from "../Common/Components/Redux/reduxStore";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter:FilterType, pageNumber?: number) => void
    unFollow: (userId: number) => void
    follow: (userId: number) => void
    pageNumber: number
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class usersComponent extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize, filter } = this.props
        this.props.requestUsers(currentPage, pageSize, filter )
    }

    onPageChanged = (pageNumber: number ) => {
        const {pageSize, filter} = this.props
        this.props.requestUsers( pageNumber, pageSize, filter)
    }

    onFilterChanged =(filter: FilterType) =>{
        const { pageSize } = this.props
        this.props.requestUsers(1, pageSize,  filter )
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ?
                <Preloader /> : null}

            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                onFilterChanged={this.onFilterChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unFollow={this.props.unFollow}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter:getUserFilter(state)
    }
}

export default compose(
    connect(
        mapStateToProps, { requestUsers, follow, unFollow }),
)(usersComponent)