import React, { useEffect } from "react";
import { AddMessageForm } from "./ChatMessage/AddMessageForm";
import { Messages } from "./ChatMessage/Messages";
import { useDispatch } from "react-redux";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../Common/Components/Redux/chatReducer";

export const Chat: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, []);

  return (
    <div>
      <Messages />
      <AddMessageForm />
    </div>
  );
};
