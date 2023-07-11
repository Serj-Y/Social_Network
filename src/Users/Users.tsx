import React, { useEffect } from "react";
import Paginator from "../Common/Components/Paginator/Paginator";
import User from "./User/User";
import { UserSearchForm } from "./User/UserSearchForm";
import { FilterType, requestUsers, follow, unFollow } from "../Common/Components/Redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from "../Common/Components/Redux/userSelectors";


type PropsType = {
 
}


export const Users: React.FC<PropsType> = (props ) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)
  const followingInProgress = useSelector(getFollowingInProgress) 

  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }, [])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

 const onFilterChanged =(filter: FilterType) =>{
   dispatch(requestUsers(1, pageSize,  filter ))
}

const Follow =(userId: number) =>{
  dispatch(follow(userId))
}

const UnFollow =(userId: number) =>{
  dispatch(unFollow(userId))
}

  return <div>
    <Paginator
      currentPage={currentPage}
      onPageChanged={onPageChanged}
      totalItemsCount={totalUsersCount}
      pageSize={pageSize} />

    <UserSearchForm onFilterChanged={onFilterChanged} />

    {users.map(u =>

      <User
        unFollow={UnFollow}
        follow={Follow}
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
