import React from "react";
import styles from "./Button.module.scss"
import { NavLink } from "react-router-dom";

type PropsType = {
    ExtraComponent?: any;
    PropBtnStyle?: string;
    Href: any
    ButtonText?: any
    

}


export const NavBtn: React.FC<PropsType> = (props) => {
    return <NavLink  className={`${styles.Btn} ${props.PropBtnStyle}`}  rel="noopener noreferrer"  to={props.Href}  > {props.ExtraComponent} {props.ButtonText}</NavLink>
}

export const Btn: React.FC<PropsType> = (props) => {
    return <button  className={`${styles.Btn} ${props.PropBtnStyle}`}  rel="noopener noreferrer"  onClick={props.Href}  > {props.ExtraComponent} {props.ButtonText}</button>
}