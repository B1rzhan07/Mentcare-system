import React from "react";
import classes from "./Conversation.module.scss";
import axios from "../../api/axios";
const photos = [
  "../../img/1.png",
  "../../img/2.png",
  "../../img/3.png",
  "../../img/4.png",
  "../../img/5.png",
  "../../img/6.png",
  "../../img/7.png",
  "../../img/8.png",
  "../../img/9.png",
  "../../img/10.png",
  "../../img/11.png",
  "../../img/12.png",
  "../../img/13.png",
  "../../img/14.png",
];
const Conversation = () => {
  let token = localStorage.getItem("token");
  React.useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "/messanger/conversation",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "token"
              )}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [token]);
  return (
    <div className={classes.conversation}>
      <img
        className={classes.conversationImg}
        src={photos[0]}
        alt=""
      />
      <span className={classes.conversationName}>
        Islam Yerzhanuly
      </span>
    </div>
  );
};

export default Conversation;
