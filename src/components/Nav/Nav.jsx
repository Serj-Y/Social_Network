import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = (props) => {
  return (
    <nav className={style.nav} >
      <div className={style.item} >
        <div className={style.link} >
          <NavLink to="/profile" activeClassName={style.active} > Profile</NavLink>
        </div>
        <div className={style.link} >
          <NavLink  to="/messages" activeClassName={style.active} >Messages</NavLink>
        </div>
        <div className={style.link} >
          <NavLink to="/users" activeClassName={style.active}>Users</NavLink>
        </div>
        <div className={style.link} >
          <NavLink to="/news" activeClassName={style.active}>News</NavLink>
        </div>
        <div className={style.link} >
          <NavLink to="/music" activeClassName={style.active} >Music</NavLink>
        </div>
        <div className={style.link} >
          <NavLink to="/settings" activeClassName={style.active}>Settings</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Nav;