import React, { useState } from "react";
import s from "./ProfileInfo.module.css"

const ProfileStatusWidthHook = (props) => {

    let [editMode, setEditMode] = useState(false);

    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)

    }

    return (
        <div>
            {!editMode &&
                <div>
                    <span onClick={activateEditMode}>{status || 'Empty Status-Click To Edit'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        value={status}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWidthHook