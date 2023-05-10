import React from "react";
import { NavLink } from "react-router-dom";
import style from "./Nav.module.css";

const Nav = React.memo(props => {
  return (
    <nav className={style.nav} >
      <div >
        <div>
          <NavLink to="/profile"  >Profile</NavLink>
        </div>
        <div>
          <NavLink to="/messages" >Messages</NavLink>
        </div>
        <div>
          <NavLink to="/users" >Users</NavLink>
        </div>
        <div>
          <NavLink to="/news" >News</NavLink>
        </div>
        <div>
          <NavLink to="/music" >Music</NavLink>
        </div>
        <div>
          <NavLink to="/settings" >Settings</NavLink>
        </div>
      </div>
    </nav>
  )
})

export default Nav;