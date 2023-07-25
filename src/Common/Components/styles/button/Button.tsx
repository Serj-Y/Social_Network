import React, { MouseEventHandler } from "react";
import styles from "./Button.module.scss"
import { NavLink } from "react-router-dom";

type PropsType = {
    OnClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
    Type?: "button" | "submit" | "reset" ;
    Disabled?: boolean | undefined;
    ExtraComponent?: any;
    PropBtnStyle?: string;
    Href?: any
    ButtonText?: any
    Click?: any
    

}


export const NavBtn: React.FC<PropsType> = (props) => {
    return <NavLink  className={`${styles.Btn} ${props.PropBtnStyle}`}  rel="noopener noreferrer"  to={props.Href} onClick={props.OnClick} > {props.ExtraComponent} {props.ButtonText}</NavLink>
}

export const Btn: React.FC<PropsType> = (props) => {
    return <button  className={`${styles.Btn} ${props.PropBtnStyle}`}  rel="noopener noreferrer"   onClick={props.Click} disabled={props.Disabled} type={props.Type} > {props.ExtraComponent} {props.ButtonText}</button>
}

