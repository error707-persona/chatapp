import React, { useContext, useState } from "react";

import { database } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import send from "../assests/send.svg";
import AppContext from "../context/AppContext";
const InputBox = () => {
  const [data, setdata] = useState("");
  const context = useContext(AppContext);
  const table = context.table;
  const settable = context.settable;
  console.log(table, "table")
  const collectionsRef = collection(database, table);
  const handleSend = () => {
    if (data !== "") {
      addDoc(collectionsRef, {
        username: auth.currentUser.email,
        msg: data,
        timestamp: Date.now(),
      });
    }
    setdata("");
  };

  return (
    <div className="inputbox">
      <input
        className="input"
        placeholder="Type you message here..."
        onChange={(e) => setdata(e.target.value)}
        value={data}
      ></input>
      <button onClick={handleSend} className="send">
        <img src={send} />
      </button>
    </div>
  );
};

export default InputBox;
