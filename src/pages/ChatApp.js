import React from "react";

import InputBox from "../components/InputBox";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";
const ChatApp = () => {
  return (
    <div className="chat-page">
      <header>
        <Navbar />
      </header>
      <div className="main-container">
        <UserList/>
        <Message />
      </div>
      
     
      <InputBox />
     
        
      
    </div>
  );
};

export default ChatApp;
