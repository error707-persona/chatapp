import React, { useContext, useState } from "react";

import { database } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../firebase";
import send from "../assests/send.svg";
import attach from "../assests/attach.svg";
import emoji from "../assests/emoji.svg";
import AppContext from "../context/AppContext";
import EmojiPicker from "emoji-picker-react";
import { app, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useOnKeyPress } from "../hooks/useOnKeyPress";
const InputBox = () => {
  const [data, setdata] = useState("");
  const context = useContext(AppContext);
  const table = context.table;
  const dummy = context.dummy;
  const collectionsRef = collection(database, table);
  const [file, setfile] = useState("");
  const [emojiPicker, setemojiPicker] = useState(false);
  const [imagePicker, setimagePicker] = useState(false);
  
  const handleSend = () => {
    if (data !== "") {
      addDoc(collectionsRef, {
        username: auth.currentUser.email,
        msg: data,
        imgUrl: "",
        timestamp: Date.now(),
      });
    }
    setdata("");
    dummy.current.scrollIntoView({behavior:'smooth'})
  };

  const handleSubmit = () => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "%done");
      },
      (err) => {
        console.log(err.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addDoc(collectionsRef, {
            username: auth.currentUser.email,
            msg: data,
            imgUrl: downloadURL,
            timestamp: Date.now(),
          });
        });
      }
    );
    setimagePicker(!imagePicker)
    setdata("");
    dummy.current.scrollIntoView({behavior:'smooth'}) 
  };

  const onEmojiClick = (event, emojiObject) => {
    setdata((data) => data + emojiObject.srcElement.img);
    console.log(event, "objects");
  };
  useOnKeyPress(handleSend, "Enter");
  return (
    <div className="inputbox">
      <input
        className="input"
        placeholder="Type your message here..."
        onChange={(e) => setdata(e.target.value)}
        value={data}
      ></input>
      <button onClick={handleSend} className="send">
        <img src={send} />
      </button>
      <div className="dropdown">
        <div className="dropdown-menu" style={{ opacity: emojiPicker ? 1 : 0 }}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
        <button className="send" onClick={() => setemojiPicker(!emojiPicker)}>
          <img src={emoji} />
        </button>
      </div>
      <div className="dropdown">
        <div className="dropdown-menu" style={{ opacity: imagePicker ? 1 : 0 }}>
          <input
            type="file"
            onChange={(event) => setfile(event.target.files[0])}
          />

          <button onClick={handleSubmit} className="submit">
            Send
          </button>
        </div>
        <button className="send" onClick={() => setimagePicker(!imagePicker)}>
          <img src={attach} />
        </button>
      </div>
    </div>
  );
};

export default InputBox;
