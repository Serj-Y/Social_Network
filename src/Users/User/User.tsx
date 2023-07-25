import React from "react";
import styles from "./User.module.scss"
import userPhotoDefault from "../../Common/assets/img/4314581-200.png"
import { NavLink } from "react-router-dom";
import { UsersType } from "../../Common/Components/Types/Types";
import { Btn } from "../../Common/Components/styles/button/Button";
 
type PropsType = {
user: UsersType
followingInProgress: Array<number>
unFollow: (userId: number) => void
follow: (userId: number) => void

}


let User: React.FC<PropsType> = ({user, follow, unFollow, followingInProgress }) => {
    return (
        <div className={styles.userBlock} >
                  <span >
            <div >
                <NavLink to={"/profile/" + user.id}>
                    <img
                        className={styles.img}
                        alt="userPhoto"
                        src={user.photos.small != null
                            ? user.photos.small
                            : userPhotoDefault} />
                </NavLink>
            </div>
            <div className={styles.name}>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
            </div>
            <span>
                <div className={styles.button} >
                    {user.followed
                        ? <Btn PropBtnStyle={styles.unFollowBtn} Disabled={ followingInProgress.some(id => id === user.id)}
                        Click={() => { unFollow(user.id) }} ButtonText={"UnFollow"} />
                        : <Btn Disabled={followingInProgress.some(id => id === user.id)}
                        Click={() => { follow(user.id) }} ButtonText={"Follow"} /> 
                    }
                </div>
            </span>
        </span> 
        </div>
 
    )

}


export default User