import React from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Nav.module.scss";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactLogo from "../logo.svg"
import Nav from 'react-bootstrap/Nav';
import { Button } from "react-bootstrap";


type PropsType = {

}


const Nave: React.FC<PropsType> = (props) => {
  return (
    <div className={style.Nav}>
      <Nav className="flex-column">
      <Nav.Link href="/profile"><Button  >Profile</Button></Nav.Link>
      <Nav.Link href="/messages"><Button >Messages</Button></Nav.Link>
      <Nav.Link href="/users"><Button  >Users</Button></Nav.Link>
      <Nav.Link href="/news"><Button  >News</Button></Nav.Link>
      <Nav.Link href="/music"><Button  >Music</Button></Nav.Link>
      <Nav.Link href="/settings"><Button  >Settings</Button></Nav.Link>
    </Nav>
    </div>
    















    // <nav className={style.nav} >
    //   <div className={style.item} >
    //     <div className={style.link} >
    //       <NavLink to="/profile" activeClassName={style.active} > Profile</NavLink>
    //     </div>
    //     <div className={style.link} >
    //       <NavLink  to="/messages" activeClassName={style.active} >Messages</NavLink>
    //     </div>
    //     <div className={style.link} >
    //       <NavLink to="/users" activeClassName={style.active}>Users</NavLink>
    //     </div>
    //     <div className={style.link} >
    //       <NavLink to="/news" activeClassName={style.active}>News</NavLink>
    //     </div>
    //     <div className={style.link} >
    //       <NavLink to="/music" activeClassName={style.active} >Music</NavLink>
    //     </div>
    //     <div className={style.link} >
    //       <NavLink to="/settings" activeClassName={style.active}>Settings</NavLink>
    //     </div>
    //   </div>
    // </nav>
  )
}

export default Nave;