import React from "react";
import styles from "./Button.module.scss"

type PropsType = {
    ExtraComponent?: any;
    PropBtnStyle?: string;
    Href?: string
    ButtonText?: string;
}


export const Button: React.FC<PropsType> = (props) => {
    return <a className={`${styles.Btn} ${props.PropBtnStyle}`} target="_blank" rel="noopener noreferrer"  href={props.Href}> {props.ExtraComponent} {props.ButtonText}</a>
}