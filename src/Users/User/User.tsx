import React from "react";
import style from "./User.module.css"
import userPhotoDefault from "../../Common/assets/img/4314581-200.png"
import { NavLink } from "react-router-dom";
import { UsersType } from "../../Common/Components/Types/Types";
 
type PropsType = {
user: UsersType
followingInProgress: Array<number>
unFollow: (userId: number) => void
follow: (userId: number) => void

}


let User: React.FC<PropsType> = ({user, follow, unFollow, followingInProgress }) => {
    return (
        <span >
            <div >
                <NavLink to={"/profile/" + user.id}>
                    <img
                        className={style.img}
                        alt="userPhoto"
                        src={user.photos.small != null
                            ? user.photos.small
                            : userPhotoDefault} />
                </NavLink>
            </div>
            <div className={style.name}>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </div>
            <span>
                <div className={style.button} >
                    {user.followed
                        ? <button disabled={ followingInProgress.some(id => id === user.id)}
                            onClick={() => { unFollow(user.id) }} >unFollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                            onClick={() => { follow(user.id) }} >Follow</button>
                    }
                </div>
            </span>
        </span>
    )

}


export default User