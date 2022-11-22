import React from "react";
import "./Chat.scss";
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
const Chat = ({ mine }) => {
  return (
    <>
      <div className={mine ? "chat mine" : "chat"}>
        <div className="chatTop">
          <img className="chatImg" src={photos[0]} alt="" />
          <p
            className={
              mine ? "chat mine chatText" : "chatText"
            }>
            Lorem ipsum dolor sit amet consectetur,
            adipisicing elit.
          </p>
        </div>
        <div className="chatBottom">1 hour ago</div>
      </div>
    </>
  );
};

export default Chat;
