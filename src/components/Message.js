import React, { useEffect, useState, useRef, useContext } from "react";
import profile from "../assests/profile.webp";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AppContext from "../context/AppContext";
const Message = () => {
  const dummy = useRef();
  const context = useContext(AppContext);
  const data = context.data;
  const setdata = context.setdata;
  const table = context.table;
  data.sort((a, b) => a.timestamp - b.timestamp);
  return (
    <div className="main">
      <div className="currentuser">
        <div className="partner">
          <div className="avatar">
            <img
              src={profile}
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </div>
          {table.slice(9).split(",")[1]}
        </div>
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
