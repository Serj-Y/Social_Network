import React from "react";
import Paginator from "../Common/Paginator/Paginator";
import User from "./User";

let Users = (props) => {

    return <div>
               <Paginator
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize} 
       />
        {props.users.map(u => <User
            unFollow={props.unFollow}
            follow={props.follow}
            user={u}
            key={u.id}
            followingInProgress={props.followingInProgress} />
        )}
        <Paginator
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize} 
       />
    </div>
}

export default Users