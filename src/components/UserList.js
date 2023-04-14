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
  const [group, setgroup] = useState("");
  const [participants, setparticipants] = useState([]);
  const [allparticipants, setallparticipants] = useState([]);

  const [username, setusername] = useState("");
  var prevusername = "";
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
        imgUrl: "",
        timestamp: Date.now(),
      });
      addDoc(chatroomRef, {
        groupname: "",
        name: "ChatRoom#" + auth.currentUser.email + "," + username,
      });

      onSnapshot(chatRef, (data) => {
        setchatrooms(
         console.log(data.docs, "chatroms")
        );
      });
    } else {
      alert("Chatroom already exists");
    }
    console.log(chatrooms, "chat");
  };

  const handleChatRoom = (name, groupname) => {
    if (name.includes("ChatRoom#")) {
      settable(name);
    } else {
      settable(groupname);
    }
    console.log(table, "Table")
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

  const handleAddInGroup = (name) => {
    if (typeof name === "string") {
      setusername(name);
    }

    var values = new Set(participants);
    console.log(values, "values");
    if (participants[participants.length - 1] !== username && username !== "") {
      values.add(username);
      setparticipants(values);
    }
    participants.add(auth.currentUser.email);
    setallparticipants([...participants]);
    console.log(participants, "participants");
  };

  const handleCreateGroup = () => {
    const groupsRef = collection(database, "groups");
    addDoc(groupsRef, {
      name: group,
      participants: allparticipants.join(","),
    })
      .then(() => {
        console.log("Data Added");
      })
      .catch((err) => {
        console.log(err.message);
      });
    if (group !== "") {
      const creategroupRef = collection(database, group);
      addDoc(creategroupRef, {
        username: auth.currentUser.email,
        msg: "Hi",
        timestamp: Date.now(),
        imgUrl: "",
      })
        .then(() => {
          console.log("Group made");
        })
        .catch((err) => {
          console.log(err.message);
        });

      //chatroms
      const addInChatroomsRef = collection(database, "chatrooms");
      addDoc(addInChatroomsRef, {
        groupname: group,
        name: allparticipants.join(","),
      })
        .then(() => {
          console.log("Group made");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    alert('Chat was created')
    setgroup("");
    setparticipants([]);
    setallparticipants([]);
    setusername("");
  };

  const handleClear = () => {
    setparticipants([]);
    setallparticipants([]);
    setusername("");
    setgroup("");
  };

  // console.log(chatrooms, "chatrroms")
  return (
    <>
      <div className="userlist-container">
        <div className="tabs">
          <button
            className="tab"
            onClick={() => settab("chats")}
            style={{
              color: tab === "chats" ? "white" : "black",
              backgroundColor: tab === "chats" ? "rgb(37, 45, 192)" : "white",
            }}
          >
            Chats
          </button>
          <button
            className="tab"
            onClick={() => settab("contacts")}
            style={{
              color: tab === "contacts" ? "white" : "black",
              backgroundColor:
                tab === "contacts" ? "rgb(37, 45, 192)" : "white",
            }}
          >
            Contacts
          </button>
          <button
            className="tab"
            onClick={() => settab("groups")}
            style={{
              color: tab === "groups" ? "white" : "black",
              backgroundColor: tab === "groups" ? "rgb(37, 45, 192)" : "white",
            }}
          >
            Create Group
          </button>
        </div>
        <div>
          {tab === "groups" ? (
            <div className="options">
              <input
                type="text"
                style={{
                  padding: "10px",
                  width: "70%",
                  outline: "none",
                  border: "1px solid white",
                  borderRadius: "0.3rem",
                }}
                onChange={(e) => setgroup(e.target.value)}
                placeholder="Enter group name"
                value={group}
              />
              &nbsp;&nbsp;&nbsp;
              <button
                className="addcontacts"
                onClick={() => setaddcontacts(!addcontacts)}
              >
                Add participants
              </button>
            </div>
          ) : (
            <div className="options">
              <span>double click to view chatroom</span>
              <button
                className="addcontacts"
                onClick={() => setaddcontacts(!addcontacts)}
              >
                Add contacts
              </button>
            </div>
          )}
          <div
            className="panel"
            style={{ visibility: !addcontacts ? "hidden" : "visible" }}
          >
            <input
              type="email"
              style={{
                padding: "10px",
                width: "40%",
                outline: "none",
                border: "1px solid white",
                borderRadius: "0.3rem",
              }}
              onChange={(e) => setusername(e.target.value)}
              value={username}
              placeholder="Enter email"
            />
            <button
              className="addcontacts"
              onClick={tab !== "groups" ? handleAddContacts : handleAddInGroup}
            >
              Add
            </button>
            {tab === "groups" ? (
              <>
                <button className="addcontacts" onClick={handleCreateGroup}>
                  Create
                </button>
                <button className="addcontacts" onClick={handleClear}>
                  Clear
                </button>
              </>
            ) : (
              ""
            )}
          </div>
          {tab==="groups"?"Participants: ":""}
          {tab === "groups"
            ? allparticipants.map((item) => {
                return <div className="selected-members">{item}</div>;
              })
            : ""}
        </div>

        {tab === "chats"
          ? handleChatrooms()?.map((item) => (
              <div
                className="item"
                onClick={() => handleChatRoom(item.name, item.groupname)}
              >
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
                    {/* {item.name.slice(9).split(",")[0] === auth.currentUser.email
                      ? item.name.slice(9).split(",")[1]
                      : item.name.slice(9).split(",")[0]} */}
                    {item.groupname !== ""
                      ? "Group: " + item.groupname
                      : item.name.slice(9).split(",")[0] ===
                        auth.currentUser.email
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
                  {tab !== "groups" ? (
                    <button
                      className="start-chat"
                      onClick={() => handleCreateChat(item.username)}
                    >
                      Start Chat
                    </button>
                  ) : (
                    ""
                  )}
                  {tab === "groups" ? (
                    <button
                      className="start-chat"
                      onClick={() => handleAddInGroup(item.username)}
                    >
                      Add In group
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default UserList;
