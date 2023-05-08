import React from "react";
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { Field, reduxForm } from "redux-form";
import { required, maxLengthCreator, minLengthCreator } from "../Common/Validators/Validators";
import { Textarea } from "../Common/FormsControls/FormsControls";
import { CreateFields } from "../Common/FormsControls/FormsControls";
const maxLength = maxLengthCreator(50);
const minLength = minLengthCreator(2);

const Dialogs = React.memo(props => {
  let state = props.dialogsPage;
  let dialogsElements = state.dialogs.map(dialogs => <DialogItem name={dialogs.name} key={dialogs.id} id={dialogs.id} />);
  let messagesElements = state.messages.map(messages => <Message message={messages.message} key={messages.id} id={messages.id} />);


  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItem}>
        {dialogsElements}
      </div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  )
})
const AddMessageForm = React.memo(props => {
  return (
    <form onSubmit={props.handleSubmit} >
      {CreateFields("Enter your message", "newMessageBody", [required, maxLength, minLength], Textarea)}
      <div>
        <button>Send Message</button>
      </div>
    </form>
  )
})

const AddMessageFormRedux = reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm)
export default Dialogs;