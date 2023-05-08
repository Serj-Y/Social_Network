import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = React.memo(props => {
    return <div>
        <Paginator
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize} />

        {props.users.map(u => <User
            unFollow={props.unFollow}
            follow={props.follow}
            user={u}
            key={u.id}
            followingInProgress={props.followingInProgress} />
        )}
    </div>
})

export default Users