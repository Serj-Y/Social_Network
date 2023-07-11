import React from "react";
import { Users } from "./Users";
import { useSelector } from "react-redux";
import Preloader from "../Common/Components/Preloader/Preloader";
import { getIsFetching } from "../Common/Components/Redux/userSelectors";



type UserPagePropsType = {}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ?
            <Preloader /> : null}
        <Users />
    </>
}
