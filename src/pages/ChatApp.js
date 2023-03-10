import React, { useState } from "react";

import InputBox from "../components/InputBox";
import Message from "../components/Message";
import Navbar from "../components/Navbar";
import UserList from "../components/UserList";

const ChatApp = () => {
  const [tab, settab] = useState("chats");
  const [table, settable] = useState("messages");

  return (
    <div className="chat-page">
      <header>
        <Navbar />
      </header>
      <div className="main-container">
        <div className="userlist">
          <UserList
            tab={tab}
            settab={settab}
            table={table}
            settable={settable}
          />
        </div>

        <Message table={table} settable={settable} />
      </div>
      <InputBox />
    </div>
  );
};

export default ChatApp;
