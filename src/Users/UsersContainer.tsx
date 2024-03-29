import React from "react";
import { Users } from "./Users";
import { useSelector } from "react-redux";
import Preloader from "../Common/Components/Preloader/Preloader";
import { getIsFetching } from "../Common/Components/Redux/userSelectors";

export const UsersPage = () => {
  const isFetching = useSelector(getIsFetching);
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  );
};
