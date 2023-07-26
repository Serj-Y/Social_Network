import React from "react";
import styles from "./ChatPage.module.scss"
import { Chat } from "./Chat";

type PropsType = {

}




 const ChatPage =() => {
    return(
        <div className={styles.chatPageContainer}>
            <h1>Chat</h1>
        <Chat/>    
        </div>
    )
}


export default ChatPage