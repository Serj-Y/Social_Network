import React from "react";
import styles from "./Dialogs.module.scss";
import {
  maxLengthCreator,
  minLengthCreator,
} from "../Common/Components/Validators/Validators";
import { InitialStateType } from "../Common/Components/Redux/dialogsReducer";

export const maxLength = maxLengthCreator(50);
export const minLength = minLengthCreator(2);

type PropsType = {
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

export type NewMessagesValuesKeysType = Extract<keyof NewMessagesType, string>;

export type NewMessagesType = {
  newMessageBody: string;
};

const Dialogs: React.FC<PropsType> = () => {
  return (
    <div className={styles.dialogs}>
      <h1 style={{ textAlign: "center" }}>Coming Soon...</h1>
    </div>
  );
};

export default Dialogs;
