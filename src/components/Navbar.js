import React from "react";
import logo from "../assests/logo.jpg";
import { auth } from "../firebase";
const Navbar = () => {
  const handleSignOut = () => {
    auth.signOut();
    window.location.href = "/";
  };
  return (
    <div className="navbar">
      <img src={logo} width={40} style={{ marginLeft: "10px" }} />
      <div className="nav-buttons">
        {/* <button className="logout">+</button> */}
        <button className="logout" value="logout" onClick={handleSignOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
