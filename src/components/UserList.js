import React, { useState } from "react";
import profile from "../assests/profile.webp";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
const UserList = ({ tab, settab, table, settable }) => {
  const chatrooms = [
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
    {
      username: "Areesha",
      msg: "Bubie..",
    },
  ];
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
    addDoc(collectionsRef, {
      username: auth.currentUser.email,
      msg: "Hi",
      timestamp: Date.now(),
    });
    settable("ChatRoom#" + auth.currentUser.email + "," + username)
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
                <span className="listuser">{item.username}</span>
                <span className="listmsg">{item.msg}</span>
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
