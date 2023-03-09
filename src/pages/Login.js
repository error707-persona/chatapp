import React from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googlelogo from "../assests/google.avif";
const Login = () => {
  
  let googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    // AUTH ****************
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        window.location.href = "/chatapp";
      })
      .catch((err) => {
        window.location.href = "/login";
      });
  };
  return (
    <div className="login">
      {(auth.currentUser)?"":<button onClick={handleSignIn} className="google">
        <img src={googlelogo} width={50} height={50} />
      </button>}
    </div>
  );
};

export default Login;
