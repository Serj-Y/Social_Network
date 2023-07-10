import React from "react";
import s from "./Settings.module.css";

type PropsType = {

}

const Settings: React.FC<PropsType> = (props) => {
    return (
        <div className={s.Settings}>
            <h1>Settings</h1>
        </div>
    )
}
export default Settings  