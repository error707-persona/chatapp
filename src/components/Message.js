import React, { useEffect, useState, useRef } from "react";
import profile from "../assests/profile.webp";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Message = () => {
  const [data, setdata] = useState([]);
  const collectionsRef = collection(database, "messages");
  const bottomRef = useRef(null);

  const getData = () => {
    onSnapshot(collectionsRef, (data) => {
      setdata(
        data.docs
          .map((item) => {
            return item.data();
          })
          .sort((a, b) => a.timestamp - b.timestamp)
      );
    });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main" ref={bottomRef}>
      <div className="currentuser">
        {data.map((item) =>
          item.username === auth.currentUser.email ? (
            <div className="block-user">
              <div>
                <span className="username">{item.username}</span>
                <div className="usermsg">{item.msg}</div>
              </div>
              <div>
                <img src={profile} width={50} height={50} className="profile" />
              </div>
            </div>
          ) : (
            <div className="block">
              <div>
                <img src={profile} width={50} height={50} className="profile" />
              </div>
              <div>
                <span className="username">{item.username}</span>
                <div className="usermsg">{item.msg}</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Message;
