import React, { useEffect } from "react";
import Paginator from "../Common/Components/Paginator/Paginator";
import User from "./User/User";
import { UserSearchForm } from "./User/UserSearchForm";
import { FilterType, requestUsers, follow, unFollow } from "../Common/Components/Redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUserFilter, getUsers } from "../Common/Components/Redux/userSelectors";
import { useHistory } from "react-router";
import * as queryString from 'querystring'


type PropsType = {

}

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC<PropsType> = (props) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUserFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substring(1))

    let ActualFilter = filter
    let ActualPage = currentPage

    if (!!parsed.page) ActualPage = Number(parsed.page)

    if (!!parsed.term) ActualFilter = { ...ActualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case "null":
        ActualFilter = { ...ActualFilter, friend: null }
        break
      case "true":
        ActualFilter = { ...ActualFilter, friend: true }
        break
      case "false":
        ActualFilter = { ...ActualFilter, friend: false }
    }

    dispatch(requestUsers(ActualPage, pageSize, ActualFilter))
  }, [])


  useEffect(() => {

    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: "/users",
      search: queryString.stringify(query)
    })

  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {

    dispatch(requestUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(currentPage, pageSize, filter))
  }

  const Follow = (userId: number) => {
    dispatch(follow(userId))
  }

  const UnFollow = (userId: number) => {
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
