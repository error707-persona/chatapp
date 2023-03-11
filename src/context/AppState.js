import React, { useState, useEffect } from "react";
import AppContext from "./AppContext";
import { collection, onSnapshot } from "firebase/firestore";
import { database } from "../firebase";
const AppState = (props) => {
  const [data, setdata] = useState([]);
  const [table, settable] = useState("messages");
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
    <AppContext.Provider value={{ data, setdata, table, settable, chatrooms,setchatrooms }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
