import React from "react";
import styles from "./ChatPage.module.scss";
import { Chat } from "./Chat";

const ChatPage = () => {
  return (
    <div className={styles.chatPageContainer}>
      <Chat />
    </div>
  );
};

export default ChatPage;
