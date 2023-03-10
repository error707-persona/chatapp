import React, { useContext, useState } from "react";

import { database } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import send from "../assests/send.svg";
import attach from "../assests/attach.svg";
import AppContext from "../context/AppContext";
import { app, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const InputBox = () => {
  const [data, setdata] = useState("");
  const context = useContext(AppContext);
  const table = context.table;
  const collectionsRef = collection(database, table);
  const [file, setfile] = useState("");
  const storageRef = ref(storage, `images/${file.name}`);
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

  const handleSubmit = () => {
    const uploadTask = uploadBytesResumable(storageRef, data);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "%done");
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("file available at", downloadURL);
        });
      }
    );
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
