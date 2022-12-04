import React from "react";
import Chat from "../../Components/Chat/Chat";
import Conversation from "../../Components/Conversation/Conversation";
import classes from "./Messenger.module.scss";
import { useSelector } from "react-redux";
import axios from "../../api/axios";
import Header from "../../Components/Header/Header";
const Messenger = () => {
  const token = localStorage.getItem("token");

  const [currentChat, setCurrentChat] =
    React.useState(null);
  const [conversations, setConversations] = React.useState(
    []
  );
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
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [token]);
  console.log(conversations);
  const { info_doctor } = useSelector(
    (state) => state.service
  );
  const { patients } = useSelector((state) => state.user);

  React.useEffect(() => {
    try {
      const res = axios.get(`/messanger/conversation`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "token"
          )}`,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const people = {
    name: [],
    surname: [],
    photo: [],
  };
  for (let i = 0; i < conversations.length; i++) {
    for (let j = 0; j < info_doctor.length; j++) {
      if (
        conversations[i].secondId == info_doctor[j].userId
      ) {
        people.name.push(info_doctor[j].name);
        people.surname.push(info_doctor[j].surname);
        people.photo.push(info_doctor[j].photo);
      }
    }
  }

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
            {people.name.map((name, index) => (
              <div
                key={index}
                onClick={() => setCurrentChat(true)}>
                <Conversation
                  name={name}
                  surname={people.surname[index]}
                  photo={people.photo[index]}
                />
              </div>
            ))}
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
