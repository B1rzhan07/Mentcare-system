import React from "react";
import Chat from "../../Components/Chat/Chat";
import Conversation from "../../Components/Conversation/Conversation";
import Header from "../../Components/Header";
import classes from "./Messenger.module.scss";
import { useSelector } from "react-redux";
const Messenger = ({ mine }) => {
  const { patients } = useSelector((state) => state.user);
  console.log(patients);
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
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className={classes.chatBox}>
          <div className={classes.chatBoxWrapper}>
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
          </div>
        </div>
        <div className={classes.chatOnline}>
          Online <b>Islam Yerzhanuly</b>
        </div>
      </div>
    </>
  );
};

export default Messenger;
