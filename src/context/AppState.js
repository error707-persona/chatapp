import React, { useState, useEffect, useRef } from "react";
import AppContext from "./AppContext";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
const AppState = (props) => {
  const [data, setdata] = useState([]);
  const [table, settable] = useState("messages");
  const chatRef = collection(database, "chatrooms");
  const groupsRef = collection(database, "groups");
  const [allgroups, setallgroups] = useState([]);
  const dummy = useRef();
  
  const [chatrooms, setchatrooms] = useState(
    onSnapshot(chatRef, (data) => {
      setchatrooms(
        [...data.docs.map((item) => {
          return item.data();
        }), ...allgroups]
      );
    })
  );
  const getData = () => {
    const collectionsRef = collection(database, "messages");

    onSnapshot(collectionsRef, (data) => {
      setdata(
        data.docs
          .map((item) => {
            return item.data();
          })
          .sort((a, b) => a.timestamp - b.timestamp)
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <AppContext.Provider value={{ dummy, data, setdata, table, settable, chatrooms,setchatrooms }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
