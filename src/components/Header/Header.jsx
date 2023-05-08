import React from "react";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";

const Header = React.memo(props => {
    return <header className={s.header}>
        <img src="https://png.pngtree.com/png-vector/20190328/ourmid/pngtree-simple-mountain-logo-designs-png-image_878392.jpg"></img>
        <div className={s.loginBlock} >
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout} >LogOut</button></div>
                : <NavLink to={"/login"} >Login</NavLink>
            }
        </div>
    </header>
})


export default Header;