import React from "react";
import Paginator from "../Common/Components/Paginator/Paginator";
import User from "./User/User";
import { UsersType } from "../Common/Components/Types/Types";
import { UserSearchForm } from "./User/UserSearchForm";
import { FilterType } from "../Common/Components/Redux/usersReducer";

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UsersType>
  followingInProgress: Array<number>
  unFollow: (userId: number) => void
  follow: (userId: number) => void
  onFilterChanged: (filter: FilterType) => void
}


let Users: React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, unFollow, follow, followingInProgress, users, ...props }) => {
  return <div>

    <UserSearchForm onFilterChanged={props.onFilterChanged}  />
    <Paginator
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalItemsCount={totalUsersCount}
      pageSize={pageSize} />

    {users.map(u =>

      <User
        unFollow={unFollow}
        follow={follow}
        user={u}
        key={u.id}
        followingInProgress={followingInProgress} />
    )}

    <Paginator
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalItemsCount={totalUsersCount}
      pageSize={pageSize} />
  </div>
}
export default Users