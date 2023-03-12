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
  const chatrooms = context.chatrooms;
  const setchatrooms = context.setchatrooms;
  const chatRef = collection(database, "chatrooms");
  const [addcontacts, setaddcontacts] = useState(false);
  const [username, setusername] = useState("");

  const [contacts, setcontacts] = useState([
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
  ]);

  const getContacts = () => {
    const contactsRef = collection(database, "contacts");
    onSnapshot(contactsRef, (data) => {
      setcontacts(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };
  getContacts();
  const handleCreateChat = (username) => {
    const collectionsRef = collection(
      database,
      "ChatRoom#" + auth.currentUser.email + "," + username
    );
    const chatroomRef = collection(database, "chatrooms");
    let isPresent = false;
    chatrooms.forEach((item) => {
      if (item.name === "ChatRoom#" + auth.currentUser.email + "," + username) {
        isPresent = true;
      }
    });
    if (!isPresent) {
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
    }
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

  const handleChatrooms = () => {
    return chatrooms?.filter((item) =>
      item.name.includes(auth.currentUser.email)
    );
  };

  const handleAddContacts = () => {
    const contactsRef = collection(database, "contacts");
    if (auth.currentUser.email !== username && username !== "") {
      addDoc(contactsRef, {
        username: username,
      });
      getContacts();
    }

    setusername("");
    setaddcontacts(!addcontacts);
  };

  

  return (
    <>
      <div className="userlist-container">
        <div className="tabs">
          <button
            className="tab"
            onClick={() => settab("chats")}
            style={{
              color: tab === "chats" ? "white" : "black",
              backgroundColor: tab === "chats" ? "blue" : "white",
            }}
          >
            Chats
          </button>
          <button
            className="tab"
            onClick={() => settab("contacts")}
            style={{
              color: tab === "contacts" ? "white" : "black",
              backgroundColor: tab === "contacts" ? "blue" : "white",
            }}
          >
            Contacts
          </button>
        </div>
        <div>
          <div className="options">
            <span>double click to view chatroom</span>
            <button
              className="addcontacts"
              onClick={() => setaddcontacts(!addcontacts)}
            >
              Add contacts
            </button>
          </div>
          <div
            className="panel"
            style={{ visibility: !addcontacts ? "hidden" : "visible" }}
          >
            <input
              type="email"
              style={{ padding: "10px", width: "70%", outline: "none" }}
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
            <button className="addcontacts" onClick={handleAddContacts}>
              Add
            </button>
          </div>
        </div>

        {tab === "chats"
          ? handleChatrooms()?.map((item) => (
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
                    {item.name.slice(9).split(",")[0] === auth.currentUser.email
                      ? item.name.slice(9).split(",")[1]
                      : item.name.slice(9).split(",")[0]}
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
      </div>
    </>
  );
};

export default UserList;
