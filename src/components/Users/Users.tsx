import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";
import { UsersType } from "../Common/Types/Types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unFollow: (userId: number) => void
    follow: (userId: number) => void
}


let Users: React.FC<PropsType> = ({ currentPage, onPageChanged, totalUsersCount, pageSize, unFollow, follow, followingInProgress, users }) => {
    return <div>
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