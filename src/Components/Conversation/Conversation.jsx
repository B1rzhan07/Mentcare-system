import React from "react";
import classes from "./Conversation.module.scss";
import axios from "../../api/axios";
import { useSelector } from "react-redux";

const Conversation = ({ name, surname, photo }) => {
  return (
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src={`http://localhost:8800/${photo}`}
        alt=""
      />
      <span className={classes.conversationName}>
        {name} {surname}
      </span>
    </div>
  );
};

export default Conversation;
