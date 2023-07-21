import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./../Dialogs.module.scss";
 

type PropsType = {
    id: string
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = "/Dialogs/" + props.id;
    return (
        <div className={styles.dialog + " " + styles.active}>
            <NavLink to={path} >{props.name}</NavLink>
        </div>
    )
}
export default DialogItem;