import React from "react";
import classes from "./Online.module.scss";
const Online = () => {
  return (
    <div className={classes.chatOnline}>
      <div className={classes.friend}>
        <div className={classes.chatContainer}>
          <img className={classes.img} src="" alt="" />
          <div className={classes.online}></div>
        </div>
      </div>
    </div>
  );
};

export default Online;
