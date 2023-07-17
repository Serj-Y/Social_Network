import React from "react";
import styles from "./Header.module.scss"
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../Common/Components/Redux/reduxStore";
import { logout } from "../Common/Components/Redux/authReducer";
import { Button, Container, Navbar } from "react-bootstrap";




export const Head = () => {

    const login = useSelector((state: AppStateType) => state.auth.login)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const LogOut = () => {
        dispatch(logout())
    }
    return (
            <Navbar >
            <Container>
                <Navbar.Brand   className={styles.Header} href="/profile">Social_Network</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className={styles.Header} >
                        {isAuth
                            ? <div >{login} <Button size="sm" onClick={LogOut} >LogOut</Button></div>
                            : <NavLink to={"/login"} />
                        }
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar> 
   
       
    )
}
