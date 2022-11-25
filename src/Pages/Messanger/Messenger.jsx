import React from "react";
import Chat from "../../Components/Chat/Chat";
import Conversation from "../../Components/Conversation/Conversation";
import Header from "../../Components/Header";
import classes from "./Messenger.module.scss";
import { useSelector } from "react-redux";
const Messenger = ({ mine }) => {
  const [currentChat, setCurrentChat] =
    React.useState(null);

  return (
    <>
      <Header />
      <div className={classes.messenger}>
        <div className={classes.chatMenu}>
          <div className={classes.chatMenuWrapper}>
            <input
              type="text"
              placeholder="find someone"
              className={classes.chatSearchInput}
            />
            <Conversation />
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
            {currentChat ? (
              <>
                <div className={classes.chatBoxTop}>
                  <Chat />
                  <Chat mine={true} />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                  <Chat />
                </div>
                <div className={classes.chatBoxBottom}>
                  <textarea
                    placeholder="text here"
                    className={classes.textArea}></textarea>
                  <button className={classes.button}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className={classes.noConversationText}>
                Open a conversation to start a chat
              </span>
            )}
          </div>
        </div>
        <div className={classes.chatOnline}>
          Online <b>Islam Yerzhanuly</b>
        </div>
        <input
          name="Name"
          type="hidden"
          value="Islam Yerzhanuly"
        />
      </div>
    </>
  );
};

export default Messenger;
