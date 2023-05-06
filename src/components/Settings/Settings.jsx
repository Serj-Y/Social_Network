import React from "react";
import s from './Settings.module.css';

const Settings = React.memo(props => {
    return (
        <div className={s.Settings}>
            <h1>Settings</h1>
        </div>
    )
})
export default Settings  