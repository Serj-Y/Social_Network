import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { reduxForm } from "redux-form";
import { maxLengthCreator, minLengthCreator } from "../Common/Components/Validators/Validators";
import { InitialStateType } from "../Common/Components/Redux/dialogsReducer";
import { AddMessageForm } from "./AddMessageForm";



export const maxLength = maxLengthCreator(50);
export const minLength = minLengthCreator(2);



type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}


export type NewMessagesValuesKeysType = Extract <keyof NewMessagesType, string>

export type NewMessagesType = {
  newMessageBody: string
}



const Dialogs: React.FC<PropsType> = (props) => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(dialogs => <DialogItem name= {dialogs.name} key={dialogs.id} id={dialogs.id} />);
  let messagesElements = state.messages.map(messages => <Message message={messages.message} key={messages.id} id={messages.id} />);


  let addNewMessage = (values: NewMessagesType) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={style.dialogs}>
      <div className={style.dialogsItem}>
        {dialogsElements}
      </div>
      <div className={style.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  )
}
const AddMessageFormRedux = reduxForm<NewMessagesType>({ form: "dialogAddMessageForm" })(AddMessageForm)
export default Dialogs;