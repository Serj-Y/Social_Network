import React from "react";
import style from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import { InjectedFormProps, reduxForm } from "redux-form";
import { required, maxLengthCreator, minLengthCreator } from "../Common/Validators/Validators";
import { Textarea } from "../Common/FormsControls/FormsControls";
import { CreateFields } from "../Common/FormsControls/FormsControls";
import { InitialStateType } from "../../Redux/dialogsReducer";



const maxLength = maxLengthCreator(50);
const minLength = minLengthCreator(2);



type PropsType = {
  dialogsPage: InitialStateType
  sendMessage: (messageText: string) => void
}


type MapDispatchType = {
  
}

type NewMessagesValuesKeysType = Extract <keyof NewMessagesType, string>

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
const AddMessageForm: React.FC <InjectedFormProps<NewMessagesType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} >
      <div>
         {CreateFields<NewMessagesValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength, minLength], Textarea)}
      </div>
     
      <div className={style.button}>
        <button>Send Message</button>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm<NewMessagesType>({ form: "dialogAddMessageForm" })(AddMessageForm)
export default Dialogs;