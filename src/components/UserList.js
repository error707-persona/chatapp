import React, { useState, useEffect, useContext } from "react";
import profile from "../assests/profile.webp";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import AppContext from "../context/AppContext";
const UserList = ({ tab, settab }) => {
  const context = useContext(AppContext);
  const data = context.data;
  const setdata = context.setdata;
  const table = context.table;
  const settable = context.settable;
  const chatRef = collection(database, "chatrooms");
  const [chatrooms, setchatrooms] = useState(
    onSnapshot(chatRef, (data) => {
      setchatrooms(
        data.docs.map((item) => {
          return item.data();
        })
      );
    })
  );

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
    console.log(data);
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
      <span>double click in chat tab to view chatroom</span>
      {tab === "chats"
        ? chatrooms?.map((item) => (
            <div className="item" onClick={() => handleChatRoom(item.name)}>
              <div className="avatar">
                <img
                  src={profile}
                  width={50}
                  height={50}
                  style={{ borderRadius: "50%" }}
                />
              </div>
              <div className="listcontent">
                <span className="listuser">
                  {item.name.slice(9).split(",")[1]}
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
