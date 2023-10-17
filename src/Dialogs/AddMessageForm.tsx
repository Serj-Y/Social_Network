import React from "react";
import styles from "./Dialogs.module.scss";
import { InjectedFormProps } from "redux-form";
import { required } from "../Common/Components/Validators/Validators";
import { Textarea } from "../Common/Components/FormsControls/FormsControls";
import { CreateFields } from "../Common/Components/FormsControls/FormsControls";
import {
  NewMessagesType,
  NewMessagesValuesKeysType,
  maxLength,
  minLength,
} from "./Dialogs";

export const AddMessageForm: React.FC<InjectedFormProps<NewMessagesType>> = (
  props
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {CreateFields<NewMessagesValuesKeysType>(
          "Enter your message",
          "newMessageBody",
          [required, maxLength, minLength],
          Textarea
        )}
      </div>
      <div className={styles.button}>
        <button>Send Message</button>
      </div>
    </form>
  );
};
