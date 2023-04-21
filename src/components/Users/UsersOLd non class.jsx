import React from "react";
import s from './User.module.css'
import * as axios from "axios";
import userPhotoDefault from '../../../assets/img/4314581-200.png'

let Users = (props) => {
    let getUsers = () => {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
            });
    }
    if (props.users.length === 0) {

    }

    return <div>
        <button onClick={getUsers} >getUsers</button>
        {
            props.users.map(u => <div key={u.id}>
                <span >
                    <div >
                        <img className={s.img} src={u.photos.small != null ? u.photos.small : userPhotoDefault} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }} >unFollow</button>
                            : <button onClick={() => { props.follow(u.id) }} >Follow</button>}
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

}

