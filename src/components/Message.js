import React, { useEffect, useState, useRef } from "react";
import profile from "../assests/profile.webp";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

const Message = ({ table, settable }) => {
  const [data, setdata] = useState([]);
  
  
  const dummy = useRef();

  const getData = () => {
    const collectionsRef = collection(database, table);
    console.log(table, "table")
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
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="main">
      <div className="currentuser">
        {data?.map((item) =>
          item.username === auth.currentUser.email ? (
            <div className="block-user">
              <div>
                <span className="username">{item.username}</span>
                <div className="usermsg">{item.msg}</div>
                <br></br>
                {/* <div>{Date(item.timestamp).split(" ").slice(4, 5)}</div> */}
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
                <br></br>
                {/* <div>{Date(item.timestamp).split(" ").slice(4, 5)}</div> */}
              </div>
            </div>
          )
        )}
        <div ref={dummy}></div>
      </div>
    </div>
  );
};

export default Message;
