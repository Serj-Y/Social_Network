import React from "react";
import s from './User.module.css'
import * as axios from "axios";
import userPhotoDefault from '../../../assets/img/4314581-200.png'

class Users extends React.Component {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }
    render() {
        return <div>
            {
                this.props.users.map(u => <div key={u.id}>
                    <span >
                        <div >
                            <img className={s.img} src={u.photos.small != null ? u.photos.small : userPhotoDefault} />
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { this.props.unfollow(u.id) }} >unFollow</button>
                                : <button onClick={() => { this.props.follow(u.id) }} >Follow</button>}
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
}

export default Users;