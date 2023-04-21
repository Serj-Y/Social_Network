import React from "react";
import s from './User.module.css'
import userPhotoDefault from '../../../assets/img/4314581-200.png'

let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) { pages.push(i); }
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
                            <img className={s.img} src={u.photos.small != null ? u.photos.small : userPhotoDefault} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }} >unFollow</button>
                                : <button onClick={() => { props.follow(u.id) }} >Follow</button>
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