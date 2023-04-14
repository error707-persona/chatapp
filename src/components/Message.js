import React, { useEffect, useState, useRef, useContext } from "react";
import profile from "../assests/profile.webp";
import {
  collection,
  onSnapshot,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { database } from "../firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import AppContext from "../context/AppContext";
import trash from "../assests/trash.svg";
const Message = () => {
  
  const context = useContext(AppContext);
  const data = context.data;
  const setdata = context.setdata;
  const table = context.table;
  const dummy = context.dummy;
  data.sort((a, b) => a.timestamp - b.timestamp);
  const [chatrooms, setchatrooms] = useState([]);
  
  
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
          {/* {auth.currentUser !== null
            ? auth.currentUser.email === table.slice(9).split(",")[0]
              ? table.slice(9).split(",")[1]
              : table.slice(9).split(",")[0]
            : table.slice(9).split(",")[1]
          } */}
          {!table.includes("ChatRoom#")?"Group: "+table:
          auth.currentUser !== null
          ? auth.currentUser.email === table.slice(9).split(",")[0]
            ? table.slice(9).split(",")[1]
            : table.slice(9).split(",")[0]
          : table.slice(9).split(",")[1]
          }
          
        </div>
        {data?.map((item) =>
          item.username === auth.currentUser.email ? (
            <div className="block-user">
              <div style={{ marginLeft:"auto" }}>
                <span className="username" style={{ marginLeft:"auto" }}>{item.username}</span>
                {item.imgUrl !== "" ? (
                  <div className="usermsg" style={{ marginLeft:"auto" }}>
                    <img src={item.imgUrl} width={200} height={200} />
                    {item.msg}
                  </div>
                ) : (
                  <div className="usermsg" style={{ marginLeft:"auto" }}>{item.msg}</div>
                )}

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
                {item.imgUrl !== "" ? (
                  <div className="usermsg">
                    <img src={item.imgUrl} width={200} height={200} />
                    {item.msg}
                  </div>
                ) : (
                  <div className="usermsg">{item.msg}</div>
                )}
              </div>
            </div>
          )
        )}
       <div ref={dummy} style={{ height:"150px"}}></div>
      </div>
      
    </div>
  );
};

export default Message;
