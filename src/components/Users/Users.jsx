import React from "react";
import s from './User.module.css'
import userPhotoDefault from '../../assets/img/4314581-200.png'
import { NavLink } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) { pages.push(i); }

    if (props.isAuth === false) return <Redirect to={"/Login"} />
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span className={props.currentPage === p && s.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}  >{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span >
                        <div >
                            <NavLink to={'/profile/' + u.id}>
                                <img className={s.img} src={u.photos.small != null ? u.photos.small : userPhotoDefault} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.unFollow(u.id) } } >unFollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.follow(u.id) }} >Follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </span>
                    </span>
                </div>)
            }
        </div>
    )
}

export default Users