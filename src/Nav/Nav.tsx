import React from "react";
import style from "./Nav.module.scss";
import { NavBtn } from "../Common/Components/styles/button/Button";

type PropsType = {};

const Nav: React.FC<PropsType> = (props) => {
  return (
    <nav className={style.nav}>
      <div className={style.item}>
        <NavBtn Href="/profile" ButtonText="Profile" />
        <NavBtn Href="/messages" ButtonText="Message" />
        <NavBtn Href="/users" ButtonText="Users" />
        <NavBtn Href="/chat" ButtonText="Chat" />
        <NavBtn Href="/music" ButtonText="Music" />
        <NavBtn Href="/news" ButtonText="News" />
        <NavBtn Href="/settings" ButtonText="Settings" />
      </div>
    </nav>
  );
};

export default Nav;
