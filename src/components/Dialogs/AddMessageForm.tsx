import React from "react";
import style from "./Dialogs.module.css";
import { InjectedFormProps } from "redux-form";
import { required } from "../Common/Validators/Validators";
import { Textarea } from "../Common/FormsControls/FormsControls";
import { CreateFields } from "../Common/FormsControls/FormsControls";
import { NewMessagesType, NewMessagesValuesKeysType, maxLength, minLength } from "./Dialogs";

export const AddMessageForm: React.FC<InjectedFormProps<NewMessagesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        {CreateFields<NewMessagesValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength, minLength], Textarea)}
      </div>

      <div className={style.button}>
        <button>Send Message</button>
      </div>
    </form>
  );
};
