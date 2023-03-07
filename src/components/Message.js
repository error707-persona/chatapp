import React, { useEffect, useState } from "react";
import profile from "../assests/profile.webp";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { database } from "../firebase";

const Message = () => {
  const [data, setdata] = useState([]);
  const collectionsRef = collection(database, "messages");

  const getData = () => {
    onSnapshot(collectionsRef, (data) => {
      setdata(
        data.docs.map((item) => {
          return item.data();
        })
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="main">
      <div className="currentuser">
        {data.map((item) =>
          item.username == "areesha" ? (
            <div className="block">
              <div>
                <img src={profile} width={50} height={50} className="profile" />
              </div>
              <div>
                <span className="username">{item.username}</span>
                <div className="usermsg">{item.msg}</div>
              </div>
            </div>
          ) : (
            <div className="block-user">
              <div>
                <span className="username">{item.username}</span>
                <div className="usermsg">{item.msg}</div>
              </div>
              <div>
                <img src={profile} width={50} height={50} className="profile" />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Message;
