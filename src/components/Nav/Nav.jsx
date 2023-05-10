import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = React.memo(props => {
  return (
    <nav className={style.nav} >
      <div className={style.item} >
        <div>
          <NavLink to="/profile" className={({ isActive }) => isActive ? style.active : style.link}> Profile</NavLink>
        </div>
        <div>
          <NavLink to="/messages" className={({ isActive }) => isActive ? style.active : style.link} >Messages</NavLink>
        </div>
        <div>
          <NavLink to="/users" className={({ isActive }) => isActive ? style.active : style.link}>Users</NavLink>
        </div>
        <div>
          <NavLink to="/news" className={({ isActive }) => isActive ? style.active : style.link}>News</NavLink>
        </div>
        <div>
          <NavLink to="/music" className={({ isActive }) => isActive ? style.active : style.link} >Music</NavLink>
        </div>
        <div>
          <NavLink to="/settings" className={({ isActive }) => isActive ? style.active : style.link}>Settings</NavLink>
        </div>
      </div>
    </nav>
  )
})

export default Nav;