import React, { useState, useEffect, useContext} from "react";
import profile from "../assests/profile.webp";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import AppContext from "../context/AppContext";
const UserList = ({ tab, settab, table, settable }) => {
  const context = useContext(AppContext);
  const data = context.data;
  const setdata = context.setdata;
  const [chatrooms, setchatrooms] = useState([
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
    {
      name: "Areesha",
    },
  ]);

  const contacts = [
    {
      username: "afreensayed@gmail.com",
    },
    {
      username: "david@gmail.com",
    },
    {
      username: "deon@gmail.com",
    },
    {
      username: "racheal@gmail.com",
    },
  ];

  const handleCreateChat = (username) => {
    const collectionsRef = collection(
      database,
      "ChatRoom#" + auth.currentUser.email + "," + username
    );
    const chatroomRef = collection(database, "chatrooms");
    addDoc(collectionsRef, {
      username: auth.currentUser.email,
      msg: "Hi",
      timestamp: Date.now(),
    });
    addDoc(chatroomRef, {
      name: "ChatRoom#" + auth.currentUser.email + "," + username,
    });
    const chatRef = collection(database, "chatrooms");

    onSnapshot(chatRef, (data) => {
      setchatrooms(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
    console.log(chatrooms, "chat");
  };

  const handleChatRoom = (name) => {
    settable(name);
    const chatRef = collection(database, table);

    onSnapshot(chatRef, (data) => {
      setdata(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
    console.log(data)
  };

  return (
    <>
      <div className="tabs">
        <button className="tab" onClick={() => settab("chats")}>
          Chats
        </button>
        <button className="tab" onClick={() => settab("contacts")}>
          Contacts
        </button>
      </div>
      {tab === "chats"
        ? chatrooms?.map((item) => (
            <div className="item">
              <div className="avatar">
                <img
                  src={profile}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="listcontent">
                <span
                  className="listuser"
                  onClick={() => handleChatRoom(item.name)}
                >
                  {item.name}
                </span>
              </div>
            </div>
          ))
        : contacts?.map((item) => (
            <div className="item">
              <div className="avatar">
                <img
                  src={profile}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="listcontent">
                <span className="listuser">{item.username}</span>
                <button
                  className="start-chat"
                  onClick={() => handleCreateChat(item.username)}
                >
                  Start Chat
                </button>
              </div>
            </div>
          ))}
    </>
  );
};

export default UserList;
