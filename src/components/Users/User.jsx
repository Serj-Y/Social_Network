import React from "react";
import style from "./User.module.css"
import userPhotoDefault from "../../assets/img/4314581-200.png"
import { NavLink } from "react-router-dom";


let User = (props) => {
    return (
        <span >
            <div >
                <NavLink to={"/profile/" + props.user.id}>
                    <img
                        className={style.img}
                        src={props.user.photos.small != null
                            ? props.user.photos.small
                            : userPhotoDefault} />
                </NavLink>
            </div>
            <div className={style.name}>
                <span>
                    <div>{props.user.name}</div>
                    <div>{props.user.status}</div>
                </span>
            </div>
            <span>
                <div className={style.button} >
                    {props.user.followed
                        ? <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                            onClick={() => { props.unFollow(props.user.id) }} >unFollow</button>
                        : <button disabled={props.followingInProgress.some(id => id === props.user.id)}
                            onClick={() => { props.follow(props.user.id) }} >Follow</button>
                    }
                </div>
            </span>
        </span>
    )

}


export default User